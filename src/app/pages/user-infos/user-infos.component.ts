import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-store';
import { User, UserPut } from '../../models/usuario.model';
import { FormBuilder, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../../@core/data/userService';
import { UserInfosService } from './user-infos.service';
import { NbDialogService } from '@nebular/theme';
import { GetCreditsComponent } from './dialogs/get-credits/get-credits.component';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService,
    public userService: UserService,
    private dialogService: NbDialogService) { }

  formEdition = this.fb.group({
    value: ['', Validators.required],
    confirm: ['', Validators.required]
  }, { validator: equalValidator })


  @ViewChild('inputValue', { static: false })
  inputValue: ElementRef<HTMLInputElement>;

  placeholderMessage: string;
  editingField: keyof User;
  editing = false;

  ngOnInit(): void {

  }


  submit() {
    let user: UserPut = {};
    user[this.editingField] = this.formEdition.get('value').value
    this.loading = true;
    this.userInfosService.dispatchInfos(user, this.userService.userData.id).subscribe(
      userRes => {
        this.loading = false;
        this.editing = false;
        this.userService.setUser(userRes);
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    )
  }

  openDialogCredits() {
    this.dialogService.open(GetCreditsComponent)
  }

  alterar(field: keyof User) {
    this.editingField = field;
    this.editing = true;
    this.formEdition.get('value').setValue(this.userService.userData[field])
    setTimeout(() => {
      this.inputValue.nativeElement.focus()
      this.inputValue.nativeElement.select()
    }, 100);

    switch (field) {
      case 'born_date':
        this.placeholderMessage = "a data de nascimento";
        this.formEdition.controls.value.setValidators([Validators.required])
        break;
      case 'email':
        this.placeholderMessage = "o email";
        this.formEdition.controls.value.setValidators([Validators.email, Validators.required])
        break;
      case 'name':
        this.placeholderMessage = "o nome";
        this.formEdition.controls.value.setValidators([Validators.required, Validators.pattern(/.{2,} .+/)])
        break;
      case 'username':
        this.placeholderMessage = "o nome de usuário";
        this.formEdition.controls.value.setValidators([Validators.required, Validators.pattern(/.{5,}/)])

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
