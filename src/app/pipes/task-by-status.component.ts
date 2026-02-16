import { Pipe, PipeTransform } from '@angular/core';
import { Task, Status } from '../components/card-media-size-example/card-media-size.component';
@Pipe({
  name: 'tasksByStatus',
  standalone: true,
  pure: true,
})
export class TasksByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: Status): Task[] {
    return tasks.filter((task) => task.status === status);
  }
}
