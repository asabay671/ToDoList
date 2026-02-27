import { Status } from "../components/card-media-size/card-media-size.component";

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
