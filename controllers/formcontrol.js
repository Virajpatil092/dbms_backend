const oracledb = require('oracledb')

const addStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, age, gender, DOB, department } = req.body;
    const student = {
      id, name, age, gender, DOB, department
    }

    console.log(student);
    const connection = await oracledb.getConnection({
      user: 'sysdba',
      password: 'password',
      connectString: 'localhost:1521/orcl'
    });

    const insertQuery = `INSERT INTO students (id, name, age, gender, dob, department) VALUES (:id, :name, :age, :gender, :dob, :department)`;

    const result = await connection.execute(insertQuery, {
      id: student.id,
      name: student.name,
      age: student.age,
      gender: student.gender,
      dob: student.DOB,
      department: student.department
    });

    console.log(result);
    res.send(student);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { addStudent };
