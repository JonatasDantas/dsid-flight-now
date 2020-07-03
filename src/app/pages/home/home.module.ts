import { NgModule } from '@angular/core';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { SearchCardComponent } from './search-card/search-card.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { LOCALE_ID } from '@angular/core';

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
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class HomeModule { }
