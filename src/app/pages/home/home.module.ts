import { NgModule } from '@angular/core';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { SearchCardComponent } from './search-card/search-card.component';
import { TripCardComponent } from './trip-card/trip-card.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbDatepickerModule,
  ],
  declarations: [
    HomeComponent,
    SearchCardComponent,
    TripCardComponent,
  ],
})
export class HomeModule { }
