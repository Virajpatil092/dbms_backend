"use strict";

var mysql = require('mysql');

var addStudent = function addStudent(req, res) {
  var _req$body, id, name, age, gender, DOB, department, student, connection, insertQuery;

  return regeneratorRuntime.async(function addStudent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
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
            connection = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: 'ENTITY_303',
              database: 'sys',
              authSwitchHandler: function authSwitchHandler(_ref, cb) {
                var pluginName = _ref.pluginName,
                    pluginData = _ref.pluginData;

                if (pluginName === 'mysql_native_password') {
                  var password = 'ENTITY_303';
                  var token = mysql.auth.generateToken(password);
                  return cb(null, token);
                }

                return cb(new Error('Unsupported auth plugin'));
              }
            });
            connection.connect();
            insertQuery = "INSERT INTO students (id, name, age, gender, dob, department) VALUES (?, ?, ?, ?, ?, ?)";
            connection.query(insertQuery, [student.id, student.name, student.age, student.gender, student.DOB, student.department], function (error, results, fields) {
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

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  addStudent: addStudent
};