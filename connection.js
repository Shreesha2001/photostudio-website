var mysql = require("mysql");

var con=mysql.createConnection({
    host:"localhost",
    user:"shreesha",
    password:"1234",
    database:"photography"
});

module.exports = con;
