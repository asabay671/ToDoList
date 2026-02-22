import { Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import { TaskService, Task, } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent implements OnInit {

  statuses = [
    { key: 'new', label: 'Новый' },
    { key: 'inProgress', label: 'В работе' },
    { key: 'review', label: 'Проверка' },
    { key: 'done', label: 'Сделано' },
  ];

  @Input() tasks: Task[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() move = new EventEmitter<{ id: number; dir: 'left' | 'right' }>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter((task) => task.status === status);
  }

  canMoveLeft(status: string) {
    return status !== 'todo';
  }

  canMoveRight(status: string) {
    return status !== 'done';
  }

  onRemove(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onMove(event: { id: number; dir: string }) {
    const task = this.tasks.find((t) => t.id === event.id);
    if (!task) return;

    const currentIndex = this.statuses.findIndex((s) => s.key === task.status);

    let newIndex = currentIndex;

    if (event.dir === 'left') newIndex--;
    if (event.dir === 'right') newIndex++;

    const newStatus = this.statuses[newIndex].key;

    this.taskService.updateTask(task.id, newStatus).subscribe(() => {
      this.loadTasks();
    });
  }
}
