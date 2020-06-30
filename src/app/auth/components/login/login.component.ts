import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../@core/data/userService';

const ERROR_MESSAGES = {
  400: 'As credenciais informadas estão inválidas. Tente novamente.',
  401: 'As credenciais informadas estão inválidas. Tente novamente.',
};

@Component({
  selector: 'app-ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnDestroy {
    errors: string[] = [];
    messages: string[] = [];
    user: any = {
      provider: null,
      username: null,
      password: null,
    };
    submitted = false;
    infoResult: string;

    constructor(
      private router: Router,
      private userService: UserService,
      @Inject(DOCUMENT) private doc: Document,
    ) {
      if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
        this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.infoResult) {
        this.infoResult = this.router.getCurrentNavigation().extras.state.infoResult;
      }
    }

    login(): void {
      this.errors = this.messages = [];
      this.submitted = true;
      const self = this;

      this.userService.login(this.user.username, this.user.password).pipe(
        untilDestroyed(this),
        finalize(() => this.submitted = false),
      ).subscribe({
        next: (response) => {
          if (response.isLogged) {
            this.router.navigate(['/pages']);
          }
        },
        error: err => {
          this.errors.push(ERROR_MESSAGES[400]);
        },
        complete: () => { },
      });
    }

    registerUser() {
      this.router.navigate(['auth/register-user']);
    }

    ngOnDestroy() {}
  }
