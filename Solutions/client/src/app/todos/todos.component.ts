import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  pageTitle : string = "TO-DOs";
  newTodoText: string = '';
  editingTodoText: ''; // so the original text can be restored in case the user press Escape
  inputFocused: false;
  todos : Todo[] = [];
  todosVisibility: 'all';

  constructor() { }

  ngOnInit() {
  }

  addTodo() : void {
    let newTodo : Todo = new Todo();
    newTodo.text = this.newTodoText;
    newTodo.isDone = false;

    this.todos.push(newTodo);
    this.newTodoText = '';
  }

}

export class Todo{
  text : string;
  isDone: boolean;
}
