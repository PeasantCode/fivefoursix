/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/
import { getAuthorsData, getBooksData, checkString } from "../helpers.js";

export const getAuthors = async () => {
  const allAuthors = await getAuthorsData();
  return allAuthors;
};

export const getBooks = async () => {
  const allBooks = await getBooksData();
  return allBooks;
};

export const getAuthorById = async (id) => {
  id = checkString(id, "id");
  const authorsData = await getAuthorsData();
  const author = authorsData.find((element) => element.id === id);
  if (!author) throw "the author not found in the author list!";
  return author;
};

export const getBookById = async (id) => {
  id = checkString(id, "id");
  const booksData = await getBooksData();
  const book = booksData.find((ele) => ele.id === id);
  if (!book) throw "book not found";
  return book;
};
