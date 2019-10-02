import sql from './db.js';

var ClaimType = (claimtype) => {
  this.id = claimtype.id;
  this.name = claimtype.name;
  this.questions = claimtype.questions;
};

ClaimType.getClaimMetaByUserId = (userid, result) => {
  sql.query(`
		SELECT * FROM user_claim_types uct
		INNER JOIN claim_types ct ON uct.claim_type_id = ct.id
		WHERE uct.user_id = ?
	`,
  userid,
  (err, res) => {
    if (err) {
      result(err, null);
    } else {
      let callback = (err, final) => result(err, final);
      let fin = [];
      for (let i = 0; i < res.length; i++) {
        let claim = res[i];
        ClaimType.getQuestions(userid, (err, questions) => {
          if (err) {
            callback(err, null);
          } else {
            ClaimType.getWeeks(userid, (err, weeks) => {
              if (err) {
                callback(err, null);
              } else {
                fin.push({...claim, questions, weeks});
                // Callback when done only
                if (i === (res.length - 1)) callback(null, fin);
              }
            });
          }
        });
      }
    }
  });
};

ClaimType.getQuestions = (id, result) => {
  sql.query(`
		SELECT q.* FROM questions q
		INNER JOIN claim_type_questions ctq
			ON q.id = ctq.question_id
		WHERE claim_type_id = ?
	`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

ClaimType.getWeeks = (id, result) => {
  sql.query(`
		SELECT aw.* FROM available_weeks aw
		INNER JOIN claim_type_available_weeks ctaw
			ON aw.id = ctaw.week_id
		WHERE claim_type_id = ?
	`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

export default ClaimType;
