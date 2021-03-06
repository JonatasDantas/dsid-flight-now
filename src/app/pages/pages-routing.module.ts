import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { UserFlightsComponent } from './user-flights/user-flights.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'user-infos',
      component: UserInfosComponent,
    },
    {
      path: 'user-flights',
      component: UserFlightsComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
