/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/
import * as authors from "./authors.js";
import * as books from "./books.js";

//getAuthorById
try {
  const authorData = await authors.getAuthorById(
    "1871e6d7-551f-41cb-9a07-08240b86c95c"
  );
  console.log(authorData);
} catch (e) {
  console.log(e);
}
try {
  const authorData = await authors.getAuthorById(-1);
  console.log(authorData);
} catch (e) {
  console.log(e);
}
try {
  const authorData = await authors.getAuthorById(1001);
  console.log(authorData);
} catch (e) {
  console.log(e);
}
try {
  const authorData = await authors.getAuthorById();
  console.log(authorData);
} catch (e) {
  console.log(e);
}
try {
  const authorData = await authors.getAuthorById(
    "7989fa5e-5617-43f7-a931-46036f9dbcff"
  );
  console.log(authorData);
} catch (e) {
  console.log(e);
}

// //getBookNames
// try {
//   const searchAuthorByNameInfo = await authors.searchAuthorByName("Tom");
//   console.log(searchAuthorByNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const searchAuthorByNameInfo = await authors.searchAuthorByName("foobar");
//   console.log(searchAuthorByNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const searchAuthorByNameInfo = await authors.searchAuthorByName(" ");
//   console.log(searchAuthorByNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const searchAuthorByNameInfo = await authors.searchAuthorByName(123);
//   console.log(searchAuthorByNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const searchAuthorByNameInfo = await authors.searchAuthorByName();
//   console.log(searchAuthorByNameInfo);
// } catch (e) {
//   console.log(e);
// }

// //getBookNames
// try {
//   const getBookNamesInfo = await authors.getBookNames("Prisca", "Vakhonin");
//   console.log(getBookNamesInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookNamesInfo = await authors.getBookNames(123, 123);
//   console.log(getBookNamesInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookNamesInfo = await authors.getBookNames(" ", " ");
//   console.log(getBookNamesInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookNamesInfo = await authors.getBookNames("Patrick", "Hill");
//   console.log(getBookNamesInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookNamesInfo = await authors.getBookNames("Perrine", "Greenough");
//   console.log(getBookNamesInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookNamesInfo = await authors.getBookNames();
//   console.log(getBookNamesInfo);
// } catch (e) {
//   console.log(e);
// }

// //youngestOldest
// try {
//   const youngestOlderInfo = await authors.youngestOldest("Prisca", "Vakhonin");
//   console.log(youngestOlderInfo);
// } catch (e) {
//   console.log(e);
// }

// //sameBirthday
// try {
//   const sameBirthdayInfo = await authors.sameBirthday(10, 12);
//   console.log(sameBirthdayInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameBirthdayInfo = await authors.sameBirthday(9, 31);
//   console.log(sameBirthdayInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameBirthdayInfo = await authors.sameBirthday(13, 25);
//   console.log(sameBirthdayInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameBirthdayInfo = await authors.sameBirthday(2, 30);
//   console.log(sameBirthdayInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameBirthdayInfo = await authors.sameBirthday("09", "31");
//   console.log(sameBirthdayInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameBirthdayInfo = await authors.sameBirthday();
//   console.log(sameBirthdayInfo);
// } catch (e) {
//   console.log(e);
// }

// //books
// //getBookById
// try {
//   const getBookByIdInfo = await books.getBookById(
//     "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
//   );
//   console.log(getBookByIdInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookByIdInfo = await books.getBookById(-1);
//   console.log(getBookByIdInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookByIdInfo = await books.getBookById(1001);
//   console.log(getBookByIdInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookByIdInfo = await books.getBookById();
//   console.log(getBookByIdInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getBookByIdInfo = await books.getBookById(
//     "7989fa5e-5617-43f7-a931-46036f9dbcff"
//   );
//   console.log(getBookByIdInfo);
// } catch (e) {
//   console.log(e);
// }

// //getAuthorName
// try {
//   const getAuthorNameInfo = await books.getAuthorName(
//     "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
//   );
//   console.log(getAuthorNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getAuthorNameInfo = await books.getAuthorName(-1);
//   console.log(getAuthorNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getAuthorNameInfo = await books.getAuthorName();
//   console.log(getAuthorNameInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const getAuthorNameInfo = await books.getAuthorName(
//     "7989fa5e-5617-43f7-a931-46036f9dbcff"
//   );
//   console.log(getAuthorNameInfo);
// } catch (e) {
//   console.log(e);
// }

// //sameGenre
// try {
//   const sameGenreInfo = await books.sameGenre(
//     "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
//   );
//   console.log(sameGenreInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameGenreInfo = await books.sameGenre(-1);
//   console.log(sameGenreInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameGenreInfo = await books.sameGenre(1001);
//   console.log(sameGenreInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameGenreInfo = await books.sameGenre();
//   console.log(sameGenreInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameGenreInfo = await books.sameGenre(false);
//   console.log(sameGenreInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const sameGenreInfo = await books.sameGenre("foo bar");
//   console.log(sameGenreInfo);
// } catch (e) {
//   console.log(e);
// }

// //priceRange

// try {
//   const priceRangeInfo = await books.priceRange(5.99, 30);
//   console.log(priceRangeInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const priceRangeInfo = await books.priceRange("foo", 13);
//   console.log(priceRangeInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const priceRangeInfo = await books.priceRange(5, 3);
//   console.log(priceRangeInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const priceRangeInfo = await books.priceRange(-5, 3);
//   console.log(priceRangeInfo);
// } catch (e) {
//   console.log(e);
// }
// try {
//   const priceRangeInfo = await books.priceRange();
//   console.log(priceRangeInfo);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const getAllBooksWithAuthorNameInfo = await books.getAllBooksWithAuthorName();
//   console.log(getAllBooksWithAuthorNameInfo);
// } catch (e) {
//   console.log(e);
// }
