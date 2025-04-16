const sounds = {
  click: document.getElementById("click-sound"),
  draw: document.getElementById("draw-sound"),
  win: document.getElementById("win-sound"),
  lose: document.getElementById("lose-sound"),
};

const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("alert-result");
const possibleChoices = document.querySelectorAll("button");

let userChoice, computerChoice, result;

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", async (e) => {
    sounds.click.currentTime = 0;
    sounds.click.play();

    possibleChoices.forEach((btn) => (btn.disabled = true));
    userChoice = e.target.id;
    const userImg = possibleChoice.dataset.img;

    userChoiceDisplay.classList.add("choice-animation");

    computerChoiceDisplay.innerHTML =
      '<div class = "choice-animation">🤔</div>';

    await new Promise((resolve) => setTimeout(resolve, 1000));

    renderChoice(userChoiceDisplay, userChoice, `images/${userImg}`);

    await ComputerChoiceGenerator();

    GetResult();

    possibleChoices.forEach((btn) => (btn.disabled = false));
  })
);

async function ComputerChoiceGenerator() {
  computerChoiceDisplay.innerHTML = '<div class = "spin">🌌</div>';

  await new Promise((resolve) => setTimeout(resolve, 800));

  const options = [
    { name: "Rock", img: "coal-100.png" },
    { name: "Paper", img: "paper-100.png" },
    { name: "Scissors", img: "scissors-100.png" },
  ];

  const randomChoice = options[Math.floor(Math.random() * options.length)];
  computerChoice = randomChoice.name;
  computerChoiceDisplay.classList.add("fade-in");
  renderChoice(
    computerChoiceDisplay,
    computerChoice,
    `images/${randomChoice.img}`
  );

  setTimeout(() => {
    computerChoiceDisplay.classList.remove("fade-in");
  }, 500);

  setTimeout(() => {
    userChoiceDisplay.classList.remove("choice-animation");
  }, 500);
}

function renderChoice(container, label, imgPath) {
  container.innerHTML = `
        <div style = "display: flex; flex-direction: column; align-items: center;">
            <img src = "${imgPath}" alt = "${label}"/>
            <span>${label}</span>
        </div>
        `;
}

const alertResult = document.getElementById("alert-result");
const gameAlert = document.getElementById("gameAlert");

function GetResult() {
  if (computerChoice === userChoice) {
    result = "😮It's a draw, replay!!!";
  }
  if (computerChoice === "Rock" && userChoice === "Paper") {
    result = "🏆You Win!!!";
  }
  if (computerChoice === "Rock" && userChoice === "Scissors") {
    result = "🤷🏽‍♀️You Lose!!!";
  }
  if (computerChoice === "Paper" && userChoice === "Rock") {
    result = "🤷🏽‍♀️You Lose!!!";
  }
  if (computerChoice === "Paper" && userChoice === "Scissors") {
    result = "🏆You Win!!!";
  }
  if (computerChoice === "Scissors" && userChoice === "Rock") {
    result = "🏆You Win!!!";
  }
  if (computerChoice === "Scissors" && userChoice === "Paper") {
    result = "🤷🏽‍♀️You Lose!!!";
  }

  resultDisplay.innerHTML = result;
  alertResult.innerHTML = result;
  gameAlert.style.display = "flex";

  setTimeout(() => {
    gameAlert.style.display = "none";
  }, 1000);

  if (result === "🏆You Win!!!") {
    sounds.win.currentTime = 0;
    sounds.win.play();
  } else if (result === "🤷🏽‍♀️You Lose!!!") {
    sounds.lose.currentTime = 0;
    sounds.lose.play();
  } else {
    sounds.draw.currentTime = 0;
    sounds.draw.play();
  }

  setTimeout(() => {
    resultDisplay.classList.remove("celebrate", "shake-hard");
  }, 1000);
}
