import sql from './db.js';
import async from 'async';

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
      let fin = [];
      // For each result go get questions and the weeks
      async.eachOf(res, (claim, key, callback) => {
        // Call async for questions and weeks
        async.parallel(
          [
            (handler) => ClaimType.getQuestions(userid, handler),
            (handler) => ClaimType.getWeeks(userid, handler),
          ],
          (err, result) => {
            if (err) callback(err, null);
            else fin.push({...claim, questions: result[0], weeks: result[1]});
            // Call we are done getting weeks and questions
            callback();
          }
        );
      }, err => {
        // Done with everything. Send back result or error.
        if (err) result(err, null);
        else result(null, fin);
      });
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
