import { commitCell, deleteBeforeCaret, insertAtCaret } from "./brailleInput";

const DOT_BIT: Record<number, number> = { 1: 0x01, 2: 0x02, 3: 0x04, 4: 0x08, 5: 0x10, 6: 0x20 };

// 2列×3行のグリッドに、左上から行方向に並べる (1,4 / 2,5 / 3,6)。
// 物理キーボードのF・D・S(左手)とJ・K・L(右手)の並びと同じ、点字マスそのものの点の配置。
const DOT_GRID_ORDER = [1, 4, 2, 5, 3, 6];

/** タップ操作がテキストエリアへのフォーカス移動(→タブレットのソフトキーボード出現)を
 *  引き起こさないよう、pointerdownの既定動作を止める。 */
function preventFocusSteal(el: HTMLElement) {
  el.addEventListener("pointerdown", (e) => e.preventDefault());
}

/**
 * 点字タイプライターを模したオンスクリーンキーボードをtextareaの直後に設置する。
 *
 * 物理キーボード(F/D/S/J/K/L)と同じ「同時押し」操作を、マルチタッチで再現する。
 * 複数の点ボタンを指で同時に押し(pointerdown)、最後の1本が離れた瞬間(pointerup)に
 * そのマスを確定する。空白マス・BS・改行は単独タップの専用ボタンを用意する。
 */
export function attachBrailleOnScreenKeyboard(textarea: HTMLTextAreaElement) {
  const wrapper = document.createElement("div");
  wrapper.className = "bok-wrapper";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "bok-toggle";

  const keyboard = document.createElement("div");
  keyboard.className = "braille-onscreen-keyboard";
  keyboard.setAttribute("role", "group");
  keyboard.setAttribute("aria-label", "画面上の点字タイプライター");

  // タッチ操作可能な端末(タブレット等)では最初から出しておき、
  // マウス操作前提の環境では隠しておいて、必要な人だけボタンで開けるようにする。
  const startsOpen = matchMedia("(pointer: coarse)").matches;

  function setOpen(open: boolean) {
    keyboard.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "画面上の点字キーボードを隠す" : "画面上の点字キーボードを表示";
  }
  setOpen(startsOpen);
  toggle.addEventListener("click", () => setOpen(keyboard.hidden));
  preventFocusSteal(toggle);

  const cell = document.createElement("div");
  cell.className = "bok-cell";

  const dotButtons = new Map<number, HTMLButtonElement>();
  for (const dot of DOT_GRID_ORDER) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bok-dot";
    btn.textContent = String(dot);
    btn.setAttribute("aria-label", `${dot}の点`);
    preventFocusSteal(btn);
    cell.appendChild(btn);
    dotButtons.set(dot, btn);
  }
  keyboard.appendChild(cell);

  const actions = document.createElement("div");
  actions.className = "bok-actions";

  function makeActionButton(label: string, ariaLabel: string, onPress: () => void): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bok-action";
    btn.textContent = label;
    btn.setAttribute("aria-label", ariaLabel);
    preventFocusSteal(btn);
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      onPress();
    });
    actions.appendChild(btn);
    return btn;
  }

  makeActionButton("空白マス", "空白マスを入力", () => commitCell(textarea, 0));
  makeActionButton("⌫", "1文字消す", () => deleteBeforeCaret(textarea));
  makeActionButton("⏎", "改行", () => insertAtCaret(textarea, "\n"));

  keyboard.appendChild(actions);

  wrapper.appendChild(toggle);
  wrapper.appendChild(keyboard);
  textarea.insertAdjacentElement("afterend", wrapper);

  // 押されている点ボタンの数。-1 はリセット状態(次のセルの入力待ち)。
  let heldDots = -1;
  let dotBits = 0;
  const pointerToDot = new Map<number, number>();

  function dotFromEvent(e: PointerEvent): number | null {
    const target = e.target as HTMLElement;
    const btn = target.closest(".bok-dot") as HTMLButtonElement | null;
    if (!btn) return null;
    for (const [dot, el] of dotButtons) {
      if (el === btn) return dot;
    }
    return null;
  }

  cell.addEventListener("pointerdown", (e) => {
    const dot = dotFromEvent(e);
    if (dot === null) return;
    e.preventDefault();

    pointerToDot.set(e.pointerId, dot);
    dotButtons.get(dot)?.classList.add("active");

    if (heldDots === -1) heldDots = 0;
    heldDots++;
    dotBits |= DOT_BIT[dot];
  });

  function releasePointer(e: PointerEvent) {
    const dot = pointerToDot.get(e.pointerId);
    if (dot === undefined) return;
    pointerToDot.delete(e.pointerId);
    dotButtons.get(dot)?.classList.remove("active");

    if (heldDots === 1) {
      commitCell(textarea, dotBits);
      dotBits = 0;
    }
    if (heldDots > 0) heldDots--;
  }

  cell.addEventListener("pointerup", releasePointer);
  cell.addEventListener("pointercancel", releasePointer);
}
