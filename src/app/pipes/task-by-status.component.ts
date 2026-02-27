import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/model';

@Pipe({
  name: 'taskByStatus',
  standalone: true,
})
export class TaskByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter((task) => task.status === status);
  }
}
