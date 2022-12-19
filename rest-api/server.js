const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const { Router } = require("express")
const port = 3001
const dbq = require('./dbQuery')
const openApiSpecification = require('./openapi.json');

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/automobili', async (req, res) => {
    try {
        let alldata = await dbq.getAllJSON();
        res.status(200).send({
            status: "OK",
            message: "Dohvaćeni svi automobili.",
            reponse: alldata.rows[0].array_to_json
        });
    } catch (e) {
        res.status(500).send({
            status: "Internal Server Error",
            message: "Došlo je do greške. (" + e.message + ")",
            reponse: null
        })
    }
})

app.get('/api/automobili/:id(\\d+)', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let car = await dbq.getSpecificCar(id)
        if (car.rows[0].array_to_json == null) {
            res.status(404).send({
                status: "Not Found",
                message: "Ne postoji automobil sa zadanim ID-om.",
                reponse: null
            })
        } else {
            res.status(200).send({
                status: "OK",
                message: "Automobil dohvaćen.",
                reponse: car.rows[0].array_to_json[0]
            })
        }
    } catch (e) {
        res.status(500).send({
            status: "Internal Server Error",
            message: "Došlo je do greške. (" + e.message + ")",
            reponse: null
        })
    }
})

app.get('/api/automobili/small-trunk', async (req, res) => {
    try {
        let alldata = await dbq.getSmallTrunkCars();
        res.status(200).send({
            status: "OK",
            message: "Dohvaćeni svi automobili s malim prtljažnikom.",
            reponse: alldata.rows
        });
    } catch (e) {
        res.status(500).send({
            status: "Internal Server Error",
            message: "Došlo je do greške. (" + e.message + ")",
            reponse: null
        })
    }
})


app.get('/api/motori', async (req, res) => {
    try {
        let alldata = await dbq.getAllMotori();
        res.status(200).send({
            status: "OK",
            message: "Dohvaćeni svi motori.",
            reponse: alldata.rows
        });
    } catch (e) {
        res.status(500).send({
            status: "Internal Server Error",
            message: "Došlo je do greške. (" + e.message + ")",
            reponse: null
        })
    }
})

app.get('/api/motori/:id(\\d+)', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let motor = await dbq.getSpecificMotor(id)
        if (motor.rows.length == 0) {
            res.status(404).send({
                status: "Not Found",
                message: "Ne postoji motor sa zadanim ID-om.",
                reponse: null
            })
        } else {
            res.status(200).send({
                status: "OK",
                message: "Motor dohvaćen.",
                reponse: motor.rows[0]
            })
        }
    } catch (e) {
        res.status(500).send({
            status: "Internal Server Error",
            message: "Došlo je do greške. (" + e.message + ")",
            reponse: null
        })
    }
})

app.get('/api/open-api-specification', async (req, res) => {
    res.status(200).send({
        status: "OK",
        message: "Dohvaćena OpenApi specifikacija.",
        reponse: openApiSpecification
    })
})

app.post('/api/automobili', async (req, res) => {
    if (req.body.id_automobila == undefined ||
        req.body.proizvodac == undefined ||
        req.body.naziv_modela == undefined ||
        req.body.pocetak_proizvodnje == undefined ||
        req.body.zavrsetak_proizvodnje == undefined ||
        req.body.broj_sjedala == undefined ||
        req.body.broj_vrata == undefined ||
        req.body.min_velicina_prtljaznika == undefined ||
        req.body.max_velicina_prtljaznika == undefined ||
        req.body.duljina == undefined ||
        req.body.sirina == undefined ||
        req.body.visina == undefined ||
        req.body.motori == undefined) {
        res.status(400).send({
            status: "Bad Request",
            message: "Potrebno je unijeti sva polja za automobil. (id_automobila, proizvodac, naziv_modela, pocetak_proizvodnje, broj_sjedala, broj_vrata, min_velicina_prtljaznika, max_velicina_prtljaznika, duljina, sirina, visina, zavrsetak_proizvodnje)",
            reponse: null
        })
    } else {
        let uspjesno = true

        if (Array.isArray(req.body.motori)) {
            for (let i = 0; i < req.body.motori.length; i++) {
                if (req.body.motori[i].id_motora == undefined ||
                    req.body.motori[i].gorivo == undefined ||
                    req.body.motori[i].broj_cilindri == undefined ||
                    req.body.motori[i].zapremina == undefined ||
                    req.body.motori[i].snaga == undefined ||
                    req.body.motori[i].okretni_moment == undefined) {
                    res.status(400).send({
                        status: "Bad Request",
                        message: "Potrebno je unijeti sva polja za svaki motor. (id_motora, gorivo, broj_cilindri, zapremina, snaga, okretni_moment, id_auta)",
                        reponse: null
                    })
                    uspjesno = false
                    break
                } 

                if (uspjesno) {
                    try {
                        await dbq.addCar(req.body.id_automobila,
                            req.body.proizvodac,
                            req.body.naziv_modela,
                            req.body.pocetak_proizvodnje,
                            req.body.broj_sjedala,
                            req.body.broj_vrata,
                            req.body.min_velicina_prtljaznika,
                            req.body.max_velicina_prtljaznika,
                            req.body.duljina,
                            req.body.sirina,
                            req.body.visina,
                            req.body.zavrsetak_proizvodnje,
                            req.body.motori)
                    } catch (e) {
                        res.status(500).send({
                            status: "Internal Server Error",
                            message: "Došlo je do greške. (" + e.message + ")",
                            reponse: null
                        })
                        uspjesno = false
                    }
                }

            }
        } else {
            res.status(400).send({
                status: "Bad Request",
                message: "Kao polje motori, potrebno je unijeti polje mogućih motora u automobilu.",
                reponse: null
            })
            uspjesno = false
        }

        if (uspjesno) {
            res.status(201).send({
                status: "Created",
                message: "Automobil dodan.",
                reponse: null
            })
        }

    }
})

