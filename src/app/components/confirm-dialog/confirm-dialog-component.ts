import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title style="font-family: 'Minecraft', sans-serif;">{{ data.title }}</h2>
    <mat-dialog-content style="font-family: 'Minecraft', sans-serif;">
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close style="font-family: 'Minecraft', sans-serif;">Нет</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true" style="font-family: 'Minecraft', sans-serif;">Да</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  public readonly data: { title: string; message: string } = inject(MAT_DIALOG_DATA);
}
