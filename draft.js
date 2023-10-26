// const timeToMinutes = (time) => {
//   const part = time.split(":");
//   const mins = +time.split(":")[1].split(" ")[0];
//   let hours = +part[0];
//   if (time.includes("PM") && hours !== 12) hours += 12;
//   if (time.includes("AM") && hours === 12) hours = 0;
//   return hours * 60 + mins;
// };
// console.log(timeToMinutes("12:00 AM"));
const a = { b: [1, 2, 3, 4], c: 15 };
const {b,c} = a;
console.log(b);
console.log(c);