"use strict";

var oracledb = require('oracledb');

var getReports = function getReports(req, res) {
  var connection, query, result;
  return regeneratorRuntime.async(function getReports$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection({
            user: 'sysdba',
            password: 'password',
            connectString: 'localhost:1521/orcl'
          }));

        case 3:
          connection = _context.sent;
          query = "SELECT * FROM students";
          _context.next = 7;
          return regeneratorRuntime.awrap(connection.execute(query));

        case 7:
          result = _context.sent;
          console.log(result);
          res.json(result.rows);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).send('Internal Server Error');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = {
  getReports: getReports
};