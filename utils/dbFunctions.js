function errorQuery(err, res) {
  const responseData = {
    message: "Request error",
  };

  if (process.env.APP_MODE === "dev") {
    responseData.error = err.message;
  }

  console.log(err.message);
  return res.status(500).json(responseData);
}

function resultNotfound(res) {
  return res.status(404).json({ message: "Result not found" });
}

module.exports = { errorQuery, resultNotfound };
