const express = require('express')
const app = express()

app.use(express.static(__dirname))

const server = app.listen(3004, () => {
    console.log('App listening at http://%s:%s')
})