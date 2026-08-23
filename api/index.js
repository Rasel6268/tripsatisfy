const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())


app.use(express.urlencoded({ extended: false }))
var server = app.listen();
server.setTimeout(500000);
// test end points
app.get('/current-time', (req, res) => {
    const currentTime = new Date();
    return res.json(`Current time is: ${currentTime}`);
  });
app.get("/test", (req, res) => {
    return res.json('Test successful');
 })

// Router use
app.use(require('./router'));

module.exports = {
    path: '/api',
    handler: app
}