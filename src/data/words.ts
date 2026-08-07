/**
 * 単語当てゲーム用の単語リスト。
 * 正解の点字は momo.exe --braille で実際に変換して確認済み
 * (単発の単語をPredictorに通すと稀に誤分割するため、ひらがな/漢字どちらが正しく
 *  変換されるかを個別に確認し、正しい方の結果を採用している)。
 *
 * 長音符(ー)・拗音(ゃゅょ、および「こう」等の長音扱い)を含む単語は、
 * それらを学習するyoon.astroのゲーム用に分けている。
 */

export interface Word {
  /** 出題時に表示する読み方(ひらがな/カタカナ)。 */
  kana: string;
  /** 正解の点字。 */
  braille: string;
}

/** 五十音・濁音・半濁音までで書ける単語(gojuon-practice.astro用)。 */
export const BASIC_WORDS: Word[] = [
  { kana: "いぬ", braille: "⠃⠍" },
  { kana: "ねこ", braille: "⠏⠪" },
  { kana: "はな", braille: "⠥⠅" },
  { kana: "とり", braille: "⠞⠓" },
  { kana: "さかな", braille: "⠱⠡⠅" },
  { kana: "さくら", braille: "⠱⠩⠑" },
  { kana: "りんご", braille: "⠓⠴⠐⠪" },
  { kana: "バナナ", braille: "⠐⠥⠅⠅" },
  { kana: "えんぴつ", braille: "⠋⠴⠠⠧⠝" },
  { kana: "だいこん", braille: "⠐⠕⠃⠪⠴" },
  { kana: "にんじん", braille: "⠇⠴⠐⠳⠴" },
];

/** 長音符・拗音・促音を含む単語(yoon.astro用)。 */
export const YOON_WORDS: Word[] = [
  { kana: "ノート", braille: "⠎⠒⠞" },
  { kana: "ケーキ", braille: "⠫⠒⠣" },
  { kana: "がっこう", braille: "⠐⠡⠂⠪⠒" },
  { kana: "きょう", braille: "⠈⠪⠒" },
  { kana: "おちゃ", braille: "⠊⠈⠕" },
  { kana: "でんしゃ", braille: "⠐⠟⠴⠈⠱" },
  { kana: "きっぷ", braille: "⠣⠂⠠⠭" },
  { kana: "おかあさん", braille: "⠊⠡⠁⠱⠴" },
  { kana: "おとうさん", braille: "⠊⠞⠒⠱⠴" },
  { kana: "とうもろこし", braille: "⠞⠒⠾⠚⠪⠳" },
];

/** 数字を含む単語 */

export const NUMBER_WORDS: Word[] = [
  { kana: "5ねんせい", braille: "⠼⠑⠏⠴⠻⠃" },
  { kana: "3がつ", braille: "⠼⠉⠐⠡⠝" },
  { kana: "1ばんせん", braille: "⠼⠁⠐⠥⠴⠻⠴" },
  { kana: "2じかん", braille: "⠼⠃⠐⠳⠡⠴" },
  { kana: "5えんだま", braille: "⠼⠑⠤⠋⠴⠐⠕⠵" },
  { kana: "3りんしゃ", braille: "⠼⠉⠤⠓⠴⠈⠱" },
  { kana: "365にち", braille: "⠼⠉⠋⠑⠇⠗" },
];

/** 漢字かな交じりの単語(what-can-be-written.astro用)。出題は「もとの文字」で表示する。 */
export interface KanjiWord extends Word {
  /** 出題時に表示する、漢字かな交じりの原文。 */
  source: string;
}

export const CHARACTER_WORDS: KanjiWord[] = [
  { source: "小学校", kana: "しょうがっこう", braille: "⠈⠺⠒⠐⠡⠂⠪⠒" },
  { source: "先生", kana: "せんせい", braille: "⠻⠴⠻⠃" },
  { source: "東京都", kana: "とうきょうと", braille: "⠞⠒⠈⠪⠒⠞" },
  { source: "こんにちは", kana: "こんにちわ", braille: "⠪⠴⠇⠗⠄" },
  { source: "ありがとう", kana: "ありがとう", braille: "⠁⠓⠐⠡⠞⠒" },
  { source: "氷", kana: "こおり", braille: "⠪⠊⠓" },
  { source: "自動車", kana: "じどうしゃ", braille: "⠐⠳⠐⠞⠒⠈⠱" },
  { source: "飛行機", kana: "ひこうき", braille: "⠧⠪⠒⠣" },
  { source: "コオロギ", kana: "こおろぎ", braille: "⠪⠊⠚⠐⠣" },
];