app.put('/api/automobili/:id(\\d+)', async (req, res) => {
    let idAuto = parseInt(req.params.id)
    let automobil = await dbq.getSpecificCar(idAuto)
    if (automobil.rows[0].array_to_json == null) {
        res.status(404).send({
            status: "Not found",
            message: "Ne postoji automobil sa zadanim ID-om.",
            reponse: null
        })
        uspjesno = false
    } else if (req.body.proizvodac == undefined ||
        req.body.naziv_modela == undefined ||
        req.body.pocetak_proizvodnje == undefined ||
        req.body.zavrsetak_proizvodnje == undefined ||
        req.body.broj_sjedala == undefined ||
        req.body.broj_vrata == undefined ||
        req.body.min_velicina_prtljaznika == undefined ||
        req.body.max_velicina_prtljaznika == undefined ||
        req.body.duljina == undefined ||
        req.body.sirina == undefined ||
        req.body.visina == undefined ||
        req.body.motori == undefined) {
        res.status(400).send({
            status: "Bad Request",
            message: "Potrebno je unijeti sva polja za automobil. (id_automobila, proizvodac, naziv_modela, pocetak_proizvodnje, broj_sjedala, broj_vrata, min_velicina_prtljaznika, max_velicina_prtljaznika, duljina, sirina, visina, zavrsetak_proizvodnje)",
            reponse: null
        })
    } else {
        let uspjesno = true

        if (Array.isArray(req.body.motori)) {
            for (let i = 0; i < req.body.motori.length; i++) {
                if (req.body.motori[i].id_motora == undefined ||
                    req.body.motori[i].gorivo == undefined ||
                    req.body.motori[i].broj_cilindri == undefined ||
                    req.body.motori[i].zapremina == undefined ||
                    req.body.motori[i].snaga == undefined ||
                    req.body.motori[i].okretni_moment == undefined) {
                    res.status(400).send({
                        status: "Bad Request",
                        message: "Potrebno je unijeti sva polja za svaki motor. (id_motora, gorivo, broj_cilindri, zapremina, snaga, okretni_moment, id_auta)",
                        reponse: null
                    })
                    uspjesno = false
                    break
                }
            }
            if (uspjesno) {
                try {
                    let id = parseInt(req.params.id)
    
                    await dbq.updateCar(id,
                        req.body.proizvodac,
                        req.body.naziv_modela,
                        req.body.pocetak_proizvodnje,
                        req.body.broj_sjedala,
                        req.body.broj_vrata,
                        req.body.min_velicina_prtljaznika,
                        req.body.max_velicina_prtljaznika,
                        req.body.duljina,
                        req.body.sirina,
                        req.body.visina,
                        req.body.zavrsetak_proizvodnje,
                        req.body.motori)
                } catch (e) {
                    res.status(500).send({
                        status: "Internal Server Error",
                        message: "Došlo je do greške. (" + e.message + ")",
                        reponse: null
                    })
                    uspjesno = false
                }
            }
            
        } else {
            console.log("bad")
            res.status(400).send({
                status: "Bad Request",
                message: "Kao polje motori, potrebno je unijeti polje mogućih motora u automobilu.",
                reponse: null
            })
            uspjesno = false
        }

        if (uspjesno) {
            res.status(200).send({
                status: "OK",
                message: "Informacije o automobilu su izmjenjene.",
                reponse: null
            })
        }

    }
})

app.delete('/api/automobili/:id(\\d+)', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let car = await dbq.getSpecificCar(id)
        if (car.rows[0].array_to_json == null) {
            res.status(404).send({
                status: "Not Found",
                message: "Ne postoji automobil sa zadanim ID-om.",
                reponse: null
            })
        } else {
            await dbq.deleteCar(id)
            res.status(200).send({
                status: "OK",
                message: "Automobil obrisan.",
                reponse: null
            })
        }
    } catch (e) {
        res.status(500).send({
            status: "Internal Server Error",
            message: "Došlo je do greške. (" + e.message + ")",
            reponse: null
        })
    }
})

app.all('*', (req, res, next) => {
    res.status(501).send({
        status: "Not implemented",
        message: "Method has not been implemented",
        response: null
    });
});

app.listen(port, () => {
    console.log("Started on port: " + port)
})
