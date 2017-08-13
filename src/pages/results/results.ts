import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerfomanceDataProvider } from '../../providers/perfomance-data/perfomance-data';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  results = [];
  constructor(
    private perfomanceData: PerfomanceDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.perfomanceData
      .getResults()
      .subscribe(data => (this.results = data.entries));
  }
}
