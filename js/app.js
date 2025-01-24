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
  timeLeft = 30;
  second.textContent = timeLeft;

  // 倒計時
  countdown = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      second.textContent = timeLeft;
    } else {
      //
    }
  }, 1000);
};

const handleCardClick = (card) => {
  card.classList.add("flip");
};

refresh.addEventListener("click", initGame);
