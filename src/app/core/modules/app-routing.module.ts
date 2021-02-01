import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';

import { AuthGuard } from '../guards/auth-guard.service';
import { HomeComponent } from '../../pages/home/home.component';
import { MoviesComponent } from '../../pages/movies/movies.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { AuthComponent } from '../../pages/auth/auth.component';
import { OrderComponent } from 'src/app/pages/order/order.component';
import { MoviesResolverService } from '../resolvers/movies-resolver.service';

const routes: Routes = [
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'get-ticket/:id/:date/:time',
    component: OrderComponent,
    resolve: [MoviesResolverService],
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
