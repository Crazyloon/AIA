import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../quote.service';
import { Driver } from '../../data/models/domain/driver';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss']
})
export class DriverFormComponent implements OnInit {
  stateOptions: string[] = ["Select State", "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
  inputsComplete = 0;
  isOpen = true;
  driver: Driver;
  @Input() quote: Quote;
  @Output() quoteChange = new EventEmitter<Quote>();

  driverForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    ssn: ['', Validators.required],
    licenseNumber: ['', Validators.required],
    issuingState: ['', Validators.required],
    safeDrivingSchool: [false],
    under23YearsOld: [false]
  });

  constructor(private fb: FormBuilder, private quoteService: QuoteService) { }

  ngOnInit() {
    this.driver = new Driver();
  }

  get fName() { return this.driverForm.get('firstName'); }
  get lName() { return this.driverForm.get('lastName'); }
  get dateOfBirth() { return this.driverForm.get('dateOfBirth'); }
  get ssn() { return this.driverForm.get('ssn'); }
  get licenseNumber() { return this.driverForm.get('licenseNumber'); }
  get issuingState() { return this.driverForm.get('issuingState'); }
  get safeDrivingSchool() { return this.driverForm.get('safeDrivingSchool'); }
  get under23YearsOld() { return this.driverForm.get('under23YearsOld'); }

  onToggleClicked() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    this.addDriver();
    this.quote.addDriver(this.driver);
    this.updateQuote();
  }

  addDriver(): void {
    Object.assign(this.driver, this.driverForm.value);
    debugger;
    this.quoteService.addDriver(this.quote, this.driver)
      .subscribe(d => {
        this.driver = d;
      });
  }
  
  updateQuote(): void {
    this.quoteService.updateQuote(this.quote)
    .subscribe(q => {
      this.quoteChange.emit(this.quote);
    });
  }

  calculateAge(birthDate) {
    const dob = new Date(birthDate);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
