import { Component, OnInit } from '@angular/core';
import { taskItem } from '../Models/task.model';
import { TaskService } from '../Service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  
  tasks:taskItem[] = [];
  filteredTasks:taskItem[] = [];
  isAddTaskModalOpen = false;
  newTaskTitle = '';
  selectedFilter = 'all';
  selectedTask: any;
  searchQuery = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
  this.tasks = this.taskService.getTasks();
  this.filteredTasks=this.tasks;
  }

  filterTasks(filter: string) {
    this.searchQuery='';
    if (filter === 'all') {
      this.filteredTasks = this.tasks;
    } else if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
    this.selectedFilter = filter;
  }

  markTaskAsCompleted(task: any) {
    task.completed = true;
  }
  openAddTaskModal() {
    this.selectedTask=null;
    this.isAddTaskModalOpen = true;
  }

  closeAddTaskModal() {
    this.isAddTaskModalOpen = false;
    this.newTaskTitle = '';
  }

  addTask() {
    if(this.selectedTask){
      const index = this.tasks.findIndex(task => task.title === this.selectedTask);
    if (index !== -1) {
      this.tasks[index].title = this.newTaskTitle;
      this.closeAddTaskModal();
    }
    }
    else if (this.newTaskTitle) {
      const newTask = { title: this.newTaskTitle, completed: false };
      this.taskService.addTask(newTask);
      this.closeAddTaskModal();
    }
  }

  openEditModal(task:taskItem){
    this.selectedTask = task.title;
    this.isAddTaskModalOpen = true;
    this.newTaskTitle=task.title
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task);
  }

  applySearchQuery() {
    if (this.searchQuery.trim() !== '') {
      this.filteredTasks = this.filteredTasks.filter(task =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      
    }
  }

}
