const updateUserMiddleware = (req, res, next) => {
  const userIdRoute = +req.params.id;
  if (req.user.is_admin || userIdRoute === +req.user.id) {
    next();
    return;
  }

  res.status(403).send("forbidden");
};

module.exports = updateUserMiddleware;