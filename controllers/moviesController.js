const connection = require("../database/connection");
const { errorQuery, resultNotfound } = require("../utils/dbFunctions");

function index(req, res) {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, MoviesResults) => {
    if (err) return errorQuery(err, res);

    const movies = MoviesResults.map((movie) => {
      return { ...movie, image: moviesImageUrl(movie.image) };
    });
    res.json({ result: movies });
  });
}

function show(req, res) {
  const { id } = req.params;

  const moviesSql = `SELECT * FROM movies WHERE id=?`;

  const reviewSql = `SELECT * FROM reviews WHERE movie_id=?`;

  connection.query(moviesSql, [id], (err, movieResult) => {
    if (err) return errorQuery(err, res);

    const movie = movieResult[0];

    if (!movie) return resultNotfound(res);

    connection.query(reviewSql, [id], (err, reviewResult) => {
      if (err)
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });

      movie.reviews = reviewResult;
      movie.image = moviesImageUrl(movie.image);

      res.json({ result: movie });
    });
  });
}

function moviesImageUrl(image) {
  return `${process.env.APP_URL}:${process.env.APP_PORT}/${image}`;
}

module.exports = { index, show };
