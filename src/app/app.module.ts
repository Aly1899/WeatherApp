import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatIconModule} from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CityListComponent } from './city-list/city-list.component';
import { CityComponent } from './city-list/city/city.component';
import { InputDialogComponent } from './shared/modals/input-dialog/input-dialog.component';
import { AddCityComponent } from './city-list/add-city/add-city.component';

const dbConfig: DBConfig  = {name: 'MyDb', version: 1, objectStoresMeta: [
  {
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'userName', keypath: 'userName', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: false } },
      { name: 'cities', keypath: 'cities', options: { unique: false } }
    ]
  }
]};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CityListComponent,
    CityComponent,
    InputDialogComponent,
    AddCityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    NgxChartsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,

    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  entryComponents: [
    InputDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
