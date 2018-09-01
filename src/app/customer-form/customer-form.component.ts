import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  isOpen = true;
  
  constructor() { }

  ngOnInit() {
  }

  onToggleClicked(){
    this.isOpen = !this.isOpen;
  }
}
