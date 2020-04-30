const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')

const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use(cors())

app.get('/', function (req, res) {
    res.send(JSON.stringify({ "name": "john doe" }))
})

app.use('/api/v1', todoRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))