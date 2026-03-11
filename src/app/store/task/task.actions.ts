import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/model';
import { Status } from '../../models/model';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);

export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());

export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: number }>());

export const updateTask = createAction('[Task] Update Task', props<{ id: number; status: Status }>());

export const updateTaskSuccess = createAction(
'[Task] Update Task Success', props<{ id: number; status: Status }>());

export const createTask = createAction('[Task] Create Task', props<{ task: Task }>());

export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ task: Task }>());
