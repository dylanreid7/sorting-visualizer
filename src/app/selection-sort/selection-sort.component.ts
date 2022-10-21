import { Component, OnInit } from '@angular/core';
import getAnimations from 'src/algorithms/selectionSort';
import { BarServiceService } from '../bar-service.service';

const MAIN_COLOR = 'turquoise';
const FRONT_COLOR = 'green';
const BACK_COLOR = 'blue';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'purple';

@Component({
  selector: 'app-selection-sort',
  templateUrl: './selection-sort.component.html',
  styleUrls: ['./selection-sort.component.scss']
})
export class SelectionSortComponent implements OnInit {
  numElements: number = 100;

  timeDelay: number = 10;
  colors: string[] = [];

  constructor(private barService: BarServiceService) { }

  ngOnInit(): void {
    for(let i = 0; i < this.numElements; i++) {
      this.colors[i] = MAIN_COLOR;
    }
  }

  barHeight(elementValue: number) {
    // 70% of 100 vh times elementValue
    const numHeight = 0.7 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  get barStyles() {
    return this.barService.barStyles;
  }

  get barNumbers(): number[] {
    return this.barService.barNumbers;
  }

  isAlreadySorted(elementNum: number) {
    let bars = document.getElementsByClassName('bar');
    let element = <HTMLElement>bars[elementNum];
    let elementColor = element.style.color;
    return elementColor === SORTED_COLOR;
  }

  sort() {
      let barNumbers = this.barNumbers;
      console.log('running quick sort');
      let animations = getAnimations(barNumbers);
      console.log('selection animations', animations);
      let bars = document.getElementsByClassName('bar');
      this.timeDelay = this.barService.timeDelay;
      let swapCount = 0;
      // iterate through the animations
        // check type
          // do the proper animation with that type
      let sortedTracker = 0;
      for (let i = 0; i < animations.length; i++) {
        let type = animations[i].type;
        let elementNumbers = animations[i].elements;
        let elOne = elementNumbers[0];
        let elTwo = elementNumbers[1];
        let elementOne = <HTMLElement>bars[elOne];
        let elementTwo = <HTMLElement>bars[elTwo];
        if (type === 'compare ') {
          setTimeout(() => {
            elementOne.style.backgroundColor = FRONT_COLOR;
            elementTwo.style.backgroundColor = BACK_COLOR;
          }, this.timeDelay * i);
        } else if (type === 'swap') {
          setTimeout(() => {
            elementOne.style.backgroundColor = SWAP_COLOR;
            elementTwo.style.backgroundColor = SWAP_COLOR;
            let tempHeight = elementOne.style.height;
            elementOne.style.height = elementTwo.style.height;
            elementTwo.style.height = tempHeight;
          }, this.timeDelay * i);
        } else if (type === 'returnColors') {
          setTimeout(() => {
            elementOne.style.backgroundColor = MAIN_COLOR;
            elementTwo.style.backgroundColor = MAIN_COLOR; 
          }, this.timeDelay * i);
        } else if (type === 'sorted') {
          setTimeout(() => {
            elementOne.style.backgroundColor = SORTED_COLOR;
          }, this.timeDelay * i);
        }
      }
  }

}
