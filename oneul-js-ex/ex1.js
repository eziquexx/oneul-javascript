function digitalTV(company, size, channel) {
  this.company = company;
  this.size = size;
  this.channel = channel;
  this.showDigitalTV = function() {
    console.log(this.company + "의 제품이고, 크기는 " + this.size + "입니다.");
  };

  this.upChannel = function() {
    this.channel++;
    console.log("현재 채널은 " + this.channel + "입니다.");
  };

  this.downChannel = function() {
    this.channel--;
    console.log("현재 채널은 " + this.channel + "입니다.");
  }
}

let aTV = new digitalTV("A회사", "60", 7);
let bTV = new digitalTV("B회사", "45", 7);

aTV.showDigitalTV();
aTV.upChannel();

bTV.showDigitalTV();
bTV.downChannel();