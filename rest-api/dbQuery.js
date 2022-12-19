const db = require('./db')

module.exports = class dbq {

    static async getAll() {
        return await db.query('SELECT * FROM automobili JOIN motori ON (automobili.id_automobila = motori.id_auta)')
    }

    static async getAllJSON() {
        return await db.query(`SELECT array_to_json(array_agg(row_to_json(entitet)))
        FROM (SELECT automobili.*, array_to_json(array_agg(to_json(motori.*))) as motori
        FROM automobili
        INNER JOIN motori on automobili.id_automobila = motori.id_auta
        GROUP BY automobili.id_automobila) entitet`)
    }

    static async getSpecificCar(id) {
        return await db.query(`SELECT array_to_json(array_agg(row_to_json(entitet)))
        FROM (SELECT automobili.*, array_to_json(array_agg(to_json(motori.*))) as motori
        FROM automobili
        INNER JOIN motori on automobili.id_automobila = motori.id_auta
        WHERE automobili.id_automobila = ${id}
        GROUP BY automobili.id_automobila) entitet`)
    }

    static async getSmallTrunkCars() {
        return await db.query('SELECT * FROM automobili JOIN motori ON (automobili.id_automobila = motori.id_auta) WHERE automobili.min_velicina_prtljaznika < 300')
    }

    static async deleteCar(id) {
        await db.query(`DELETE FROM motori WHERE motori.id_auta = ${id}`)
        return await db.query(`DELETE FROM automobili WHERE automobili.id_automobila = ${id}`)
    }

    static async addCar(id_automobila, proizvodac, naziv_modela, pocetak_proizvodnje, broj_sjedala, broj_vrata, min_velicina_prtljaznika, max_velicina_prtljaznika, duljina, sirina, visina, zavrsetak_proizvodnje, motori) {
        await db.query(`INSERT INTO automobili(id_automobila, proizvodac, naziv_modela, pocetak_proizvodnje, broj_sjedala, broj_vrata, min_velicina_prtljaznika, max_velicina_prtljaznika, duljina, sirina, visina, zavrsetak_proizvodnje)
            VALUES (${id_automobila}, '${proizvodac}', '${naziv_modela}', ${pocetak_proizvodnje}, ${broj_sjedala}, ${broj_vrata}, ${min_velicina_prtljaznika}, ${max_velicina_prtljaznika}, ${duljina}, ${sirina}, ${visina}, ${zavrsetak_proizvodnje});`)
        
        for (let i = 0; i < motori.length; i++) {
            await db.query(`INSERT INTO motori(id_motora, gorivo, broj_cilindri, zapremina, snaga, okretni_moment, id_auta)
                VALUES (${motori[i].id_motora}, '${motori[i].gorivo}', ${motori[i].broj_cilindri}, ${motori[i].zapremina}, ${motori[i].snaga}, ${motori[i].okretni_moment}, ${id_automobila});`)
        }
        
    }

    static async updateCar(id, proizvodac, naziv_modela, pocetak_proizvodnje, broj_sjedala, broj_vrata, min_velicina_prtljaznika, max_velicina_prtljaznika, duljina, sirina, visina, zavrsetak_proizvodnje, motori) {
        await db.query(`UPDATE automobili 
        SET proizvodac = '${proizvodac}',
        naziv_modela = '${naziv_modela}',
        pocetak_proizvodnje = ${pocetak_proizvodnje},
        broj_sjedala = ${broj_sjedala},
        broj_vrata = ${broj_vrata},
        min_velicina_prtljaznika = ${min_velicina_prtljaznika},
        max_velicina_prtljaznika = ${max_velicina_prtljaznika},
        duljina = ${duljina},
        sirina = ${sirina},
        visina = ${visina},
        zavrsetak_proizvodnje = ${zavrsetak_proizvodnje}
        WHERE automobili.id_automobila = ${id}`)

        for (let i = 0; i < motori.length; i++) {
            await db.query(`UPDATE motori
            SET gorivo = '${motori[i].gorivo}',
            broj_cilindri = ${motori[i].broj_cilindri},
            zapremina = ${motori[i].zapremina},
            snaga = ${motori[i].snaga},
            okretni_moment = ${motori[i].okretni_moment}
            WHERE motori.id_motora = ${motori[i].id_motora}`)
        }
    }

    static async getAllMotori() {
        return await db.query('SELECT * FROM motori')
    }

    static async getSpecificMotor(id) {
        return await db.query(`SELECT * FROM motori WHERE motori.id_motora = ${id}`)
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
}
