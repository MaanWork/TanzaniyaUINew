import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html'
})
export class ReferralComponent implements OnInit {
  items: MenuItem[] | undefined;
  quoteOptions: any[] = [{label: 'Quotes', value: 'quotes'}, {label: 'Endrosements', value: 'endrosements'}];
  value: string = 'quotes';

  branches: MenuItem[] | undefined;
  selectedBranch: MenuItem | undefined;
  
  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Referral'}];
    this.branches = [
      { label: 'Test', target: 'T' },
    ];
  }
}
