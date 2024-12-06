import { Component, input, output } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input<Task>();
  complete = output<string>();

  onCompleteTask() {
    const id = this.task()?.id;
    if (id) {
      this.complete.emit(id);
    }
  }
}
