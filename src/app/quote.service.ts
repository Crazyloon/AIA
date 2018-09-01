import { Injectable } from '@angular/core';
import { Quote } from '../data/models/domain/quote';
import { Observable, of } from 'rxjs';1
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
  quotesUrl: 'api/quotes'
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ){ }

  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quotesUrl)
    .pipe(
      tap(heroes => this.log('fetched quotes')),
      catchError(this.handleError('getQuotes', []))
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
