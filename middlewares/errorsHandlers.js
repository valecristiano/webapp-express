function error500(err, req, res, next) {
  res.status(500).json({
    message: "Internal server error",
    success: false,
  });
  console.log("[ERROR]: " + err.message);
}

function error404(req, res, next) {
  res.status(404).json({
    message: "File not found",
    success: false,
  });
}

module.exports = { error500, error404 };
