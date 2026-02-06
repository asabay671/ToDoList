import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsDialogComponent } from '../dialog-heart/dialog-component';
import { CardMediaSizeExample } from '../card-media-size-example/card-media-size-example';

@Component({
  selector: 'app-dialog-animations',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CardMediaSizeExample],
  templateUrl: 'dialog-animations-example.html',
  styleUrl: 'dialog-animations-example.css',
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

      this.boardComponent.addTaskToNew({ title });
    });
  }
}
