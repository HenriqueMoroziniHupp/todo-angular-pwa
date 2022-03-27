import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.models';

@Component({
  selector: 'app-root', //tag html <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Meu dia';

  constructor() {
    // Será chamado todo vez que o componente inicia
    this.todos.push(new Todo(1, 'Passear com o cachorro', true));
    this.todos.push(new Todo(2, 'Lavar a louça', true));
    this.todos.push(new Todo(3, 'Ir na praia', false));

  }
  
  public op: boolean = false;
  alterarTexto() {
    if (this.op) {
      this.title = 'Porra mano';
    } else {
      this.title = 'Meu dia';
    }
    this.op = !this.op
  }
}
