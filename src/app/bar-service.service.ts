import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarServiceService {
  barNumbers: number[] = [];
  numElements: number = 100;

  constructor() { }

  setNumElements(num: number) {
    this.numElements = num;
    console.log('num elements', this.numElements);
  }

  generateArray() {
    this.barNumbers = [];
    for (let i = 0; i < this.numElements; i++) {
      this.barNumbers.push(this.randomNumber());
    }
    return this.barNumbers;
  }

  randomNumber() {
    return Math.floor(Math.random() * 995) + 5;
  }

  getBars() {
    return this.barNumbers
  }

  barHeight(elementValue: number) {
    // 70% of 100 vh times elementValue
    const numHeight = 0.6 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  barWidth() {
    const numWidth: number = 70 * 0.8 / this.numElements; 
    const width: string = `${numWidth}vw`;
    return width;
  }

  barMargin() {
    const numWidth: number = 70 * 0.8 / this.numElements; 
    const numMargin: number = numWidth * 0.25;
    const marginLeft: string = `${numMargin}vw`;
    return marginLeft;
  }

  get barStyles() {
    const barStyles = {
      'width': this.barWidth(),
      'margin-left': this.barMargin(),
    };
    return barStyles;
  }

  get timeDelay() {
    return 100 / this.numElements;
  }

}
