import { BarServiceService } from './../bar-service.service';
import { Component, OnInit } from '@angular/core';
import getSelectionAnimations from 'src/algorithms/selectionSort';
import getBubbleAnimations from 'src/algorithms/bubbleSort';
import getMergeAnimations from 'src/algorithms/mergeSort';
import getQuickAnimations from 'src/algorithms/quickSort';

const MAIN_COLOR = 'turquoise';
const FRONT_COLOR = 'green';
const BACK_COLOR = 'blue';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'purple';
const FINISHED_COLOR = 'orange';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numElements: number = 100;
  colors: string[] = [];
  barNumbers: number[] = [];
  timeDelay: number = 10;

  constructor(private barService: BarServiceService) { }

  ngOnInit(): void {
    for(let i = 0; i < this.numElements; i++) {
      this.colors[i] = MAIN_COLOR;
    }
  }

  barHeight(elementValue: number) {
    const numHeight = 0.7 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  // get barNumbers(): number[] {
  //   return this.barService.barNumbers;
  // }

  get barStyles(): any {
    return this.barService.barStyles;
  }
  
  sort(sortingMethod: string) {
    if (sortingMethod === 'bubble') {
      this.bubbleSort();
    } else if (sortingMethod === 'quick') {
      this.quickSort();
    } else if (sortingMethod === 'merge') {
      this.mergeSort();
    } else if (sortingMethod === 'selection') {
      this.selectionSort();
    }
  }
  
  isAlreadySorted(elementNum: number) {
    let bars = document.getElementsByClassName('bar');
    let element = <HTMLElement>bars[elementNum];
    let elementColor = element.style.color;
    return elementColor === SORTED_COLOR;
  }

  bubbleSort() {
    this.barNumbers = this.barService.getBars();
    let animations = getBubbleAnimations(this.barNumbers);
    let bars = document.getElementsByClassName('bar');
    this.timeDelay = this.barService.timeDelay;
    const length = bars.length;
    let sorted: boolean[] = Array(length).fill(false);
    
    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elementNumbers = animations[i].elements;
      let elementOne = <HTMLElement>bars[elementNumbers[0]];
      let elementTwo = <HTMLElement>bars[elementNumbers[1]];
      if (type === 'compare') {
        setTimeout(() => {
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = FRONT_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = BACK_COLOR;
          }
        }, timeDelay * i);
      }
      if (type === 'swap') {    
        setTimeout(() => {
          let tempHeight = elementOne.style.height;          
          elementOne.style.height = elementTwo.style.height;
          elementTwo.style.height = tempHeight;
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = SWAP_COLOR;
          }
        }, timeDelay * i);
      }
      if (type === 'returnColors') {
        setTimeout(() => {
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = MAIN_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, timeDelay * i);
      }
      if (type === 'sorted') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          sorted[elementNumbers[0]] = true;
        }, timeDelay * i);
      }
      if (type === 'complete') {
        setTimeout(() => {
          for(let i = 0; i < length; i++) {
            let element = <HTMLElement>bars[i];
            element.style.background = FINISHED_COLOR;
          }
        }, timeDelay * i);
      }
    }
  }

  quickSort() {
    let barNumbers = this.barNumbers;
    let animations = getQuickAnimations(barNumbers);
    let bars = document.getElementsByClassName('bar');
    let sorted: boolean[] = Array(length).fill(false);
    let sortedTracker = 0;
    let delay = this.barService.timeDelay;
    
    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elementNumbers = animations[i].elements;
      let elementOne = <HTMLElement>bars[elementNumbers[0]];
      let elementTwo = <HTMLElement>bars[elementNumbers[1]];
      if (type === 'compare') {
        setTimeout(() => {
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = FRONT_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = BACK_COLOR;
          }
        }, delay * i);
      } else if (type === 'swap') {
        setTimeout(() => {
          let tempHeight = elementOne.style.height;          
          elementOne.style.height = elementTwo.style.height;
          elementTwo.style.height = tempHeight;
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = SWAP_COLOR;
          }
        }, delay * i);
        
      } else if (type === 'returnColors') {
        setTimeout(() => {
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = MAIN_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, delay * i);
      } else if (type === 'sorted') {
        // let elementOne = <HTMLElement>bars[elementNumbers[0]];
        if (sortedTracker < elementNumbers[0]) {
          sortedTracker = elementNumbers[0];
        } else {
          continue;
        }
        setTimeout(() => {
          for(let i = 0; i <= elementNumbers[0]; i++) {
            let element = <HTMLElement>bars[i];
            element.style.background = SORTED_COLOR;
            sorted[i] = true;
          }
        }, delay * i);
      } else if (type === 'complete') {
        setTimeout(() => {
          for (let i = 0; i < bars.length; i++) {
            let currentElement = <HTMLElement>bars[i];
            currentElement.style.backgroundColor = FINISHED_COLOR;
          }
        }, delay * i);
    }
    }
  }

  mergeSort() {
    let barNumbers = this.barService.getBars();
    let animations = getMergeAnimations(barNumbers);
    let timeDelay = this.barService.timeDelay;
    let sorted: boolean[] = Array(length).fill(false);

    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elementNumbers = animations[i].elements;
      let bars = document.getElementsByClassName('bar');
      let elementOne = <HTMLElement>bars[elementNumbers[0]];
      let elementTwo = <HTMLElement>bars[elementNumbers[1]];
      if (type === 'compare') {
        setTimeout(() => {
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = FRONT_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = BACK_COLOR;
          }
        }, timeDelay * i);
      } else if (type === 'swap') {
        setTimeout(() => {
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (!elementNumbers[1]) {
            return;
          }
          let tempHeight: string = elementOne.style.height;
          elementOne.style.height = elementTwo.style.height;
          for (let j = elementNumbers[0]; j < elementNumbers[1]; j++) {
            let nextEl = <HTMLElement>bars[j + 1];
            let nextTempHeight = nextEl.style.height;
            nextEl.style.height = tempHeight;
            tempHeight = nextTempHeight;
          }
          if (!sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (!sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = SWAP_COLOR;
          }
        }, timeDelay * i);
      } else if (type === 'returnColors') {
        setTimeout(() => {
          if (elementOne && !sorted[elementNumbers[0]]) {
            elementOne.style.backgroundColor = MAIN_COLOR;
          }
          if (elementTwo && !sorted[elementNumbers[1]]) {
            elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, timeDelay * i);
      } else if (type === 'sorted') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          sorted[elementNumbers[0]] = true;
        }, timeDelay * i);
      } else if (type === 'complete') {
          setTimeout(() => {
            for (let i = 0; i < bars.length; i++) {
              let currentElement = <HTMLElement>bars[i];
              currentElement.style.backgroundColor = FINISHED_COLOR;
            }
          }, timeDelay * i);
      }
    }
  }

  selectionSort() {
    let barNumbers = this.barNumbers;
    let animations = getSelectionAnimations(barNumbers);
    let bars = document.getElementsByClassName('bar');
    let timeDelay = this.barService.timeDelay;
    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elementNumbers = animations[i].elements;
      let elementOne = <HTMLElement>bars[elementNumbers[0]];
      let elementTwo = <HTMLElement>bars[elementNumbers[1]];
      if (type === 'compare') {
        'comp';
        setTimeout(() => {
          elementOne.style.backgroundColor = FRONT_COLOR;
          elementTwo.style.backgroundColor = BACK_COLOR;
        }, timeDelay * i);
      } else if (type === 'swap') {
        setTimeout(() => {
          let tempHeight = elementOne.style.height;
          elementOne.style.height = elementTwo.style.height;
          elementTwo.style.height = tempHeight;
          elementOne.style.backgroundColor = SWAP_COLOR;
          elementTwo.style.backgroundColor = SWAP_COLOR;  
        }, timeDelay * i);
      } else if (type === 'returnColors') {
        setTimeout(() => {
          elementOne.style.backgroundColor = MAIN_COLOR;
          if (elementTwo) {
            elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, timeDelay * i);
      } else if (type === 'sorted') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
        }, timeDelay * i);
      } else if (type === 'complete') {
        setTimeout(() => {
          for (let i = 0; i < bars.length; i++) {
            let currentElement = <HTMLElement>bars[i];
            currentElement.style.backgroundColor = FINISHED_COLOR;
          }
        }, timeDelay * i);
      }
    }
  }

  compareElements(elements: number[]) {
    // set colors to main color
  }

  swapElements(elements: number[]) {
    // swap heights
    // set them to swap color
  }

  returnElementColors(elements: number[]) {

  }



}
