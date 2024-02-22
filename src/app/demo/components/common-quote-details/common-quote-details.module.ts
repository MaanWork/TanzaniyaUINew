import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { CommonQuoteDetailsComponent } from './common-quote-details.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [CommonQuoteDetailsComponent],
  imports: [
    CommonModule,
    BreadcrumbModule, 
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    SidebarModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    MessagesModule,
    RadioButtonModule,
    AutoCompleteModule
  ]
})
export class CommonQuoteDetailsModule { }
