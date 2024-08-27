// start btn
const $startBtn = document.getElementById("startBtn");
const titleGroup = document.querySelector(".titleGroup");

let canvas = null;
let context = null;
var canvasW = 0, canvasH = 0; 

let Dog = {
  x: 0,
  y: 0,
  dogW: 80,
  dogH: 80,
  moveSpace: 20,
  dogImageSrc: './img/dogRight.png',

  draw: function() {
    let dog = new Image();
    dog.src = this.dogImageSrc;
    dog.onload = function() {
      context.clearRect(0, 0, canvasW, canvasH); // 이전 프레임을 지운다
      context.drawImage(dog, Dog.x, Dog.y, Dog.dogW, Dog.dogH);
    };
  }
}

window.onload = function(){
  canvas = document.getElementById("mycanvas");
  context = canvas.getContext("2d");
  canvasW = canvas.width;
  canvasH = canvas.height;
  $startBtn.addEventListener("click", function() {
    titleGroup.style.display = "none";
    // 게임 실행
    startGame();
  });
  
};


function startGame() {
 Dog.draw();
};








