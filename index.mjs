import mergeSort from "./merge-sort.mjs";

function Node(data, left = null, right = null) {
    return {data, left, right}
}

function Tree(array) {
    let root = buildTree(array);
}

function buildTree(array) {
    // sort array using merge sort
    let sortedArray = mergeSort(array).filter(removeDuplicates);

    return sortedArray;
}

let arr1 = [3, 4, 5, 2, 1, 13, 8, 5, 0, 1, 2, 3];
// console.log(mergeSort(arr1));

function removeDuplicates(element, index, array) {
    return array.indexOf(element) === index;
}

console.log(buildTree(arr1));