import mysql from 'mysql';

// local mysql db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'system',
  database: 'claim_filing',
});

connection.connect(function(err) {
  if (err) throw err;
});

export default connection;
