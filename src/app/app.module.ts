import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserDataService } from './services/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { PaginationService } from './services/pagination.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserDataService,PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
