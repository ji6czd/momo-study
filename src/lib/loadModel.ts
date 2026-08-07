import { withBase } from "./url";

const MODEL_PATH = "models/basic_data_7.mbm.gz";

export interface LoadModelOptions {
	/** ダウンロード中に(受信済みバイト数, 総バイト数)で呼ばれる。totalは取れないことがある。 */
	onProgress?: (loadedBytes: number, totalBytes: number | null) => void;
}

/**
 * gzip圧縮された点訳モデルを取得し、展開してバイト列を返す。
 * ~17MBあるので、呼び出しは実際に必要なページでのみ行うこと。
 */
export async function loadModel(options: LoadModelOptions = {}): Promise<Uint8Array> {
	const response = await fetch(withBase(MODEL_PATH));
	if (!response.ok || !response.body) {
		throw new Error(`モデルの取得に失敗しました (${response.status})`);
	}

	const totalBytes = Number(response.headers.get("content-length")) || null;
	let loadedBytes = 0;

	const reader = response.body.getReader();
	const chunks: Uint8Array[] = [];
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
		loadedBytes += value.byteLength;
		options.onProgress?.(loadedBytes, totalBytes);
	}

	const compressedStream = new Blob(chunks).stream();
	const decompressedStream = compressedStream.pipeThrough(new DecompressionStream("gzip"));
	const decompressedBlob = await new Response(decompressedStream).blob();
	return new Uint8Array(await decompressedBlob.arrayBuffer());
}
