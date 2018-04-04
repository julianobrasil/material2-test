import { Component, Directive } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date = new FormControl(moment([2017, 11, 3]));
  theForm: FormGroup;
  theForm2: FormGroup;

  appName = '';
  appSurname = '';

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
        // const a = document.createElement('a');
        // a.href = 'http://go.microsoft.com/fwlink/?LinkID=521962';
        // a.download = 'teste';
        // a.click();
        // a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', '', {
          duration: 2000,
        });
      }
    });
  }
}

@Component({
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}


export const DEMO_MOMENT_MONTH_YEAR_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Directive({
  selector: '[appDemoMomentMonthYear]',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DEMO_MOMENT_MONTH_YEAR_FORMATS },
  ],
})
export class DemoMomentMonthYearDirective { }
