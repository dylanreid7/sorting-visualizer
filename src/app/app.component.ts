import { BarServiceService } from './bar-service.service';
import { MergeSortComponent } from './merge-sort/merge-sort.component';
import { QuickSortComponent } from './quick-sort/quick-sort.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  barNumbers: number[] = [];

  numBars: number = 100;
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

  constructor(private _router: Router, private barService: BarServiceService) {}

  ngOnInit(): void {
    this.barNumbers = this.barService.generateArray();
  }
  
  updateNumBars(event: any) {
    this.numBars = event.value;
    this.barService.setNumElements(event.value);
    this.barService.generateArray();
  }

  generate() {
    this.barNumbers = this.barService.generateArray();
  }

  bubbleClick() {
    this.activeSortingMethod = 'bubbleSort';
    this.sortDisabled = false;
    this.bubbleColor = 'accent';
    this.quickColor = '';
    this.mergeColor = '';
    this.selectionColor = '';
  }

  quickClick() {
    this.activeSortingMethod = 'quickSort';
    this.sortDisabled = false;
    this.quickColor = 'accent';
    this.bubbleColor = '';
    this.mergeColor = '';
    this.selectionColor = '';
  }

  mergeClick() {
    this.activeSortingMethod = 'mergeSort';
    this.sortDisabled = false;
    this.mergeColor = 'accent';
    this.bubbleColor = '';
    this.quickColor = '';
    this.selectionColor = '';
  }

  selectionClick() {
    this.activeSortingMethod = 'selectionSort';
    this.sortDisabled = false;
    this.selectionColor = 'accent';
    this.mergeColor = '';
    this.bubbleColor = '';
    this.quickColor = '';
  }

  sortClick() {
    if (this.activeSortingMethod === 'bubbleSort') {
      this._router.navigate(['bubble']);
    } else if (this.activeSortingMethod === 'quickSort') {
      this._router.navigate(['quick']);
    } else if (this.activeSortingMethod === 'mergeSort') {
      this._router.navigate(['merge']);
    } else if (this.activeSortingMethod === 'selectionSort') {
      this._router.navigate(['selection']);
    }
    this.sortOptionsDisabled = true;
    this.generateDisabled = true;
    this.sliderDisabled = true;
  }

  onActivate(componentRef: any) {
    componentRef.sort();
  }
}
