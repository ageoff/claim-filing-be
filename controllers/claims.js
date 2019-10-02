import User from '../models/users';
import ClaimType from '../models/claimtype';

const getUserClaimMeta = (req, res, next) => {
  const { decoded } = req;
  let user = null;
  User.getById(decoded.user, (err, result) => {
    if (err || result.length !== 1) {
      res.status(400).send('Bad user token');
      return;
    }
    user = result[0];
    ClaimType.getClaimMetaByUserId(user.id, (err, claimMeta) => {
      if (err) {
        res.status(400).send('Could not get user claim meta');
        return;
      }
      res.send(claimMeta);
    });
  });
};

export default {
  getUserClaimMeta,
};
