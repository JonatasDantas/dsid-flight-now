import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    NbLayoutModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: []
})
export class PagesModule {
}
