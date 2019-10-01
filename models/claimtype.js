import sql from './db.js';

var ClaimType = (claimtype) => {
	this.id = claimtype.id;
	this.name = claimtype.name;
	this.questions = claimtype.questions;
}

ClaimType.getClaimMetaByUserId = (userid, result) => {
	console.log(userid)
	sql.query(`
		SELECT * FROM user_claim_types uct
		INNER JOIN claim_types ct ON uct.claim_type_id = ct.id
		INNER JOIN claim_type_questions ctq ON ctq.claim_type_id = ct.id
		INNER JOIN questions q ON q.id = ctq.id
		WHERE uct.user_id = ?
	`,
	userid,
	(err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

export default ClaimType;
