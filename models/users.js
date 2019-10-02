import sql from './db.js';

var User = (user) => {
  this.id = user.id;
  this.email = user.email;
  this.name = user.name;
  this.created_on = user.created_on;
  this.updated_on = user.updated_on;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

User.getById = (id, result) => {
  sql.query(`
    SELECT
      id, email, name, created_on, updated_on
    FROM users WHERE id = ?
  `,
  id,
  (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  }
  );
};

User.get = (email, password, result) => {
  sql.query(`
    SELECT
      id, email, name, created_on, updated_on
    FROM users WHERE email = ? AND password = MD5(?)
  `,
  [email, password],
  (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  }
  );
};

User.getAll = (result) => {
  sql.query('Select * FROM users', (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


export default User;
