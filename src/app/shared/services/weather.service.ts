import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { City, Forecast } from 'src/app/interfaces/city.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cityDetails = {} as City;
  private selectedTab: BehaviorSubject<number> = new BehaviorSubject(0);

  errorObs = new Observable<any>((observer) => {
    observer.next('error has been handled');
    observer.complete();
  });


  constructor(private http: HttpClient) { }

  getSelectedTab(): Observable<number> {
    return this.selectedTab.asObservable();
  }

  setSelectedTab(index: number) {
    return this.selectedTab.next(index);
  }

  getWeatherCurrent(city: string): Observable<any> {
    return this.http
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=8e1ba4b2f225318f7d1cd2cadf8fb035`)
        .pipe(
          map((res: any) => {
            console.log('cities :', res);
            this.cityDetails.cityName = res.name;
            this.cityDetails.temp = res.main.temp;
            this.cityDetails.humidity = res.main.humidity;
            this.cityDetails.pressure = res.main.pressure;
            this.cityDetails.windSpeed = res.wind.speed;
            return this.cityDetails;
          }),
          catchError(err => {throw new Error('No such city'); })
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
      }),
      catchError(err => of(`I caugth ${err}`))
    );
  }

}
