//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

import {
  checkNumber,
  checkString,
  getAuthorsData,
  getBooksData,
} from "./helpers.js";

//you must use axios to get the data

export const getAuthorById = async (id) => {
  id = checkString(id, "id");
  const authorsData = await getAuthorsData();
  const author = authorsData.find((element) => element.id === id);
  if (!author) throw "the author not found in the author list!";
  return author;
};
// console.log(await getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"));
// console.log(await getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff'));

export const searchAuthorByName = async (searchTerm) => {
  searchTerm = checkString(searchTerm, "searchTerm");
  const authorsData = await getAuthorsData();
  searchTerm = searchTerm.toLowerCase();
  const res = authorsData.reduce((acc, cur) => {
    const { first_name: firstName, last_name: lastName } = cur;
    if (
      firstName.toLowerCase().includes(searchTerm) ||
      lastName.toLowerCase().includes(searchTerm)
    )
      acc.push(firstName + " " + lastName);
    return acc;
  }, []);

  if (res.length === 0) throw "the author cannot found in the author list";

  return res.sort((a, b) => {
    const lastName1 = a.split(" ").pop();
    const lastName2 = b.split(" ").pop();
    return lastName1.localeCompare(lastName2);
  });
};
// console.log(await searchAuthorByName("Tom"));
// console.log(await searchAuthorByName("foobar"));

export const getBookNames = async (firstName, lastName) => {
  firstName = checkString(firstName, "firstName").toLowerCase();
  lastName = checkString(lastName, "lastName").toLowerCase();
  const authorsData = await getAuthorsData();
  const booksData = await getBooksData();

  const author = authorsData.find(
    (author) =>
      author.first_name.toLowerCase() === firstName &&
      author.last_name.toLowerCase() === lastName
  );
  if (!author) throw "the author is not found in author list";
  const authorId = author.id;
  const books = booksData.reduce((acc, cur) => {
    if (cur.authorId === authorId) acc.push(cur.title);
    return acc;
  }, []);
  if (books.length === 0)
    throw "while the author can be found, they have written no books";

  return books.sort((a, b) => {
    const [firstCharA, firstCharB] = [
      a.charAt(0).toLowerCase(),
      b.charAt(0).toLowerCase(),
    ];
    return firstCharA.localeCompare(firstCharB);
  });
};
// console.log(await getBookNames("Prisca", "Vakhonin"));

export const youngestOldest = async () => {
  const authorsData = await getAuthorsData();
  const allDates = authorsData
    .map(({ first_name, last_name, date_of_birth }) => ({
      first_name,
      last_name,
      date_of_birth,
    }))
    .sort((a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth));

  const youngest = allDates
    .reduce((acc, cur, idx, dates) => {
      if (cur === dates[0]) acc.push(cur);
      return acc;
    }, [])
    .map(({ first_name, last_name }) => `${first_name} ${last_name}`);

  const oldest = allDates
    .reduce((acc, cur, idx, dates) => {
      if (cur === dates[dates.length - 1]) acc.push(cur);
      return acc;
    }, [])
    .map(({ first_name, last_name }) => `${first_name} ${last_name}`);
  return {
    youngest: youngest.length === 1 ? youngest[0] : youngest,
    oldest: oldest.length === 1 ? oldest[0] : oldest,
  };
};

// console.log(await youngestOldest());

export const sameBirthday = async (month, day) => {
  checkNumber(month, "month");
  checkNumber(day, "day");
  if (month < 0 || month > 12) throw "month is invalid";
  if (day < 0) throw "day is invalid";
  const days31 = [1, 3, 5, 7, 8, 10, 12];
  if (days31.includes(month)) {
    if (day > 31) throw "day is invalid";
  } else if (month === 2) {
    if (day > 28) throw "day is invalid";
  }
  if (day > 30) throw "day is invalid";
  const date = month + "/" + day;

  const authorsData = await getAuthorsData();
  const res = authorsData.reduce((acc, cur) => {
    if (cur.date_of_birth.includes(date))
      acc.push(cur.first_name + " " + cur.last_name);
    return acc;
  }, []);
  return res.sort((a, b) => {
    const lastName1 = a.split(" ").pop();
    const lastName2 = b.split(" ").pop();
    return lastName1.localeCompare(lastName2);
  });
};
// console.log(await sameBirthday(10, 12));
// console.log(await sameBirthday(13,25));
