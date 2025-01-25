const cards = document.querySelector(".cards");
const refresh = document.querySelector(".refresh");
const second = document.querySelector(".time b");

// 計時器
let countdown;

// icon集
const icons = [
  "fa-ghost",
  "fa-flag",
  "fa-meteor",
  "fa-horse",
  "fa-bolt",
  "fa-car",
];

// 將每個圖案複製兩次，組成完整的卡片資料
let cardIcons = [...icons, ...icons];

// 洗牌打亂圖案Array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// 初始化遊戲
const initGame = () => {
  // 清空舊的計時器
  clearInterval(countdown);

  // 清空卡片容易
  cards.innerHTML = "";

  // 打亂card順序
  shuffleArray(icons);

  // 渲染卡片到畫面
  cardIcons.forEach((icon) => {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `
      <div class="view front-view">
        <i class="fa-solid fa-question"></i>
      </div>
      <div class="view back-view">
        <i class="fa-solid ${icon}"></i>
      </div>
    `;
    cards.append(card);

    // 翻牌事件
    card.addEventListener("click", () => handleCardClick(card));
  });

  // 時間限制
  timeLeft = 40;
  second.textContent = timeLeft;

  // 倒計時
  countdown = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      second.textContent = timeLeft;
    } else {
      // 時間到停止遊戲
      //
    }
  }, 1000);
};

// 翻牌相關邏輯變數
let flipedCards = [];
let matchedCards = [];
// 防止連點
let isChecking = false;

// 翻牌機制
const handleCardClick = (card) => {
  // 如果正常檢查匹配or卡片已經翻開，直接返回
  if (isChecking || card.getAttribute("flip") == "true") return;

  // 翻牌 & 存入已翻的牌
  card.classList.add("flip");
  flipedCards.push(card);

  // 檢查翻開的兩張牌是否匹配
  if (flipedCards.length == 2) {
    // 上鎖
    isChecking = true;
    checkMatch();
  }
};

// 檢查匹配
const checkMatch = () => {
  const [card1, card2] = flipedCards;
  const icon1 = card1.querySelector(".back-view i").className;
  const icon2 = card2.querySelector(".back-view i").className;

  if (icon1 == icon2) {
    // 匹配成功
    matchedCards.push(card1, card2);
    // 解鎖
    isChecking = false;
    flipedCards = [];

    // 完成挑戰
    if (matchedCards.length == cardIcons.length) {
      //
    }
  } else {
    // 錯牌結果
    setTimeout(() => {
      card1.classList.add("shake");
      card2.classList.add("shake");
      setTimeout(() => {
        card1.classList.remove("flip", "shake");
        card2.classList.remove("flip", "shake");
        flipedCards = [];
        // 解鎖
        isChecking = false;
      }, 500);
    }, 500);
  }
};

refresh.addEventListener("click", initGame);
