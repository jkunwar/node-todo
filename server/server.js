var express = require('express')
var bodyparser = require('body-parser')

var app = express()
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.send(JSON.stringify({ "name": "john doe" }))
})

app.listen(3001, () => console.log(`server running at http://localhost:3000`))