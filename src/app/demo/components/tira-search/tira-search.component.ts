import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tira-search',
  templateUrl: './tira-search.component.html',
  styles: [`input, p-dropdown { max-width: 280px; }`]
})
export class TiraSearchComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Tira Search'}];
  }
}
