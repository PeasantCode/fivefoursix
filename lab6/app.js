// This file should set up the express server as shown in the lecture code
import express from "express";
import constructorMethod from "./routes/index.js";

const app = express();

app.use(express.json());
constructorMethod(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// const _closeConnection = await _connection.close();
