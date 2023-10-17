//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file that you used for lab 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById(id) function and call it in the :/id route.
import { getAuthors, getAuthorById } from "../data/data.js";
import { Router } from "express";
const router = Router();

// Implement GET Request Method and send a JSON response See lecture code!
router.route("/").get(async (req, res) => {
  const allAuthors = await getAuthors();
  return res.json(allAuthors);
});
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const author = await getAuthorById(id);
    return res.json(author);
  } catch (e) {
    return res.status(404).json("Author Not Found!");
  }
});
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
