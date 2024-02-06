#!/usr/bin/env node
class node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    add(value) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new node(value);
            } else {
                this.left.add(value);
            }
        } else {
            if (this.right === null) {
                this.right = new node(value);
            } else {
                this.right.add(value);
            }
        }
    }
    print() {
        console.log(this.value);
        if (this.left !== null) {
            console.log('R');
            this.left.print();
        }
        if (this.right !== null) {
            console.log('L');
            this.right.print();
        }
    }
}

class tree {
    constructor() {
        this.root = null;
    }
    add(value) {
        if (this.root === null) {
            this.root = new node(value);
        } else {
            this.root.add(value);
        }
    }
    contains(value) {
        return this.root.contains(value);
    }
    print () {
        if (this.root !== null) {
            this.root.print();
        }
    }
}

let myTree = new tree();
for (let i = 1; i < 6; i++) {
    myTree.add(i);
}
console.log('Tree built with add');
myTree.print();

myTree.root = new node(1);
let root = myTree.root;
root.left = new node(2);
root.right = new node(3);
root.right.left = new node(4);
root.right.right = new node(5);
console.log('Tree built manually');
myTree.print();
console.log('Tree nodes as objects:');
console.dir(root);
console.dir(root.left);
console.dir(root.right);
console.dir(root.right.left);
console.dir(root.right.right);

