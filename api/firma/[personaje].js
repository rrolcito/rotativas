const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { personaje } = req.query;

  const carpeta = path.join(process.cwd(), "public", personaje, "firma");

  res.status(200).json({
    personaje,
    cwd: process.cwd(),
    carpeta,
    existe: fs.existsSync(carpeta),
    query: req.query
  });
};
