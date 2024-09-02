// DOM 요소와 캔버스 초기화
const startBtn = document.getElementById("startBtn");
const titleGroup = document.querySelector(".titleGroup");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const leftDogImg = './img/dogLeft.png';
const rightDogImg = './img/dogRight.png';

// Poo 클래스 정의
class Poo {
  constructor(src) {
    this.width = 50;
    this.height = 50;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = 0; // 시작 y 위치를 화면 위쪽으로 설정
    this.speed = 1;
    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => this.draw();
  }

  draw() {
    if (!this.image.complete) return;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed; // y축으로 이동
    if (this.y > canvas.height) {
      const index = Game.poos.indexOf(this);
      if (index > -1) {
        Game.poos.splice(index, 1);
      }
    }
    this.draw();
  }

  checkCollision(dog) {
    const distX = Math.abs(dog.x - this.x - this.width / 2);
    const distY = Math.abs(dog.y - this.y - this.height / 2);

    if (distX > (this.width / 2 + dog.width / 2)) return false;
    if (distY > (this.height / 2 + dog.height / 2)) return false;

    if (distX <= (this.width / 2)) return true;
    if (distY <= (this.height / 2)) return true;

    const dx = distX - this.width / 2;
    const dy = distY - this.height / 2;
    return (dx * dx + dy * dy <= (dog.width / 2 * dog.width / 2));
  }
}

// Dog 객체
const Dog = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  image: new Image(),
  step: 20,

  init: function(src) {
    this.image.src = src;
    this.image.onload = () => {
      resizeCanvas();
      this.x = (canvas.width - this.width) / 2;
      this.y = canvas.height - this.height - 20;
      this.draw();
    }
  },

  draw: function() {
    if (!this.image.complete) return;
    if (!Game.started) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },

  move: function(e) {
    if (!e) return;

    const arrowL = "ArrowLeft";
    const arrowR = "ArrowRight";
    if (arrowL === e.key) {
      this.x = Math.max(this.x - this.step, 0);
      this.image.src = leftDogImg;
      this.image.onload = () => this.draw();
    }
    if (arrowR === e.key) {
      this.x = Math.min(this.x + this.step, canvas.width - this.width);
      this.image.src = rightDogImg;
      this.image.onload = () => this.draw();
    }

    this.draw();
  }
};

// 게임 상태 관리 객체
const Game = {
  started: false,
  poos: [],
  pooImageSrc: './img/poo.png',
  intervalId: null,

  start: function() {
    this.started = true;
    titleGroup.style.display = "none";
    resizeCanvas();
    Dog.draw();
    this.generatePoos();
    this.intervalId = setInterval(() => this.generatePoos(), 2000); // 2초마다 Poo 5개 생성
    this.animate(); // 애니메이션 루프 시작
  },

  resize: function() {
    resizeCanvas();
    if (this.started) {
      Dog.draw();
      this.redrawPoos();
    }
  },

  generatePoos: function() {
    for (let i = 0; i < 5; i++) {
      const poo = new Poo(this.pooImageSrc);
      this.poos.push(poo);
    }
  },

  redrawPoos: function() {
    this.poos.forEach(poo => poo.draw());
  },

  checkCollisions: function() {
    this.poos.forEach(poo => {
      if (poo.checkCollision(Dog)) {
        this.gameOver();
      }
    });
  },

  animate: function() {
    if (!this.started) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Dog.draw();
    this.poos.forEach(poo => poo.update());
    this.checkCollisions();
    requestAnimationFrame(() => this.animate());
  },

  gameOver: function() {
    this.started = false;
    clearInterval(this.intervalId);
    alert('Game Over!');
    titleGroup.style.display = "block";
    this.poos = [];
  }
};

// 캔버스 크기 조정 함수
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

// 게임 시작 버튼 누르면 Game객체의 start 메서드 호출
startBtn.addEventListener("click", () => Game.start());

// 윈도우 리사이즈 이벤트 처리
window.addEventListener("resize", () => Game.resize());

// 이미지 초기화
Dog.init(rightDogImg);

// 키보드 이벤트 리스너
window.addEventListener("keydown", (event) => {
  Dog.move(event);
});
