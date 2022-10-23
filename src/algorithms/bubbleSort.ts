import { Animation } from '../core/config/animation';

let animations: Animation[] = [];

export default function getBubbleAnimations(numList: number[]) {
    let tempList = numList.slice();
    bubbleSort(tempList);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}

function bubbleSort(numList:number[]) {
    for (let i = 0; i < numList.length; i++) {
        for (let j = 0; j < numList.length - 1; j++) {
            addAnimation('compare', [j, j + 1]);
            if (numList[j] > numList[j + 1]) {
                let temp = numList[j];
                numList[j] = numList[j + 1];
                numList[j + 1] = temp;
                addAnimation('swap', [j, j + 1]);
            } 
            addAnimation('returnColors', [j, j + 1]);
        }
        addAnimation('sorted', [numList.length - i - 1]);
    }
}

function addAnimation(type: string, elements: number[]) {
    animations.push({
        type,
        elements
    });
}