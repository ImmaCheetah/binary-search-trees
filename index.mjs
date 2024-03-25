import mergeSort from "./merge-sort.mjs";

function Node(data, left = null, right = null) {
    return {data, left, right}
}

function Tree(array) {
    function sortArray(array) {
        return mergeSort(array).filter(removeDuplicates);
    }
    
    function removeDuplicates(element, index, array) {
        return array.indexOf(element) === index;
    }

    let sortedArray = sortArray(array);

    
    const buildTree = (array, start = 0, end = array.length - 1) => {
        // start = 0;
        // end = array.length;
        let mid = Math.floor((start + end) / 2);
    
        if (start > end) {
            return null;
        }
        
        let node = Node(array[mid]);

        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end)
        // create a Node object with mid point as data
    
        // call buildTree on left side
        // - (start, mid)
        // call buildTree on right side
        // - (mid + 1, end)
        
        return node;
    }

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    
    let root = buildTree(sortedArray);

    prettyPrint(root);
    
    return { root, prettyPrint }
}





// let arr1 = [2, 4, 3, 6, 8, 1, 4, 0, 3, 5, 4, 2, 6]; 
let arr1 = [1, 2, 3, 4, 5];
let test = Tree(arr1);
// console.log(buildTree(arr1));
console.log(test);

/* BST algorithm
- define start index as 0, end as length of array - 1
- create a midpoint by (start+end) / 2
- make a Tree node


*/