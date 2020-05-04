const incrementUserFaceCount = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.json("image not found");
      }
    })
    .catch((err) => res.status(400).json("error image not found"));
};

module.exports = { incrementUserFaceCount };
