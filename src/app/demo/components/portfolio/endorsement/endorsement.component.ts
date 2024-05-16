import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endorsement',
  templateUrl: './endorsement.component.html',
  styleUrls: ['./endorsement.component.scss']
})
export class EndorsementComponent {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  PolicyNo:any;
  QuoteNo:any;
  Categoery:any;
  Type:any;
  Primium:any;
  EndorsementPrimium:any;
  Status:any;
  rows:any[] = [];
  columns:string[] = [];
  items: ({ label: string; routerLink: string; } | { label: string; routerLink?: undefined; })[];
  constructor(private router:Router,private sharedService:SharedService){

  }
  ngOnInit() {
     this.items = [{ label: 'Home', routerLink:'/' },{label:'Portfolio',routerLink:'/portfolio'},{label:'Endorsement'}];
    // this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}, {label: 'Delete',icon: PrimeIcons.TRASH}];
    this.columns = [ 'Policy No','Quote No',  'Category','Type', 'primium(TZS)', 'Endorsement Primium(TZS)', 'Status', 'Action'];
    // this.customers = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];
    // this.PolicyNo = 'P11/2024/110/99999/10/1003815';
    // this.QuoteNo="AICQ11776";
    // this.Categoery="Debit";
    // this.Type="Debit";
    // this.Primium="23600";
    // this.EndorsementPrimium="23600";
   // this.Status="Y";
    this.rows = [
      {
        PolicyNo:'P11/2024/110/99999/10/1003815',
        QuoteNo:'AICQ11776',
        Categoery: 'Debit',
        Type: 'Debit',
        Primium: '23600',
        EndorsementPrimium: '23600',
        Status:"Y"
      }
    ];

  }


  navigateTo(){
    this.router.navigate(['/portfolio']);
  }
  addNew(){
    this.router.navigate(['/portfolio/endorsementtype']);


  }
//   getPolicyItems(rowData){
//     let entry:MenuItem[] =  [{
//       label: 'PDF',
//       items: [{
//           label: 'Schedule',
//           icon: 'pi pi-file-pdf',
//           command: () => {
//                 this.onGetSchedule(rowData)
//           }
//       },
//       {
//         label: 'Debit Note',
//         icon: 'pi pi-file-pdf',
//         command: () => {
//             this.onDebitdownload(rowData)
//         }
//       },
//       {
//         label: 'Credit Note',
//         icon: 'pi pi-file-pdf',
//         command: () => {
//           this.onCreditdownload(rowData);
//         }
//       }
//       ]},
//       {
//           label: 'Others',
//            items: [
//           //  {
//           //     // label: 'Endorsement',
//           //     // icon: 'pi pi-external-link',
//           // //     command: () => {
//           // //       this.router.navigate(['/portfolio/endorsement'])
//           // // }
//           // },
//           {
//               label: 'View Quote Details',
//               icon: 'pi pi-eye'
//           }
//       ]}
//     ];
//   return entry;
// }

// onGetSchedule(rowData){
//   let ReqObj = {
//     "QuoteNo":rowData.QuoteNo
//   }
//   let urlLink = `${this.CommonApiUrl}pdf/policyform`;
//   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
//     (data: any) => {
//       console.log(data);
//       if(data?.Result?.PdfOutFile){
//           this.downloadMyFile(data.Result.PdfOutFile,'Schedule');
//       }
//       else{
//         Swal.fire({
//           title: '<strong>Schedule Pdf</strong>',
//           icon: 'error',
//           html:
//             `No Pdf Generated For this Policy`,
//           //showCloseButton: true,
//           //focusConfirm: false,
//           showCancelButton: false,

//           //confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           cancelButtonText: 'Cancel',
//         })
//       }
//     },
//     (err) => { },
//   );
// }

// onDebitdownload(rowData){
//   console.log('KKKKKKKKKKK',rowData.QuoteNo);
//   let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`

//   this.sharedService.onGetMethodSync(urlLink).subscribe(
//     (data: any) => {
//       console.log(data);
//       if(data?.Result?.PdfOutFile){
//         this.downloadMyFile(data.Result.PdfOutFile,'DebitPdf');
//     }
//   },
//     (err) => { },
//   );
// }
// onCreditdownload(rowData){
//   console.log('KKKKKKKKKKK',rowData.QuoteNo);
//   let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`

//   this.sharedService.onGetMethodSync(urlLink).subscribe(
//     (data: any) => {
//       console.log(data);
//       if(data?.Result?.PdfOutFile){
//         this.downloadMyFile(data.Result.PdfOutFile,'Creditpdf');
//     }
//   },
//     (err) => { },
//   );
// }

// downloadMyFile(data,name) {
//   const link = document.createElement('a');
//   link.setAttribute('target', '_blank');
//   link.setAttribute('href', data);
//   link.setAttribute('download',name);
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
// }
}