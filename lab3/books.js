//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import { getAuthorById } from "./authors.js";
import { checkString, checkNumber, getBooksData } from "./helpers.js";

export const getBookById = async (id) => {
  id = checkString(id, "id");
  const booksData = await getBooksData();
  const book = booksData.find((ele) => (ele.id = id));
  if (!book) throw "book not found";
  return book;
};

// console.log(await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"));

export const getAuthorName = async (bookId) => {
  bookId = checkString(bookId, "bookId");
  const booksData = await getBooksData();
  const book = booksData.find((ele) => ele.id === bookId);
  if (!book) throw "book not found";
  const authorId = book.authorId;
  const authorInfo = await getAuthorById(authorId);
  const { first_name, last_name } = authorInfo;

  return first_name + " " + last_name;
};

// console.log(await getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"));
// console.log(await getAuthorName('7989fa5e-5617-43f7-a931-46036f9dbcff'));

export const sameGenre = async (genre) => {
  genre = checkString(genre, "genre");
  const booksData = await getBooksData();
  const res = booksData.reduce((acc, cur) => {
    if (cur.genres.includes(genre)) acc.push(cur);
    return acc;
  }, []);
  if (res.length === 0) throw "no genre found in book list";
  return res;
};

// console.log(await sameGenre("Memoir"));

export const priceRange = async (min, max) => {
  checkNumber(min, "min");
  checkNumber(max, "max");
  if (min > max) throw "the max must be greater than that min";
  const booksData = await getBooksData();

  const res = booksData.reduce((acc, cur) => {
    const price = cur.price;
    if (price >= min && price <= max) acc.push(cur);
    return acc;
  },[]);

  if (res.length === 0) throw "the book within this price range not found";
  return res;
};

// console.log(await priceRange(5.99,30));
// console.log(await priceRange(1, 2));


export const getAllBooksWithAuthorName = async () => {
  const booksData = await getBooksData();
  for (let i = 0; i < booksData.length; i++) {
    const { authorId } = booksData[i];
    delete booksData[i].authorId;
    const authorInfo = await getAuthorById(authorId);
    const authorName = authorInfo.first_name + " " + authorInfo.last_name;
    booksData[i].author = authorName;
  }
  return booksData;
};


// console.log(await getAllBooksWithAuthorName());
