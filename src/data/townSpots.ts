/**
 * 「点字を探してみよう」用のデータ。ユーザー自身の通勤ルーティンをもとにした場面。
 * brailleText/meaning/trivia が未確定のものは、実際にその場所を利用している人に
 * 確認してから埋める(検索や推測で埋めない)。
 */

export interface Spot {
	id: string;
	/** 場面の見出し。 */
	scene: string;
	/** 状況を伝える一文。 */
	narration: string;
	/** この場面に、探すべき点字があるか。無ければ場面つなぎだけの演出になる。 */
	hasBraille: boolean;
	category?: "紙・印刷" | "刻印・立体" | "デジタル" | "公共サービス";
	/** 実際の点字。 */
	brailleText?: string;
	/** 点字が何を表しているか。固定の1つの答えが無い場合(点字ディスプレイ等)は省略。 */
	meaning?: string;
	/** なぜそこにあるか、豆知識。 */
	trivia?: string;
	/** 意図だけ伝え、答えは明かさない代替テキスト。 */
	imageAlt: string;
	/** 画像内の点字の位置(パーセンテージ)。画像を用意してから決める。 */
	hotspot?: { x: number; y: number };
}

export const SPOTS: Spot[] = [
	{
		id: "station-arrival",
		scene: "駅に着いた",
		narration: "歩いて駅まで来たよ。",
		hasBraille: false,
		imageAlt: "駅の入り口の写真。",
	},
	{
		id: "ticket-machine",
		scene: "きっぷを買う",
		narration: "きっぷを買って、電車に乗るよ。",
		hasBraille: true,
		category: "公共サービス",
		// TODO: 券売機のどのボタンに、どんな点字があるか確認する
		imageAlt: "きっぷの券売機の写真。ボタンをよく見てみよう。",
	},
	{
		id: "station-stairs",
		scene: "かいだんの手すり",
		narration: "ホームへ続くかいだん。手すりに何かあるかな？",
		hasBraille: true,
		category: "刻印・立体",
		// TODO: 手すりの点字がどのタイミングで何を表すか確認する(階数？方向？)
		imageAlt: "駅の階段の写真。手すりをさわってみよう。",
	},
	{
		id: "train-door",
		scene: "電車のドア",
		narration: "電車が来た。ドアのあたりを見てみよう。",
		hasBraille: true,
		category: "刻印・立体",
		// TODO: ドアのどこに何が書いてあるか確認する
		imageAlt: "電車のドアの写真。",
	},
	{
		id: "platform-door",
		scene: "ホームドア",
		narration: "最近は、ホームドアにも点字があるらしいよ。",
		hasBraille: true,
		category: "刻印・立体",
		// TODO: ホームドアの点字の内容を確認する
		imageAlt: "駅のホームドアの写真。",
	},
	{
		id: "atm",
		scene: "コンビニのATM",
		narration: "コンビニに寄って、ATMを使うよ。",
		hasBraille: true,
		category: "公共サービス",
		// TODO: ATMのどのボタンにどんな点字があるか確認する
		imageAlt: "コンビニのATMの写真。ボタンのあたりをよく見てみよう。",
	},
	{
		id: "elevator",
		scene: "エレベーター",
		narration: "オフィスに着いた。エレベーターで上がるよ。",
		hasBraille: true,
		category: "刻印・立体",
		brailleText: "⠉⠋",
		meaning: "「うえ」。上の階へ行くボタンの左に、こう書いてあることが多いよ。",
		trivia:
			"JIS T0921という規格で、エレベーターの呼びボタンの左に「ウエ」「シタ」を点字で示すことになっているんだ(ボタンの形が三角や半円で方向がわかる場合は無いこともあるよ)。かご内のボタンが縦に並んでいるときは、ボタンの左に階数の点字が付くよ。",
		imageAlt: "エレベーターの呼びボタンの写真。ボタンの左側をさわってみよう。",
	},
	{
		id: "desk",
		scene: "自分の席",
		narration: "自分の席にすわると、机の上にある機械が目に入るよ。",
		hasBraille: true,
		category: "デジタル",
		meaning: "画面の文字を、指で触って読める機械だよ。",
		trivia:
			"点字ディスプレイという装置だよ。パソコンの画面の内容を、その場で点字にかえて表示してくれるんだ。表示される内容はどんどん変わるから、「この点字が正解」という決まった答えは無いんだ。",
		imageAlt: "デスクの上に置かれた、細長い機械の写真。",
	},
];
