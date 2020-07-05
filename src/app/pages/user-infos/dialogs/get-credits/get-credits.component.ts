import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetCreditsService } from './get-credits.service';
import { UserService } from '../../../../@core/data/userService';
@Component({
  selector: 'app-get-credits',
  templateUrl: './get-credits.component.html',
  styleUrls: ['./get-credits.component.scss']
})
export class GetCreditsComponent implements OnInit {

  formCredit = this.fb.group({
    valor: [null, Validators.required]
  })

  loading = false;

  @Output() complete = new EventEmitter<void>()

  constructor(
    private fb: FormBuilder,
    private getCredits: GetCreditsService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
  }

  ObtainCredits() {
    this.loading = true;
    this.getCredits.PostCredits(parseFloat(this.formCredit.get('valor').value))
      .subscribe(
        success => {
          this.userService.setUser(success);
          this.complete.emit();
          this.loading = false
        },
        error => {
          console.error(error);          
          this.loading = false
        }
    )
  }

}
