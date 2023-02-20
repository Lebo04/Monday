const {createPool} = require('mysql');
require('dotenv').config();

var con = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    database: process.env.dbName,
    multipleStatements: true,
});

module.exports = con;