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
      let callback = (err, final) => result(err, final);
      let fin = [];
      // For each result go get questions and the weeks
      async.eachOf(res, (claim, key, innerBack) => {
        console.log(claim);
        // Call async for questions and weeks
        async.parallel(
          [
            (call) => ClaimType.getQuestions(userid, (err, qs) => {
              if (err) call(err);
              else call(null, qs);
            }),
            (call) => ClaimType.getWeeks(userid, (err, ws) => {
              if (err) call(err);
              else call(null, ws);
            }),
          ],
          (err, here) => {
            if (err) innerBack(err, null);
            else fin.push({...claim, questions: here[0], weeks: here[1]});
            // Call we are done getting weeks and questions
            innerBack();
          }
        );
      }, err => {
        // Done with everything. Send back result or error.
        if (err) callback(err, null);
        else callback(null, fin);
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
