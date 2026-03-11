import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsDialogComponent } from '../dialog-animation-dialog/dialog-animation-dialog.component';
import { CardListComponent } from '../card-list/card-list.component';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/task/task.actions';
import { Task } from '../../models/model';

@Component({
  selector: 'app-dialog-animations',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CardListComponent],
  templateUrl: './dialog-icon.component.html',
  styleUrl: 'dialog-icon.component.css',
})
export class DialogAnimationsExample {
  private store = inject(Store);

  private dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAnimationsDialogComponent);

    dialogRef.afterClosed().subscribe((title?: string) => {
      if (!title) return;

      this.store.dispatch(
        TaskActions.createTask({
          task: {
            title,
            label: 'Новая',
            status: 'new',
          } as Task,
        }),
      );
    });
  }
}
