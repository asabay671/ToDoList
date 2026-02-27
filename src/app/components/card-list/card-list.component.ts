import { Component, EventEmitter, OnInit, Output, Input, inject} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { take } from 'rxjs';
import { Task } from '../../models/model';
import { TaskByStatusPipe } from '../../pipes/task-by-status.component';
import { TaskMoveEvent } from '../../models/model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TaskByStatusPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent implements OnInit {

  public statuses = [
    { key: 'new', label: 'Новый' },
    { key: 'inProgress', label: 'В работе' },
    { key: 'review', label: 'Проверка' },
    { key: 'done', label: 'Сделано' },
  ];

  @Input() tasks: Task[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() move = new EventEmitter<TaskMoveEvent>();

  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks()
      .pipe(take(1))
      .subscribe((data) => {
      this.tasks = data;
    });
  }

  canMoveLeft(status: string) {
    return status !== 'new';
  }

  canMoveRight(status: string) {
    return status !== 'done';
  }

  onRemove(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onMove(event: TaskMoveEvent) {
    const task = this.tasks.find((task) => task.id === event.id);
    if (!task) return;

    const currentIndex = this.statuses.findIndex((status) => status.key === task.status);

    let newIndex = currentIndex;

    if (event.dir === 'left') newIndex--;
    if (event.dir === 'right') newIndex++;

    const newStatus = this.statuses[newIndex].key;

    this.taskService.updateTask(task.id, newStatus).subscribe(() => {
      this.loadTasks();
    });
  }
}
