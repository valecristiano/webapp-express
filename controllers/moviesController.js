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

function showLatest(req, res) {
  const sqlLatest = `SELECT 
  movies.id,
  movies.title,
  movies.image,
  movies.abstract,
  movies.director,
  movies.release_year,
  movies.genre
 FROM movies.movies
ORDER BY release_year DESC 
LIMIT 1;`;

  connection.query(sqlLatest, (err, latestResult) => {
    if (err) return errorQuery(err, res);
    console.log(latestResult[0]);

    const latestmovie = latestResult.map((movie) => {
      return { ...movie, image: moviesImageUrl(movie.image) };
    });
    res.json({ result: latestmovie[0] });
  });
}

function show(req, res) {
  const { id } = req.params;

  const moviesSql = `SELECT 
  movies.id,
  movies.title,
  movies.image,
  movies.abstract,
  movies.director,
  movies.release_year,
  movies.genre
  FROM movies WHERE id=?`;

  const reviewSql = `SELECT
   reviews.id,
   reviews.movie_id,
   reviews.name,
   reviews.vote,
   reviews.text
  FROM reviews WHERE movie_id=?`;

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

module.exports = { index, show, showLatest };
