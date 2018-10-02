import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { QuoteService } from '../quote.service';
import { filterTypes } from '../../data/models/domain/filtertypes';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNumber, isDate } from 'util';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss']
})
export class SearchResultsPageComponent implements OnInit {
  stateOptions: string[] = ["Select State", "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
  _quotes: Quote[];
  quotes: Quote[];
  filters: any[];
  @ViewChild('txtQuoteId') txtQuoteId: ElementRef;
  @ViewChild('dateStart') dateStart: ElementRef;
  @ViewChild('dateEnd') dateEnd: ElementRef;
  @ViewChild('priceMin') priceMin: ElementRef;
  @ViewChild('priceMax') priceMax: ElementRef;
  @ViewChild('txtFirstName') txtFirstName: ElementRef;
  @ViewChild('txtLastName') txtLastName: ElementRef;
  @ViewChild('txtPhoneNo') txtPhoneNo: ElementRef;
  @ViewChild('txtEmail') txtEmail: ElementRef;
  @ViewChild('txtCity') txtCity: ElementRef;
  @ViewChild('cboState') cboState: ElementRef;
  @ViewChild('txtZip') txtZip: ElementRef;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes()
      .subscribe((filteredQuotes: Quote[]) => {
        this._quotes = filteredQuotes;
        this.quotes = filteredQuotes
      });
      this.filters = [];
  }


  onRemoveFilterClick(filterType: string){
    console.log("Filter Type: " + filterType);
    this.filters = this.filters.filter((f: any) => f.type !== filterType);
    switch(filterType){
      case filterTypes.QuoteId:
        this.txtQuoteId.nativeElement.value = '';
        break;
      case filterTypes.QuotedAfterDate:
        this.dateStart.nativeElement.value = '';
        break;
      case filterTypes.QuotedBeforeDate:
        this.dateEnd.nativeElement.value = '';
        break;
      case filterTypes.MinimumPrice:
        this.priceMin.nativeElement.value = '';
        break;
      case filterTypes.MaximumPrice:
        this.priceMax.nativeElement.value = '';
        break;
      case filterTypes.FirstName:
        this.txtFirstName.nativeElement.value = '';
        break;
      case filterTypes.LastName:
        this.txtLastName.nativeElement.value = '';
        break;
      case filterTypes.Phone:
        this.txtPhoneNo.nativeElement.value = '';
        break;
      case filterTypes.Email:
        this.txtEmail.nativeElement.value = '';
        break;
      case filterTypes.City:
        this.txtCity.nativeElement.value = '';
        break;
      case filterTypes.State:
        this.cboState.nativeElement.selectedIndex = 0;
        break;
      case filterTypes.Zip:
        this.txtZip.nativeElement.value = '';
        break;
      
      default:
        console.error('Strange filterType encountered');
      
    }
    this.applySearchFilters();
  }

  byQuoteId(quote: Quote, value: number){
    return quote.id == value;
  }
  byAfterDate(quote: Quote, value: Date){
    const quoteDate = new Date(quote.dateQuoted);
    return quoteDate >= value;
  }
  byBeforeDate(quote: Quote, value: Date){
    const quoteDate = new Date(quote.dateQuoted);
    return quoteDate <= value;
  }
  byMinPrice(quote: Quote, value: number){
    return quote.price >= value;
  }
  byMaxPrice(quote: Quote, value: number){
    return quote.price <= value;
  }
  byFirstName(quote: Quote, value: string){
    return quote.firstName.toLowerCase().includes(value.toLowerCase());
  }
  byLastName(quote: Quote, value: string){
    return quote.lastName.toLowerCase().includes(value.toLowerCase());
  }
  byPhoneNo(quote: Quote, value: string){
    return quote.phone.toLowerCase().includes(value.toLowerCase());
  }
  byEmail(quote: Quote, value: string){
    return quote.email.toLowerCase().includes(value.toLowerCase());
  }
  byCity(quote: Quote, value: string){
    return quote.city.toLowerCase().includes(value.toLowerCase());
  }
  byState(quote: Quote, value: string){
    return quote.state.toLowerCase().includes(value.toLowerCase());
  }
  byZip(quote: Quote, value: string){
    return quote.zip.toLowerCase().includes(value.toLowerCase());;
  }

  onQuoteIdInput(value: string){
    const id = parseInt(value);
    const filter = { type: filterTypes.QuoteId, symbol: "", value: id, func: this.byQuoteId };
    const shouldFilter = isNumber(id) && id >= 0;
    this.addSearchFilter(shouldFilter, filterTypes.QuoteId, filter);
    this.applySearchFilters();
  }

  onDateAfterInput(startDate: string){
    const firstHyphen = startDate.indexOf('-');
    const stringPartMonthDay = startDate.substring(firstHyphen + 1);
    const secondHyphen = stringPartMonthDay.indexOf('-') + firstHyphen + 1;
    const year = +startDate.substring(0, firstHyphen);
    const month = +startDate.substring(firstHyphen + 1, secondHyphen);
    const day = +startDate.substring(secondHyphen + 1);
    console.log(`year: ${year} month: ${month} day: ${day}`);

    let start = new Date(year, month -1, day);
    const filter = { type: filterTypes.QuotedAfterDate, symbol: '', value: start, func: this.byAfterDate };
    const shouldFilter = year != 0;
    this.addSearchFilter(shouldFilter, filterTypes.QuotedAfterDate, filter);
    this.applySearchFilters();
  }

