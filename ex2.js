let cars = ["소형차", "중형차", "대형차"];

cars.unshift("스포츠카");
console.log(cars);

cars.push("버스");
console.log(cars);

cars.splice(2,1);
console.log(cars);

cars.sort();
console.log(cars);