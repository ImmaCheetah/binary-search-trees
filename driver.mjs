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
// let tree = Tree([1, 2, 3, 4]);
// tree.displayTree();
console.log(tree.isBalanced());
console.log(tree.inOrder());