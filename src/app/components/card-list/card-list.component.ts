import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Task, Status } from '../card-media-size-example/card-media-size.component';
import { TasksByStatusPipe } from '../../pipes/task-by-status.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TasksByStatusPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  @Input() tasks: Task[] = [];

  @Output() remove = new EventEmitter<number>();

  @Output() move = new EventEmitter<{ id: number; dir: 'left' | 'right' }>();

  statuses: { key: Status; label: string }[] = [
    { key: 'new', label: 'Новый' },
    { key: 'inProgress', label: 'В работе' },
    { key: 'review', label: 'Проверка' },
    { key: 'done', label: 'Сделано' },
  ];

  getTasksByStatus(status: Status) {
    return this.tasks.filter((task) => task.status === status);
  }

  canMoveLeft(status: Status) {
    return status !== 'new';
  }

  canMoveRight(status: Status) {
    return status !== 'done';
  }

  removeTask(id: number) {
    this.remove.emit(id);
  }
}
