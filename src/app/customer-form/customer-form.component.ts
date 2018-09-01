import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { CustomerForm } from '../../data/models/page/customerform';
import { QuoteInput } from '../../data/models/domain/quoteinput';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  previousCarrierOptions: string[] = ['Other', 'Lizard', 'Pervasive', 'None'];
  inputGroups: QuoteInput[] = CustomerForm;
  isOpen = true;

  @Input() quote: Quote;

  constructor() { }

  ngOnInit() {
  }

  onToggleClicked() {
    this.isOpen = !this.isOpen;
  }
}
