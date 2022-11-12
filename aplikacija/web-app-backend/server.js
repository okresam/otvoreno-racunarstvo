const express = require("express")
const app = express()
const bodyParser = require ('body-parser')
const { Router } = require("express")
const port = 3001
const dbq = require('./dbQuery')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
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

app.listen(port, () => {
    console.log("Started on port: " + port)
})