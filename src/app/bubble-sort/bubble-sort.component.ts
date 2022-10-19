import { BarServiceService } from './../bar-service.service';
import { Component, Input, OnInit } from '@angular/core';
import getAnimations from 'src/algorithms/bubbleSort';
const MAIN_COLOR = 'turquoise';
const FRONT_COLOR = 'green';
const BACK_COLOR = 'blue';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'purple';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.scss']
})
export class BubbleSortComponent implements OnInit {
  barNumbers: number[] = [];
  
  numElements: number = 100;
  numWidth: number = 70 * 0.8 / this.numElements; 
  width: string = `${this.numWidth}vw`;
  numMargin: number = this.numWidth * 0.25;
  marginLeft: string = `${this.numMargin}vw`;

  colors: string[] = [];

  barStyles = {
    'width': this.width,
    'margin-left': this.marginLeft,
  };

  constructor(private barService: BarServiceService) { }

  ngOnInit(): void {
    console.log('bubble');
    this.barNumbers = this.barService.getBars();
    console.log('bar numbies in bubble', this.barNumbers);
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

  // delay(time: number) {
  //   return new Promise(resolve => setTimeout(resolve, time));
  // }

  isAlreadySorted(elementNum: number) {
    let bars = document.getElementsByClassName('bar');
    let element = <HTMLElement>bars[elementNum];
    let elementColor = element.style.color;
    return elementColor === SORTED_COLOR;
  }

  sort() {
    console.log('bubble sort!!');
    this.barNumbers = this.barService.getBars();
    let animations = getAnimations(this.barNumbers);
    let bars = document.getElementsByClassName('bar');
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
        }, 10 * i);
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
        }, 10 * i);
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
        }, 10 * i);
      }
      if (type === 'sorted') {
        let elementOne = <HTMLElement>bars[elementNumbers[0]];

        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          swapCount++;
        }, 10 * i);
      }
    }
  }

  // async bubbleSort(nums: number[]) {
  //   for (let i = 0; i < nums.length; i++) {
  //     for (let j = 0; j < nums.length - 1; j++) {
  //       await this.delay(1);
  //       this.setColorFront(j);
  //       this.setColorBack(j + 1);
  //       if (nums[j] > nums[j + 1]) {
  //         let temp = nums[j];
  //         nums[j] = nums[j + 1];
  //         nums[j + 1] = temp;
  //       } 
  //       this.setColorMain(j);
  //       this.setColorMain(j + 1);
  //     }
  //     this.setColorSorted(nums.length - i - 1);
  //   }
  //   return nums;
  // }
}




