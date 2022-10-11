import { Animation } from '../core/config/animation';

let animations: Animation[] = [];

export default function getAnimations(numList: number[]) {
    let tempList = numList.slice();
    quickSort(tempList, 0, tempList.length - 1);
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

    console.log('numList: ', numList);
}



function partition(numList: number[], low: number, high: number) {
    const pivotValue = numList[high];
  
    let j = low - 1;
  
    for (let i = low; i < high; i++) {
        animations.push({
            type: 'compare',
            elements: [i, high],
        });
        if (numList[i] < pivotValue) {
          j++;
          swap(numList, i, j);
          animations.push({
              'type': 'swap',
              'elements': [i, j],
          });
          animations.push({
              'type': 'returnColors',
              'elements': [i, j],
          });
        }
        animations.push({
            'type': 'returnColors',
            'elements': [i, high],
        });
    }
    swap(numList, j + 1, high);
    animations.push({
        'type': 'swap',
        'elements': [j+ 1, high]
    })
    // create a function to check that all values to the left of the partition number are less than it, if so, it is considered sorted
    if (isSorted(numList, high)) {
        animations.push({
            'type': 'sorted',
            'elements': [high],
        });
    }


    return (j + 1);  
}

// function isSorted(numList: number[], elementNumber: number) {
//     // create an array of elements to the left of element num
//     const splicedList = numList.slice(0, elementNumber);
//     // console.log('spliced: ', splicedList);
//     const target = numList[elementNumber];
//     for (let i = 0; i < splicedList.length; i++) {
//         if (splicedList[i] > target) {
//             return false;
//         }
//     }
//     return true;
//     // iterate through
//         // if current num is greater than element num
//             // return false
//     // return true
// }

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