/**
 * コンテンツページの読み進め順。「次のページへ」リンクの元データ。
 * トップページ(index)はここには含めない(一覧ページなので次リンクは不要)。
 */

export interface PageEntry {
  /** withBase()に渡すスラッグ(先頭スラッシュなし)。 */
  slug: string;
  title: string;
}

export const PAGES: PageEntry[] = [
  { slug: "what-is-braille", title: "点字って何？" },
  { slug: "write-freely", title: "自由に書いてみよう" },
  { slug: "history", title: "点字はいつできたの？" },
  { slug: "gojuon-learn", title: "五十音を学ぼう" },
  { slug: "gojuon-practice", title: "五十音表を見ながら書いてみよう" },
  { slug: "yoon", title: "拗音・特殊音も覚えよう" },
  { slug: "history-japan", title: "日本の点字はいつできたの？" },
  { slug: "numbers", title: "数字の書き方を覚えよう" },
  { slug: "what-can-be-written", title: "点字ではどんな文字が書けるの？" },
  { slug: "writing-tools", title: "点字はどうやって書くの？" },
  { slug: "wakachigaki", title: "分かち書きって何？" },
  { slug: "sentences", title: "文章を書いてみよう" },
  { slug: "names", title: "名前の書き方を知ろう" },
  { slug: "message", title: "メッセージを書いてみよう" },
  { slug: "find-braille", title: "点字を探してみよう" },
];

export function getNextPage(currentSlug: string): PageEntry | null {
  const index = PAGES.findIndex((p) => p.slug === currentSlug);
  if (index === -1 || index === PAGES.length - 1) return null;
  return PAGES[index + 1];
}
