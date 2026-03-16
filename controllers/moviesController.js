const connection = require("../database/connection");

function index(req, res) {
  //prova errore 500:
  // console.log(a.b);

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

// function show(req, res) {
//   console.log(res);
// }

module.exports = { index };
