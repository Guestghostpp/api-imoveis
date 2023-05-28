const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ message: "Não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "is8jd3j3ejnfunoir3r9j34n");
    const { id } = data;
    req.userId = id;

    return next();
  } catch {
    return res.json({ message: "Não autorizado" }, 401);
  }
};
