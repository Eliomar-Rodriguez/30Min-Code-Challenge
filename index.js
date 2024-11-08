const bodyParser = require('body-parser')
const express = require('express')
const { getTasks, postTasks, putTasks, deleteTask } = require('./Tasks')
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

app.get('/tasks', getTasks)

app.post('/tasks', postTasks)

app.put('/tasks/:id', putTasks)

app.delete('/tasks/:id', deleteTask)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
