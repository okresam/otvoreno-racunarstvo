const db = require('./db')

module.exports = class dbq {

    static async getAll() {
        return await db.query('SELECT * FROM automobili JOIN motori ON (automobili.id_automobila = motori.id_auta)')
    }

    static async getSearchWildcard(searchTerm) {
        searchTerm = searchTerm.toLowerCase()

        return await db.query(`SELECT * FROM automobili JOIN motori ON (automobili.id_automobila = motori.id_auta) WHERE 
        LOWER(id_automobila::text) LIKE '%${searchTerm}%' OR 
        LOWER(proizvodac) LIKE '%${searchTerm}%' OR 
        LOWER(naziv_modela) LIKE '%${searchTerm}%' OR 
        LOWER(pocetak_proizvodnje::text) LIKE '%${searchTerm}%' OR 
        LOWER(zavrsetak_proizvodnje::text) LIKE '%${searchTerm}%' OR 
        LOWER(broj_sjedala::text) LIKE '%${searchTerm}%' OR 
        LOWER(broj_vrata::text) LIKE '%${searchTerm}%' OR 
        LOWER(min_velicina_prtljaznika::text) LIKE '%${searchTerm}%' OR 
        LOWER(max_velicina_prtljaznika::text) LIKE '%${searchTerm}%' OR 
        LOWER(duljina::text) LIKE '%${searchTerm}%' OR 
        LOWER(sirina::text) LIKE '%${searchTerm}%' OR 
        LOWER(visina::text) LIKE '%${searchTerm}%' OR 
        LOWER(id_motora::text) LIKE '%${searchTerm}%' OR 
        LOWER(gorivo) LIKE '%${searchTerm}%' OR 
        LOWER(broj_cilindri::text) LIKE '%${searchTerm}%' OR 
        LOWER(zapremina::text) LIKE '%${searchTerm}%' OR 
        LOWER(snaga::text) LIKE '%${searchTerm}%' OR 
        LOWER(okretni_moment::text) LIKE '%${searchTerm}%'`)
    }

    static async getSearchAttribute(searchTerm, attribute) {
        searchTerm = searchTerm.toLowerCase()

        return await db.query(`SELECT * FROM automobili JOIN motori ON (automobili.id_automobila = motori.id_auta) WHERE
        LOWER(${attribute}::text) LIKE '%${searchTerm}%'`)
    }

    static async getSearchAttributeJSON(searchTerm, attribute) {
        searchTerm = searchTerm.toLowerCase()

        return await db.query(`SELECT array_to_json(array_agg(row_to_json(entitet)))
        FROM (SELECT automobili.*, array_to_json(array_agg(to_json(motori.*))) as motori
        FROM automobili 
        INNER JOIN motori on automobili.id_automobila = motori.id_auta
        WHERE LOWER(${attribute}::text) LIKE '%${searchTerm}%' 
        GROUP BY automobili.id_automobila) entitet`)
    }

    static async getSearchWildcardJSON(searchTerm) {
        searchTerm = searchTerm.toLowerCase()

        return await db.query(`SELECT array_to_json(array_agg(row_to_json(entitet)))
        FROM (SELECT automobili.*, array_to_json(array_agg(to_json(motori.*))) as motori
        FROM automobili 
        INNER JOIN motori on automobili.id_automobila = motori.id_auta
        WHERE LOWER(id_automobila::text) LIKE '%${searchTerm}%' OR 
        LOWER(proizvodac) LIKE '%${searchTerm}%' OR 
        LOWER(naziv_modela) LIKE '%${searchTerm}%' OR 
        LOWER(pocetak_proizvodnje::text) LIKE '%${searchTerm}%' OR 
        LOWER(zavrsetak_proizvodnje::text) LIKE '%${searchTerm}%' OR 
        LOWER(broj_sjedala::text) LIKE '%${searchTerm}%' OR 
        LOWER(broj_vrata::text) LIKE '%${searchTerm}%' OR 
        LOWER(min_velicina_prtljaznika::text) LIKE '%${searchTerm}%' OR 
        LOWER(max_velicina_prtljaznika::text) LIKE '%${searchTerm}%' OR 
        LOWER(duljina::text) LIKE '%${searchTerm}%' OR 
        LOWER(sirina::text) LIKE '%${searchTerm}%' OR 
        LOWER(visina::text) LIKE '%${searchTerm}%' OR 
        LOWER(id_motora::text) LIKE '%${searchTerm}%' OR 
        LOWER(gorivo) LIKE '%${searchTerm}%' OR 
        LOWER(broj_cilindri::text) LIKE '%${searchTerm}%' OR 
        LOWER(zapremina::text) LIKE '%${searchTerm}%' OR 
        LOWER(snaga::text) LIKE '%${searchTerm}%' OR 
        LOWER(okretni_moment::text) LIKE '%${searchTerm}%' 
        GROUP BY automobili.id_automobila) entitet`)
    }

    static async refreshFiles() {
        await db.query(`COPY (SELECT *  
            FROM automobili 
            INNER JOIN motori on automobili.id_automobila = motori.id_auta)
            TO '/tmp/automobili.csv' DELIMITER ',' CSV HEADER;`)
        await db.query(`COPY (SELECT array_to_json(array_agg(row_to_json(entitet)))
        FROM (SELECT automobili.*, array_to_json(array_agg(to_json(motori.*))) as motori
        FROM automobili 
        INNER JOIN motori on automobili.id_automobila = motori.id_auta
        GROUP BY automobili.id_automobila) entitet)
        TO '/tmp/automobili.json'`)
    }
}