import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column class="d-flex" style="background-color: #2473c7">
        <div class="flex-centered col-xl-5 col-lg-6 col-md-8 col-sm-12">
          <router-outlet></router-outlet>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,

})
export class AuthComponent implements OnInit, OnDestroy {

  online = true;

  ngOnInit() {
  }

  ngOnDestroy() { }
}
