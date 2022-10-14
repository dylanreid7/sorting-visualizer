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
  @Input() barNumbers: number[] = [];

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

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < this.numElements; i++) {
      this.colors[i] = MAIN_COLOR;
    }
    console.log('bar numbers: ', this.barNumbers);
  }

  barHeight(elementValue: number) {
    // 70% of 100 vh times elementValue
    const numHeight = 0.7 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  mergeSort() {
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
          elementOne.style.backgroundColor = FRONT_COLOR;
          elementTwo.style.backgroundColor = BACK_COLOR;
        }, i * 10);
      } else if (type === 'swap') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SWAP_COLOR;
          elementTwo.style.backgroundColor = SWAP_COLOR;
          let tempHeight = elementOne.style.height;
          elementOne.style.height = elementTwo.style.height;
          elementTwo.style.height = tempHeight;
        }, i * 10);

      } else if (type === 'returnColors') {
        setTimeout(() => {
          elementOne.style.backgroundColor = MAIN_COLOR;
          elementTwo.style.backgroundColor = MAIN_COLOR;
        }, i * 10);
      } else if (type === 'sorted') {
        setTimeout(() => {
          elementOne.style.backgroundColor = SORTED_COLOR;
          elementTwo.style.backgroundColor = SORTED_COLOR;
        }, i * 10);
      }
    }
  }

}
