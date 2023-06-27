const log = require('../log/logging').logger
const path = require('../log/logging').path
const dotenv = require('dotenv')
// connect env file
dotenv.config({path:path.join(__filename,'../../env/.env')})
class ConnectDatabase {
    get #mysql () {
        return require('mysql2')
    }
    get pooling () {
       return  this.#mysql.createPool({
            connectionLimit : 1 ,
            host : process.env.SQL_HOST ,
            user : process.env.SQL_USERNAME ,
            password : process.env.SQL_PASSWORD ,
            database : process.env.SQL_DATABASE ,
            port : process.env.SQL_PORT
        })
    }
}

/*
new ConnectDatabase().pooling.getConnection((err, connection) => {
    if (err) {
        log.debug("connect failed from pooling() function")
        throw err
    }
    else log.info("connected")
})
*/

module.exports = new ConnectDatabase().pooling


