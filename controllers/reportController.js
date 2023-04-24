const oracledb = require('oracledb')

const getReports = async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: 'sysdba',
      password: 'password',
      connectString: 'localhost:1521/orcl'
    });

    const query = `SELECT * FROM students`;

    const result = await connection.execute(query);

    console.log(result);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getReports };
