import { Animation } from './../core/config/animation';

let animations: Animation[] = [];


export default function getMergeAnimations(numList: number[]) {
    let tempList = numList.slice();
    mergeSort(tempList, 0, tempList.length - 1);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
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


function merge(numList: number[], left: number, mid: number, right: number) {
    let leftList = numList.slice(left, mid + 1);
    let rightList = numList.slice(mid + 1, right + 1);
    let index = left;
    let leftIndex = 0;
    let rightIndex = 0;

    while (index <= right) {
      addAnimation('compare', [leftIndex + left, rightIndex + mid + 1]);
      addAnimation('returnColors', [leftIndex + left, rightIndex + mid + 1]);
      let placementIndex: number, numElementsToShift: number;
      let indexFrom: any = null;
      if (!leftList[leftIndex]) {
        numList[index] = rightList[rightIndex];
        rightIndex++;
        placementIndex = index;
        numElementsToShift = 0;
      }
      else if (!rightList[rightIndex]) {
        numList[index] = leftList[leftIndex];
        leftIndex++;
        placementIndex = index;
        numElementsToShift = 0;
      }
      else if (leftList[leftIndex] < rightList[rightIndex]) {
        numList[index] = leftList[leftIndex];
        leftIndex++;
        placementIndex = index;
        numElementsToShift = 0;
      } else {
        numList[index] = rightList[rightIndex];
        placementIndex = index;
        indexFrom = right - (rightList.length - 1 - rightIndex);
        rightIndex++;
        numElementsToShift = (leftList.length - leftIndex - 1) + (rightList.length - rightIndex - 1);
      }
      addAnimation('swap', [placementIndex, indexFrom, numElementsToShift]);
      addAnimation('returnColors', [placementIndex, indexFrom]);
      if (isSorted(numList, index)) {
        addAnimation('sorted', [index]);
    };
      index++;
    }
    
}

function mergeSort(numList: number[], left: number, right: number) {
    if (left >= right) {
        return;
    }
    var mid = left + Math.floor((right-left)/2);
    mergeSort(numList, left, mid);
    mergeSort(numList, mid + 1, right);
    merge(numList, left, mid, right);
}

function addAnimation(type: string, elements: number[]) {
    animations.push({
        type,
        elements
    });
}