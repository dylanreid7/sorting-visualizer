import { BarServiceService } from './bar-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandardSortComponent } from './standard-sort/standard-sort.component';
import { MergeSortComponent } from './merge-sort/merge-sort.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { QuickSortComponent } from './quick-sort/quick-sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { SelectionSortComponent } from './selection-sort/selection-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    StandardSortComponent,
    MergeSortComponent,
    BubbleSortComponent,
    QuickSortComponent,
    HomeComponent,
    SelectionSortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [BarServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
