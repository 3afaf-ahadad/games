const sounds = {
  click: document.getElementById("click-sound"),
  win: document.getElementById("win-sound"),
  try: document.getElementById("try-again"),
  same: document.getElementById("same-sound"),
  celebrating: document.getElementById("celebration"),
};

function preLoad() {
  Object.values(sounds).forEach((s) => {
    s.volume = 0.5;
    s.load();
  });
}
preLoad();

const cardArray = [
  {
    name: "ice cream",
    img: "images/ice-cream.png",
  },
  {
    name: "cherry",
    img: "images/cherry.png",
  },
  {
    name: "watermelon",
    img: "images/watermelon.png",
  },
  {
    name: "cookie",
    img: "images/cookie.png",
  },
  {
    name: "strawberry",
    img: "images/strawberry.png",
  },
  {
    name: "fast-food",
    img: "images/fast-food.png",
  },
  {
    name: "ice cream",
    img: "images/ice-cream.png",
  },
  {
    name: "cherry",
    img: "images/cherry.png",
  },
  {
    name: "watermelon",
    img: "images/watermelon.png",
  },
  {
    name: "cookie",
    img: "images/cookie.png",
  },
  {
    name: "strawberry",
    img: "images/strawberry.png",
  },
  {
    name: "fast-food",
    img: "images/fast-food.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
resultDisplay.textContent = 0;
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");

    card.setAttribute("data-id", i);

    card.addEventListener("click", flipCard);

    gridDisplay.appendChild(card);
  }
}

createBoard();
console.log(cardArray);

const alertPopup = document.getElementById("alert");
let alertContent = document.getElementById("alert-content");
function PopUp() {
  alertPopup.style.display = "flex";

  setTimeout(() => {
    alertPopup.style.display = "none";
  }, 1000);
}

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];
  const optionOne = cardsChosen[0];
  const optionTwo = cardsChosen[1];

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");

    sounds.same.play();

    alertContent.textContent = "Same Image!🤨";
    alertPopup.style.display = "flex";

    setTimeout(() => {
      alertPopup.style.display = "none";
    }, 700);

    PopUp();
  } else if (optionOne == optionTwo) {
    sounds.win.play();
    alertContent.textContent = "You found a match!😃";
    PopUp();

    cards[optionOneId].setAttribute("src", "images/smile.png");
    cards[optionTwoId].setAttribute("src", "images/smile.png");

    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);

    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");

    sounds.try.play();
    alertContent.textContent = "Try again!🙎🏽‍♀️";
    PopUp();
  }
  resultDisplay.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.innerHTML = "🎉💃🏽You Found All The Matches!!🥳";

    setTimeout(() => {
      sounds.celebrating.play();
    }, 1500);

  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");

  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);

  console.log(cardsChosen);
  console.log(cardsChosenIds);

  sounds.click.play();
  this.setAttribute("src", cardArray[cardId].img);

  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
