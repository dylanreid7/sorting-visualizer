import { Animation } from './../core/config/animation';

let animations: Animation[] = [];


export default function getAnimations(numList: number[]) {
    let tempList = numList.slice();
    mergeSort(tempList, 0, tempList.length - 1);
    let tempAnimations = animations.slice();
    animations = [];
    console.log('animations: ', tempAnimations);
    return tempAnimations;
}

/* 
When two are compared, one is green one is blue (compare)
When one is placed, color it red (swap)
After this, turn those back to normal (returnColor) 
When all values to the left are sorted, color purple x

*/


function merge(numList: number[], left: number, mid: number, right: number) {
    let leftList = numList.slice(left, mid + 1);
    let rightList = numList.slice(mid + 1, right + 1);
    console.log('left: ', leftList);
    console.log('right: ', rightList);
    // create left array and right array
  
    // initialize index variable as 0
    // initialize left index as left
    // initialize right index as mid + 1
    let index = left;
    let leftIndex = 0;
    let rightIndex = 0;
  
    // while index less than right minus left
    while (index <= right) {
      // if left at left index is less than right at right index
      console.log('left list: ', leftList);
      console.log('left i', leftIndex);
      console.log('righ l', rightList);
      console.log('right i', rightIndex);
      animations.push({
          'type': 'compare',
          'elements': [leftIndex + left, rightIndex + mid + 1],
      });
      animations.push({
          'type': 'returnColors',
          'elements': [leftIndex + left, rightIndex + mid + 1],
      });
      let indexOne: number, indexTwo: number;
      if (!leftList[leftIndex]) {
        numList[index] = rightList[rightIndex];
        rightIndex++;
        indexOne = index;
        indexTwo = rightIndex + mid + 1;
        
      }
      else if (!rightList[rightIndex]) {
        numList[index] = leftList[leftIndex];
        leftIndex++;
        indexOne = index;
        indexTwo = left + leftIndex;
      }
      else if (leftList[leftIndex] < rightList[rightIndex]) {
        // array at index equals left at left
        numList[index] = leftList[leftIndex];
        leftIndex++;
        indexOne = index;
        indexTwo = left + leftIndex;
      } else {
        // array at index equals right at right index
        numList[index] = rightList[rightIndex];
        rightIndex++;
        indexOne = index;
        indexTwo = rightIndex + mid + 1;
      }
      animations.push({
        'type': 'swap',
        'elements': [indexOne, indexTwo],
      });
      animations.push({
          'type': 'returnColors',
          'elements': [indexOne, indexTwo],
      });
      index++;
    }

    animations.push({
        'type': 'sorted',
        'elements': [left, right],
    });
}
  // const array = [3, 4, 7, 8, 9, 1, 2, 5, 10, 0, 9];
  // merge(array, 0 , 4, 8);
  // console.log('array', array);
  
function mergeSort(numList: number[], left: number, right: number) {
    // check two see if there is one or less elements
        // return
    if (left >= right) {
        return;
    }
    // determine the midpoint -> right - left / 2
    // let mid = Math.floor((right + left - 1) / 2);
    var mid = left + Math.floor((right-left)/2);

    // console.log('mid: ', mid);
    // mergeSort arr, left, mid
    mergeSort(numList, left, mid);
    // mergeSort arr, mid + 1, right
    mergeSort(numList, mid + 1, right);
    // merge arr, left, mid, right
    merge(numList, left, mid, right);
}