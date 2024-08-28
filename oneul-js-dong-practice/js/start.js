// start btn
const $startBtn = document.getElementById("startBtn");
const titleGroup = document.querySelector(".titleGroup");

// 캔버스 초기화
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 이미지 로드
const dogImage = new Image();
dogImage.src = './img/dogRight2.png';

// Dog객체
const Dog = {
  width: 80,
  height: 80,
  image: dogImage,

  draw: function() {
    // 캔버스의 크기를 기준으로 이미지의 위치 조정
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // 이미지 위치 계산: 하단 중앙
    const x = (canvasWidth - this.width) / 2;
    const y = canvasHeight - this.height - 20;
    
    // 캔버스 초기화 및 이미지 그리기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(this.image, x, y, this.width, this.height);
  }
};

// 게임 시작 버튼 클릭 이벤트
$startBtn.addEventListener("click", function() {
  titleGroup.style.display = "none";
  startGame();
});

// 게임 시작 함수
function startGame() {
  resizeCanvas();
  Dog.draw();
}

// 캔버스 크기 조정 함수
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', function() {
  resizeCanvas();
  if (canvas.width > 0 && canvas.height > 0) {
    Dog.draw();
  }
});

// 이미지 로드 완료 후 캔버스의 초기 크기 조정
dogImage.onload = function() {
  // 캔버스 크기 조정 및 게임 시작
  resizeCanvas();
};