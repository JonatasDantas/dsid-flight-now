import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { User } from '../../models/usuario.model';
import { FormBuilder, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  formEdition = this.fb.group({
    value: ['', Validators.required],
    confirm: ['', Validators.required]
  }, {validator: equalValidator})

  @LocalStorage() userData: User

  @ViewChild('inputValue', { static: false })
  inputValue: ElementRef<HTMLInputElement>;

  placeholderMessage: string;
  editingField: keyof User;
  editing = false;

  ngOnInit(): void {

  }


  submit() {
    console.log(this.formEdition);
  }

  alterar(field: keyof User) {
    this.editingField = field;
    this.editing = true;
    this.formEdition.get('value').setValue(this.userData[field])
    setTimeout(() => {
      this.inputValue.nativeElement.focus()
      this.inputValue.nativeElement.select()
    }, 100);
    
    switch (field) {
      case 'born_date':
        this.placeholderMessage = "a data de nascimento";
        break;
      case 'email':
        this.placeholderMessage = "o email";
        break;
      case 'name':
        this.placeholderMessage = "o nome";
        break;
      case 'username':
        this.placeholderMessage = "o nome de usuário";

        break;
    }
  }

}


function equalValidator(forms: AbstractControl): { [key: string]: boolean } | null {

  if (forms.get('value').value !== forms.get('confirm').value) {
    return {
      notEqual: true
    }
  }

  return null
}
