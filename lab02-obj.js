const solvePuzzles = (puzzles, pieces) => {
  if (!Array.isArray(puzzles)) throw ``;
  if (puzzles.length === 0) throw ``;
  if (
    puzzles.some(
      (puzzle) =>
        typeof puzzle !== "object" ||
        Array.isArray(puzzle) ||
        Object.keys(puzzle).length === 0
    )
  )
    throw ``;

  if (typeof pieces !== "object" || Array.isArray(pieces)) throw ``;
  const keysInPieces = Object.keys(pieces);
  const keysAllowed = ["a", "b", "c", "d", "e"];
  if (keysInPieces.some((key) => !keysAllowed.includes(key))) throw ``;
  for (const puzzle of puzzles) {
    for (const key in puzzle) {
      if (!keysAllowed.includes(key)) throw ``;
    }
    const keysAvailable = new Set(keysInPieces.concat(Object.keys(puzzle)));
    if (keysAvailable.size < keysAllowed.length) throw ``;
  }

  return puzzles.map((puzzle) => ({ ...pieces, ...puzzle }));
};
// console.log(
//   solvePuzzles(
//     [
//       { a: 23, b: 17, d: 2 },
//       { b: 17, d: 3, e: "hello" },
//     ],
//     { a: 45, b: 60, c: -3, d: 88, e: 12 }
//   )
// );
// console.log(solvePuzzles([{b: 'tree', d: 'patrick'}], {a: 'house', b: 'apple', c: 50, d: 100, e:200}));
// console.log(solvePuzzles([{b: 'tree', d: 'patrick'}], {a: 'house', b: 'apple', c: 50, d: 100, f:200}));

const evaluatePokerHand = (hand, communityCards) => {
  if (!Array.isArray(hand)) throw ``;
  if (hand.length !== 2) throw ``;
  if (!Array.isArray(communityCards)) throw ``;
  if (communityCards.length < 3 || communityCards.length > 5) throw ``;

  const suitAllowed = ["clubs", "diamonds", "hearts", "spades"];
  const valuesAllowed = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const cardsAvailable = [...hand, ...communityCards];

  const seen = new Set();
  for (const card of cardsAvailable) {
    const { suit, value } = card;
    if (!suit || !value) throw ``;
    if (!suitAllowed.includes(suit) || !valuesAllowed.includes(value)) throw ``;

    const cardStr = JSON.stringify(card);
    if (seen.has(cardStr)) throw `cheating`;
    seen.add(cardStr);
  }

  const cardsAvailableSorted = cardsAvailable.sort(
    (a, b) =>
      valuesAllowed.indexOf(a) - valuesAllowed.indexOf(b) ||
      suitAllowed.indexOf(a) - suitAllowed.indexOf(b)
  );
  for (let i = 0; i + 4 < cardsAvailableSorted.length; i++) {
    const { suit: suitA, value: valueA } = cardsAvailable[i];
    const { suit: suitB, value: valueB } = cardsAvailable[i + 4];
    if (
      suitA === suitB &&
      valuesAllowed.indexOf(valueA) + 4 === valuesAllowed.indexOf(valueB)
    )
      return "Straight Flush";
  }
  for (let i = 0; i + 2 < cardsAvailableSorted.length; i++) {
    if (cardsAvailableSorted[i].value === cardsAvailableSorted[i + 2].value)
      return "Three of a Kind";
  }
  for (let i = 0; i + 1 < cardsAvailableSorted.length; i++) {
    if (cardsAvailableSorted[i].value === cardsAvailableSorted[i + 1].value)
      return "Pair";
  }

  return "High Card";
};
// let hand = [
//   { suit: "hearts", value: "5" },
//   { suit: "clubs", value: "5" },
// ];
// let communityCards = [
//   { suit: "diamonds", value: "4" },
//   { suit: "spades", value: "5" },
//   { suit: "hearts", value: "2" },
//   { suit: "clubs", value: "J" },
//   { suit: "diamonds", value: "Q" },
// ];
let hand = [
  { suit: "hearts", value: "A" },
  { suit: "hearts", value: "2" },
];
let communityCards = [
  { suit: "hearts", value: "3" },
  { suit: "hearts", value: "5" },
  { suit: "hearts", value: "4" },
];

// let hand = [
//   { suit: "hearts", value: "4" },
//   { suit: "clubs", value: "9" },
// ];
// let communityCards = [
//   { suit: "diamonds", value: "2" },
//   { suit: "spades", value: "5" },
//   { suit: "hearts", value: "6" },
//   { suit: "clubs", value: "7" },
//   { suit: "diamonds", value: "8" },
// ];
// console.log(evaluatePokerHand(hand, communityCards));


const combineObjects = (array) => {
  if (!Array.isArray(array)) throw ``;
  if (array.length < 2) throw ``;
  if (array.some((e) => typeof e !== "object" || Array.isArray(e))) throw ``;
  if (array.some((e) => Object.keys(e).length === 0)) throw ``;

  const keysInCommon = new Set(Object.keys(array[0]));
  for (let i = 1; i < array.length; i++) {
    for (const key in array[i]) {
      if (!keysInCommon.has(key)) keysInCommon.delete(key);
    }
  }

  const res = {};
  for (const keyInCommon of keysInCommon) {
    res[keyInCommon] = [];
    for (const obj of array) {
      res[keyInCommon].push(obj[keyInCommon]);
    }
  }

  return res;
};
console.log(
  combineObjects([
    { a: 3, b: 7, c: 5, d: 7 },
    { d: 4, e: 9, a: "apple" },
    { a: 8, d: 2 },
  ])
);
console.log(
  combineObjects([
    { j: true, ba: 7, c: 5, d: 7 },
    { j: 90, e: 9, a: "apple" },
    { j: 15, dd: 2 },
  ])
);
console.log(
  combineObjects([
    { k: true, ba: 7, c: 5, d: 7 },
    { j: 90, e: 9, a: "apple" },
    { j: 15, dd: 2 },
  ])
);
