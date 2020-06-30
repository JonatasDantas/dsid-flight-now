import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../@core/data/userService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit, OnDestroy {
    errors: string[] = [];
    form;
    submitted = false;
    success = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            username: [null, Validators.required],
            password: [null, Validators.required],
            email: [null, Validators.required],
        });
    }

    onSubmit() {
        this.errors = [];
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
          }
      
          this.submitted = true;
          let data = this.form.value;

          this.userService.upsert(data).pipe(
              untilDestroyed(this),
              finalize(() => this.submitted = false),
          ).subscribe({
              next: () => {
                this.success = true;

                setTimeout(() => {
                    this.onReturn();
                }, 2000);
              },
              error: (err) => {
                console.log(err);
                this.errors.push(err);
              }
          })
    }

    onReturn() {
        this.router.navigate(['auth']);
    }

    ngOnDestroy() {}
}