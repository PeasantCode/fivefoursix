const a =() => {
  b()
}
const b =() => {
  console.log("b");
}

console.log(a());