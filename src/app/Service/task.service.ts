import { Injectable } from '@angular/core';
import { taskItem } from '../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: taskItem[] = [
    { title: 'Task 1', completed: false },
    { title: 'Task 2', completed: true },
    { title: 'Task 3', completed: false },
  ];

  constructor() { }

  getTasks() {
    return this.tasks;
  }

  addTask(task: any) {
    this.tasks.push(task);
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
