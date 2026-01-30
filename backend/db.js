const mysql = requrie('mysql2')
const pool = mysql.createPool({
    host:'mysql',
    user:'root',
    password:'1234',
    database:'test1',
    dateStrings:true,
})

module.exports = pool.promise()