import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule, NbContextMenuModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { UserService } from '../@core/data/userService';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from '../@core/data/flightService';
import { LOCALE_ID } from '@angular/core';
import { GetCreditsComponent } from './user-infos/dialogs/get-credits/get-credits.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    NbSpinnerModule,
    NbLayoutModule,
    NbContextMenuModule,
    HttpClientModule,
  ],
  declarations: [
    PagesComponent,
    UserInfosComponent,
    GetCreditsComponent,
  ],
  providers: [UserService, FlightService, {provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class PagesModule {
}
