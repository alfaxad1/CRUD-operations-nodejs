const authorize = (permissions) => {
  return (req, res, next) => {
    const role = req.body.role;
    if (permissions.includes(role)) {
      next();
    } else {
      return res.status(401).send("You dont have permission");
    }
  };
};

module.exports = { authorize };
