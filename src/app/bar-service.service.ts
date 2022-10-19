import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarServiceService {
  barNumbers: number[] = [];

  constructor() { }

  generateArray() {
    this.barNumbers = [];
    for (let i = 0; i < 100; i++) {
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

}
