import { Animation } from '../core/config/animation';

let animations: Animation[] = [];

export default function getAnimations(numList: number[]) {
    let tempList = numList.slice();
    bubbleSort(tempList);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}

function bubbleSort(numList:number[]) {
    for (let i = 0; i < numList.length; i++) {
        for (let j = 0; j < numList.length; j++) {
            animations.push({
                'type': 'compare',
                'elements': [j, j+1],
            });
            if (numList[j] > numList[j + 1]) {
                let temp = numList[j];
                numList[j] = numList[j + 1];
                numList[j + 1] = temp;
                animations.push({
                    'type': 'swap',
                    'elements': [j, j+1],
                });
            } 
            animations.push({
                'type': 'returnColors',
                'elements': [j, j+1],
            });
        }
        animations.push({
            'type': 'sorted',
            'elements': [numList.length - i - 1],
        });
    }
}