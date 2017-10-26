import {Injectable} from "@angular/core";
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Todo} from "../todo";

@Injectable()
export class TodoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private todosUrl = 'http://localhost:3000/api/todos';  // URL to web api

  constructor(private http: Http) {  }

  getTodos(): Promise<Todo[]> {
    const url = `${this.todosUrl}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
