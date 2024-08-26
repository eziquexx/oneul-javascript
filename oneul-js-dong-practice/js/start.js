// start btn
const $startBtn = document.getElementById("startBtn");
const titleGroup = document.querySelector(".titleGroup");
const context = null;

$startBtn.addEventListener("click", function() {
  titleGroup.style.display = "none";
  // 게임 실행
  startGame();
});

function startGame() {
  myDog = new component(80, 80, "../img/dogRight.png", 100, 400, "image");
  
}
function component(width, height, src, x, y, type) {
  this.type = type;
  if (type === "image") {
    this.image = new Image();
    this.image.src = src;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
}

// move dog
const Dog = {
  x: 100,
  y: 400,
  dowW: 80,
  dogH: 80,
  moveSpace: 20,
  dogImg: '../img/dogRight.png',
  draw: function() {
    this.src = this.dogImg;
    this.context.drawImage(dogImg, this.x, this.y, this.dogW, this.dogH);
  }
}


// canvas 설정
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
