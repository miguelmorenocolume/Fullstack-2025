function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min ) + min);
}
console.log(getRandom(50, 500));