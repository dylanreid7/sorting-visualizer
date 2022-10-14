import { MergeSortComponent } from './merge-sort/merge-sort.component';
import { QuickSortComponent } from './quick-sort/quick-sort.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(BubbleSortComponent)
  private bubbleSortComponent!: BubbleSortComponent;
  @ViewChild(QuickSortComponent)
  private QuickSortComponent!: QuickSortComponent;
  title = 'sorting-visualizer';
  @ViewChild(MergeSortComponent)
  private MergeSortComponent!: MergeSortComponent;


  barNumbers: number[] = [];

  bubble() {
    this.bubbleSortComponent.bubbleSort();
  }

  quick() {
    this.QuickSortComponent.quickSort();
  }

  merge() {
    this.MergeSortComponent.mergeSort();
  }
  
  generateArray() {
    let result: number[] = [];
    for (let i = 0; i < 100; i++) {
      result.push(this.randomNumber());
    }
    this.barNumbers = result;
  }

  randomNumber() {
    return Math.floor(Math.random() * 995) + 5;
  }
}
