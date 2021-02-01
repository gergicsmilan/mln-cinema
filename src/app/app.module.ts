import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './core/modules/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { OrderComponent } from './pages/order/order.component';
import { MovieFilterPipe } from './core/pipes/movie-filter.pipe';
import { SeatPickerComponent } from './components/seat-picker/seat-picker.component';
import { TicketTypePickerComponent } from './components/ticket-type-picker/ticket-type-picker.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CostumPopupComponent } from './components/costum-popup/costum-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    ProfileComponent,
    MoviesComponent,
    PageNotFoundComponent,
    MoviesListComponent,
    OrderComponent,
    SeatPickerComponent,
    MovieFilterPipe,
    TicketTypePickerComponent,
    LoadingSpinnerComponent,
    CostumPopupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
