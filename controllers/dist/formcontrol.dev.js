"use strict";

var oracledb = require('oracledb');

var addStudent = function addStudent(req, res) {
  var _req$body, id, name, age, gender, DOB, department, student, connection, insertQuery, result;

  return regeneratorRuntime.async(function addStudent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body);
          _req$body = req.body, id = _req$body.id, name = _req$body.name, age = _req$body.age, gender = _req$body.gender, DOB = _req$body.DOB, department = _req$body.department;
          student = {
            id: id,
            name: name,
            age: age,
            gender: gender,
            DOB: DOB,
            department: department
          };
          console.log(student);
          _context.next = 7;
          return regeneratorRuntime.awrap(oracledb.getConnection({
            user: 'sysdba',
            password: 'password',
            connectString: 'localhost:1521/orcl'
          }));

        case 7:
          connection = _context.sent;
          insertQuery = "INSERT INTO students (id, name, age, gender, dob, department) VALUES (:id, :name, :age, :gender, :dob, :department)";
          _context.next = 11;
          return regeneratorRuntime.awrap(connection.execute(insertQuery, {
            id: student.id,
            name: student.name,
            age: student.age,
            gender: student.gender,
            dob: student.DOB,
            department: student.department
          }));

        case 11:
          result = _context.sent;
          console.log(result);
          res.send(student);
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).send('Internal Server Error');

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  addStudent: addStudent
};