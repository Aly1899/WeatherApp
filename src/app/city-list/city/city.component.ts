import { Component, OnInit, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.sass']
})
export class CityComponent implements OnInit, AfterViewInit {

  constructor(
    private weatherService: WeatherService,
    private userService: UserService) { }

  @Input() city: string;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = false;
  autoScale = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  current: any = {};
  forecast: any[] = [];

  ngOnInit() {
    console.log('created', Date.now());
    this.weatherService.getWeatherCurrent(this.city)
      .subscribe(data => {
        this.current.city = this.city;
        this.current.temp = data.temp;
        this.current.humidity = data.humidity;
        this.current.pressure = data.pressure;
        this.current.windspeed = data.windSpeed;
      });

    this.weatherService.getWeatherForecast(this.city)
      .subscribe(data => {
        this.forecast = [
          {
            name: 'Forecast',
            series: data
          }
        ];
        console.log(this.forecast);
      });
  }

  deleteCity() {
    console.log('Deleted city is : ', this.city);
    this.userService.deleteCity(this.city);
  }

  ngAfterViewInit(){
  }

  onClick(){
  }

}
