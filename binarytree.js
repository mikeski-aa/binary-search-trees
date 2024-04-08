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
  if (node.right != null) {
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

  const deleteInTree = (val, targetNode, previousNode) => {
    // base case in case we get to the end
    if (targetNode === null) {
      return targetNode;
    }
    // if value is less than target, we go left
    // if value is more than target, we go right
    if (val < targetNode.value) {
      return deleteInTree(val, targetNode.left, targetNode);
    } else if (val > targetNode.value) {
      return deleteInTree(val, targetNode.right, targetNode);
    }
    // if we go neither left or right, means we found the node
    // need to identify how many children there are
    // if no children are present, it is quite simple

    if (targetNode.left === null && targetNode.right === null) {
      console.log("Target acquired, no children");
      console.log(previousNode);
      if (previousNode.left != null && previousNode.left.value === val) {
        previousNode.left = null;
      } else {
        previousNode.right = null;
      }
      return targetNode;
    }
    // if we have one child present either on left or right we can do this
    // there must be a more elegant way of writing this instead of nested
    // if loops, this code is horrible!

    if (targetNode.left != null && targetNode.right === null) {
      console.log("Target found, only one child present");
      if (targetNode.value < previousNode.value) {
        let oldNode = { ...targetNode.left };
        previousNode.left = oldNode;
      } else {
        let oldNode = { ...targetNode.left };
        previousNode.right = oldNode;
      }
    } else if (targetNode.left === null && targetNode.right != null) {
      console.log("Target found, only one child present");
      if (targetNode.value < previousNode.value) {
        let oldNode = { ...targetNode.right };
        previousNode.left = oldNode;
      } else {
        let oldNode = { ...targetNode.right };
        previousNode.right = oldNode;
      }
    }
    // removing a node with 2 children
    // we need to find next biggest in the right subtree
    // and go first left
    if (targetNode.left != null && targetNode.right != null) {
      console.log("Target acquired, target has 2 children");
      let start = targetNode.right;
      while (start != null) {
        if (start.left === null) {
          // console.log('found replacement')
          // console.log(start.value);
          // console.log(targetNode.right.value);
          let tempNode = { ...start.right };
          if (tempNode.value === undefined) {
            targetNode.right = null;
            targetNode.value = start.value;
          } else {
            targetNode.right.left = tempNode;
            targetNode.value = start.value;
          }
        }
        start = start.left;
      }
      return targetNode;
    }
  };

  const find = (val, targetNode) => {
    if (targetNode === null) {
      throw new Error("Target not in tree!");
    }

    if (val < targetNode.value) {
      console.log("we go left");
      return find(val, targetNode.left);
    } else if (val > targetNode.value) {
      console.log("we go right");
      return find(val, targetNode.right);
    }
    console.log("target found");
    console.log(targetNode);
    return targetNode;
  };

  return {
    root,
    find,
    insert,
    deleteItem,
  };
};

let x = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 243, 3, 99, 23, 1231];

let testTree = tree(sortArray(x));
// console.log(buildTree(x));

// console.log(testTree.insert(14));
// console.log(testTree.insert(18));
// console.log(testTree.insert(123));
// console.log(testTree.insert(2323));
// testTree.deleteItem(4);
// testTree.deleteItem(7);
// testTree.deleteItem(9);

// console.log(testTree.root);
// console.log(testTree.root.right);

prettyPrint(testTree.root);
testTree.find(69, testTree.root);
