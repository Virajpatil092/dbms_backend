const mysql = require('mysql');

const addStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, age, gender, DOB, department } = req.body;
    const student = {
      id, name, age, gender, DOB, department
    }

    console.log(student);
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

    const insertQuery = `INSERT INTO students (id, name, age, gender, dob, department) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(insertQuery, [
      student.id,
      student.name,
      student.age,
      student.gender,
      student.DOB,
      student.department
    ], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(results);
        res.send(student);
      }
    });

    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { addStudent };
