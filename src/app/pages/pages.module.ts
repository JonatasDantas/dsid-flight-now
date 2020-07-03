import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule, NbContextMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { UserService } from '../@core/data/userService';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { FlightService } from '../@core/data/flightService';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    NbLayoutModule,
    NbContextMenuModule
  ],
  declarations: [
    PagesComponent,
    UserInfosComponent,
  ],
  providers: [UserService, FlightService]
})
export class PagesModule {
}
