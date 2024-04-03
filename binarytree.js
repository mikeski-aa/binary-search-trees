// Set The middle element of the array as root.
// Recursively do the same for the left half and right half.
//      Get the middle of the left half and make it the left child of the root created in step 1.
//      Get the middle of the right half and make it the right child of the root created in step 1.
// Print the preorder of the tree.

// only used to make the printed binary tree easier to visualize
function prettyPrint(node, prefix = "", isLeft = true) {
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
}

// constructor function used to create new nodes within a tree
const node = (val) => {
  const value = val;
  const left = null;
  const right = null;

  return {
    value,
    left,
    right,
  };
};
// function builds binary tree from sorted array
function buildTree(input) {
  let mid = Math.round(input.length / 2);
  let left = input.slice(0, mid - 1);
  let right = input.slice(mid);
  let midVal = input[mid - 1];

  if (input.length <= 0) {
    return null;
  } else {
    let newNode = node(midVal);
    newNode.left = buildTree(left);
    newNode.right = buildTree(right);
    return newNode;
  }
}

// this function checks array is more than 2 in length, otherwise binary tree cannot be created
// it also checks for duplicates, ignoring all duplicates

function sortArray(input) {
  if (input.length <= 1) {
    throw new Error("Input array cannot be of 0 or 1 length!");
  }
  let sortedArray = input.sort((a, b) => {
    return a - b;
  });
  let duplicateFreeArray = [];
  console.log(sortedArray);
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i + 1]) {
      console.log(`Duplicate found ${sortedArray[i]}`);
    } else {
      duplicateFreeArray.push(sortedArray[i]);
    }
  }
  console.log(duplicateFreeArray);
  return duplicateFreeArray;
}

// tree constructor function

const tree = (input) => {
  let root = buildTree(input);

  // insert a new value in tree  ---- write while loop and let current = current.next
  // if value being added is less than root value, we go left
  // otherwise we go down the right hand path

  const insert = (val) => {
    return insertInTree(val, root);
  };

  // recursive function to go through the tree and insert a value at appropriate location
  const insertInTree = (val, targetNode) => {
    if (targetNode == null) {
      let newNode = node(val);
      targetNode = newNode;
      return targetNode;
    }

    if (val < targetNode.value) {
      targetNode.left = insertInTree(val, targetNode.left);
    } else {
      targetNode.right = insertInTree(val, targetNode.right);
    }
    return targetNode;
  };

  // delete a value
  const deleteItem = (val) => {
    return deleteInTree(val, root);
  };

  // deleting a leaf is simple - leaf = no children
  // deleting w/ one child (either left or right) is simple, move where the pointer points to
  // deleting node with two children is more complex
  // you need to go into right subtree, and then go into the first left value to see if it is the next largest
  // if there are multiple lefts in the first right after target node, go through to the end to find target

  const deleteInTree = (val, targetNode) => {
    // base case in case we get to the end
    if (targetNode === null) {
      return targetNode;
    }
// if value is less than target, we go left
// if value is more than target, we go right
    if (val < targetNode.value) {
       return deleteInTree(val, targetNode.left)
    } else if (val > targetNode.value) {
        return deleteInTree(val,targetNode.right)
    };
// if we go neither left or right, means we found the node

    if (targetNode.left === null && targetNode.right === null) {
        console.log('Target acquired, no children')
      
    }
    console.log(targetNode.value);

  };

  return {
    root,
    insert,
    deleteItem,
  };
};

let x = [ 6, 19, 23, 47, 54, 56, 58, 77, 79, 91];

console.log(sortArray(x));

let testTree = tree(x);
// console.log(buildTree(x));

console.log(testTree.root.right);
// console.log(testTree.insert(14));
// console.log(testTree.insert(18));
// console.log(testTree.insert(123));
// console.log(testTree.insert(2323));
testTree.deleteItem(6);
prettyPrint(testTree.root);

