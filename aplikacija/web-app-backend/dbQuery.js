const db = require('./db')

module.exports = class dbq {
    
    static async getAll() {
        return await db.query('SELECT * FROM automobili JOIN motori ON (automobili.id_automobila = motori.id_auta)')
    }
}