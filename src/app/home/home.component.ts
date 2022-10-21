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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numElements: number = 100;
  timeDelay: number = 10;
  colors: string[] = [];
  sorted: boolean[] = [];

  constructor(private barService: BarServiceService) { }

  ngOnInit(): void {
    for(let i = 0; i < this.numElements; i++) {
      this.colors[i] = MAIN_COLOR;
    }
    console.log('bar numbers: ', this.barNumbers);
  }

  barHeight(elementValue: number) {
    const numHeight = 0.7 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  get barNumbers(): number[] {
    return this.barService.barNumbers;
  }

  get barStyles(): any {
    return this.barService.barStyles;
  }
  
  sort(sortingMethod: string) {
    console.log('og sort', sortingMethod);
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

  selectionSort() {
      let barNumbers = this.barNumbers;
      console.log('bar nums in sele: ', barNumbers);
      console.log('running seelction sort');
      let animations = getSelectionAnimations(barNumbers);
      console.log('selection animations', animations);
      let bars = document.getElementsByClassName('bar');
      this.timeDelay = this.barService.timeDelay;
      // let swapCount = 0;
      // iterate through the animations
        // check type
          // do the proper animation with that type
      // let sortedTracker = 0;
      for (let i = 0; i < animations.length; i++) {
        let type = animations[i].type;
        let elementNumbers = animations[i].elements;
        let elOne = elementNumbers[0];
        let elTwo = elementNumbers[1];
        
        console.log('elOne: ', elOne);
        if (type === 'compare') {
          'comp';
          setTimeout(() => {
            let elementOne = <HTMLElement>bars[elOne];
        let elementTwo = <HTMLElement>bars[elTwo];
            elementOne.style.backgroundColor = FRONT_COLOR;
            elementTwo.style.backgroundColor = BACK_COLOR;
          }, this.timeDelay * i);
        } else if (type === 'swap') {
          setTimeout(() => {
            let elementOne = <HTMLElement>bars[elOne];
        let elementTwo = <HTMLElement>bars[elTwo];
            elementOne.style.backgroundColor = SWAP_COLOR;
            elementTwo.style.backgroundColor = SWAP_COLOR;
            let tempHeight = elementOne.style.height;
            elementOne.style.height = elementTwo.style.height;
            elementTwo.style.height = tempHeight;
          }, this.timeDelay * i);
        } else if (type === 'returnColors') {
          setTimeout(() => {
            let elementOne = <HTMLElement>bars[elOne];

            
            elementOne.style.backgroundColor = MAIN_COLOR;
            if (elTwo) {
              let elementTwo = <HTMLElement>bars[elTwo];
              elementTwo.style.backgroundColor = MAIN_COLOR;
            }
             
          }, this.timeDelay * i);
        } else if (type === 'sorted') {
          setTimeout(() => {
            let elementOne = <HTMLElement>bars[elOne];
        
            elementOne.style.backgroundColor = SORTED_COLOR;
          }, this.timeDelay * i);
        }
      }
  }

  bubbleSort() {
    console.log('bubble sort!!');
    let barNumbers = this.barService.getBars();
    let animations = getBubbleAnimations(barNumbers);
    let bars = document.getElementsByClassName('bar');
    this.timeDelay = this.barService.timeDelay;
    console.log('time delay ', this.timeDelay);
    let swapCount = 0;
    const length = bars.length;
    
    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elementNumbers = animations[i].elements;
      let elOne = elementNumbers[0];
      let elTwo = elementNumbers[1];
      if (type === 'compare') {
        setTimeout(() => {
          let elementOne = <HTMLElement>bars[elOne];
          let elementTwo = <HTMLElement>bars[elTwo];
          if (elOne < length - swapCount - 1) {
            elementOne.style.backgroundColor = FRONT_COLOR;
          }
          if (elTwo < length - swapCount - 1) {
            elementTwo.style.backgroundColor = BACK_COLOR;
          }
        }, this.timeDelay * i);
      }
      if (type === 'swap') {    
        setTimeout(() => {
          let elementOne = <HTMLElement>bars[elementNumbers[0]];
          let elementTwo = <HTMLElement>bars[elementNumbers[1]];
          let elementOneHeight = elementOne.style.height;
          let elementTwoHeight = elementTwo.style.height;
          
          elementOne.style.height = elementTwoHeight;
          elementTwo.style.height = elementOneHeight;
          if (elOne < length - swapCount - 1) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (elTwo < length - swapCount - 1) {
            elementTwo.style.backgroundColor = SWAP_COLOR;
          }
        }, this.timeDelay * i);
      }
      if (type === 'returnColors') {
        setTimeout(() => {
          let elementOne = <HTMLElement>bars[elementNumbers[0]];
          let elementTwo = <HTMLElement>bars[elementNumbers[1]];
          if (elOne < length - swapCount - 1) {
            elementOne.style.backgroundColor = MAIN_COLOR;
          }
          if (elTwo < length - swapCount - 1) {
              elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, this.timeDelay * i);
      }
      if (type === 'sorted') {
        let elementOne = <HTMLElement>bars[elementNumbers[0]];

        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          swapCount++;
        }, this.timeDelay * i);
      }
    }
  }


  mergeSort() {
    let barNumbers = this.barService.getBars();
    console.log('merge sort!!');
    let animations = getMergeAnimations(this.barNumbers);
    this.timeDelay = this.barService.timeDelay;

    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elOne = animations[i].elements[0];
      let elTwo = animations[i].elements[1];
      let bars = document.getElementsByClassName('bar');
      let elementOne = <HTMLElement>bars[elOne];
      let elementTwo = <HTMLElement>bars[elTwo];
      if (type === 'compare') {
        setTimeout(() => {
          if (!this.sorted[elOne]) {
            elementOne.style.backgroundColor = FRONT_COLOR;
          }
          if (!this.sorted[elTwo]) {
            elementTwo.style.backgroundColor = BACK_COLOR;
          }
        }, this.timeDelay * 10);
      } else if (type === 'swap') {
        setTimeout(() => {
          // console.log('elOne: ', elOne);
          // console.log('elTwo: ', elTwo);
          // console.log('typeof eltwo: ', typeof elTwo);
          // color element one with swap color
          if (!this.sorted[elOne]) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (elTwo === 0) {
            return;
          }
          // create temp element one height
          let tempHeight: string = elementOne.style.height;
          // console.log('tempHeight: ', tempHeight);
          // console.log('type of temp', typeof tempHeight);
          // put element two height in element ones spot
          elementOne.style.height = elementTwo.style.height;
          // iterate through, up to end
          const numToShift = animations[i].elements[2];
          let nextTempHeight: string = '';
          for (let j = elOne; j < elTwo; j++) {
            let currentEl = <HTMLElement>bars[j];
            let nextEl = <HTMLElement>bars[j + 1];
            let nextTempHeight = nextEl.style.height;
            // if j < animations[i].elmements[2]
            // if (j < numToShift) {
            //   nextTempHeight = currentElement.style.height;
            // }
            nextEl.style.height = tempHeight;
            tempHeight = nextTempHeight;
          }
            // if j = 0
              // currentTempHeight = tempHeight
            // else
              // currentTempHeight = nextTempHeight
            //  nextTempHeight = j + 2 height
            // place currentTempHeight into 
            // save next element

          if (!this.sorted[elOne]) {
            elementOne.style.backgroundColor = SWAP_COLOR;
          }
          if (!this.sorted[elTwo]) {
            elementTwo.style.backgroundColor = SWAP_COLOR;
          }
          // elementOne.style.height = elementTwo.style.height;
          // elementTwo.style.height = tempHeight;
        }, this.timeDelay * 10);

      } else if (type === 'returnColors') {
        setTimeout(() => {
          if (elementOne && !this.sorted[elOne]) {
            elementOne.style.backgroundColor = MAIN_COLOR;
          }
          if (elementTwo && !this.sorted[elTwo]) {
            elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, this.timeDelay * 10);
      } else if (type === 'sorted') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          // elementTwo.style.backgroundColor = SORTED_COLOR;
          this.sorted[elOne] = true;
          // this.sorted[elTwo] = true;
          // console.log('sorted: ', this.sorted);
        }, this.timeDelay * 10);
      }
    }
  }

  quickSort() {
    let barNumbers = this.barNumbers;
    console.log('running quick sort');
    let animations = getQuickAnimations(barNumbers);
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
