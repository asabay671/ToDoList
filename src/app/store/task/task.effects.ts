import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { TaskService } from '../../services/task.service';
import { map, switchMap } from 'rxjs';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(map((tasks) => TaskActions.loadTasksSuccess({ tasks }))),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(map(() => TaskActions.deleteTaskSuccess({ id }))),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap(({ task }) =>
        this.taskService
          .createTask(task)
          .pipe(map((task) => TaskActions.createTaskSuccess({ task }))),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ id, status }) =>
        this.taskService
          .updateTask(id, status)
          .pipe(map(() => TaskActions.updateTaskSuccess({ id, status }))),
      ),
    ),
  );
}


