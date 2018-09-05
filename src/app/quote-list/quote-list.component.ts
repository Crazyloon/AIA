import { Component, OnInit } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[];
  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.getQuotes();
    this.logQuotes();
  }

  getQuotes(): void {
    this.quoteService.getQuotes()
      .subscribe(quotes => this.quotes = quotes);
  }

  //NOTE: Use Lifecycle method instead of timeout to ensure this works everytime.
  /** Console logs the quotes array after it is retrieved via the API*/
  logQuotes(): void {
    setTimeout(() => {
      console.log(this.quotes);
    }, 1500);
  }
}
