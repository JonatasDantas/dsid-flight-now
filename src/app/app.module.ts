import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarService, NbMenuService, NbMenuModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    ThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    NbSidebarService,
    NbMenuService,
    // { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
