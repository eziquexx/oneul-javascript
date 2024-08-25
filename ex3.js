let date = new Date(2021,4,5);
let year = date.getFullYear();

let christmas = new Date(year,11,25);

let diffTime = christmas - date;
let diffDay = diffTime / (1000*60*60*24);

console.log(diffTime);
console.log(Math.ceil(diffDay));
