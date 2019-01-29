const fs = require('fs')
const helpers = require('./helpers')

var saveFile = {}

saveFile.loadTodos = () => {
  try {
    var todos = fs.readFileSync('todos.json')
    todos = JSON.parse(todos)
    return todos
  } catch (error) {
    return []
  }
}

saveFile.addTodo = (todo,callback) => {
  todo.id = helpers.createRandomString(5)
  var todos = saveFile.loadTodos()
  todos.push(todo)
  todos = JSON.stringify(todos)
  fs.writeFile('todos.json',todos,(err) => {
    if(!err) {
      callback('To Do Succesfully Added')
    } else {
      callback(undefined,'Error Saving and adding To Do')
    }
  })
}

saveFile.updateTodo = (updatedtodo,callback) => {
  var allTodos = saveFile.loadTodos()
  var todoList = []
  allTodos.forEach((todo) => {
    if(todo.id === updatedtodo.id) {
      todoList.push(updatedtodo)
    } else {
      todoList.push(todo)
    }
  })
  fs.writeFile('todos.json',JSON.stringify(todoList),(err) => {
    if(!err) {
      callback('Successfully added updated todo list')
    } else {
      callback(undefined,'Error updating todo list')
    }
  })
}

saveFile.removeToDo = (todoToDelete) => {
  var allTodos = saveFile.loadTodos()
  var remainingTodos = allTodos.filter((todo) => todo.id != todoToDelete.id)
  fs.writeFileSync('todos.json',JSON.stringify(remainingTodos))
}

module.exports = saveFile
