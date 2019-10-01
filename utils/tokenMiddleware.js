import jwt from 'jsonwebtoken';
import config from '../config';

const checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Token is not valid');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send('Auth token is not supplied');
  }
};

export default checkToken;
