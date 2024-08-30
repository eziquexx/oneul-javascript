// DOM 요소와 캔버스 초기화
const startBtn = document.getElementById("startBtn");
const titleGroup = document.querySelector(".titleGroup");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


// Dog 객체
const Dog = {
  width: 100,
  height: 100,
  image: new Image(),

  // 이미지 로드와 그리기 함수
  init: function(src) {
    this.image.src = src;
    this.image.onload = () => {
      // 이미지 로드 후 캔버스 초기화
      resizeCanvas();
    }
  },

  // dog 이미지를 canvas에 그리기
  draw: function() {
    // 이미지가 로드되지 않았으면 그리지 않기.
    if (!this.image.complete) return;

    const { width: canvasWidth, height: canvasHeight } = canvas;
    const x = (canvasWidth - this.width) / 2; // 가운데 오게
    const y = canvasHeight - this.height - 20; // 아래 기준 20
    
    // clearRect로 캔버스 초기화시키기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(this.image, x, y, this.width, this.height);
  },

  // dog 이미지 좌,우 방향키에 맞추어 움직이기
  move: function(event) {
    const arrowL = "ArrowLeft";
    const arrowR = "ArrowRight";
    if(event === arrowL) {}
    if(event === arrowR) {}
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

  arrowKey: function(event) {
    const arrowL = "ArrowLeft";
    const arrowR = "ArrowRight";
    if (arrowL === event.key) {
      console.log("왼쪽");
    }
    if (arrowR === event.key) {
      console.log("오른쪽");
    }
  }
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
Dog.init('./img/dogRight2.png');


window.addEventListener("keydown", () => Game.arrowKey(event) );