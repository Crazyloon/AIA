import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../quote.service';
import { Vehicle } from '../../data/models/domain/vehicle';
import { Driver } from '../../data/models/domain/driver';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  primaryDriverOptions = [];
  inputsComplete = 0;
  isOpen = true;
  vehicle: Vehicle;
  @Input() quote: Quote;
  @Output() quoteChange = new EventEmitter<Quote>();

  vehicleForm = this.fb.group({
    primaryDriverId: [0],
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
    // TODO: Use EventEmitter with form value
    console.warn(this.vehicleForm.value);
    // Map the vehicleForm values to the current vehicle.
    Object.assign(this.vehicle, this.vehicleForm.value);
    this.quote.addVehicle(this.vehicle)
    this.updateQuote();
  }

  updateQuote(): void {
    this.quoteService.updateQuote(this.quote)
      .subscribe(q => {
        this.quoteChange.emit(this.quote);
      });
  }
}
