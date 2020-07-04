import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarService, NbMenuService, NbMenuModule, NbDatepickerModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { StoreModule } from '@ngrx/store';
import { TokenInterceptor } from './auth/httpInterceptor';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr)
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'}
    // { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
