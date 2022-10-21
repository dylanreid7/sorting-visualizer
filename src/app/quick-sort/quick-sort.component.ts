import { BarServiceService } from './../bar-service.service';
import { Component, Input, OnInit } from '@angular/core';
import getAnimations from 'src/algorithms/quickSort';
const MAIN_COLOR = 'turquoise';
const FRONT_COLOR = 'green';
const BACK_COLOR = 'blue';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'purple';
@Component({
  selector: 'app-quick-sort',
  templateUrl: './quick-sort.component.html',
  styleUrls: ['./quick-sort.component.scss']
})
export class QuickSortComponent implements OnInit {

  numElements: number = 100;
  // numWidth: number = 70 * 0.8 / this.numElements; 
  // width: string = `${this.numWidth}vw`;
  // numMargin: number = this.numWidth * 0.25;
  // marginLeft: string = `${this.numMargin}vw`;
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

      if (type === 'compare ') {
        setTimeout(() => {
          if (elOne > sortedTracker) {
            let elementOne = <HTMLElement>bars[elOne];
            elementOne.style.backgroundColor = FRONT_COLOR;
          }
          if (elTwo > sortedTracker) {
            let elementTwo = <HTMLElement>bars[elTwo];
            elementTwo.style.backgroundColor = BACK_COLOR;
          }
        }, this.timeDelay * i);
      } else if (type === 'swap') {
        setTimeout(() => {
          
          let elementOne = <HTMLElement>bars[elOne];
          let elementTwo = <HTMLElement>bars[elTwo];
          let elementOneHeight = elementOne.style.height;
          let elementTwoHeight = elementTwo.style.height;
          
          elementOne.style.height = elementTwoHeight;
          elementTwo.style.height = elementOneHeight;   
          
            elementOne.style.backgroundColor = SWAP_COLOR;
            elementTwo.style.backgroundColor = SWAP_COLOR;
        }, this.timeDelay * i);
        
      } else if (type === 'returnColors') {
        setTimeout(() => {
          // if (elOne > sortedTracker) {
            let elementOne = <HTMLElement>bars[elementNumbers[0]];
            elementOne.style.backgroundColor = MAIN_COLOR;
          // }
          // if (elTwo > sortedTracker) {
            let elementTwo = <HTMLElement>bars[elementNumbers[1]];
            elementTwo.style.backgroundColor = MAIN_COLOR;
          // }  
        }, this.timeDelay * i);
      } else if (type === 'sorted') {
        // console.log('sorted: ', elOne);
        let elementOne = <HTMLElement>bars[elementNumbers[0]];
        if (sortedTracker < elOne) {
          sortedTracker = elOne;
        }
        
        setTimeout(() => {
          for(let i = 0; i <= elOne; i++) {
            let element = <HTMLElement>bars[i];
            element.style.background = SORTED_COLOR;
          }
          // elementOne.style.backgroundColor = SORTED_COLOR;
          // swapCount++;
        }, this.timeDelay * i);
      }
    }
    // console.log('sorted tracker: ', sortedTracker);
  }

}
