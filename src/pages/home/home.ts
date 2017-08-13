import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { ResultsPage } from '../../pages/results/results'
import { PerfomanceDataProvider } from '../../providers/perfomance-data/perfomance-data';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user: any = {};
  userIsLoggedIn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public person: PersonProvider,
    public perfomanceData: PerfomanceDataProvider,
    public modalCtrl: ModalController,
    private _tokenService: Angular2TokenService
  ) {
    this.user = { distance: 3000, age: 20, gender: 'female' };
    this.userIsLoggedIn = _tokenService.userSignedIn();

    console.log(this.userIsLoggedIn);
  }

  showResults() {
  this.modalCtrl.create(ResultsPage).present();
  }

  calculate() {
    this.person.age = this.user.age;
    this.person.gender = this.user.gender;

    this.person.doAssessment(this.user, this.user.distance);
  }

  saveResult() {
    this.person.age = this.user.age;
    this.person.gender = this.user.gender;

    this.perfomanceData
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
      .subscribe(data => console.log(data));
  }

}
