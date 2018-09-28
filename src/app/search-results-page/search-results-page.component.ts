import { Component, OnInit } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { QuoteService } from '../quote.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss']
})
export class SearchResultsPageComponent implements OnInit {
  quotes: Quote[];
  quotes$: Observable<Quote[]>;
  filters: any;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quotes$ = this.quoteService.getQuotes();
  }

  onQuoteIdInput(quoteId: number){
    this.quotes$.pipe(
      filter((quote: Quote) => quote.id == quoteId)
    ).subscribe((quotes: Quote[]) => this.quotes = quotes);
  }

  onPriceMinInput(min: number){
    this.quotes$.pipe(
      filter((quote: Quote) => quote.price >= min)
    ).subscribe((quotes: Quote[]) => this.quotes = quotes);
  }

  onPriceMaxInput(max: number){
    this.quotes$.pipe(
      filter((quote: Quote) => quote.price >= max)
    ).subscribe((quotes: Quote[]) => this.quotes = quotes);
  }
}
