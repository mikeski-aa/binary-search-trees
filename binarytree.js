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
  }

  // go through tree and delete item found
  // need to think one step ahead since .left and .right need to get moved if there are children
  const deleteInTree = (val, targetNode) => {

    if (targetNode.left.value == val) {
        let oldLeft = {...targetNode.left.left}
        let oldRight = {...targetNode.left.right};

      }
  }

  return {
    root,
    insert,
  };
};

let x = [5, 17, 25];

console.log(sortArray(x));

let testTree = tree(x);
// console.log(buildTree(x));

console.log(testTree.root.right);
console.log(testTree.insert(14));
console.log(testTree.insert(2));
// console.log(testTree.insert(18));
// console.log(testTree.insert(123));
// console.log(testTree.insert(2323));
prettyPrint(testTree.root);
