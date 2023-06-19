import jwt from "jsonwebtoken";

export const recover = (req, res, next) => {
  if (!req.params.token) return res.send({status: 400, error: "No auth token"});
  const token = req.params.token;
  const result = jwt.verify(
    token,
    "coderSecret",
    {maxAge: 1000 * 60 * 60},
    function (err, decoded) {
      if (err) return null;
      return decoded;
    }
  );
  if (result === null) return res.redirect("/recover");
  req.token = result;
  next();
};
