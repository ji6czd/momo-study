// vendor/data/ の点訳モデルを、実行時にfetchできる public/models/ へ
// gzip圧縮してコピーする。ソースより新しければ再生成をスキップする。
//
// public/models/ 自体はgitignore対象(51MBのモデルをコミットしないため)。
// vendor/ と同様、ビルド前にこのスクリプトで用意する必要がある。

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const MODEL_NAME = "basic_data_7.mbm";
const SRC = join(ROOT, "vendor", "data", MODEL_NAME);
const DEST_DIR = join(ROOT, "public", "models");
const DEST = join(DEST_DIR, `${MODEL_NAME}.gz`);

if (!existsSync(SRC)) {
	console.error(
		`[prepare-model] ${SRC} が見つかりません。README のセットアップ手順に従って、SDKのzipを vendor/ に展開してください。`,
	);
	process.exit(1);
}

if (existsSync(DEST) && statSync(DEST).mtimeMs >= statSync(SRC).mtimeMs) {
	console.log(`[prepare-model] ${DEST} は最新です。スキップします。`);
	process.exit(0);
}

mkdirSync(DEST_DIR, { recursive: true });
const src = readFileSync(SRC);
const compressed = gzipSync(src, { level: 9 });
writeFileSync(DEST, compressed);

const srcMb = (src.byteLength / 1024 / 1024).toFixed(1);
const destMb = (compressed.byteLength / 1024 / 1024).toFixed(1);
console.log(`[prepare-model] ${MODEL_NAME}: ${srcMb}MB -> ${destMb}MB (gzip) -> ${DEST}`);
