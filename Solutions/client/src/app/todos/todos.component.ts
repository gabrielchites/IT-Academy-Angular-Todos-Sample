import {Component, OnInit} from '@angular/core';
import {Todo} from "./todo";
import {TodoService} from "./services/todo.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['todos.component.css']
})
export class TodosComponent implements OnInit {
  pageTitle: string = "TO-DOs";
  newTodoText: string = '';
  editingTodoText: string; // so the original text can be restored in case the user press Escape
  editingTodo: TodoExtended;
  inputFocused: false;
  todos: Todo[]; // = [{text: 'Remember the milk', isDone: false}, {text: 'Done task', isDone: true}];
  todosVisibility = 'all';

  filters = {
    all(todos) {
      return todos;
    },
    active(todos) {
      return todos.filter(t => !t.isDone);
    },
    done(todos) {
      return todos.filter(t => t.isDone);
    },
  };

  filteredTodos = () => this.filters[this.todosVisibility](this.todos);

  constructor(private todoService : TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().then((todos) => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    let newTodo: Todo = new Todo();
    newTodo.text = this.newTodoText;
    newTodo.isDone = false;

    this.todos.push(newTodo);
    this.newTodoText = '';
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  setVisibility(visibility: string){
    this.todosVisibility = visibility;
  }

  beginEditingTodo(todo: TodoExtended){
    todo.isEditing = true;
    this.editingTodo = todo;
    this.editingTodoText = todo.text;
  }

  finishEditingTodo(){
    this.editingTodo.text = this.editingTodoText;
    this.editingTodo.isEditing = false;
    console.log('finish')

  }

  cancelEditingTodo(){
    this.editingTodo.isEditing = false;
    console.log('cancel')
  }
}

interface TodoExtended extends Todo {
  isEditing : boolean;
}
