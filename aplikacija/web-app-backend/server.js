const express = require("express")
const app = express()
const bodyParser = require ('body-parser')
const { Router } = require("express")
const port = 3001
const dbq = require('./dbQuery')
const cors = require('cors')

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/csv', (req, res) => {
    res.download('./resources/automobili.csv', 'automobili.csv')
})

app.get('/json', (req, res) => {
    res.download('./resources/automobili.json', 'automobili.json')
})

app.get('/automobili/getall', async (req, res) => {
    let alldata = await dbq.getAll()
    res.send(alldata.rows)
})

app.post('/automobili/search', async (req, res) => {
    let result

    if (req.body.atribut == 'all') {
        result = await dbq.getSearchWildcard(req.body.searchTerm)
    } else {
        result = await dbq.getSearchAttribute(req.body.searchTerm, req.body.atribut)
    }

    res.send(result.rows)
})

app.post('/automobili/search/json', async (req, res) => {
    let result
    
    if (req.body.atribut == 'all') {
        result = await dbq.getSearchWildcardJSON(req.body.searchTerm)
    } else {
        result = await dbq.getSearchAttributeJSON(req.body.searchTerm, req.body.atribut)
    }

    res.send(result.rows[0].array_to_json)
})

app.listen(port, () => {
    console.log("Started on port: " + port)
})