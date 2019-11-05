import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeatherService } from '../../services/weather.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.sass']
})
export class InputDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    private weatherService: WeatherService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
    city: string;
    isInvalidCity = false;

    ngOnInit() {
    }

    onAddClick(): void {
      this.weatherService.getWeatherCurrent(this.city)
        .subscribe(data => {
          if (this.userService.activeUser.cities.indexOf(this.city) === -1) {
            this.weatherService.setSelectedTab(this.userService.activeUser.cities.length);
            this.dialogRef.close(this.city);
          } else {
            this.onNoClick();
          }
        },
          (error) => {
            this.isInvalidCity = true;
          });
      console.log('validate dialog');
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
