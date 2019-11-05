import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../shared/services/user.service';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValidPassword = true;
  // user = {};
  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async login() {
    let user = await this.userService.getByKey('userName', this.loginForm.value.userName);
    console.log('User is', user);
    if (user === undefined) {
      this.userService.addData(this.loginForm.value.userName, this.loginForm.value.password)
      user = await this.userService.getByKey('userName', this.loginForm.value.userName)
      this.userService.activeUser = user;
      this.router.navigate(['/weather']);
    } else {
      if (user.password !== this.loginForm.value.password){
        this.isValidPassword = false;
      } else {
        this.userService.activeUser = user;
        this.router.navigate(['/weather']);
      }
    }
  }

}
