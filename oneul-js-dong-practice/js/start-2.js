// DOM 요소와 캔버스 초기화
const startBtn = document.getElementById("startBtn");
const titleGroup = document.querySelector(".titleGroup");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const leftDogImg = './img/dogLeft.png';
const rightDogImg = './img/dogRight.png';


// Poo 객체
const Poo = {
  
}


// Dog 객체
const Dog = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  image: new Image(),
  step: 20,

  // 이미지 로드와 그리기 함수
  init: function(src) {
    this.image.src = src;
    this.image.onload = () => {
      // 이미지 로드 후 캔버스 초기화
      resizeCanvas();
      this.x = (canvas.width - this.width) / 2; // 가운데 오게
      this.y = canvas.height - this.height - 20; // 아래 기준 20
      this.draw();
    }
  },

  // dog 이미지를 canvas에 그리기
  draw: function() {
    // 이미지가 로드되지 않았으면 그리지 않기.
    if (!this.image.complete) return;
    if (!Game.started) return; // 게임 시작 않았으면 이동x

    // clearRect로 캔버스 초기화시키기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },

  // dog 이미지 좌,우 방향키에 맞추어 움직이기
  move: function(e) {
    if (!e) return; // 이벤트가 없을 경우 처리

    const arrowL = "ArrowLeft";
    const arrowR = "ArrowRight";
    if (arrowL === e.key) {
      this.x = Math.max(this.x - this.step, 0);
      this.image.src = leftDogImg;
      this.image.onload = () =>  this.draw();
    }
    if (arrowR === e.key) {
      this.x = Math.min(this.x + this.step, canvas.width - this.width);
      this.image.src = rightDogImg;
      this.image.onload = () =>  this.draw();
    }

    this.draw(); // 이동 후 다시 그리기
  }

};


// 게임 상태 관리
const Game = {
  started: false,

  start: function() {
    this.started = true;
    titleGroup.style.display = "none";
    resizeCanvas();
    Dog.draw(); // Dog 객체 그리기
  },

  resize: function() {
    resizeCanvas();
    if (this.started) {
      Dog.draw(); // 게임이 시작된 상태에서만 Dog 객체 다시 그리기
    }
  },

};


// 캔버스 크기 조정 함수
// clientWidth, clientHeight 메서드 사용
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

// 게임 시작 버튼 누르면 Game객체의 start 메서드 호출
startBtn.addEventListener("click", () => Game.start() );

// 윈도우 리사이즈 이벤트 처리. Game객체의 resize 메서드 호출
window.addEventListener("resize", () => Game.resize() );

// 이미지 초기화
Dog.init(rightDogImg);

// key값 받아서 Dog.move로 전달
window.addEventListener("keydown", (event) => Dog.move(event) );