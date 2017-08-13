import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService } from 'angular2-token';

import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, visible_for: string, component: any}>;

  currentUser = undefined;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private _tokenService: Angular2TokenService) {
      this._tokenService.init({
        apiBase: 'https://j0sv-cooper-api.herokuapp.com/api/v1'
      });

      this.currentUser = undefined;

      this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Home', visible_for: 'all', component: HomePage }
        ];

    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page);
    }

    openResultPage() {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(ResultsPage);
    }

    test() {
      console.log('popup');
      let confirm = this.alertCtrl.create({
        title: 'Sign Up',
        inputs: [
          {
            name: 'email',
            placeholder: 'email'
          },
          {
            name: 'password',
            placeholder: 'password',
            type: 'password'
          },
          {
            name: 'passwordConfirmation',
            placeholder: 'passwordConfirmation',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sign Up',
            handler: data => {
              this.registerAccount(data);
            }
          }
        ]
      });
      confirm.present();
      this.openPage(HomePage);
    }

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
    this.openPage(HomePage);
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
      this.presentToast('User signed in.')
  }

  registerAccount(credentials) {
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
      this.presentToast('User created.')
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
    this.openPage(HomePage);
    this.presentToast('User signed out.')
  }

  presentToast(message_text) {
    let toast = this.toastCtrl.create({
      message: message_text,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
