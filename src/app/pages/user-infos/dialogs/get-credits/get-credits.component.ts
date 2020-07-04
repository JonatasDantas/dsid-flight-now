import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-credits',
  templateUrl: './get-credits.component.html',
  styleUrls: ['./get-credits.component.scss']
})
export class GetCreditsComponent implements OnInit {

  formCredit = this.fb.control({
    valor: [null, Validators.required, Validators.pattern('')]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
