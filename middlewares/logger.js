function logger(req, res, next) {
  if (process.env.APP_MODE == "dev") {
    const now = new Date();
    console.log(`${req.method} - URL: ${req.url} - StatusCode: ${res.statusCode} - Date: ${now}`);
    next();
  }
}

module.exports = logger;
