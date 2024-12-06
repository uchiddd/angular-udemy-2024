import { Component, effect, input, signal } from '@angular/core';
import { DUMMY_TASKS } from '../dummy-tasks';
import { type User } from '../user/user.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { Task, type NewTaskData } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  user = input<User>();
  allTasks = signal<Task[]>([...DUMMY_TASKS]);
  filteredTasks = signal<Task[]>([]);
  isAddingTask = signal<boolean>(false);

  constructor() {
    this.taskFilterEffect();
  }

  taskFilterEffect() {
    effect(
      () => {
        this.filteredTasks.set(
          this.allTasks().filter((task) => task.userId === this.user()?.id)
        );
      },
      { allowSignalWrites: true }
    );
  }

  onCompleteTask(id: string) {
    this.allTasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  onStartAddTask() {
    this.isAddingTask.set(true);
  }

  onCancelAddTask() {
    this.isAddingTask.set(false);
  }

  onAddTask(taskData: NewTaskData) {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      userId: this.user()?.id ?? '',
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    };

    this.filteredTasks.update((tasks) => [...tasks, newTask]);
    this.isAddingTask.set(false);
  }
}
