const mysql = require('mysql');

const getReports = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'ENTITY_303',
      database: 'sys',
      authSwitchHandler: function ({pluginName, pluginData}, cb) {
        if (pluginName === 'mysql_native_password') {
          const password = 'ENTITY_303';
          const token = mysql.auth.generateToken(password);
          return cb(null, token);
        }
        return cb(new Error('Unsupported auth plugin'));
      }
    });

    connection.connect();

    const selectQuery = `SELECT * FROM students`;

    connection.query(selectQuery, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(results);
        res.send(results);
      }
    });

    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getReports };
