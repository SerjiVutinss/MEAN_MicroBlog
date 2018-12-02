import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) { }

  ngOnInit() { }

  /**
   * Cancel, return nothing
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Confirm, return true as result
   */
  onDelete() {
    this.dialogRef.close(true);
  }
}
