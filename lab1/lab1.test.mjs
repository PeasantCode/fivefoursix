import * as lab1 from "./lab1.mjs";
//questionOne
console.log(lab1.questionOne(["Hello", "good", "weather", "today"]));
console.log(lab1.questionOne(["I", "love", "CS 546.", "Best class ever."]));
console.log(lab1.questionOne(["Ths s nrdbl", "grd"]));
console.log(
  lab1.questionOne(["A", "e", "i", "O", "U", "true", "1", "0", "false"])
);
console.log(
  lab1.questionOne([
    "Aasd",
    "eqwe",
    "iasfas",
    "Oqrsdf",
    "Uadafqw",
    "trueasdz",
    "1qw",
    "0fedfwe",
    "false",
  ])
);

//questionTwo
console.log(
  lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })
);
console.log(
  lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })
);
console.log(
  lab1.questionTwo(
    { 1: true, a: 5, 2: "hi" },
    { 3: true, b: 5, 44: "hi", 4: "bye", 5: 8 }
  )
);
console.log(
  lab1.questionTwo(
    { b: true, a: 8, 3: "hello" },
    { 9: "ok", b: 5, 44: "hi", 4: "bye", 5: 8 }
  )
);
console.log(
  lab1.questionTwo(
    { 1: true, a: 5, 2: "hi" },
    { 3: true, b: 5, 44: "hi", a: "good", 5: "you" }
  )
);


//questionThree
console.log(
  lab1.questionThree([
    [3, 4, 5],
    [3, 3, 4],
    [5, 4, 2],
  ])
);
console.log(
  lab1.questionThree([
    [1, 2, 2],
    [8, 9, 10],
    [4, 4, 2],
  ])
);
console.log(
  lab1.questionThree([
    [5, 5, 5],
    [7, 8, 9],
    [1, 3, 3],
  ])
);
console.log(
  lab1.questionThree([
    [5, 3, 3],
    [2, 2, 2],
    [4, 4, 3],
  ])
);
console.log(
  lab1.questionThree([
    [7, 5, 5],
    [2, 4, 3],
    [8, 5, 6],
    [12, 12, 11],
  ])
);

//questionFour
console.log(lab1.questionFour("patrick,hill,trees,home"));
console.log(lab1.questionFour("asdf,qwer,sjfa,wofjakfjr"));
console.log(lab1.questionFour("jball,bosepg,sqencil,pquare"));
console.log(lab1.questionFour("oseph,bal,uare,ncil"));
console.log(lab1.questionFour("joseph,ball,square,pencil"));
