const pg = require('pg')
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'otvoreno',
    password: '12345',
    port: 5432,
})

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
        .then(res => {
            return res
        }).catch(err => {
            console.error(err)
            throw err
        })
    },
    pool: pool
}