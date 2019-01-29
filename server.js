/* 
  * TODoIT
  * A simple node app to keep a to do list it persists to the file system
*/

// Dependecies
const express = require('express')
const bodyParser = require('body-parser')
const saveFile = require('./saveFile')

var app = express()
app.set('view engine', 'ejs')

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))
app.use((req,res,next) => {
  next()
})

app.get('/', (req,res) => {
  var todoArray = saveFile.loadTodos()  
  
  var todos = {
    todoList: todoArray
  }
  
  res.render('index.ejs', todos )
})

app.post('/', (req,res) => {
  var todo = {
    todo: req.body.todo,
    done: false
  }
  saveFile.addTodo(todo,(message,error) => {
    if(!error){
      res.redirect('back')
    } else {
      res.status(500).send(error)
    }
  })
})

app.put('/', (req,res) => {
  var updatedTodo = req.body
  saveFile.updateTodo(updatedTodo,(message,error) => {
    if(!error) {
      res.status(200).send(message)
    } else {
      res.status(500).send(error)
    }
  })
  
})

app.patch('/', (req,res) => {
  var todoToDelete = req.body
  saveFile.removeToDo(todoToDelete)
  res.status(200).send('Deleted Todo')
})

app.listen(3000, () => {
  console.log('App Listening On Port 3000')
})