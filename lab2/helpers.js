export const round = (num, decimals) => {
  if (isNaN(num) || isNaN(decimals) || decimals < 0 || decimals % 1 !== 0)
    return num;
  num = +num;
  return +(Math.round(num + "e" + decimals) + "e-" + decimals);
};

export const checkStock = (stocks, whatStocks) => {
  if (typeof stocks !== "string")
    throw ` the type of ${whatStocks} must be string`;
  stocks = stocks
    .trim()
    .split("|")
    .map((stock) => stock.split(","));
  if (stocks.some((stock) => stock.length !== 2))
    throw `the the price of ${whatStocks} must exist in pairs`;
  if (stocks.some(([ticker, price]) => !/^[a-z]{1,5}$/gi.test(ticker)))
    throw `the name of ${whatStocks} must be composed of a - z and be at least one character and at most five characters long`;
  stocks = stocks
    .map(([ticker, price]) => [ticker, +price])
    .sort((a, b) => {
      const [tickerA] = a,
        [tickerB] = b;
      return tickerA.toLowerCase().localeCompare(tickerB.toLowerCase());
    });
  if (stocks.some(([ticker, price]) => isNaN(price)))
    throw `the price of ${whatStocks} cannot be NaN`;
  return stocks;
};
