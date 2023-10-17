//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file that you used for lab 3 to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import { Router } from "express";
import { getBooks, getBookById } from "../data/data.js";

const router = Router();

// Implement GET Request Method and send a JSON response  See lecture code!
router.route("/").get(async (req, res) => {
  const allBooks = await getBooks();
  return res.json(allBooks);
});
// Implement GET Request Method and send a JSON response See lecture code!
router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const book = await getBookById(id);
    return res.json(book);
  } catch (e) {
    return res.status(404).json("Book Not Found!");
  }
});
export default router;
