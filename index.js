const bodyParser = require('body-parser')
const express = require('express')

const { getTasks, postTask, putTask, deleteTask } = require('./Tasks')
const app = express()
const server = require('http').createServer(app)
const desiredPort = process.env.PORT ?? 8080

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/', (req, res) => {
  res.send('<h1>Basic NodeJS code challenge</h1>')
})

app.get('/tasks', getTasks)

app.post('/tasks', postTask)

app.put('/tasks/:id', putTask)

app.delete('/tasks/:id', deleteTask)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
