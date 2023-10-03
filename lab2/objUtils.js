/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let solvePuzzles = (puzzles, pieces) => {
  if (!puzzles || !pieces || puzzles.length === 0)
    throw "two inputs are necessary";
  if (!Array.isArray(puzzles)) throw "puzzles must be an array";
  if (
    puzzles.some(
      (eachObj) =>
        typeof eachObj !== "object" ||
        Array.isArray(eachObj) ||
        Object.keys(eachObj).length === 0
    )
  )
    throw "each item in 'puzzles' must be an object with at least one key/value pair.";

  if (typeof pieces !== "object" || Array.isArray(pieces))
    throw "pieces must be of type object.";

  const keysInPieces = Object.keys(pieces);
  const keysAllowed = ["a", "b", "c", "d", "e"];
  if (keysInPieces.length < 1)
    throw "at least one key/value pair should exist in each object in 'pieces'.";

  if (keysInPieces.some((key) => !keysAllowed.includes(key)))
    throw "all keys in pieces must be a - e";
  for (const puzzle of puzzles) {
    for (const key in puzzle) {
      if (!keysAllowed.includes(key)) throw "all keys in puzzles must be a - e";
    }
    //     const keysAvailable = new Set(keysInPieces.concat(Object.keys(puzzle)));
    const keysAvailable = new Set([...keysInPieces, Object.keys(puzzle)]);
    if (keysAvailable.size < keysAllowed.length)
      throw "the key combinations from the provided inputs cannot cover 'a' to 'e'.";
  }
  return puzzles.map((puzzle) => ({
    ...pieces,
    ...puzzle,
  }));
};

export let evaluatePokerHand = (hand, communityCards) => {
  if (!hand || !communityCards) throw "two valid inputs are necessary";
  if (!Array.isArray(hand) || !Array.isArray(communityCards))
    throw "the type of both inputs must both be arrays";
  if (hand.length !== 2) throw "the number of cards in hand must be two";
  if (communityCards.length < 3 || communityCards > 5)
    throw "the number of communityCards must be in the range from 3 to 5";

  const suitRank = ["clubs", "diamonds", "hearts", "spades"];
  const valuesRankBA = [
    "A",
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
  ];
  const valuesRankLA = [
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
  const cards = [...hand, ...communityCards];

  const seen = new Set();
  for (const card of cards) {
    const { suit, value } = card;
    if (!suit || !value)
      throw `there is a card that does not have the 'suit' key or 'value' key `;
    if (!suitRank.includes(suit) || !valuesRankBA.includes(value))
      throw "there is a card with an illegal suit or value.";

    const cardStr = JSON.stringify(card);
    if (seen.has(cardStr))
      throw "duplicate card detected. Cheating is not allowed!";

    seen.add(cardStr);
  }
  const cardsLAV = cards.sort(
    (a, b) =>
      suitRank.indexOf(a) - suitRank.indexOf(b) ||
      valuesRankLA.indexOf(a) - valuesRankLA.indexOf(b)
  );
  const cardsBAV = cards.sort(
    (a, b) =>
      suitRank.indexOf(a) - suitRank.indexOf(b) ||
      valuesRankBA.indexOf(a) - valuesRankBA.indexOf(b)
  );
  const cardsVA = cards.sort(
    (a, b) =>
      valuesRankBA.indexOf(a) - valuesRankBA.indexOf(b) ||
      suitRank.indexOf(a) - suitRank.indexOf(b)
  );

  for (let i = 0; i + 4 < cardsBAV.length; i++) {
    const { suit: suitA, value: valueA } = cardsBAV[i];
    const { suit: suitB, value: valueB } = cardsBAV[i + 4];
    if (
      suitA === suitB &&
      valuesRankBA.indexOf(valueA) + 4 === valuesRankBA.indexOf(valueB)
    )
      return "Straight Flush";
  }

  for (let i = 0; i + 4 < cardsLAV.length; i++) {
    const { suit: suitA, value: valueA } = cardsLAV[i];
    const { suit: suitB, value: valueB } = cardsLAV[i + 4];
    if (
      suitA === suitB &&
      valuesRankLA.indexOf(valueA) + 4 === valuesRankLA.indexOf(valueB)
    )
      return "Straight Flush";
  }
  for (let i = 0; i + 2 < cardsVA.length; i++) {
    if (cardsVA[i].value === cardsVA[i + 2].value) return "Three of a Kind";
  }
  for (let i = 0; i + 1 < cardsVA.length; i++) {
    if (cardsVA[i].value === cardsVA[i + 1].value) return "Pair";
  }
  return "High Card";
};


export let combineObjects = (arr) => {
  if (!arr) throw "input is necessary";
  if (!Array.isArray(arr)) throw "the input must be an array";
  if (arr.length < 2) throw "input must have at least two objects";
  for (const eachObj of arr) {
    if (Object.keys(eachObj).length < 1)
      throw "each object in the array must have at least one key/value pair.";
  }
  const keysInCommon = new Set(Object.keys(arr[0]));
  for (let i = 1; i < arr.length; i++) {
    for (const key of keysInCommon) {
      if (!(key in arr[i])) keysInCommon.delete(key);
    }
  }
  const res = {};

  keysInCommon.forEach(
    (keysInCommon) => (res[keysInCommon] = arr.map((obj) => obj[keysInCommon]))
  );
  return res;
};
