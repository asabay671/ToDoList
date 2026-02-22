import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../services/task.service';

@Pipe({
  name: 'taskByStatus',
})
export class TaskByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    if (!tasks) return [];
    return tasks.filter((task) => task.status === status);
  }
}
