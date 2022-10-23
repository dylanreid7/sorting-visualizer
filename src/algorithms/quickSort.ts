import { Animation } from '../core/config/animation';

let animations: Animation[] = [];

export default function getQuickAnimations(numList: number[]) {
    let tempList = numList.slice();
    quickSort(tempList, 0, tempList.length - 1);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}

function quickSort(numList: number[], low: number,  high: number) {
    if (high > low) {
        let pi = partition(numList, low, high);

        quickSort(numList, low, pi - 1);

        quickSort(numList, pi + 1, high);
    }
}



function partition(numList: number[], low: number, high: number) {
    const pivotValue = numList[high];
  
    let j = low - 1;
  
    for (let i = low; i < high; i++) {
        addAnimation('compare', [i, high]);
        addAnimation('returnColors', [i, high]);
        if (numList[i] < pivotValue) {
          j++;
          swap(numList, i, j);
          addAnimation('swap', [i, j]);
          addAnimation('returnColors', [i, j]);
        }  
    }
    swap(numList, j + 1, high);
    addAnimation('swap', [j + 1, high]);
    addAnimation('returnColors', [j + 1, high]);
    
    if (isSorted(numList, high)) {
        addAnimation('sorted', [high]);
    }
    return (j + 1);  
}

function isSorted(numList: number[], elementNumber: number) {
    if (elementNumber >= numList.length) {
      return false;
    }
    const sliced = numList.slice(0, elementNumber + 1);
    for (let i = 0; i < sliced.length - 1; i++) {
      if (sliced[i] > sliced[i + 1]) {
              return false;
          }
    }
    return true;
}

function swap(numList: number[], firstIndex: number, secondIndex: number) {
  let temp = numList[firstIndex];
  numList[firstIndex] = numList[secondIndex];
  numList[secondIndex] = temp;
}

function addAnimation(type: string, elements: number[]) {
    animations.push({
        type,
        elements
    });
}