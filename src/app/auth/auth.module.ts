import { NgModule } from '@angular/core';
import { NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ThemeModule } from '../@theme/theme.module';
import { LoginService } from '../@core/data/loginService';

const PAGES_COMPONENTS = [
    LoginComponent,
    AuthComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        RouterModule,
        AuthRoutingModule,
    ],
    declarations: [
      ...PAGES_COMPONENTS,
    ],
    providers: [
      LoginService
    ],
  })
export class AuthModule { }

