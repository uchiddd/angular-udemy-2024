import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { DUMMY_TASKS } from '../dummy-tasks';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  user = input<User>();
  tasks = computed(() =>
    DUMMY_TASKS.filter((task) => task.userId === this.user()?.id)
  );
}
