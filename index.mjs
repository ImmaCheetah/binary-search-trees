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

        let mid = Math.ceil((start + end) / 2);
    
        if (start > end) {
            return null;
        }
        
        let node = Node(array[mid]);

        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end)
        
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
    }

    
    const insert = (value) => {

        if (currentNode.left == null || currentNode.right == null) {
            if (value < currentNode.data) {
                currentNode.left = Node(value);
            } else {
                currentNode.right = Node(value);
            }
            return currentNode
        }

        if (value < currentNode.data) {
            currentNode = currentNode.left;
            insert(value)
        } else {
            currentNode = currentNode.right;
            insert(value)
        } 

    }

    const displayTree = () => {
        prettyPrint(root);
    }
    /*
    Check the value to be inserted (say X) with the value of the current node (say val) we are in:
        If X is less than val move to the left subtree.
        Otherwise, move to the right subtree.
    Once the leaf node is reached, insert X to its right or left based on the relation between X and the leaf node’s value. 
    */
    
    let root = buildTree(sortedArray);
    let currentNode = root;
    
    return { root, insert, displayTree }
}





// let arr1 = [2, 4, 3, 6, 8, 1, 4, 0, 3, 5, 4, 2, 6]; 
let arr1 = [1, 2, 3, 4, 5];
let test = Tree(arr1);
// console.log(buildTree(arr1));
console.log(test.insert(2.5));
console.log(test.insert(6));
console.log(test.displayTree());
