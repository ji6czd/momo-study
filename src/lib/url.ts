const HAS_EXTENSION = /\.[a-zA-Z0-9]+$/;

/**
 * サイト内リンク・アセットのパスに `base`(astro.config.mjsの`base`)を前置する。
 * `base`を書き換えるだけでリンクが追従するように、絶対パスを直書きせずこれを経由する。
 *
 * astro.config.mjsで`trailingSlash: 'always'`にしているので、ページルートは
 * 末尾に`/`が無いとルーティングと一致しない。favicon等の実ファイル(拡張子あり)は
 * 逆に`/`を付けてはいけないので、拡張子の有無で区別している。
 */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL;
	const normalizedBase = base.endsWith("/") ? base : `${base}/`;
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
	const full = normalizedBase + normalizedPath;
	if (full.endsWith("/") || HAS_EXTENSION.test(normalizedPath)) return full;
	return `${full}/`;
}
