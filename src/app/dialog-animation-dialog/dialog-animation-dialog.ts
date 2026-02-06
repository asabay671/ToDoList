import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-animations-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './dialog-animation-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsDialogComponent {
  title = '';

  private dialogRef = inject(MatDialogRef<DialogAnimationsDialogComponent>);

  addCard() {
    this.dialogRef.close(this.title.trim());
  }

  cancel() {
    this.dialogRef.close();
  }
}
