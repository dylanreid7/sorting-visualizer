import { BarServiceService } from './../bar-service.service';
import { Component, OnInit } from '@angular/core';
const MAIN_COLOR = 'turquoise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numElements: number = 100;
  
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
    // 70% of 100 vh times elementValue
    const numHeight = 0.6 * 0.1 * elementValue;
    const height = `${numHeight}vh`;
    return height;
  }

  get barNumbers(): number[] {
    return this.barService.barNumbers;
  }

  get barStyles(): any {
    return this.barService.barStyles;
  }
  

  sort() {
    return;
  }

}
