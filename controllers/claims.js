import User from '../models/users';
import ClaimType from '../models/claimtype';

const getUserClaimMeta = (req, res, next) => {
  const { decoded } = req;
  let user = null;
  console.log(decoded.user);
  User.getById(decoded.user, (err, result) => {
    if (err || result.length !== 1) {
      console.log(err)
      console.log('HELLO')
      console.log(result.length)
      res.status(400).send('Bad user token');
      return;
    }
    user = result[0];
    console.log(user)
    ClaimType.getClaimMetaByUserId(user.id, (err, claimMeta) => {
      if (err) {
        res.status(400).send('Could not get user claim meta');
        return;
      }
      const { id, claim_type_id, user_id, created_on, updated_on, name } = claimMeta[0]
      let result = {
        id, claim_type_id, user_id, created_on, updated_on, name, questions: []
      }
      claimMeta.forEach(row => {
        result.questions.push({
          id: row.question_id,
          text: row.text
        })
      })
      res.send(result);
    });
  });
};

export default {
  getUserClaimMeta,
};
