import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results'

import { PersonProvider } from '../providers/person/person';
import { CooperProvider } from '../providers/cooper/cooper';
import { PerfomanceDataProvider } from '../providers/perfomance-data/perfomance-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    RouterModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PersonProvider,
    CooperProvider,
    Angular2TokenService,
    PerfomanceDataProvider
  ]
})
export class AppModule {}
