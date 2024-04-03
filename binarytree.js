// Set The middle element of the array as root.
// Recursively do the same for the left half and right half.
//      Get the middle of the left half and make it the left child of the root created in step 1.
//      Get the middle of the right half and make it the right child of the root created in step 1.
// Print the preorder of the tree.


const node = (val) => {
    const value = val;
    const left = null;
    const right = null;

    return {
        value,
        left,
        right
    }
};

function buildTree (input) {
    let mid = Math.round(input.length/2);
    let left = input.slice(0, mid-1);
    let right = input.slice(mid);
    let midVal = input[mid-1];

    if (input.length <= 0) {
        return null;
    } else {
        let newNode = node(midVal);
        newNode.left = buildTree(left);
        newNode.right = buildTree(right);
        return newNode;
    }
}

let x = [1, 7, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(buildTree(x));

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let testPrint = prettyPrint(buildTree(x));





