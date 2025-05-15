sounds = {
  click: document.getElementById("click"),
  game_over: document.getElementById("game-over"),
};

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let currentTime = 10;
let hitPosition;
let timerId = null;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomPosition = squares[Math.floor(Math.random() * 9)];
  randomPosition.classList.add("mole");

  hitPosition = randomPosition.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      sounds.click.play();
      result++;
      score.textContent = result;
      console.log(result);
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 800);
}

randomSquare();
moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime == 0) {
    clearInterval(countDownTimer);
    clearInterval(timerId);

    sounds.game_over.play();
    showAlert();
    
    document.querySelectorAll(".mole").forEach((mole) => {
      mole.classList.add("game-over");

    });
  }
}
let countDownTimer = setInterval(countDown, 1000);

function showAlert() {
  let alert = document.getElementById("alert-box");
  alert.innerHTML = `GOOD JOB!👏<br><p>Score : ${result}</p>`
  alert.classList.add("show");

  setTimeout(() => {
    alert.classList.remove("show");
  }, 2000);
}
