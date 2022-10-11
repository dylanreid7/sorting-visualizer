import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BubbleSortComponent
  },
  {
    path: 'bubble-sort',
    component: BubbleSortComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
