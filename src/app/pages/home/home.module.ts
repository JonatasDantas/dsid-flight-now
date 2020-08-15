import { NgModule } from '@angular/core';
import { NbCardModule, NbDatepickerModule, NbDialogModule, NbDialogConfig, NbPopoverModule, NbSpinnerModule, NbAutocompleteModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { SearchCardComponent } from './search-card/search-card.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { LOCALE_ID } from '@angular/core';
import { TripDetailsComponent } from './trip-details/trip-details.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    NbPopoverModule,
    NbSpinnerModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    HomeComponent,
    SearchCardComponent,
    TripCardComponent,
    TripDetailsComponent,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class HomeModule { }
