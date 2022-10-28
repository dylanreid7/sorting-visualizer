import { BarServiceService } from './../bar-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  timeDelay: number = 10;
  sorted: boolean[] = [];
  bars: any = null;
  @Output() resetEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  get barNumbers(): number[] {
    return this.barService.barNumbers;
  }

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
    let animations = getBubbleAnimations(this.barNumbers);
    this.bars = document.getElementsByClassName('bar');
    this.timeDelay = this.barService.timeDelay;
    this.sorted = Array(this.bars.length).fill(false);
    
    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elements = animations[i].elements;
      if (type === 'compare') {
        this.compareElements(elements, i);
      }
      if (type === 'swap') {    
        this.swapElements(elements, i);
      }
      if (type === 'returnColors') {
        this.returnElementColors(elements, i);
      }
      if (type === 'sorted') {
        this.sortElements(elements, i);
      }
      if (type === 'complete') {
        this.complete(i);
      }
    }
    setTimeout(() => {
      this.resetEvent.emit(true);
    }, this.timeDelay * animations.length);
  }

  quickSort() {
    let animations = getQuickAnimations(this.barNumbers);
    this.bars = document.getElementsByClassName('bar');
    this.timeDelay = this.barService.timeDelay;
    this.sorted = Array(this.bars.length).fill(false);
    let sortedTracker = 0;

    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elements = animations[i].elements;
      if (type === 'compare') {
         this.compareElements(elements, i);
      } else if (type === 'swap') {
        this.swapElements(elements, i);
      } else if (type === 'returnColors') {
        this.returnElementColors(elements, i);
      } else if (type === 'sorted') {
        if (sortedTracker < elements[0]) {
          sortedTracker = elements[0];
        } else {
          continue;
        }
        let sortedElements: number[] = [];
        for(let i = 0; i <= elements[0]; i++) {
          sortedElements.push(i);
        }
        this.sortElements(sortedElements, i);
      } else if (type === 'complete') {
        this.complete(i);
      }
    }
    setTimeout(() => {
      this.resetEvent.emit(true);
    }, this.timeDelay * animations.length);
  }

  mergeSort() {
    let animations = getMergeAnimations(this.barNumbers);
    this.bars = document.getElementsByClassName('bar');
    this.timeDelay = this.barService.timeDelay;
    this.sorted = Array(this.bars.length).fill(false);

    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elements = animations[i].elements;
      if (type === 'compare') {
        this.compareElements(elements, i);
      } else if (type === 'swap') {
        this.mergeSwapElements(elements, i);
      } else if (type === 'returnColors') {
        this.returnElementColors(elements, i);
      } else if (type === 'sorted') {
        this.sortElements(elements, i);
      } else if (type === 'complete') {
        this.complete(i);
      }
    }
    setTimeout(() => {
      this.resetEvent.emit(true);
    }, this.timeDelay * animations.length);
  }

  selectionSort() {
    let animations = getSelectionAnimations(this.barNumbers);
    this.bars = document.getElementsByClassName('bar');
    this.timeDelay = this.barService.timeDelay;
    this.sorted = Array(this.bars.length).fill(false);
    
    for (let i = 0; i < animations.length; i++) {
      let type = animations[i].type;
      let elements = animations[i].elements;
      if (type === 'compare') {
        this.compareElements(elements, i);
      }
      if (type === 'swap') {    
        this.swapElements(elements, i);
      }
      if (type === 'returnColors') {
        this.returnElementColors(elements, i);
      }
      if (type === 'sorted') {
        this.sortElements(elements, i);
      }
      if (type === 'complete') {
        this.complete(i);
      }
    }
    setTimeout(() => {
      this.resetEvent.emit(true);
    }, this.timeDelay * animations.length);
  }

  compareElements(elements: number[], iteration: number) {
    const firstElementInvalid = !elements[0] || this.sorted[elements[0]];
    const secondElementInvalid = !elements[1] || this.sorted[elements[1]];
    if (firstElementInvalid && secondElementInvalid) {
      return;
    }
    setTimeout(() => {
      if (!firstElementInvalid) {
        let elementOne = <HTMLElement>this.bars[elements[0]];
        elementOne.style.backgroundColor = FRONT_COLOR;
      }
      if (!secondElementInvalid) {
        let elementTwo = <HTMLElement>this.bars[elements[1]];
        elementTwo.style.backgroundColor = BACK_COLOR;
      }
    }, this.timeDelay * iteration);
  }

  swapElements(elements: number[], iteration: number) {
    let elementsToColor: number[] = [];
    elements.forEach((element) => {
      if (!this.sorted[element]) {
        elementsToColor.push(element);
      }
    });
    let elementOne = <HTMLElement>this.bars[elements[0]];
    let elementTwo = <HTMLElement>this.bars[elements[1]];
    setTimeout(() => {
      elementsToColor.forEach((element) => {
        let currentElement = <HTMLElement>this.bars[element];
        currentElement.style.backgroundColor = SWAP_COLOR;
      });
      let tempHeight = elementOne.style.height;          
      elementOne.style.height = elementTwo.style.height;
      elementTwo.style.height = tempHeight;
    }, this.timeDelay * iteration);
  }

  mergeSwapElements(elements: number[], iteration: number) {
    let elementOne = <HTMLElement>this.bars[elements[0]];
    if (elements.length < 2) {
      if (!this.sorted[elements[0]]) {
        setTimeout(() => {
          elementOne.style.backgroundColor = SWAP_COLOR; 
        }, this.timeDelay * iteration);
      }
    } else {
      let elementTwo = <HTMLElement>this.bars[elements[1]];
      let colorsToSort: number[] = [];
      elements.forEach((element) => {
        if (!this.sorted[element]) {
          colorsToSort.push(element);
        }
      });
      
      setTimeout(() => {
        let tempHeight: string = elementOne.style.height;
        elementOne.style.height = elementTwo.style.height;
        for (let j = elements[0]; j < elements[1]; j++) {
          let nextEl = <HTMLElement>this.bars[j + 1];
          let nextTempHeight = nextEl.style.height;
          nextEl.style.height = tempHeight;
          tempHeight = nextTempHeight;
        }
        colorsToSort.forEach((element) => {
          let currentElement = <HTMLElement>this.bars[element];
          currentElement.style.backgroundColor = SWAP_COLOR;
        });
      }, this.timeDelay * iteration);
    }
  }

  returnElementColors(elements: number[], iteration: number) {
    let elementsToColor: number[] = [];
    elements.forEach((element) => {
      if (!this.sorted[element]) {
        elementsToColor.push(element);
      }
    });
    setTimeout(() => {
      elementsToColor.forEach((element) => {
        let currentElement = <HTMLElement>this.bars[element];
        currentElement.style.backgroundColor = MAIN_COLOR;
      });
    }, this.timeDelay * iteration);
  }

  sortElements(elements: number[], iteration: number) {
    elements.forEach((num) => {this.sorted[num] = true;})
    setTimeout(() => {
      elements.forEach((num) => {
        let currentElement = <HTMLElement>this.bars[num];
        currentElement.style.backgroundColor = SORTED_COLOR;
      })
    }, this.timeDelay * iteration);
  }

  complete(iteration: number) {
    setTimeout(() => {
      for(let i = 0; i < this.bars.length; i++) {
        let element = <HTMLElement>this.bars[i];
        element.style.backgroundColor = FINISHED_COLOR;
      }
    }, this.timeDelay * iteration);
  }

  reset() {
    this.bars = document.getElementsByClassName('bar');
    for (let i = 0; i < this.bars.length; i++) {
      let currentBar = <HTMLElement>this.bars[i];
      currentBar.style.backgroundColor = 'turquoise';
    }
  }
}
