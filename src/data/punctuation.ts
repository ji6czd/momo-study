/**
 * 文章を書くときに使う句読点の対応表。sentences.astroの表と、点字表モーダルで共有する。
 */

export interface PunctuationSign {
	label: string;
	braille: string;
	description: string;
}

export const PUNCTUATION_SIGNS: PunctuationSign[] = [
	{
		label: "。(句点)",
		braille: "⠲",
		description: "文の終わりに書く。あとに文が続くときは2マスあける",
	},
	{
		label: "、(読点)",
		braille: "⠰",
		description: "文の区切りに書く。あとに文が続くときは1マスあける",
	},
];
