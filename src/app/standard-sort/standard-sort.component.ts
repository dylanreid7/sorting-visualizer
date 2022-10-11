import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-sort',
  templateUrl: './standard-sort.component.html',
  styleUrls: ['./standard-sort.component.scss']
})
export class StandardSortComponent implements OnInit {
  @Input() unsortedNums: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  

}
