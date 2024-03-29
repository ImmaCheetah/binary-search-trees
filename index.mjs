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
        if (start > end) {
            return null;
        }

        let mid = Math.ceil((start + end) / 2);
        
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

    
    const insert = (value, currentNode = root) => {

        if (currentNode == null) {
            currentNode = Node(value);
            return Node(value);
        }

       
        // if (currentNode.left == null) {
        //     if (value < currentNode.left) {
        //         currentNode.left = Node(value);
        //     }
        // }

        if (currentNode.left == null && currentNode.right == null) {
            if (value < currentNode.data) {
                currentNode.left = Node(value);
            } else {
                currentNode.right = Node(value);
            }
            return currentNode
        }

        if (value < currentNode.data) {
            insert(value, currentNode.left)
        } else {
            insert(value, currentNode.right)
        } 

    }

    const deleteItem = (value, currentNode = root, parentNode) => {
        
        if (currentNode == null) {
            return currentNode;
        }

        if (value === currentNode.data) {
            // Case 1
            if (currentNode.left === null && currentNode.right === null) {
                if (value === parentNode.right.data) {
                    parentNode.right = null;
                    return currentNode;
                } else {
                    parentNode.left = null;
                    return currentNode;
                }
            }

            // Case 2
            if (currentNode.left === null) {
                if (value === parentNode.right.data) {
                    parentNode.right = currentNode.right;
                    return currentNode;
                } else {
                    parentNode.left = currentNode.right;
                    return currentNode;
                }
            } else if (currentNode.right === null) {
                if (value === parentNode.right.data) {
                    parentNode.right = currentNode.left;
                    return currentNode;
                } else {
                    parentNode.left = currentNode.left;
                    return currentNode;
                }
            }

            // Case 3
            // Find node to delete
            // Check for two children
            // Find biggest value by checking left most node in the right subtree of target node recursively
            // Set value of target node to value of left most node in subtree
            // If left most node has right node, point previous node to right node

            if (currentNode.left != null && currentNode.right != null) {
                let tempNode = currentNode.right;
                while (tempNode.left != null) {
                    tempNode = tempNode.left;
                }
                currentNode.data = tempNode.data;

                
                // let leftestNode = deleteItem(value, currentNode.left, parentNode)
                // console.log(leftestNode);
            }

        } else if (value < currentNode.data) {
            parentNode = currentNode;
            currentNode = currentNode.left;
            deleteItem(value, currentNode, parentNode)
        } else {
            parentNode = currentNode;
            currentNode = currentNode.right;
            deleteItem(value, currentNode, parentNode)
        }
    
    }



    const find = (value, currentNode = root) => {
        if (currentNode == null) {
            return currentNode;
        }

        if (currentNode.data === value) {
            return currentNode;
        } else if (value < currentNode.data) {
            currentNode = currentNode.left;
            find(value, currentNode)
        } else {
            currentNode = currentNode.right;
            find(value, currentNode)
        } 
    }

    const displayTree = () => {
        prettyPrint(root);
    }
    
    let root = buildTree(sortedArray);
    
    return { root, insert, displayTree, deleteItem, find }
}





// let arr1 = [2, 4, 3, 6, 8, 1, 4, 3, 5, 4, 2, 6, 11, 20, 30, 40]; 
let arr1 = [1, 2, 3, 4, 5];
let test = Tree(arr1);

test.insert(1.5);
// console.log(test.root.left);
// test.deleteItem(4);
// console.log(test.find(3));
test.displayTree();
