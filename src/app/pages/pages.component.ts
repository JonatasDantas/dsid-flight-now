import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngx-pages',
  styleUrls: ['pages.component.scss'],


  templateUrl: './pages.component.html',
})
export class PagesComponent {
  user: any;
  currentTheme = 'default';
  userMenu = [{ title: 'Sair', link: '/pages/logout' }];

  items = [
    {title: 'minha conta'},
    {title: 'encerrar sessão'}
  ]

  constructor(
    private router: Router) {
  }

  navigateHome() {
    this.router.navigate(['/pages']);
  }

}
