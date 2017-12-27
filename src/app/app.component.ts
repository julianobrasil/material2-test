import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theForm: FormGroup;
  theForm2: FormGroup;

  appName = '';
  appSurname = ''

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.theForm = fb.group({
      allDay: null
    });

    this.theForm2 = fb.group({
      'appName': ['', Validators.required],
      'appSurname': ''
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog);
    const snack = this.snackBar.open('Snack bar open before dialog', 'Understood');

    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) {
        const a = document.createElement('a');
        a.href = 'http://go.microsoft.com/fwlink/?LinkID=521962';
        a.download = 'teste';
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', '', {
          duration: 2000,
        });
      }
    });
  }
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
