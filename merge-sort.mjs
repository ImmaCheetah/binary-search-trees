
export default function mergeSort(array) {
    if (array.length == 1) {
        let sortedArray = array;
        return sortedArray;
    } else {
        let middle = Math.floor((array.length / 2));
        let leftHalf = mergeSort(array.slice(0, middle));
        let rightHalf = mergeSort(array.slice(middle, array.length));
        return merge(leftHalf, rightHalf);
    }
    function merge(arr1, arr2) {
        let i = 0;
        let j = 0;
        let resultArray = [];
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                resultArray.push(arr1[i++]);
            } else {
                resultArray.push(arr2[j++]);
            }
        }
        for (i; i < arr1.length; i++) {
            resultArray.push(arr1[i]);
        }
        for (j; j < arr2.length; j++) {
            resultArray.push(arr2[j]);
        }
        return resultArray;
    }
}



