import { effect, Injectable, signal } from '@angular/core';
import { Task, type NewTaskData } from './task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
    },
  ];
  $state = signal<Partial<Task>[]>([]);

  constructor() {
    this.taskFilterEffect();
  }

  taskFilterEffect() {
    effect(
      () => {
        this.$state.set(this.tasks.filter((task) => task.userId === userId));
      },
      { allowSignalWrites: true }
    );
  }

  getUserTasks(userId: string) {
    return this.$state.set(this.tasks.filter((task) => task.userId === userId));
  }

  addTask(taskData: NewTaskData, userId: string) {
    const newTask = {
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    };

    return this.tasks.unshift(newTask);
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
