/**
 * momors-braille/tables/japanese_grade1.toml の [table.kana.single] から書き起こした対応表。
 * かな→点字は決定的な表引きなので、wasm/モデルを読み込まずにビルド時の静的データとして持てる。
 */

export interface GojuonCell {
	kana: string;
	braille: string;
}

export interface GojuonRow {
	label: string;
	cells: (GojuonCell | null)[];
}

export const GOJUON_COLUMNS = ["あ", "い", "う", "え", "お"];

export const GOJUON_ROWS: GojuonRow[] = [
	{
		label: "あ行",
		cells: [
			{ kana: "あ", braille: "⠁" },
			{ kana: "い", braille: "⠃" },
			{ kana: "う", braille: "⠉" },
			{ kana: "え", braille: "⠋" },
			{ kana: "お", braille: "⠊" },
		],
	},
	{
		label: "か行",
		cells: [
			{ kana: "か", braille: "⠡" },
			{ kana: "き", braille: "⠣" },
			{ kana: "く", braille: "⠩" },
			{ kana: "け", braille: "⠫" },
			{ kana: "こ", braille: "⠪" },
		],
	},
	{
		label: "さ行",
		cells: [
			{ kana: "さ", braille: "⠱" },
			{ kana: "し", braille: "⠳" },
			{ kana: "す", braille: "⠹" },
			{ kana: "せ", braille: "⠻" },
			{ kana: "そ", braille: "⠺" },
		],
	},
	{
		label: "た行",
		cells: [
			{ kana: "た", braille: "⠕" },
			{ kana: "ち", braille: "⠗" },
			{ kana: "つ", braille: "⠝" },
			{ kana: "て", braille: "⠟" },
			{ kana: "と", braille: "⠞" },
		],
	},
	{
		label: "な行",
		cells: [
			{ kana: "な", braille: "⠅" },
			{ kana: "に", braille: "⠇" },
			{ kana: "ぬ", braille: "⠍" },
			{ kana: "ね", braille: "⠏" },
			{ kana: "の", braille: "⠎" },
		],
	},
	{
		label: "は行",
		cells: [
			{ kana: "は", braille: "⠥" },
			{ kana: "ひ", braille: "⠧" },
			{ kana: "ふ", braille: "⠭" },
			{ kana: "へ", braille: "⠯" },
			{ kana: "ほ", braille: "⠮" },
		],
	},
	{
		label: "ま行",
		cells: [
			{ kana: "ま", braille: "⠵" },
			{ kana: "み", braille: "⠷" },
			{ kana: "む", braille: "⠽" },
			{ kana: "め", braille: "⠿" },
			{ kana: "も", braille: "⠾" },
		],
	},
	{
		label: "や行",
		cells: [
			{ kana: "や", braille: "⠌" },
			null,
			{ kana: "ゆ", braille: "⠬" },
			null,
			{ kana: "よ", braille: "⠜" },
		],
	},
	{
		label: "ら行",
		cells: [
			{ kana: "ら", braille: "⠑" },
			{ kana: "り", braille: "⠓" },
			{ kana: "る", braille: "⠙" },
			{ kana: "れ", braille: "⠛" },
			{ kana: "ろ", braille: "⠚" },
		],
	},
	{
		label: "わ行",
		cells: [
			{ kana: "わ", braille: "⠄" },
			null,
			null,
			null,
			{ kana: "を", braille: "⠔" },
		],
	},
	{
		label: "ん",
		cells: [{ kana: "ん", braille: "⠴" }, null, null, null, null],
	},
];

export interface DakuonGroup {
	label: string;
	cells: GojuonCell[];
}

export const DAKUON_GROUPS: DakuonGroup[] = [
	{
		label: "が行",
		cells: [
			{ kana: "が", braille: "⠐⠡" },
			{ kana: "ぎ", braille: "⠐⠣" },
			{ kana: "ぐ", braille: "⠐⠩" },
			{ kana: "げ", braille: "⠐⠫" },
			{ kana: "ご", braille: "⠐⠪" },
		],
	},
	{
		label: "ざ行",
		cells: [
			{ kana: "ざ", braille: "⠐⠱" },
			{ kana: "じ", braille: "⠐⠳" },
			{ kana: "ず", braille: "⠐⠹" },
			{ kana: "ぜ", braille: "⠐⠻" },
			{ kana: "ぞ", braille: "⠐⠺" },
		],
	},
	{
		label: "だ行",
		cells: [
			{ kana: "だ", braille: "⠐⠕" },
			{ kana: "ぢ", braille: "⠐⠗" },
			{ kana: "づ", braille: "⠐⠝" },
			{ kana: "で", braille: "⠐⠟" },
			{ kana: "ど", braille: "⠐⠞" },
		],
	},
	{
		label: "ば行",
		cells: [
			{ kana: "ば", braille: "⠐⠥" },
			{ kana: "び", braille: "⠐⠧" },
			{ kana: "ぶ", braille: "⠐⠭" },
			{ kana: "べ", braille: "⠐⠯" },
			{ kana: "ぼ", braille: "⠐⠮" },
		],
	},
	{
		label: "ぱ行",
		cells: [
			{ kana: "ぱ", braille: "⠠⠥" },
			{ kana: "ぴ", braille: "⠠⠧" },
			{ kana: "ぷ", braille: "⠠⠭" },
			{ kana: "ぺ", braille: "⠠⠯" },
			{ kana: "ぽ", braille: "⠠⠮" },
		],
	},
];
