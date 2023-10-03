// const arr = [["bar", 0, 8, 1, [[[5, 'fizz', "foo"]]]], [7, 'foo', "buzz", ["fizz", 8]]];

// console.log(arr.length);

// const a = [[20,10,"aaa"],[5,10,"bbb"]]
// const d = { 10: "e", 20: 50 };
// d[10] = 5;
// console.log(d[10]);
// console.log(Object.entries(a));
// console.log(Object.fromEntries(Object.entries(a)));

// console.log(Object.entries(b));
// console.log(Object.fromEntries(Object.entries(b)));

// const c = [5, 5, 5];
// for (const a of c) {
//   console.log(!a.length);
// }

// const b = ["hello", "patrick", "hill", "trees", "seventeen"];
// console.log(b.join("").match(/[a||e||i||o||u]/gi).length);

// const aaaa = {};

// const n = ["hello", "patrick", "hill", "trees", "seventeen"]
// console.log(n.sort((a,b) => {
//   return a.length - b.length;

// }));

// const res = {
//   vowels: 0,
//   consonants: 0,
//   longest: "",
//   shortest: "",
//   mean: 0,
//   median: 0,
//   mode: 0,
// };
// res["longest"] = "large";
// res["longest"] = ["large", "short"];
// console.log(Array.isArray(res["longest"]));

// const l =
//   "Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!";
// const l2 = ":fire::fire:";
// const l3 = ":::fire:fire:";
// const l4 = ":fire::pregnant_man::fire:";
// const l5 =
//   "I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row.";
// const l6 = "      ";
// const len = l.match(/:(\w+):/gi);

// console.log(len.length);
// console.log(l2.match(/:(\w+):/gi).length);
// console.log(l3.match(/:(\w+):/gi).length);
// console.log(l4.match(/:(\w+):/gi).length);
// console.log(l5.match(/:(\w+):/gi).length);
// console.log(l6.match(/:(\w+):/gi));

// const a = 'AAPL,175.25|GOOG,135.40|AMZN,140.00'
// console.log(a.toLowerCase());
// const a = {a: 23, b: 17, d: 2,n:9}
// const keys = Object.keys(a);
// for(const a of keys){
//   console.log(a);
//   if(!a.match(/[a-e]/)){
//     console.log('aaa');
//   }
// }

// const a = { an: 0 };
// console.log(Object.keys(a));

// const combineCards = (hand, communityCards) => {
//   const combine = [];
//   const n = communityCards.length;
//   for (let i = 0; i < n - 2; i++) {
//     for (let j = i + 1; j < n - 1; j++) {
//       for (let k = j + 1; k < n; k++) {
//         combine.push([communityCards[i], communityCards[j], communityCards[k]]);
//       }
//     }
//   }
//   return combine;
// };

// let hand = [
//   { suit: "hearts", value: "2" },
//   { suit: "hearts", value: "3" },
// ];
// let communityCards = [
//   { suit: "hearts", value: "4" },
//   { suit: "hearts", value: "5" },
//   { suit: "hearts", value: "6" },
// ];
// console.log(combineCards(hand, communityCards));

// const a = [
//   [
//     { suit: "hearts", value: "4" },
//     { suit: "hearts", value: "5" },
//     { suit: "hearts", value: "6" },
//     { suit: "hearts", value: "2" },
//     { suit: "hearts", value: "3" },
//   ],
//   [
//     { suit: "clubs", value: "12" },
//     { suit: "hearts", value: "1" },
//     { suit: "hearts", value: "6" },
//     { suit: "hearts", value: "2" },
//     { suit: "hearts", value: "3" },
//   ],
// ];
// const suits = [];
// let values = [];
// for (const eachCom of a) {
//   console.log(eachCom);
//   for (const eachObj of eachCom) {
//     console.log(eachObj);
//     suits.push(eachObj.suit);
//     values.push(eachObj.value);
//   }
// }
// console.log(suits);
// console.log(values);

// const params = ["1", "2", "3"]
// let [d, e, c] = params;
// [d,e,c] = [+d,+e,+c];
// console.log(d);
// console.log(e);
// const a = []
// console.log(a.length);
