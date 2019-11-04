import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeUser: User;
  constructor(private dbService: NgxIndexedDBService) {
    dbService.currentStore = 'people';
  }
  getData(id: number){
    this.dbService.getByID(id).then(
      person => {
          console.log(person);
      },
      error => {
          console.log(error);
      }
    );
  }

  addData(userName: string, password: string){
    let cities = [];
    this.dbService.add({ userName, password, cities: cities }).then(
      (user) => {
        return user;
      },
      error => {
        console.log(error);
      }
      );
    }

  getByKey(key, value) {
    return this.dbService.getByIndex(key, value);
  }

  addCity(city: string){
    this.activeUser.cities.push(city)
    this.dbService.update({
      userName: this.activeUser.userName,
      password: this.activeUser.password,
      cities: this.activeUser.cities,
      id: this.activeUser.id
    }).then(
      () => {
        console.log(this.activeUser.cities);
      },
      error => {
        console.log(error);
      }
      );
  }

  deleteCity(city: string){
    this.activeUser.cities.splice(this.activeUser.cities.indexOf(city), 1);
    this.dbService.update({
      userName: this.activeUser.userName,
      password: this.activeUser.password,
      cities: this.activeUser.cities,
      id: this.activeUser.id
    }).then(
      () => {
        console.log(this.activeUser.cities);
      },
      error => {
        console.log(error);
      }
      );
  }

}
