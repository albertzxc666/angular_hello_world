import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
]


@NgModule({
  imports: [
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class MaterialModule { }
