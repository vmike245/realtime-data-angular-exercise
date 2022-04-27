import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { RankedTableComponent } from './ranked-table.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [RankedTableComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatListModule,
  ],
  exports: [RankedTableComponent],
})
export class RankedTableModule {}
