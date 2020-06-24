import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';

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
      @Inject(DOCUMENT) private doc: Document,
    ) {
      if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
        this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.infoResult) {
        this.infoResult = this.router.getCurrentNavigation().extras.state.infoResult;
      }
    }

    login(overrideSession = false): void {

    }

    registerUser() {}

    onError(err: any) {

    }

    ngOnDestroy() {}
  }
