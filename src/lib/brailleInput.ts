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
}

/**
 * F/D/S/J/K/Lキーの同時押し(コード)で点字1セルを入力できるようにする。
 * 離されたキーが最後の1つになった瞬間に、そのセルをtextareaへ挿入して確定する。
 *
 * セル確定時は`textarea.value`を直接書き換えるため、ネイティブの`input`イベントは
 * 発火しない。そこで確定のたびに`input`イベントを手動でdispatchし、Backspace等の
 * ネイティブな編集と合わせて呼び出し側が1つの`input`リスナーで両方拾えるようにしている。
 */
export function attachBrailleInput({ textarea }: BrailleInputOptions) {
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
      commitCell();
    }
    if (heldKeys > 0) heldKeys--;
  }

  function commitCell() {
    const cell = String.fromCharCode(0x2800 + dotBits);
    const pos = textarea.selectionStart ?? textarea.value.length;
    const before = textarea.value.slice(0, pos);
    const after = textarea.value.slice(pos);
    textarea.value = before + cell + after;
    textarea.setSelectionRange(pos + 1, pos + 1);
    dotBits = 0;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  textarea.addEventListener("keydown", handleKeyDown);
  textarea.addEventListener("keyup", handleKeyUp);
}
