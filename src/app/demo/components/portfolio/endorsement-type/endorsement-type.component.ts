import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from 'src/app/demo/service/node.service';

@Component({
  selector: 'app-endorsement-type',
  templateUrl: './endorsement-type.component.html',
  styleUrls: ['./endorsement-type.component.scss']
})
export class EndorsementTypeComponent {
  stateOptions: any[] = [
    { label: 'RemovalOfCovers', value: 'Removal Of Covers' },
    // { label: 'AddNewCovers', value: 'Add New Covers' },
    
];
stateOptions1: any[] = [
  // { label: 'RemovalOfCovers', value: 'Removal Of Covers' },
  { label: 'AddNewCovers', value: 'Add New Covers' },
  
];
stateOptions2: any[] = [
    { label: 'Modification of Sum Insured', value: 'Modification of Sum Insured' },
    // { label: 'Option 2', value: 'Option 2', constant: true }
];

stateOptions3: any[] = [
  { label: 'Modification Of Collateral Details', value: 'Modification Of Collateral Details' },
];
stateOptions4: any[] = [
  { label: 'Change Of Currency Type', value: 'Change Of Currency Type' },
];
stateOptions5: any[] = [
  { label: 'Remove Existing Vehicle Details', value: 'Remove Existing Vehicle Details' },
];
stateOptions6: any[] = [
  { label: 'Add New Vehicle Detail', value: 'Add New Vehicle Detail' },
];
stateOptions7: any[] = [
  { label: 'Modification Of Policy Period', value: 'Modification Of Policy Period' },
];
stateOptions8: any[] = [
  { label: 'Add AddOn Covers', value: 'Add AddOn Covers' },
];
stateOptions9: any[] = [
  { label: 'Modification Of Driver Details', value: 'Modification Of Driver Details' },
];
stateOptions10: any[] = [
  { label: 'Modification Of Document Details', value: 'Modification Of Document Details' },
];
stateOptions11: any[] = [
  { label: 'Updating The Customer Information', value: 'Updating The Customer Information' },
];
ingredient!: string;
value1: string = 'Removal Of Covers';
files!: TreeNode[];
  items: ({ label: string; routerLink: string; } | { label: string; routerLink?: undefined; })[];
constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
        this.items = [{ label: 'Home', routerLink:'/' }, {label:'Portfolio',routerLink:'/portfolio'},{label:'Endorsement',routerLink:'/portfolio/endorsement'},{label:'Endorsement Type'}];
    } 
}
