import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'ngx-store';
import { NbMenuService } from '@nebular/theme';
import { UserService } from '../@core/data/userService';

@Component({
  selector: 'app-ngx-pages',
  styleUrls: ['pages.component.scss'],


  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  @LocalStorage() private userData: any;

  user: any;
  currentTheme = 'default';
  userMenu = [{ title: 'Sair' }];

  items = [
    {title: 'minha conta'},
    {title: 'encerrar sessão'}
  ]

  constructor(
    private router: Router,
    private nbMenuService: NbMenuService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userData;

    this.nbMenuService.onItemClick().subscribe((a) => {
      this.userService.logout();
      this.router.navigate(['auth']);
    })
  }

  navigateHome() {
    this.router.navigate(['/pages']);
  }

}
