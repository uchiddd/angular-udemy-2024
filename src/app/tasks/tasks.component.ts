import { Component, effect, inject, input, signal } from '@angular/core';
import { type User } from '../user/user.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { Task, type NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private taskService = inject(TasksService);
  user = input<User>();
  filteredTasks = signal<Task[]>([]);
  isAddingTask = signal<boolean>(false);

  constructor() {
    this.taskFilterEffect();
  }

  taskFilterEffect() {
    effect(
      () => {
        this.filteredTasks.set(
          this.taskService.getUserTasks(this.user()?.id ?? '')
        );
      },
      { allowSignalWrites: true }
    );
  }

  onCompleteTask(id: string) {
    this.filteredTasks.update;
    this.taskService.removeTask(id);
  }

  onStartAddTask() {
    this.isAddingTask.set(true);
  }

  onCancelAddTask() {
    this.isAddingTask.set(false);
  }

  onAddTask(taskData: NewTaskData) {
    this.taskService.addTask(taskData, this.user()?.id ?? '');
    this.isAddingTask.set(false);
  }
}
