import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.models';

@Component({
  selector: 'app-root', //tag html <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'T O D O';
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Será chamado todo vez que o componente inicia
    this.form = this.formBuilder.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(56),
          Validators.required,
        ]),
      ],
    });
    this.load();
    console.log(this.todos);
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear(); // Chamando a função clear para limpar o formulário
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) this.todos.splice(index, 1);
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  finished() {
    let count = 0;
    for (let index = 0; index < this.todos.length; index++) {
      if (this.todos[index].done === false) count++;
    }
    return count
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todosLocalStorage', data);
  }

  load() {
    const data = localStorage.getItem('todosLocalStorage');
    // if (data !== null) this.todos = JSON.parse(data);
    data !== null ? (this.todos = JSON.parse(data)) : (this.todos = []);
  }
}
