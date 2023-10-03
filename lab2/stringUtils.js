/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { checkStock } from "./helpers.js";
export let emojiCounter = (message) => {
  if (!message) throw "input is necessary";
  if (typeof message !== "string") throw "the type of the input must be string";
  message = message.trim();
  if (message.length === 0) throw "input cannot consist of empty space";
  const arr = message.match(/:(\w+):/gi) ?? [];
  return arr.length;
};


export let sortStockPrices = (lastStocks, currStocks) => {
  if (!lastStocks || !currStocks) throw "two inputs are necessary";
  if (typeof lastStocks !== "string" || typeof currStocks !== "string")
    throw "the type of both inputs must be a string!";

  lastStocks = checkStock(lastStocks, "lastStocks");
  currStocks = checkStock(currStocks, "currStocks");
  if (lastStocks.length !== currStocks.length)
    throw "The content in lastStocks differs from that in currStocks.";

  if (
    lastStocks.some(
      ([ticker], idx) =>
        ticker.toLowerCase() !== currStocks[idx][0].toLowerCase()
    )
  )
    throw `the stock names in lastStocks are different from the stock names in currStocks`;

  return currStocks
    .map(([ticker, currPrice], idx) => {
      const lastPrice = lastStocks[idx][1];
      const growthRate = currPrice / lastPrice;
      const change = +(100 * (growthRate - 1)).toFixed(1);
      return {
        symbol: lastStocks[idx][0],
        price: currPrice,
        change,
      };
    })
    .sort((a, b) => b.change - a.change);
};



export let mashUp = (string1, string2) => {
  if (!string1 || !string2) throw "both inputs are necessary";

  if (typeof string1 !== "string" || typeof string2 !== "string")
    throw "the type of both inputs must be a string";

  string1 = string1.trim();
  string2 = string2.trim();
  if (string1.length < 4 || string2.length < 4)
    throw "the length of both string1 and string2 must be at least 4 characters.";

  const first4String2 = string2.slice(0, 4),
    first4String1 = string1.slice(0, 4);
  const string1Rest = string1.slice(4),
    string2Rest = string2.slice(4);
  const res = `${first4String2}${string1Rest} ${first4String1}${string2Rest}`;
  return res;
};


