import axios from "axios";

export const getAuthorsData = (() => {
  let authorsData;
  const fetchAuthorsData = async () => {
    if (!authorsData) {
      const oriAuthorsData = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
      );
      authorsData = oriAuthorsData.data;
    }
    return authorsData;
  };
  return fetchAuthorsData;
})();

export const getBooksData = (() => {
  let booksData;
  const fetchBooksData = async () => {
    if (!booksData) {
      const oriBooksData = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
      );
      booksData = oriBooksData.data;
    }
    return booksData;
  };
  return fetchBooksData;
})();

export const checkString = (pram, whatName) => {
  if (!pram) throw `${whatName} must be exist!`;
  if (typeof pram !== "string") throw `the type of ${whatName} must be string!`;
  pram = pram.trim();
  if (pram.length === 0) throw `${whatName} cannot consist of spaces entirely!`;
  return pram;
};

export const checkNumber = (num, whatNum) => {
  if (!num) throw `${whatNum} must be existed`;
  if (typeof num !== "number")
    throw `${whatNum} type must be number and cannot be NaN`;
  if (num < 0) throw `${whatNum} cannot be negative`;
};
