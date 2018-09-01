import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  isOpen = true;
  @Input() quote: Quote;
  
  constructor() { }

  ngOnInit() {
  }

  onToggleClicked(){
    this.isOpen = !this.isOpen;
  }
}
