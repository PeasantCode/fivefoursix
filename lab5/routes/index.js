//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js
import authorsRouter from "./authors.js";
import booksRouter from "./books.js";

const constructorMethod = (app) => {
  app.use("/books", booksRouter);
  app.use("/authors", authorsRouter);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
