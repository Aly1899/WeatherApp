import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from 'src/app/shared/modals/input-dialog/input-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.sass']
})
export class AddCityComponent implements OnInit, AfterViewInit {
  selectedTab: number;

  constructor(
    public dialog: MatDialog,
    private userService: UserService ) {}

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '350px',
      data: `Are you sure you want to delete client? `
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addCity(result);
        this.selectedTab = 1;
      }
    });
  }


}
