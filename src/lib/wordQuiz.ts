import { attachBrailleInput } from "./brailleInput";
import { withBase } from "./url";

interface QuizWord {
  braille: string;
}

// 正解数がこの倍数に達するたび、モモさんの応援バナーを出す
const MILESTONE_INTERVAL = 10;

/**
 * 「単語をあててみよう」系ページ(numbers/wakachigaki/what-can-be-written/sentences/yoon/
 * gojuon-practice)に共通の、出題→点字入力→答え合わせ→スコア表示の一式。
 * ページ側は #braille-input, #word-prompt, #check-button, #next-button, #feedback, #score
 * のマークアップを用意し、単語リストと出題テキストの取り出し方だけを渡す。
 * 正解するまで#next-buttonは押せず、節目の応援バナーは#scoreの直後にJSで挿入する。
 * スコアは単語数ベースで数える(#check-button連打で水増しされないよう、1問につき
 * 最初の答え合わせだけを「ぜんぶ」に、それが一発正解だった場合だけ「せいかい」に数える)。
 */
export function setupWordQuiz<T extends QuizWord>(words: T[], promptText: (word: T) => string) {
  const input = document.getElementById("braille-input") as HTMLTextAreaElement;
  const wordPrompt = document.getElementById("word-prompt") as HTMLElement;
  const checkButton = document.getElementById("check-button") as HTMLButtonElement;
  const nextButton = document.getElementById("next-button") as HTMLButtonElement;
  const feedback = document.getElementById("feedback") as HTMLElement;
  const score = document.getElementById("score") as HTMLElement;
  const milestone = createMilestoneBanner();
  score.after(milestone);

  attachBrailleInput({ textarea: input });

  let currentWord: T = words[0];
  let correctCount = 0;
  let wordCount = 0;
  let missedThisWord = false;

  function pickWord(exclude?: T): T {
    const candidates = words.length > 1 ? words.filter((w) => w !== exclude) : words;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function showWord(word: T) {
    currentWord = word;
    wordCount++;
    missedThisWord = false;
    wordPrompt.textContent = promptText(word);
    feedback.textContent = "";
    feedback.className = "";
    input.value = "";
    input.focus();
    checkButton.disabled = false;
    nextButton.disabled = true;
    milestone.hidden = true;
    updateScore();
  }

  function updateScore() {
    score.textContent = `せいかい: ${correctCount} / ぜんぶ: ${wordCount}もん`;
  }

  checkButton.addEventListener("click", () => {
    if (input.value.trim() === currentWord.braille) {
      feedback.textContent = "せいかい！";
      feedback.className = "correct";
      checkButton.disabled = true;
      nextButton.disabled = false;
      if (!missedThisWord) {
        correctCount++;
        updateScore();
        if (correctCount % MILESTONE_INTERVAL === 0) {
          showMilestone(milestone, correctCount);
        }
      }
    } else {
      missedThisWord = true;
      feedback.textContent = `ざんねん。せいかいは「${currentWord.braille}」だったよ`;
      feedback.className = "incorrect";
    }
  });

  nextButton.addEventListener("click", () => {
    showWord(pickWord(currentWord));
  });

  showWord(pickWord());
}

function createMilestoneBanner(): HTMLElement {
  const el = document.createElement("aside");
  el.className = "quiz-milestone";
  el.hidden = true;
  el.setAttribute("aria-live", "polite");
  el.innerHTML = `
    <img src="${withBase("images/momo-guide.jpg")}" alt="" class="quiz-milestone-avatar" width="56" height="56" />
    <p class="quiz-milestone-text"></p>
  `;
  return el;
}

function showMilestone(el: HTMLElement, correctCount: number) {
  const text = el.querySelector(".quiz-milestone-text") as HTMLElement;
  text.textContent = `${correctCount}問正解、やったね！モモさんも大よろこびだよ！`;
  el.hidden = false;
}
