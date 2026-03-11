

export interface Task {
  id: number;
  title: string;
  label: string;
  status: Status;
}

export type MoveDirection = 'left' | 'right';

export interface TaskMoveEvent {
  id: number;
  dir: MoveDirection;
}

export type Status = 'new' | 'inProgress' | 'review' | 'done';