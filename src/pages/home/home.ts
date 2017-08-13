import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { ResultsPage } from '../../pages/results/results'
import { PerfomanceDataProvider } from '../../providers/perfomance-data/perfomance-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public person: PersonProvider,
    public perfomanceData: PerfomanceDataProvider,
    public modalCtrl: ModalController
  ) {
    this.user = { distance: 3000, age: 20, gender: 'female' };
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
