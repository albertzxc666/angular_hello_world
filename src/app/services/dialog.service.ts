import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog-component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  public showInfo(message: string, title: string = 'Информация'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  public showWarning(message: string, title: string = 'Предупреждение'): void {
    this.snackBar.open(message, 'OK', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['warning-snackbar']
    });
  }

  public showError(message: string, title: string = 'Ошибка'): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  public showSuccess(message: string, title: string = 'Успешно'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  public showConfirm(message: string, title: string = 'Подтверждение'): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message },
      disableClose: false
    });

    return dialogRef.afterClosed();
  }
}
