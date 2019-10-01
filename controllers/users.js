import User from '../models/users';
const getAll = (req, res, next) => {
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
    res.send(user[0]);
  });
};

export default {
  getAll,
  login,
};
