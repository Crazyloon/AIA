import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Vehicle } from '../../data/models/domain/vehicle';
import { Quote } from '../../data/models/domain/quote';
import { QuoteService } from '../quote.service';
import { DriverSelect } from '../../data/models/shared/driverselect';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  primaryDriverOptions: DriverSelect[] = [];
  inputsComplete = 0;
  isOpen = true;
  vehicle: Vehicle;
  private _quote: Quote;
  @Input() 
  set quote(quote: Quote){
    this._quote = quote;
    this.primaryDriverOptions = [];
    this._quote.drivers.forEach(d => this.primaryDriverOptions.push({id: d.id, fName: d.firstName, lName: d.lastName})); // d.id returns null because drivers are not added via quoteService or driverService
  }

  @Output() quoteChange = new EventEmitter<Quote>();

  vehicleForm = this.fb.group({
    primaryDriverId: [],
    vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', Validators.required],
    currentValue: ['', Validators.required],
    milesToWork: [''],
    annualMileage: ['', Validators.required],
    daysDrivenPerWeek: ['', Validators.required],
    antiTheft: [false],
    antilockBrakes: [false],
    daytimeLights: [false],
    nonResidenceGarage: [false],
    passiveRestraints: [false],
    reducedUsed: [false],
  });

  constructor(private fb: FormBuilder, private quoteService: QuoteService) {   }

  ngOnInit() {
    this.vehicle = new Vehicle();
  }

  get primaryDriverId() { return this.vehicleForm.get('primaryDriverId'); }
  get vin() { return this.vehicleForm.get('vin'); }
  get make() { return this.vehicleForm.get('make'); }
  get model() { return this.vehicleForm.get('model'); }
  get year() { return this.vehicleForm.get('year'); }
  get currentValue() { return this.vehicleForm.get('currentValue'); }
  get milesToWork() { return this.vehicleForm.get('milesToWork'); }
  get annualMileage() { return this.vehicleForm.get('annualMileage'); }
  get daysDrivenPerWeek() { return this.vehicleForm.get('daysDrivenPerWeek'); }
  get antiTheft() { return this.vehicleForm.get('antiTheft'); }
  get antilockBrakes() { return this.vehicleForm.get('antilockBrakes'); }
  get daytimeLights() { return this.vehicleForm.get('daytimeLights'); }
  get nonResidenceGarage() { return this.vehicleForm.get('nonResidenceGarage'); }
  get passiveRestraints() { return this.vehicleForm.get('passiveRestraints'); }

  onToggleClicked() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    console.warn(this.vehicleForm.value);
    Object.assign(this.vehicle, this.vehicleForm.value);
    this._quote.addVehicle(this.vehicle)
    this.updateQuote();
  }

  updateQuote(): void {
    this.quoteService.updateQuote(this._quote)
      .subscribe(q => {
        this.quoteChange.emit(this._quote);
      });
  }

  getPrimaryDrivers(){
    this.quoteService.getDrivers(this._quote.id)
      .subscribe(d => {
        this.primaryDriverOptions = [];    
        d.forEach(d => this.primaryDriverOptions.push({id: d.id, fName: d.firstName, lName: d.lastName}));
      });
  }
}
