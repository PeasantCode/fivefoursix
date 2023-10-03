import {
  mergeCommonElements,
  findTriangles,
  stringMetrics,
} from "./arrayUtils.js";
import { emojiCounter, mashUp, sortStockPrices } from "./stringUtils.js";
import { solvePuzzles, evaluatePokerHand, combineObjects } from "./objUtils.js";

//mergeCommonElements
try {
  const mergeCommonElementsOne = mergeCommonElements(
    [3, 4, 1, -2, -4],
    [3, 45, 1, 24, -4],
    [112, "-4", 0, 1, 3]
  );
  console.log("mergeCommonElements passed successfully");
} catch (e) {
  console.error("mergeCommonElements failed test case");
}
try {
  const mergeCommonElementsTwo = mergeCommonElements(
    [1, 2, 3],
    "string",
    [4, 5, 6]
  );
  console.error("mergeCommonElements did not error");
} catch (e) {
  console.log("mergeCommonElements failed successfully");
}

//findTriangles
try {
  // Should Pass
  const findTrianglesOne = findTriangles([
    [3, 3, 3],
    [3, 3, 4],
    [5, 4, 2],
  ]);
  console.log("findTriangles passed successfully");
} catch (e) {
  console.error("findTriangles failed test case");
}
try {
  // Should Fail
  const findTrianglesTwo = findTriangles([5, 5, 5]);
  console.error("findTriangles did not error");
} catch (e) {
  console.log("findTriangles failed successfully");
}

//stringMetrics
try {
  // Should Pass
  const stringMetricsOne = stringMetrics([
    "hello",
    "patrick",
    "hill",
    "trees",
    "seventeen",
  ]);
  console.log("stringMetrics passed successfully");
} catch (e) {
  console.error("stringMetrics failed test case");
}

try {
  // Should Fail
  const stringMetricsTwo = stringMetrics(["apple"]);
  console.error("stringMetrics did not error");
} catch (e) {
  console.log("stringMetrics failed successfully");
}

//
try {
  // Should Pass
  const emojiCounterOne = emojiCounter(":fire::fire:");
  console.log("emojiCounter passed successfully");
} catch (e) {
  console.error("emojiCounter failed test case");
}
try {
  // Should Fail
  const emojiCounterTwo = emojiCounter("             ");
  console.error("emojiCounter did not error");
} catch (e) {
  console.log("emojiCounter failed successfully");
}

//sortStockPrices

try {
  // Should Pass
  let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
  let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
  const sortStockPricesOne = sortStockPrices(lastStocks, currStocks);
  console.log("sortStockPrices passed successfully");
} catch (e) {
  console.error("sortStockPrices failed test case");
}
try {
  // Should Fail
  let lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
  let currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
  const sortStockPricesTwo = sortStockPrices(lastStocks, currStocks);
  console.error("sortStockPrices did not error");
} catch (e) {
  console.log("sortStockPrices failed successfully");
}

//mashUp
try {
  // Should Pass
  const mashUpOne = mashUp("Patrick", "Hill");
  console.log("mashUp passed successfully");
} catch (e) {
  console.error("mashUp failed test case");
}
try {
  // Should Fail
  const mergeCommonElementsTwo = mashUp("Patrick", "");
  console.error("mashUp did not error");
} catch (e) {
  console.log("mashUp failed successfully");
}

//solvePuzzles
try {
  // Should Pass
  const solvePuzzlesOne = solvePuzzles(
    [
      { a: 23, b: 17, d: 2 },
      { b: 17, d: 3, e: "hello" },
    ],
    { a: 45, b: 60, c: -3, d: 88, e: 12 }
  );
  console.log("solvePuzzles passed successfully");
} catch (e) {
  console.error("solvePuzzles failed test case");
}
try {
  // Should Fail
  const solvePuzzlesTwo = solvePuzzles([{ b: "tree", d: "patrick" }], {
    a: "house",
    b: "apple",
    c: 50,
    d: 100,
    f: 200,
  });
  console.error("solvePuzzles did not error");
} catch (e) {
  console.log("solvePuzzles failed successfully");
}

//evaluatePokerHand
try {
  // Should Pass
  let hand = [
    { suit: "hearts", value: "2" },
    { suit: "hearts", value: "3" },
  ];
  let communityCards = [
    { suit: "hearts", value: "4" },
    { suit: "hearts", value: "5" },
    { suit: "hearts", value: "6" },
  ];
  const evaluatePokerHandOne = evaluatePokerHand(hand, communityCards);
  console.log("evaluatePokerHand passed successfully");
} catch (e) {
  console.error("evaluatePokerHand failed test case");
}
try {
  // Should Fail
  let hand = [
    { suit: "hearts", value: "" },
    { suit: "clubs", value: "9" },
  ];
  let communityCards = [
    { suit: "diamonds", value: "2" },
    { suit: "spades", value: "5" },
    { suit: "hearts", value: "6" },
    { suit: "clubs", value: "7" },
    { suit: "diamonds", value: "8" },
  ];
  const evaluatePokerHandTwo = evaluatePokerHand(hand, communityCards);
  console.error("evaluatePokerHand did not error");
} catch (e) {
  console.log("evaluatePokerHand failed successfully");
}

//combineObjects
try {
  // Should Pass
  const combineObjectsOne = combineObjects([
    { a: 3, b: 7, c: 5, d: 7 },
    { d: 4, e: 9, a: "apple" },
    { a: 8, d: 2 },
  ]);

  console.log("combineObjects passed successfully");
} catch (e) {
  console.error("combineObjects failed test case");
}
try {
  // Should Fail
  const mergeCommonElementsTwo = combineObjects([
    { k: true, ba: 7, c: 5, d: 7 },
  ]);
  console.error("combineObjects did not error");
} catch (e) {
  console.log("combineObjects failed successfully");
}
