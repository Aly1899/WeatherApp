import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.sass']
})
export class InputDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
    city: string;

    ngOnInit(){
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
