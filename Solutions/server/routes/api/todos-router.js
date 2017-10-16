const express = require('express');
const router = express.Router();
const _ = require('lodash');

let todos = [
  {text: 'remember the milk', done: false, id: 1},
  {text: 'remember the beer', done: false, id: 2},
  {text: 'done task', done: true, id: 3},
  {text: 'learn Node.js', done: false, id: 4},
];

function getNewId() {
  return _.max(_.map(todos, (todo) => todo.id)) + 1;
}

function getTodoById(id) {
  return _.find(todos, (todo) => todo.id.toString() === id);
}

router.get('/', function (req, res) {
  res.json(todos);
});

router.get('/:id', function (req, res) {
  const id = req.params.id;

  let todo = getTodoById(id);

  if (todo) {
    res.json(todo);
  }
  else {
    res.statusCode = 404;
    res.send(null);
  }
});

router.post('/', (req, res) => {
  const todo = req.body;
  todo.id = getNewId();

  todos.push(todo);

  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  let todo = getTodoById(id);
  let todoIndex = todos.indexOf(todo);

  if (todoIndex < 0) {
    res.statusCode = 404;
    res.send(null);
    return;
  }

  todos.splice(todoIndex, 1);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const todo = getTodoById(id);
  const newTodo = req.body;

  todo.text = newTodo.text;
  todo.done = newTodo.done;

  res.json(todo);
});

module.exports = router;
