import { HomeComponent } from './home/home.component';
import { BarServiceService } from './bar-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  barNumbers: number[] = [];
  sliderValue: number = 0.5;
  numElements: number = 100;
  generateDisabled: boolean = false;
  generatePressed: boolean = false;
  sortOptionsDisabled: boolean = false;
  sortDisabled: boolean = true;
  sliderDisabled: boolean = false;
  activeSortingMethod: string = '';
  generateColor: string = 'accent';
  bubbleColor: string = '';
  quickColor: string = '';
  mergeColor: string = '';
  selectionColor: string = '';
  sortColor: string = '';
  resetButtonActive: boolean = false;

  @ViewChild(HomeComponent) home!: HomeComponent;

  constructor(private _router: Router, private barService: BarServiceService) {}

  ngOnInit(): void {
    this.barNumbers = this.barService.generateArray();
  }
  
  updateNumBars(event: any) {
    this.sliderValue = event.value;
    this.numElements = this.convertSliderToNumElements(this.sliderValue); 
    this.barService.setNumElements(this.numElements);
    this.barService.generateArray();
  }

  convertSliderToNumElements(value: number) {
    if (value < 0.5) {
      let unrounded = 180 * value + 10;
      let rounded = unrounded - (unrounded % 10);
      return rounded;
    } else {
      let unrounded = 800 * value - 300;
      let rounded = unrounded - (unrounded % 10);
      return rounded;
    }
  }
 
  generate() {
    this.barNumbers = this.barService.generateArray();
  }

  bubbleClick() {
    this.activeSortingMethod = 'bubble';
    this.sortDisabled = false;
    this.bubbleColor = 'accent';
    this.quickColor = '';
    this.mergeColor = '';
    this.selectionColor = '';
  }

  quickClick() {
    this.activeSortingMethod = 'quick';
    this.sortDisabled = false;
    this.quickColor = 'accent';
    this.bubbleColor = '';
    this.mergeColor = '';
    this.selectionColor = '';
  }

  mergeClick() {
    this.activeSortingMethod = 'merge';
    this.sortDisabled = false;
    this.mergeColor = 'accent';
    this.bubbleColor = '';
    this.quickColor = '';
    this.selectionColor = '';
  }

  selectionClick() {
    this.activeSortingMethod = 'selection';
    this.sortDisabled = false;
    this.selectionColor = 'accent';
    this.mergeColor = '';
    this.bubbleColor = '';
    this.quickColor = '';
  }

  sortClick() {
    this.home.sort(this.activeSortingMethod);
    this.sortOptionsDisabled = true;
    this.generateDisabled = true;
    this.sliderDisabled = true;
  }

  resetChange(resetOn: boolean) {
    this.resetButtonActive = resetOn;
    this.sortDisabled = true;
  }

  resetClick() {
    this.generateDisabled = false;
    this.sliderDisabled = false;
    this.sortOptionsDisabled = false;
    this.selectionColor = '';
    this.mergeColor = '';
    this.bubbleColor = '';
    this.quickColor = '';
    this.activeSortingMethod = '';
    this.numElements = 100;
    this.barService.setNumElements(this.numElements);
    this.generate();
    this.sliderValue = 0.5;
    this.home.reset();
    this.resetButtonActive = false;
  }

  onActivate(componentRef: any) {
    componentRef.sort(this.activeSortingMethod);
  }
}
