//Here you will import route files and export them as used in previous labs
import router from "./characters.js";


const constructorMethod = (app) => {
  app.use("/", router);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Route Not Found" });
  });
};
export default constructorMethod;