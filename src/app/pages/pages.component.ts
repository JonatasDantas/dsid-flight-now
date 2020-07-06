import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'ngx-store';
import { NbMenuService } from '@nebular/theme';
import { UserService } from '../@core/data/userService';
import { User } from '../models/usuario.model';

@Component({
  selector: 'app-ngx-pages',
  styleUrls: ['pages.component.scss'],


  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  @LocalStorage() userData: User;

  user: any;
  currentTheme = 'default';
  userMenu = [{ title: 'Sair' }];

  items = [
    { title: 'minha conta' },
    { title: 'minhas passagens' },
    { title: 'encerrar sessão' }
  ]

  constructor(
    private router: Router,
    private nbMenuService: NbMenuService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userData;

    this.nbMenuService.onItemClick().subscribe((a) => {

      switch (a.item.title) {

        case 'minha conta':
          
          this.router.navigate(['pages/user-infos']);
          break;
        case 'encerrar sessão':
          this.userService.logout();
          this.router.navigate(['auth']);
          break;
        case 'minhas passagens':
          this.router.navigate(['pages/user-flights'])
          break;
          
        
      }
      
    })
  }

  navigateHome() {
    this.router.navigate(['/pages']);
  }

}
