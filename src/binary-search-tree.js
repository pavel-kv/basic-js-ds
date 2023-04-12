const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addToTree(this.tree, data);

    function addToTree(node, value) {
      if (!node) {
        return new Node(value);
      } else if (node.data === value) {
        return node;
      } else if (value < node.data) {
        node.left = addToTree(node.left, value);
      } else {
        node.right = addToTree(node.right, value);
      }
      return node;
    }
  }

  has(data) {
    if (!this.tree) {
      return false;
    }

    let currentNode = this.tree;

    do {
      if (currentNode.data === data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    } while (currentNode);

    return false;
  }

  find(data) {
    if (!this.tree) {
      return null;
    }

    let currentNode = this.tree;

    do {
      if (currentNode.data === data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    } while (currentNode);

    return null;
  }

  remove(data) {
    this.tree = removeFromTree(this.tree, data);

    function removeFromTree(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left;
        }

        let maxFromLeftSubTree = node.left;
        while (maxFromLeftSubTree.right) {
          maxFromLeftSubTree = maxFromLeftSubTree.right;
        }

        node.data = maxFromLeftSubTree.data;
        node.left = removeFromTree(node.left, maxFromLeftSubTree.data);
        return node;

      } else if (value < node.data) {
        node.left = removeFromTree(node.left, value);
        return node;
      } else {
        node.right = removeFromTree(node.right, value);
        return node;
      }
    }
  }

  min() {
    if (!this.tree) {
      return null;
    }

    let currentNode = this.tree;
    let minValue;

    do {
      minValue = currentNode.data;
      currentNode = currentNode.left
    } while (currentNode)

    return minValue;
  }

  max() {
    if (!this.tree) {
      return null;
    }

    let currentNode = this.tree;
    let maxValue;

    do {
      maxValue = currentNode.data;
      currentNode = currentNode.right
    } while (currentNode)

    return maxValue;
  }
}

module.exports = {
  BinarySearchTree
};