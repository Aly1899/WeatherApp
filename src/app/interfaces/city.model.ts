export interface City {
  cityName: string;
  temp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  forecast: Forecast[];
}

export interface Forecast{
  name: Date;
  value: number;
}
