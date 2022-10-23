import { Animation } from '../core/config/animation';

let animations: Animation[] = [];

export default function getSelectionAnimations(numList: number[]) {
    let tempList = numList.slice();
    selectionSort(tempList);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}

function selectionSort(numList: number[]) {
    for (let i = 0; i < numList.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < numList.length; j++) {
        addAnimation('compare', [minIndex, j]);
        addAnimation('returnColors', [minIndex, j]);
        if (numList[j] < numList[minIndex]) {
          minIndex = j;
        }
      }
      let temp = numList[i];
      numList[i] = numList[minIndex];
      numList[minIndex] = temp;
      addAnimation('swap', [i, minIndex]);
      addAnimation('returnColors', [minIndex]);
      addAnimation('sorted', [i]);
    }
}

function addAnimation(type: string, elements: number[]) {
    animations.push({
        type,
        elements
    });
}