import { HomeComponent } from './home/home.component';
import { MergeSortComponent } from './merge-sort/merge-sort.component';
import { QuickSortComponent } from './quick-sort/quick-sort.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionSortComponent } from './selection-sort/selection-sort.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bubble',
    component: BubbleSortComponent
  },
  {
    path: 'quick',
    component: QuickSortComponent
  }, 
  {
    path: 'merge',
    component: MergeSortComponent
  },
  {
    path: 'selection',
    component: SelectionSortComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
