import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Quote } from '../../data/models/domain/quote';
import { CustomerForm } from '../../data/models/page/customerform';
import { QuoteInput } from '../../data/models/domain/quoteinput';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  previousCarrierOptions: string[] = ['Other', 'Lizard', 'Pervasive', 'None']; // Select these from database
  inputsComplete = 0;
  isOpen = true;
  @Input() quote: Quote;
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    email: ['', Validators.email],
    phone: [''],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    ssn: ['', Validators.required],
    previousCarrier: ['None', Validators.required],
    pastClaims: [false],
    movingViolations: [false],
    newDriver: [false],
    multiCar: [false]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
  }

  get fName() { return this.customerForm.get('firstName'); }
  get lName() { return this.customerForm.get('lastName'); }
  get dateOfBirth() { return this.customerForm.get('dateOfBirth'); }
  get email() { return this.customerForm.get('email'); }
  get phone() { return this.customerForm.get('phone'); }
  get address() { return this.customerForm.get('address'); }
  get city() { return this.customerForm.get('city'); }
  get state() { return this.customerForm.get('state'); }
  get zip() { return this.customerForm.get('zip'); }
  get ssn() { return this.customerForm.get('ssn'); }
  get previousCarrier() { return this.customerForm.get('previousCarrier'); }
  get pastClaims() { return this.customerForm.get('pastClaims'); }
  get movingViolations() { return this.customerForm.get('movingViolations'); }
  get newDriver() { return this.customerForm.get('newDriver'); }
  get multiCar() { return this.customerForm.get('multiCar'); }

  onToggleClicked() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.customerForm.value);
  }

  onFormFieldCompleted() {
    this.inputsComplete++;
  }
}
