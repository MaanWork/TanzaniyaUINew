import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styles: [`.form-container input, p-dropdown { min-width: 20rem }`]
})
export class ReportComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Report'}];
  }
}
