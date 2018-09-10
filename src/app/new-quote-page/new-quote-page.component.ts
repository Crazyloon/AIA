import { Component, OnInit } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';

@Component({
  selector: 'app-new-quote-page',
  templateUrl: './new-quote-page.component.html',
  styleUrls: ['./new-quote-page.component.scss']
})
export class NewQuotePageComponent implements OnInit {
  public quote: Quote = new Quote();
  public driverSelection: {id: number, name: string};
  public driverOptions: {id: number, name: string}[] = [];

  constructor() { }

  ngOnInit() {
    this.quote.drivers = [];
    this.quote.vehicles = [];
  }

  driverSelectionAdded(driverSelection: {id: number, name: string}){
    debugger;
    this.driverSelection = driverSelection;
    this.driverOptions.push(driverSelection);
  }

}
