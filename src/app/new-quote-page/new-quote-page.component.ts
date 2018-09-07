import { Component, OnInit } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';

@Component({
  selector: 'app-new-quote-page',
  templateUrl: './new-quote-page.component.html',
  styleUrls: ['./new-quote-page.component.scss']
})
export class NewQuotePageComponent implements OnInit {
  quote: Quote = new Quote();
  constructor() { }

  ngOnInit() {
    this.quote.drivers = [];
    this.quote.vehicles = [];
  }


}
