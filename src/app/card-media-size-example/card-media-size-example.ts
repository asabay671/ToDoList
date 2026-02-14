import { ChangeDetectionStrategy, Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardListComponent } from '../card-list/card-list-component';

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
  imports: [CommonModule, MatCardModule, CardListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMediaSizeExample {
  private cdr = inject(ChangeDetectorRef);

  private nextId = 1;

  tasks: Task[] = [
    { id: this.nextId++, title: 'Начало', label: 'ааа', status: 'new' },
    { id: this.nextId++, title: 'Работа', label: 'ббб', status: 'inProgress' },
    { id: this.nextId++, title: 'Чек', label: 'ввв', status: 'review' },
    { id: this.nextId++, title: 'Конец', label: 'ггг', status: 'done' },
  ];

  addTaskToNew(title: string) {
    this.tasks = [
      ...this.tasks,
      {
        id: this.nextId++,
        title,
        label: 'Новая',
        status: 'new',
      },
    ];
    this.cdr.markForCheck();
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
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
}
