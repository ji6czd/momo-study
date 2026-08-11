import { attachBrailleOnScreenKeyboard } from "./brailleOnScreenKeyboard";

const DOT_BITS: Record<string, number> = {
  KeyF: 0x01,
  KeyD: 0x02,
  KeyS: 0x04,
  KeyJ: 0x08,
  KeyK: 0x10,
  KeyL: 0x20,
};

const PASSTHROUGH_CODES = new Set([
  "Backspace",
  "Tab",
  "Enter",
  "Home",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "End",
  "ArrowDown",
  "Delete",
]);

export interface BrailleInputOptions {
  textarea: HTMLTextAreaElement;
  /** タブレット等、物理キーボードがない環境向けのオンスクリーンキーボードを併設するか。既定はtrue。 */
  onScreenKeyboard?: boolean;
}

/**
 * 指定位置にテキストを挿入し、キャレットをその直後へ動かす。
 *
 * `textarea.value`を直接書き換えるため、ネイティブの`input`イベントは発火しない。
 * そこで挿入のたびに`input`イベントを手動でdispatchし、呼び出し側が1つの`input`
 * リスナーでネイティブな編集(Backspace等)と合わせて拾えるようにしている。
 */
export function insertAtCaret(textarea: HTMLTextAreaElement, text: string) {
  const pos = textarea.selectionStart ?? textarea.value.length;
  const before = textarea.value.slice(0, pos);
  const after = textarea.value.slice(pos);
  textarea.value = before + text + after;
  const newPos = pos + text.length;
  textarea.setSelectionRange(newPos, newPos);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

/** キャレット直前の1文字(または選択範囲)を削除する。物理Backspaceキーの代わりに使う。 */
export function deleteBeforeCaret(textarea: HTMLTextAreaElement) {
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? start;
  if (start !== end) {
    textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end);
    textarea.setSelectionRange(start, start);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }
  if (start === 0) return;
  textarea.value = textarea.value.slice(0, start - 1) + textarea.value.slice(start);
  textarea.setSelectionRange(start - 1, start - 1);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

/** dotBitsが表す1マスを、点字のUnicodeパターン(U+2800始まり)としてキャレット位置へ確定する。 */
export function commitCell(textarea: HTMLTextAreaElement, dotBits: number) {
  insertAtCaret(textarea, String.fromCharCode(0x2800 + dotBits));
}

/**
 * F/D/S/J/K/Lキーの同時押し(コード)で点字1セルを入力できるようにする。
 * 離されたキーが最後の1つになった瞬間に、そのセルをtextareaへ挿入して確定する。
 *
 * 加えて、タブレットなど物理キーボードがない環境でも同じ操作感で打てるよう、
 * 画面上の点字タイプライター風キーボードもあわせて設置する(onScreenKeyboard: falseで無効化可)。
 */
export function attachBrailleInput({ textarea, onScreenKeyboard = true }: BrailleInputOptions) {
  // 押されている点字キーの数。-1 はリセット状態(次のセルの入力待ち)。
  let heldKeys = -1;
  let dotBits = 0;

  function isBrailleKey(e: KeyboardEvent): boolean {
    if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing) return false;
    return !PASSTHROUGH_CODES.has(e.code);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!isBrailleKey(e)) {
      heldKeys = -1;
      return;
    }
    e.preventDefault();
    if (e.repeat) return;

    if (heldKeys === -1) heldKeys = 0;
    heldKeys++;

    if (e.code === "Space") {
      dotBits = 0;
      return;
    }
    const bit = DOT_BITS[e.code];
    if (bit !== undefined) {
      dotBits |= bit;
    } else {
      // 点字の点に対応しないキーはセルの区切りとして無視する
      heldKeys = -1;
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.isComposing) return;
    if (heldKeys === 1) {
      commitCell(textarea, dotBits);
      dotBits = 0;
    }
    if (heldKeys > 0) heldKeys--;
  }

  textarea.addEventListener("keydown", handleKeyDown);
  textarea.addEventListener("keyup", handleKeyUp);

  if (onScreenKeyboard) {
    attachBrailleOnScreenKeyboard(textarea);
  }
}
