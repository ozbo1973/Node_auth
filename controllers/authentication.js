const Users = require("../models/users");
const jwt = require("jwt-simple");
const config = require("../config");

function userToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secretKey);
}

exports.signin = (req, res, next) => {
  res.send({ token: userToken(req.user) });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "User exists" });
    }

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "Must have an email and password." });
    }

    const user = new Users({
      email,
      password
    });

    try {
      user.save().then(newUser => res.json({ token: userToken(user) }));
    } catch (err) {
      next(err);
    }
  });
};
