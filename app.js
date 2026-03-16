const express = require("express");
const app = express();

//Middlewares
app.use(express.static("public"));
app.use(express.json());

//Logger
const logger = require("./middlewares/logger");
app.use(logger);

//Router
const moviesRouter = require("./routers/movies");
app.use("/movies", moviesRouter);

//Error
const errorsHandlers = require("./middlewares/errorsHandlers");
app.use(errorsHandlers.error500);
app.use(errorsHandlers.error404);

app.listen(process.env.APP_PORT, () => {
  console.log("Server linstening!");
});
