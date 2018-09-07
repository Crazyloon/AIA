import { Injectable } from '@angular/core';
import { Quote } from '../data/models/domain/quote';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, take } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quotesUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.quotesUrl = 'api/quotes';
   }


  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>('api/quotes')
    .pipe(
      tap(quotes => this.log('Quote Service: got quotes!')),
      catchError(this.handleError('getQuotes', []))
    );
  }
  /** GET quote by id. Will 404 if id not found */
  getQuote(id: number): Observable<Quote> {
    const url = `${this.quotesUrl}/${id}`;
    return this.http.get<Quote>(url).pipe(
      tap(_ => this.log(`Quote Service: got quote id: ${id}`)),
      catchError(this.handleError<Quote>(`getQuote id: ${id}`))
    );
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.quotesUrl, quote, httpOptions).pipe(
      tap((q: Quote) => this.log(`Quote Service: ${q.id} added!`)),
      catchError(this.handleError<Quote>('addQuote'))
    );
  }

  deleteQuote (quote: Quote | number): Observable<Quote> {
    const id = typeof quote === 'number' ? quote : quote.id;
    const url = `${this.quotesUrl}/${id}`;

    return this.http.delete<Quote>(url, httpOptions).pipe(
      tap(_ => this.log(`Quote Service: ${id} deleted!`)),
      catchError(this.handleError<Quote>('deleteQuote'))
    );
  }

  /** PUT: update the quote on the server */
  updateQuote (quote: Quote): Observable<any> {
    return this.http.put(this.quotesUrl, quote, httpOptions).pipe(
      tap(_ => this.log(`Quote Service: ${quote.id} updated!`)),
      catchError(this.handleError<any>('updateQuote'))
    );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
