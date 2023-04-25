"use strict";

var mysql = require('mysql');

var getReports = function getReports(req, res) {
  var connection, selectQuery;
  return regeneratorRuntime.async(function getReports$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
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
            selectQuery = "SELECT * FROM students";
            connection.query(selectQuery, function (error, results, fields) {
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

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getReports: getReports
};