import { NgModule } from '@angular/core';
import { NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ThemeModule } from '../@theme/theme.module';
import { UserService } from '../@core/data/userService';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const PAGES_COMPONENTS = [
    LoginComponent,
    AuthComponent,
    RegisterUserComponent,
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
      UserService
    ],
  })
export class AuthModule { }

