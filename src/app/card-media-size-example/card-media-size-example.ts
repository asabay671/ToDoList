import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

export type Status = 'new' | 'inProgress' | 'review' | 'done';

export interface Task {
  id: number;
  title: string;
  label: string;
  status: Status;
}

@Component({
  selector: 'card-media-size-example',
  standalone: true,
  templateUrl: 'card-media-size-example.html',
  styleUrls: ['card-media-size-example.css'],
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMediaSizeExample {
  constructor(private cdr: ChangeDetectorRef) {}

  private nextId = 1;

  tasks: Task[] = [
    { id: this.nextId++, title: 'Начало', label: 'ааа', status: 'new' },
    { id: this.nextId++, title: 'Работа', label: 'ббб', status: 'inProgress' },
    { id: this.nextId++, title: 'Чек', label: 'ввв', status: 'review' },
    { id: this.nextId++, title: 'Конец', label: 'ггг', status: 'done' },
  ];

  addTaskToNew(task: { title: string }) {
    this.tasks = [
      ...this.tasks,
      {
        id: this.nextId++,
        title: task.title,
        label: 'Новая',
        status: 'new',
      },
    ];

    this.cdr.markForCheck();
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.cdr.markForCheck();
  }

  moveTask(id: number, direction: 'left' | 'right') {
    const order: Status[] = ['new', 'inProgress', 'review', 'done'];

    this.tasks = this.tasks.map((task) => {
      if (task.id !== id) return task;

      const index = order.indexOf(task.status);
      const next = direction === 'left' ? index - 1 : index + 1;

      if (next < 0 || next >= order.length) return task;

      return { ...task, status: order[next] };
    });

    this.cdr.markForCheck();
  }

  onKeyDown(event: KeyboardEvent, taskId: number) {
    if (event.key === 'ArrowLeft') this.moveTask(taskId, 'left');
    if (event.key === 'ArrowRight') this.moveTask(taskId, 'right');
    if (event.key === 'Delete') this.removeTask(taskId);
  }

  tasksByStatus(status: Status): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }
}
