import { attachBrailleInput } from "./brailleInput";

interface QuizWord {
  braille: string;
}

/**
 * 「単語をあててみよう」系ページ(numbers/wakachigaki/what-can-be-written/sentences/yoon/
 * gojuon-practice)に共通の、出題→点字入力→答え合わせ→スコア表示の一式。
 * ページ側は #braille-input, #word-prompt, #check-button, #next-button, #feedback, #score
 * のマークアップを用意し、単語リストと出題テキストの取り出し方だけを渡す。
 */
export function setupWordQuiz<T extends QuizWord>(words: T[], promptText: (word: T) => string) {
  const input = document.getElementById("braille-input") as HTMLTextAreaElement;
  const wordPrompt = document.getElementById("word-prompt") as HTMLElement;
  const checkButton = document.getElementById("check-button") as HTMLButtonElement;
  const nextButton = document.getElementById("next-button") as HTMLButtonElement;
  const feedback = document.getElementById("feedback") as HTMLElement;
  const score = document.getElementById("score") as HTMLElement;

  attachBrailleInput({ textarea: input });

  let currentWord: T = words[0];
  let correctCount = 0;
  let totalCount = 0;

  function pickWord(exclude?: T): T {
    const candidates = words.length > 1 ? words.filter((w) => w !== exclude) : words;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function showWord(word: T) {
    currentWord = word;
    wordPrompt.textContent = promptText(word);
    feedback.textContent = "";
    feedback.className = "";
    input.value = "";
    input.focus();
  }

  function updateScore() {
    score.textContent = `せいかい: ${correctCount} / ぜんぶ: ${totalCount}もん`;
  }

  checkButton.addEventListener("click", () => {
    totalCount++;
    if (input.value.trim() === currentWord.braille) {
      correctCount++;
      feedback.textContent = "せいかい！";
      feedback.className = "correct";
    } else {
      feedback.textContent = `ざんねん。せいかいは「${currentWord.braille}」だったよ`;
      feedback.className = "incorrect";
    }
    updateScore();
  });

  nextButton.addEventListener("click", () => {
    showWord(pickWord(currentWord));
  });

  showWord(pickWord());
  updateScore();
}
