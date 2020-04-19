//require('custom-env').env(true);
const dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql');
//mysql.types.setTypeParser(1114, str => str);
const getmysqlPool = mysql.createPool({
     host: '127.0.0.1',
    user: 'root',
    password: 'my_password',
    database : 'users',
    port:3306,
    min: 2,
    max: 5
})
module.exports = getmysqlPool;