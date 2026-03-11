import { Task } from '../../models/model';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
};
