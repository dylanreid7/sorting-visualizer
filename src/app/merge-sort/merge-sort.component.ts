import { BarServiceService } from './../bar-service.service';
import { Component, Input, OnInit } from '@angular/core';
import getAnimations from 'src/algorithms/mergeSort';

const MAIN_COLOR = 'turquoise';
const FRONT_COLOR = 'green';
const BACK_COLOR = 'blue';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'purple';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.scss']
})
export class MergeSortComponent implements OnInit {
  numElements: number = 100;
  // numWidth: number = 70 * 0.8 / this.numElements; 
  // width: string = `${this.numWidth}vw`;
  // numMargin: number = this.numWidth * 0.25;
  // marginLeft: string = `${this.numMargin}vw`;

  colors: string[] = [];
  sorted: boolean[] = [];

  constructor(private barService: BarServiceService) { }

  ngOnInit(): void {
    for(let i = 0; i < this.numElements; i++) {
      this.colors[i] = MAIN_COLOR;
    }
    console.log('bar numbers: ', this.barNumbers);
  }

  get barStyles() {
    return this.barService.barStyles;
  }

  barHeight(elementValue: number) {
    const numHeight = 0.7 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  get barNumbers(): number[] {
    return this.barService.barNumbers;
  }

  sort() {
    console.log('merge sort!!');
    let animations = getAnimations(this.barNumbers);

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
        }, i * 10);
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
        }, i * 10);

      } else if (type === 'returnColors') {
        setTimeout(() => {
          if (elementOne && !this.sorted[elOne]) {
            elementOne.style.backgroundColor = MAIN_COLOR;
          }
          if (elementTwo && !this.sorted[elTwo]) {
            elementTwo.style.backgroundColor = MAIN_COLOR;
          }
        }, i * 10);
      } else if (type === 'sorted') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          // elementTwo.style.backgroundColor = SORTED_COLOR;
          this.sorted[elOne] = true;
          // this.sorted[elTwo] = true;
          // console.log('sorted: ', this.sorted);
        }, i * 10);
      }
    }
  }

}