  onDateBeforeInput(endDate: string){
    const firstHyphen = endDate.indexOf('-');
    const stringPartMonthDay = endDate.substring(firstHyphen + 1);
    const secondHyphen = stringPartMonthDay.indexOf('-') + firstHyphen + 1;
    const year = +endDate.substring(0, firstHyphen);
    const month = +endDate.substring(firstHyphen + 1, secondHyphen);
    const day = +endDate.substring(secondHyphen + 1);

    let end = new Date(year, month - 1, day);
    const filter = { type: filterTypes.QuotedBeforeDate, symbol: '', value: end, func: this.byBeforeDate };
    const shouldFilter = year != 0;
    this.addSearchFilter(shouldFilter, filterTypes.QuotedBeforeDate, filter);
    this.applySearchFilters();
  }

  onPriceMinInput(min: string){
    const minPrice = parseInt(min);
    const filter = { type: filterTypes.MinimumPrice, symbol: '', value: min, func: this.byMinPrice };
    const shouldFilter = !isNaN(minPrice) && minPrice >= 0;
    this.addSearchFilter(shouldFilter, filterTypes.MinimumPrice, filter);
    this.applySearchFilters();
  }
  
  onPriceMaxInput(max: string){
    const maxPrice = parseInt(max);
    const filter = { type: filterTypes.MaximumPrice, symbol: '', value: max, func: this.byMaxPrice };
    const shouldFilter = !isNaN(maxPrice) && maxPrice >= 0;
    this.addSearchFilter(shouldFilter, filterTypes.MaximumPrice, filter);
    this.applySearchFilters();
  }

  onFirstNameInput(fname: string){
    const filter = { type: filterTypes.FirstName, symbol: '', value: fname, func: this.byFirstName };
    const shouldFilter = fname.length > 0;
    this.addSearchFilter(shouldFilter, filterTypes.FirstName, filter);
    this.applySearchFilters();
  }

  onLastNameInput(lname: string){
    const filter = { type: filterTypes.LastName, symbol: '', value: lname, func: this.byLastName };
    const shouldFilter = lname.length > 0;
    this.addSearchFilter(shouldFilter, filterTypes.LastName, filter);
    this.applySearchFilters();
  }
  onPhoneNoInput(phone: string){
    const filter = { type: filterTypes.Phone, symbol: '', value: phone, func: this.byPhoneNo };
    const shouldFilter = phone.length > 0;
    this.addSearchFilter(shouldFilter, filterTypes.Phone, filter);
    this.applySearchFilters();
  }
  onEmailInput(email: string){
    const filter = { type: filterTypes.Email, symbol: '', value: email, func: this.byEmail };
    const shouldFilter = email.length > 0;
    this.addSearchFilter(shouldFilter, filterTypes.Email, filter);
    this.applySearchFilters();
  }
  onCityInput(city: string){
    const filter = { type: filterTypes.City, symbol: '', value: city, func: this.byCity };
    const shouldFilter = city.length > 0;
    this.addSearchFilter(shouldFilter, filterTypes.City, filter);
    this.applySearchFilters();
  }
  
  onStateSelected(selectedIndex: number, state: string){
    const filter = { type: filterTypes.State, symbol: '', value: state, func: this.byState };
    const shouldFilter = selectedIndex > 0;
    this.addSearchFilter(shouldFilter, filterTypes.State, filter);
    this.applySearchFilters();
  }
  
  onZipInput(zip: string){
    const filter = { type: filterTypes.Zip, symbol: '', value: zip, func: this.byZip };
    const shouldFilter = zip.length > 0;
    this.addSearchFilter(shouldFilter, filterTypes.Zip, filter);
    this.applySearchFilters();
  }

  /**
   * Adds a search filter to the filters list
   * 
   * @param shouldFilter A condition determining whether the input is valid to filter on
   * @param filterType A filterType enum that determines the type of filter to add
   * @param filter An object that contains information about the filter (type, symbol, value, function)
   */
  private addSearchFilter(shouldFilter: boolean, filterType: filterTypes, filter: any) {
    if (shouldFilter) {
      let filterIndex = this.filters.findIndex(filter => filter.type == filterType);
      if (filterIndex < 0) {
        this.filters.push(filter);
      }
      this.filters[filterIndex] = filter;
    }
    else {
      this.filters = this.filters.filter((f: any) => f.type !== filterType);
    }
  }

/**
 * Resets the quote array and applies all currently active filters to it
 */
  applySearchFilters(){
    this.quotes = this._quotes;
    this.filters.forEach(searchFilter => this.quotes = this.quotes.filter((q: Quote) => searchFilter.func(q, searchFilter.value)));
  }
}
