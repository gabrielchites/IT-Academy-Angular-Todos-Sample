import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { FormsModule } from '@angular/forms';
import {TodoService} from "./services/todo.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TodosComponent],
  declarations: [TodosComponent],
  providers: [TodoService]
})
export class TodosModule { }
