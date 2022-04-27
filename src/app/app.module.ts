import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RankedTableComponent } from './ranked-table/ranked-table.component';

@NgModule({
  declarations: [AppComponent, RankedTableComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTableModule],
  providers: [PubNubAngular],
  bootstrap: [AppComponent],
})
export class AppModule {}
