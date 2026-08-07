/**
 * momors-braille/tables/japanese_grade1.toml の [table.digit] / [flags.digit] から
 * 書き起こした数字の対応表。
 */

export interface DigitCell {
	digit: string;
	braille: string;
}

/** 数符(すうふ)。数字の前につけて、以降を数字として読ませる印。 */
export const NUMBER_SIGN = "⠼";

/** 繋ぎ符(つなぎふ)。数字のセルとまぎらわしい文字が続くときに、数字の終わりを示す印。 */
export const LINK_SIGN = "⠤";

export const DIGITS: DigitCell[] = [
	{ digit: "0", braille: "⠚" },
	{ digit: "1", braille: "⠁" },
	{ digit: "2", braille: "⠃" },
	{ digit: "3", braille: "⠉" },
	{ digit: "4", braille: "⠙" },
	{ digit: "5", braille: "⠑" },
	{ digit: "6", braille: "⠋" },
	{ digit: "7", braille: "⠛" },
	{ digit: "8", braille: "⠓" },
	{ digit: "9", braille: "⠊" },
];
