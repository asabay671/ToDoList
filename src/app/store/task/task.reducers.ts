import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { TaskState, initialState } from './task.state';

const reducer = createReducer(
  initialState,

  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks,
  })),

  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  })),

  on(TaskActions.updateTaskSuccess, (state, { id, status }) => ({
    ...state,
    tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task)),
  })),

  on(TaskActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
);

export function taskReducer(state: TaskState | undefined, action: any) {
  return reducer(state, action);
}
