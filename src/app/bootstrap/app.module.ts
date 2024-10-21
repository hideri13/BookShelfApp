import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../ui';
import { NavigationComponent } from '../ui/navigation';
import { NotFoundComponent } from '../ui/not-found';
import { FooterComponent } from '../ui/footer';
import { HeaderComponent } from '../ui/header';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
