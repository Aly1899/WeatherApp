import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { City, Forecast } from 'src/app/interfaces/city.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cityDetails = {} as City;
  errorObs = new Observable<any>((observer) => {
    observer.next('error has been handled');
    observer.complete();
  });

  constructor(private http: HttpClient) { }

  getWeatherCurrent(city: string): Observable<any> {
    return this.http
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=8e1ba4b2f225318f7d1cd2cadf8fb035`)
        .pipe(
          map((res: any) => {
            this.cityDetails.cityName = res.name;
            this.cityDetails.temp = res.main.temp;
            this.cityDetails.humidity = res.main.humidity;
            this.cityDetails.pressure = res.main.pressure;
            this.cityDetails.windSpeed = res.wind.speed;
            return this.cityDetails;
          }),
          catchError(err => {
            console.log('valami');
            return throwError(err);
            // this.errorObs
          })
        )
      ;
  }

  getWeatherForecast(city: string) {
    return this.http
    .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=8e1ba4b2f225318f7d1cd2cadf8fb035`)
    .pipe(
      map((res: any) => res.list),
      map(res => {
        const forecastArray: Forecast[] = [];
        res.map(item => {
          forecastArray.push({name: new Date(item.dt_txt), value: item.main.temp});
        })
        return forecastArray;
      })
    );
  }

}
