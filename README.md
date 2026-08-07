# モモさんと点字を学ぼう！

点字について、いっしょに学べるポータルサイト（作成中）。

## セットアップ

点字の逆変換（点字→かな）には [momors-wasm](https://github.com/ji6czd/momo) を使っています。
translatorとモデルのバージョンがずれて壊れることを避けるため、この2つは1つのSDK配布物にまとめられていて、
このリポジトリではgit管理せず、配布物を`vendor/`に展開して使う方式にしています。

1. [momoの配布サイト](https://github.com/ji6czd/momo/releases)
   から `momo-sdk-wasm-x.y.z.zip` をダウンロードする
2. zip、このプロジェクトの `vendor/` に展開する
3. 依存関係をインストールする

   ```sh
   pnpm install
   ```

4. 開発サーバーを起動する

   ```sh
   pnpm dev
   ```

`vendor/`は`.gitignore`対象です。SDKを更新したいときは、新しいzipを同じ手順で展開し直すだけで反映されます。

## コマンド

| Command        | Action                                |
| :------------- | :------------------------------------ |
| `pnpm install` | 依存関係をインストール                |
| `pnpm dev`     | `localhost:4321` で開発サーバーを起動 |
| `pnpm build`   | `./dist/` に本番ビルドを出力          |
| `pnpm preview` | ビルド結果をローカルでプレビュー      |