/**
 * 分かち書き(単語の区切り)を練習する例文(wakachigaki.astro用)。
 * kanaは表示用に単語の区切りを全角スペースで見えるようにしている(実際の分かち書きは半角スペース相当の点字1マス)。
 * brailleは区切りの点字スペース(⠀)を含む、実際の正解。
 */
export const WAKACHI_WORDS: KanjiWord[] = [
  { source: "小学校5年生", kana: "しょうがっこう　ごねんせい", braille: "⠈⠺⠒⠐⠡⠂⠪⠒⠀⠼⠑⠏⠴⠻⠃" },
  { source: "音楽鑑賞", kana: "おんがく　かんしょう", braille: "⠊⠴⠐⠡⠩⠀⠡⠴⠈⠺⠒" },
  { source: "漢字テスト", kana: "かんじ　テスト", braille: "⠡⠴⠐⠳⠀⠟⠹⠞" },
  { source: "私は花", kana: "わたしわ　はな", braille: "⠄⠕⠳⠄⠀⠥⠅" },
  { source: "僕は魚", kana: "ぼくわ　さかな", braille: "⠐⠮⠩⠄⠀⠱⠡⠅" },
  { source: "犬のしっぽ", kana: "いぬの　しっぽ", braille: "⠃⠍⠎⠀⠳⠂⠠⠮" },
];

/**
 * 句読点を含む例文(sentences.astro用)。分かち書きと同じく、kanaの区切りは
 * 表示用の全角スペース。句点(。)は文末では前後スペースが発生しない
 * (次の文字が無い境界では[transitions]が発火しないため)。
 */
export const SENTENCE_WORDS: KanjiWord[] = [
  {
    source: "雪がふりました。学校が休みになりました。",
    kana: "ゆきが　ふりました。がっこうが　やすみに　なりました。",
    braille: "⠬⠣⠐⠡⠀⠭⠓⠵⠳⠕⠲⠀⠀⠐⠡⠂⠪⠒⠐⠡⠀⠌⠹⠷⠇⠀⠅⠓⠵⠳⠕⠲",
  },
  {
    source: "明日はお休みです。",
    kana: "あすわ　おやすみです。",
    braille: "⠁⠹⠄⠀⠊⠌⠹⠷⠐⠟⠹⠲",
  },
  {
    source: "夏休みはだいたい6週間です。",
    kana: "なつやすみわだいたい　6しゅうかんです。",
    braille: "⠅⠝⠌⠹⠷⠄⠐⠕⠃⠕⠃⠀⠼⠋⠈⠹⠒⠡⠴⠐⠟⠹⠲",
  },
  {
    source: "最近ネットのゲームが人気です。",
    kana: "さいきん　ねっとの　げーむが　にんきです。",
    braille: "⠱⠃⠣⠴⠀⠏⠂⠞⠎⠀⠐⠫⠒⠽⠐⠡⠀⠇⠴⠣⠐⠟⠹⠲",
  },
  {
    source: "給食のパンはおいしいですよ。",
    kana: "きゅうしょくの　ぱんわ　おいしいですよ。",
    braille: "⠈⠩⠒⠈⠺⠩⠎⠀⠠⠥⠴⠄⠀⠊⠃⠳⠃⠐⠟⠹⠜⠲",
  },
  {
    source: "私が好きなことはシールを集めることです。",
    kana: "わたしが　すきな　ことわ　しーるを　あつめる　ことです。",
    braille: "⠄⠕⠳⠐⠡⠀⠹⠣⠅⠀⠪⠞⠄⠀⠳⠒⠙⠔⠀⠁⠝⠿⠙⠀⠪⠞⠐⠟⠹⠲",
  },
  {
    source: "チンパンジーと人間の遺伝子のほとんどはおなじなんだって。",
    kana: "ちんぱんじーと　にんげんの　いでんしの　ほとんどわ　おなじなんだって。",
    braille: "⠗⠴⠠⠥⠴⠐⠳⠒⠞⠀⠇⠴⠐⠫⠴⠎⠀⠃⠐⠟⠴⠳⠎⠀⠮⠞⠴⠐⠞⠄⠀⠊⠅⠐⠳⠅⠴⠐⠕⠂⠟⠲",
  },
];
