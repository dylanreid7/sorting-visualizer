import { BarServiceService } from './bar-service.service';
import { MergeSortComponent } from './merge-sort/merge-sort.component';
import { QuickSortComponent } from './quick-sort/quick-sort.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  barNumbers: number[] = [];

  generateDisabled: boolean = false;
  generatePressed: boolean = false;
  sortOptionsDisabled: boolean = true;
  sortDisabled: boolean = true;
  activeSortingMethod: string = '';
  generateColor: string = 'accent';
  bubbleColor: string = '';
  quickColor: string = '';
  mergeColor: string = '';
  sortColor: string = '';

  constructor(private _router: Router, private barService: BarServiceService) {}

  onActivate(componentRef: any) {
    console.log('comp ref: ', componentRef);
    componentRef.sort();
  }

  generate() {
    this.barNumbers = this.barService.generateArray();
    this.generatePressed = true;
    // this.generateColor = '';
    this.generateDisabled = true;
    this.sortOptionsDisabled = false;
    console.log('bar nums: ', this.barNumbers);
  }

  bubbleClick() {
    this.activeSortingMethod = 'bubbleSort';
    this.sortDisabled = false;
    console.log('bubbled clicked');
  }

  quickClick() {
    this.activeSortingMethod = 'quickSort';
    this.sortDisabled = false;
  }

  mergeClick() {
    this.activeSortingMethod = 'mergeSort';
    this.sortDisabled = false;
  }

  sortClick() {
    if (this.activeSortingMethod === 'bubbleSort') {
      this._router.navigate(['bubble']);
    } else if (this.activeSortingMethod === 'quickSort') {
      this._router.navigate(['quick']);
    } else if (this.activeSortingMethod === 'mergeSort') {
      this._router.navigate(['merge']);
    }
  }
}
