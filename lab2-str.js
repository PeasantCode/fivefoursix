const emojiCounter = (message) => {
  if (typeof message !== "string") throw ``;

  message = message.trim();
  if (message.length === 0) throw ``;

  const emoji = message.match(/:[a-z0-9]+:/gi) ?? [];

  return emoji.length;
};
// console.log(emojiCounter(":fire::fire:"));
// console.log(emojiCounter(":::fire:fire:"));
// console.log(emojiCounter(":fire::pregnant_man::fire:"));
// console.log(
//   emojiCounter(
//     "I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row."
//   )
// );
// console.log(
//   emojiCounter(
//     "Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!"
//   )
// );
// console.log(emojiCounter("::"));
// console.log(emojiCounter("             "));

const sortStockPrices = (lastStocks, currStocks) => {
  const checkStocks = (stocks, whatStocks) => {
    if (typeof stocks !== "string") throw ``;

    stocks = stocks
      .trim()
      .split("|")
      .map((stock) => stock.split(","));

    if (stocks.some((stock) => stock.length !== 2)) throw ``;
    if (stocks.some(([ticker, price]) => !/^[a-z]{1,5}$/gi.test(ticker)))
      throw ``;

    stocks = stocks
      .map(([ticker, price]) => [ticker, +price])
      .sort((a, b) => {
        const [tickerA] = a,
          [tickerB] = b;
        return tickerA.toLowerCase().localeCompare(tickerB.toLowerCase());
      });

    if (stocks.some(([ticker, price]) => isNaN(price))) throw ``;

    return stocks;
  };

  lastStocks = checkStocks(lastStocks, "lastStocks");
  currStocks = checkStocks(currStocks, "currStocks");

  if (lastStocks.length !== currStocks.length) throw ``;
  if (
    lastStocks.some(
      ([ticker], idx) =>
        ticker.toLowerCase() !== currStocks[idx][0].toLowerCase()
    )
  )
    throw ``;

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

let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
console.log(sortStockPrices(lastStocks, currStocks));

// let lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
// let currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
// console.log(sortStockPrices(lastStocks, currStocks));
// throws an error
const mashUp = (string1, string2) => {
  const checkStr = (str, whatStr) => {
    if (!str) throw ``;
    if (typeof str !== "string") throw ``;

    str = str.trim();

    if (str.length === 0) throw ``;
    if (str.length < 4) throw ``;

    return str;
  };
  string1 = checkStr(string1, "string1");
  string2 = checkStr(string2, "string2");

  const swap1 = string1.slice(0, 4),
    swap2 = string2.slice(0, 4);
  const rest1 = string1.slice(4),
    rest2 = string2.slice(4);

  return `${swap2}${rest1} ${swap1}${rest2}`;
};
console.log(mashUp("Patrick", "Hill"));
console.log(mashUp("helloooo", "world!"));
console.log(mashUp("Patrick", ""));
