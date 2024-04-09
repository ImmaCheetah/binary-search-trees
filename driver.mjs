import { Node } from "./index.mjs";
import { Tree } from "./index.mjs";

function generateArray() {
    let array = []

    for (let i = 0; i <= 100; i++) {
        let randomNum = Math.round(Math.random() * 100);
        array.push(randomNum);
    }

    return array;
}

let tree = Tree(generateArray());

console.log(tree.isBalanced());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder());
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(150);
tree.insert(200);
tree.insert(180);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder());
tree.displayTree();
