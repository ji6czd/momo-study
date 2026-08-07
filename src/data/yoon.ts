/**
 * momors-braille/tables/japanese_grade1.toml の [table.kana.compound] / [table.kana.single] から
 * 書き起こした拗音・特殊音の対応表(外来語専用の音は今回は含めていない)。
 */

import type { GojuonCell } from "./gojuon";

export interface YoonRow {
	label: string;
	cells: GojuonCell[];
}

export const YOON_COLUMNS = ["ゃ", "ゅ", "ょ"];

export const YOON_SEION_ROWS: YoonRow[] = [
	{
		label: "きゃ行",
		cells: [
			{ kana: "きゃ", braille: "⠈⠡" },
			{ kana: "きゅ", braille: "⠈⠩" },
			{ kana: "きょ", braille: "⠈⠪" },
		],
	},
	{
		label: "しゃ行",
		cells: [
			{ kana: "しゃ", braille: "⠈⠱" },
			{ kana: "しゅ", braille: "⠈⠹" },
			{ kana: "しょ", braille: "⠈⠺" },
		],
	},
	{
		label: "ちゃ行",
		cells: [
			{ kana: "ちゃ", braille: "⠈⠕" },
			{ kana: "ちゅ", braille: "⠈⠝" },
			{ kana: "ちょ", braille: "⠈⠞" },
		],
	},
	{
		label: "にゃ行",
		cells: [
			{ kana: "にゃ", braille: "⠈⠅" },
			{ kana: "にゅ", braille: "⠈⠍" },
			{ kana: "にょ", braille: "⠈⠎" },
		],
	},
	{
		label: "ひゃ行",
		cells: [
			{ kana: "ひゃ", braille: "⠈⠥" },
			{ kana: "ひゅ", braille: "⠈⠭" },
			{ kana: "ひょ", braille: "⠈⠮" },
		],
	},
	{
		label: "みゃ行",
		cells: [
			{ kana: "みゃ", braille: "⠈⠵" },
			{ kana: "みゅ", braille: "⠈⠽" },
			{ kana: "みょ", braille: "⠈⠾" },
		],
	},
	{
		label: "りゃ行",
		cells: [
			{ kana: "りゃ", braille: "⠈⠑" },
			{ kana: "りゅ", braille: "⠈⠙" },
			{ kana: "りょ", braille: "⠈⠚" },
		],
	},
];

export const YOON_DAKUON_ROWS: YoonRow[] = [
	{
		label: "ぎゃ行",
		cells: [
			{ kana: "ぎゃ", braille: "⠘⠡" },
			{ kana: "ぎゅ", braille: "⠘⠩" },
			{ kana: "ぎょ", braille: "⠘⠪" },
		],
	},
	{
		label: "じゃ行",
		cells: [
			{ kana: "じゃ", braille: "⠘⠱" },
			{ kana: "じゅ", braille: "⠘⠹" },
			{ kana: "じょ", braille: "⠘⠺" },
		],
	},
	{
		label: "びゃ行",
		cells: [
			{ kana: "びゃ", braille: "⠘⠥" },
			{ kana: "びゅ", braille: "⠘⠭" },
			{ kana: "びょ", braille: "⠘⠮" },
		],
	},
	{
		label: "ぴゃ行",
		cells: [
			{ kana: "ぴゃ", braille: "⠨⠥" },
			{ kana: "ぴゅ", braille: "⠨⠭" },
			{ kana: "ぴょ", braille: "⠨⠮" },
		],
	},
];

export interface SpecialSound {
	label: string;
	braille: string;
	description: string;
}

export const SPECIAL_SOUNDS: SpecialSound[] = [
	{
		label: "っ（小さい「つ」/ 促音）",
		braille: "⠂",
		description: "次の音を強く区切るしるし。「がっこう」「きっぷ」など。",
	},
	{
		label: "ー（棒引き / 長音符）",
		braille: "⠒",
		description: "前の音をのばすしるし。「スーパー」「ノート」など。",
	},
];
