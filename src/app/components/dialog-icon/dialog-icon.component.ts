import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsDialogComponent } from '../dialog-animation-dialog/dialog-animation-dialog.component';
import { CardMediaSizeExample } from '../card-media-size-example/card-media-size.component';

@Component({
  selector: 'app-dialog-animations',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CardMediaSizeExample],
  templateUrl: './dialog-icon.component.html',
  styleUrl: 'dialog-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExample {
  @ViewChild(CardMediaSizeExample)
  private boardComponent!: CardMediaSizeExample;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAnimationsDialogComponent);

    dialogRef.afterClosed().subscribe((title?: string) => {
      if (!title) return;

      this.boardComponent.addTaskToNew(title);
    });
  }
}
