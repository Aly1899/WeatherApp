import { Component, ViewChild, OnInit, Input, AfterViewInit } from '@angular/core';
import { CityComponent } from './city/city.component';
import { UserService } from '../shared/services/user.service';
import { User } from '../interfaces/user.model';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { InputDialogComponent } from '../shared/modals/input-dialog/input-dialog.component';
import { Router } from '@angular/router';
import { debug } from 'util';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.sass']
})
export class CityListComponent implements OnInit, AfterViewInit {

  cityName: string;
  activeUser: User;
  cities: string[];
  selectedIndex = 0;
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private weatherService: WeatherService) { }

  ngOnInit() {
    console.log('list-component created: ', Date.now());
    this.activeUser = this.userService.activeUser;
    if (!this.activeUser){
      console.log(this.activeUser);
      this.router.navigate(['/'])
    } else {
      console.log('Active user --->', this.activeUser);
      this.cities = this.activeUser.cities;
    }
    // if (this.cities.length === 0){
    //   this.openDialog();
    // }
    // console.log(this.cities);
  }

  ngAfterViewInit(){
  }

  onTabChange(event: MatTabChangeEvent){
    if (event.tab.textLabel === ''){
      this.selectedIndex = event.index+1;
    } else {
      this.selectedIndex = event.index;
    }
    console.log(event);
    console.log('Tab change index --> ', this.selectedIndex);
  }

  openDialog(){
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '350px',
      data: `Add a new city `
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('the result is', result);
        this.userService.addCity(result);
        debugger;
        this.weatherService.getWeatherCurrent(result)
          .subscribe(data=>console.log('ERROR HANDLER: ', data));
        this.selectedIndex--;
        this.router.navigate(['/weather']);
        console.log('Selected index -->',this.selectedIndex);
      }
    });
  }

  onClick(index: number){
    this.selectedIndex = index;
    console.log('Add change index --> ', this.selectedIndex)
    this.openDialog();
  }
}
