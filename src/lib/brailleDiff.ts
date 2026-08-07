/**
 * 正解の点字と、打った点字を比較する。
 *
 * 単純に同じ位置同士を比べる方式だと、分かち書きの1マス抜け/余分だけで
 * それ以降がすべて「不一致」に見えてしまう。LCS(最長共通部分列)で位置ズレを
 * 吸収してから差分を取ることで、ズレた後も一致している部分は一致として扱える。
 */

export type DiffOp =
	| { type: "match"; cell: string }
	/** 正解にはあるが、打ったものには無い(足りない)セル。 */
	| { type: "missing"; cell: string }
	/** 打ったものにはあるが、正解には無い(余分な/間違った)セル。 */
	| { type: "extra"; cell: string };

export function diffBraille(correct: string, attempt: string): DiffOp[] {
	const a = [...correct];
	const b = [...attempt];
	const n = a.length;
	const m = b.length;

	// dp[i][j] = LCS length of a[0..i) と b[0..j)
	const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			dp[i][j] =
				a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
		}
	}

	const ops: DiffOp[] = [];
	let i = n;
	let j = m;
	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
			ops.push({ type: "match", cell: a[i - 1] });
			i--;
			j--;
		} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
			ops.push({ type: "extra", cell: b[j - 1] });
			j--;
		} else {
			ops.push({ type: "missing", cell: a[i - 1] });
			i--;
		}
	}
	ops.reverse();
	return ops;
}
