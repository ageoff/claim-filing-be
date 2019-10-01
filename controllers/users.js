import User from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config';

const getAll = (req, res, next) => {
  console.log(req.decoded)
  User.getAll((err, user) => {
    console.log('controller');
    if (err) {
      res.send(err);
    }
    console.log('res', user);
    res.send(user);
  });
};

const login = (req, res, next) => {
  console.log(req);
  const { email, password } = req.body;
  User.get(email, password, (err, user) => {
    console.log('controller');
    if (err) {
      res.status(401).send(err);
      return;
    } else if (user.length !== 1) {
      res.status(400).send('Invalid username/password');
    }
    // Create a token
    let result = user[0];
    const payload = { user: result.id };
    const options = { expiresIn: '2d', issuer: 'http://claimfiler.com' };
    const secret = config.JWT_TOKEN_SECRET;
    const token = jwt.sign(payload, secret, options);
    result.token = token;
    res.send(result);
  });
};

export default {
  getAll,
  login,
};
