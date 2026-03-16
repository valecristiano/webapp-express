const connection = require("../database/connection");

function index(req, res) {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    res.json(results);
  });
}

function show(req, res) {
  const { id } = req.params;

  const moviesSql = `SELECT * FROM movies WHERE id=?`;

  const reviewSql = `SELECT * FROM reviews WHERE movie_id=?`;

  connection.query(moviesSql, [id], (err, movieResult) => {
    if (err)
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });

    const movie = movieResult[0];

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    connection.query(reviewSql, [id], (err, reviewResult) => {
      if (err)
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });

      movie.reviews = reviewResult;
      res.json({ result: movie });
    });
  });
}

module.exports = { index, show };
