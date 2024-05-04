import { makeAutoObservable } from 'mobx';
import { Task } from '../types/task';
import taskApi from '@/features/tasks/api';
import { UpdateTask } from '../types/updateTask';
import { CreateTask } from '../types/createTask';

export class TaskStore {
  tasks: Task[] = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get taskCount() {
    return this.tasks.length;
  }

  // Crud operations
  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  findTask(taskId: string) {
    return this.tasks.find((task) => task.uuid === taskId);
  }

  addTask = (task: Task) => {
    this.tasks.push(task);
  };

  updateTask(task: Task) {
    const taskFound = this.findTask(task.uuid);
    if (!taskFound) return;
    Object.assign(taskFound, task);
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.uuid !== taskId);
  }

  // Api Operations
  async fetchTasksApi(workspaceId: string) {
    this.setIsLoading(true);
    try {
      const tasks = await taskApi.getTasks(workspaceId);

      this.setTasks(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async createTaskApi(task: CreateTask) {
    try {
      const newTask = await taskApi.createTask(task);
      this.addTask(newTask);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  }

  async updateTaskApi(taskId: string, task: UpdateTask) {
    try {
      const updatedTask = await taskApi.updateTask(taskId, task);
      this.updateTask(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }

  async toggleTaskApi(taskId: string) {
    try {
      const task = this.findTask(taskId);
      if (!task) return;

      const updatedTask = await taskApi.updateTask(taskId, { isComplete: !task.isComplete });
      this.updateTask(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }

  async removeTaskApi(taskId: string) {
    try {
      await taskApi.removeTask(taskId);
      this.removeTask(taskId);
    } catch (error) {
      console.error('Failed to remove task:', error);
    }
  }

  // Ui operations
  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }
}
