import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CityListComponent } from './city-list/city-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'weather', component: CityListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
