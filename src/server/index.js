const express = require('express')
const path = require('path')

const routes = require('./routes')

const port = process.env.PORT || 3000
const DIST_DIR = path.join(__dirname, '../../dist')
const HTML_FILE = path.join(__dirname, '../../index.html')

const app = express()
app.use(express.json())

app.use(express.static(DIST_DIR))
app.get('/', (req, res) => res.sendFile(HTML_FILE))
app.use(routes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
