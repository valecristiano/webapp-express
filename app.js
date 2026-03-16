const express = require("express");
const app = express();

//Middlewares
app.use(express.static("public"));
app.use(express.json());

//Router
const moviesRouter = require("./routers/movies");
app.use("/movies", moviesRouter);

app.listen(3000, () => {
  console.log("Server linstening!");
});
