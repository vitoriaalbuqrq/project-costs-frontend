import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-body',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.scss'
})
export class DialogBodyComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onCloseIconClick(): void {
    this.dialogRef.close(); 
  }
}
