import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { CustomLoadingService } from './demo/shared/custom-loading.service';
import { SharedService } from './demo/service/shared.service';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public loading$!: Observable<any>;
    constructor(private primengConfig: PrimeNGConfig,public customLoder: CustomLoadingService,
        private cdr: ChangeDetectorRef,
        public _sharedService: SharedService,
        public router:Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    ngAfterContentChecked() {
        this.loading$ = this.customLoder.loader;
        this.cdr.detectChanges();
      }
      private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
        }
        if (event instanceof NavigationEnd) {
        window.scrollTo({
         top: 0
        });
      // or,  window.scroll(0,0);
        }
      }
}
