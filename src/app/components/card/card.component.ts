import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() task: any;
  @Input() canMoveLeft: boolean = false;
  @Input() canMoveRight: boolean = false;

  @Output() remove = new EventEmitter<number>();
  @Output() move = new EventEmitter<'left' | 'right'>();

  moveLeft() {
    if (this.canMoveLeft) {
      this.move.emit('left');
    }
  }

  moveRight() {
    if (this.canMoveRight) {
      this.move.emit('right');
    }
  }

  removeTask() {
    this.remove.emit(this.task.id);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') this.moveLeft();
    if (event.key === 'ArrowRight') this.moveRight();
    if (event.key === 'Delete') this.removeTask();
  }
}
