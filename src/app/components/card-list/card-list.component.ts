import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TaskByStatusPipe } from '../../pipes/task-by-status.component';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/task/task.actions';
import { selectTasks } from '../../store/task/task.selectors';
import { take } from 'rxjs';
import { Status } from '../../models/model';
import { TaskMoveEvent } from '../../models/model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TaskByStatusPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent implements OnInit {
  private store = inject(Store);

  tasks$ = this.store.select(selectTasks);

  public statuses = [
    { key: 'new', label: 'Новый' },
    { key: 'inProgress', label: 'В работе' },
    { key: 'review', label: 'Проверка' },
    { key: 'done', label: 'Сделано' },
  ];

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  canMoveLeft(status: string) {
    return status !== 'new';
  }

  canMoveRight(status: string) {
    return status !== 'done';
  }

  onRemove(id: number) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  onMove(event: TaskMoveEvent) {
    this.tasks$.pipe(take(1)).subscribe((tasks) => {
      const task = tasks.find((tasks) => tasks.id === event.id);
      if (!task) return;

      const currentIndex = this.statuses.findIndex((statuses) => statuses.key === task.status);

      let newIndex = currentIndex;

      if (event.dir === 'left') newIndex--;
      if (event.dir === 'right') newIndex++;

      const newStatus = this.statuses[newIndex].key as Status;

      this.store.dispatch(
        TaskActions.updateTask({
          id: task.id,
          status: newStatus,
        }),
      );
    });
  }
}
