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

        if (currentNode.left == null) {
            if (value < currentNode.data) {
                currentNode.left = Node(value);
            }
        }
        if (currentNode.right == null) {
            if (value > currentNode.data) {
                currentNode.right = Node(value);
            }
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
            // Case 1 - no children
            if (currentNode.left === null && currentNode.right === null) {
                if (parentNode.right == null) {
                    parentNode.left = null;
                    return currentNode;
                } else {
                    parentNode.right = null;
                    return currentNode;
                }
            }

            // Case 2 - one child
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

            // Case 3 - two children
            if (currentNode.left != null && currentNode.right != null) {
                // Set a temp variable to the right node of target to loop over as subtree
                // Keep track of parent to use to target when deleting
                let tempNode = currentNode.right;
                let tempParentNode = currentNode;

                // Loop over the left nodes of subtree
                while (tempNode.left != null) {
                    tempParentNode = tempNode;
                    tempNode = tempNode.left;
                }
                // Set target node value to left most node value
                currentNode.data = tempNode.data;

                // Check if left-most node has no children 
                // Check if parents right node is empty and set its left to null
                if (tempNode.left == null && tempNode.right == null) {
                    if (tempParentNode.right == null) {
                        tempParentNode.left = null;
                    } else {
                        tempParentNode.right = null;

                    }
                }

                // Check if left most node has a child
                // If the value is less than the parent value then target left side to change pointer
                if (tempNode.right != null) {
                    if (tempNode.data < tempParentNode.data) {
                        tempParentNode.left = tempNode.right;
                    } else {

                        tempParentNode.right = tempNode.right;
                    }
                }
            }

        // Traverse the tree based on value while keeping track of parent
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
            console.log(currentNode);
            return currentNode;
        } else if (value < currentNode.data) {
            currentNode = currentNode.left;
            find(value, currentNode)
        } else {
            currentNode = currentNode.right;
            find(value, currentNode)
        }

    }

    const levelOrder = (callback) => {

        let currentNode = root;
        let resultArray = [];
        let queue = [];

        if (currentNode == null) {
            return currentNode;
        }

        queue.push(currentNode);

        if (typeof callback === 'function') {
            while (queue.length != 0) {
                let visitedNode = queue.shift();

                callback(visitedNode);
                
                if (visitedNode.left != null) {
                    queue.push(visitedNode.left);
                }
    
                if (visitedNode.right != null) {
                    queue.push(visitedNode.right);
                }
    
                resultArray.push(visitedNode.data);
            }
        } else {
            while (queue.length != 0) {
                let visitedNode = queue.shift();
    
                if (visitedNode.left != null) {
                    queue.push(visitedNode.left);
                }
    
                if (visitedNode.right != null) {
                    queue.push(visitedNode.right);
                }
    
                resultArray.push(visitedNode.data);
            }
        }

        return resultArray;
    }

    const inOrder = (callback, currentNode = root, resultArray = []) => {
        if (currentNode == null) {
            return;
        }

        if (typeof callback === 'function') {
            callback(currentNode);
            inOrder(callback, currentNode.left, resultArray);
            resultArray.push(currentNode.data);
            inOrder(callback, currentNode.right, resultArray);
        } else {
            inOrder(callback, currentNode.left, resultArray);
            resultArray.push(currentNode.data);
            inOrder(callback, currentNode.right, resultArray);
        }

        return resultArray;

    }

    const preOrder = (callback, currentNode = root, resultArray = []) => {
        if (currentNode == null) {
            return;
        }

        if (typeof callback === 'function') {
            callback(currentNode);
            resultArray.push(currentNode.data);
            preOrder(callback, currentNode.left, resultArray);
            preOrder(callback, currentNode.right, resultArray);
        } else {
            resultArray.push(currentNode.data);
            preOrder(callback, currentNode.left, resultArray);
            preOrder(callback, currentNode.right, resultArray);
        }

        return resultArray;
    }

    const postOrder = (callback, currentNode = root, resultArray = []) => {
        if (currentNode == null) {
            return;
        }

        if (typeof callback === 'function') {
            callback(currentNode);
            postOrder(callback, currentNode.left, resultArray);
            postOrder(callback, currentNode.right, resultArray);
            resultArray.push(currentNode.data);
        } else {
            postOrder(callback, currentNode.left, resultArray);
            postOrder(callback, currentNode.right, resultArray);
            resultArray.push(currentNode.data);
        }

        return resultArray;
    }

    const doubleValue = (node) => {
        node.data *= 2;
        return node;
    }

    const height = (node = root, counter = -1) => {
        if (node == null) {
            return -1;
        }
        
        let left = 1 + height(node.left, counter);
        let right = 1 + height(node.right, counter);

        if (left > right) {
            return left;
        } else {
            return right;
        }
    }
    
    const depth = (node, currentNode = root, counter = -1) => {
        if (currentNode == null) {
            return -1;
        }
        
        if (currentNode == node) {
            return 0;
        }
        
        let left = depth(node, currentNode.left, counter);
        let right = depth(node, currentNode.right, counter);

        if (left == null && right == null) {
            return null;
        }
        
        if (left != null && left >= 0) {
            return left + 1;
        } else if (right != null && right >= 0) {
            return right + 1;
        } else {
            return;
        }
    }

    const isBalanced = (currentNode = root) => {
        if (root == null) {
            return true;
        }

        if (subTreeIsBalanced(currentNode.left) && subTreeIsBalanced(currentNode.right)) {
            return true;
        } else {
            return false;
        }
    }

    const subTreeIsBalanced = (node) => {
        if (height(node.left) - height(node.right) <= 1) {
            if (height(node.right) - height(node.left) <= 1) {
                return true;
            }
        } else {
            return false;
        }
    }

    const rebalance = (currentNode = root) => {
        // if (isBalanced(currentNode)) {
        //     return true;
        // } else {
        //     let newArray = inOrder(root);
        //     console.log(newArray);
        //     root = buildTree(newArray);
        
        //     return root;
        // }

        // check if tree is balanced
        // use in order traversal to get new array
        // build new tree using that array
        // check if balanced
    }

    const displayTree = () => {
        prettyPrint(root);
    }
    
    let root = buildTree(sortedArray);
    
    return { root, insert, displayTree, deleteItem, find, levelOrder, inOrder, preOrder, postOrder, doubleValue, height, depth, isBalanced, subTreeIsBalanced, rebalance }
}


export { Node, Tree }
// let arr1 = [2, 4, 3, 6, 8, 1, 4, 3, 5, 4, 2, 6, 11, 20, 30, 40]; 
// let arr1 = [8, 9, 10];
// let test = Tree(arr1);
// test.insert(8.5);
// test.insert(7);
// test.insert(2);
// test.insert(11);
// test.insert(1);
// test.insert(0);

// console.log(test.inOrder());
// test.displayTree();
// console.log("The depth is: ", test.depth(test.root.right.left.left.right));
