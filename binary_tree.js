
// Generates an len long array with values between 0-200
function randomArray(len) {
    var arr = [];
    for (var i=0; i<len; i++) {
        arr.push(Math.round(Math.random() * 200))
}
    return arr
}


class BinaryTree {
    constructor(arr) {
        // Sorting the array
        const sorted_arr = arr.sort(function(a,b){return a-b})
        this.root = this.buildTree(sorted_arr)
    }

    // Builds a balanced binary tree
    buildTree(arr,start=0,end=arr.length-1) {
        const sorted_arr = arr.sort(function(a,b){return a-b})
        // The end condition
        if (start > end) { return null};

        let mid = Math.floor((start + end) / 2)
        let node = Node(sorted_arr[mid]);

        // Building the left side of the binary tree by shrinking down the array (lower values)
        node.leftChild = this.buildTree(sorted_arr,start,mid-1)
        // Building the right side of the binary tree (higher values)
        node.rightChild = this.buildTree(sorted_arr,mid+1,end)

        return node
    }

    #insertRec(root = this.root,value) {
 
        /*
         * If the tree is empty, return a new node
         */
        if (root == null) {
            root = Node(value);
            return root;
        }
 
        /* Otherwise, recur down the tree */
        if (value < root.value)
            root.leftChild = this.#insertRec(root.leftChild, value);
        else if (value > root.value)
            root.rightChild = this.#insertRec(root.rightChild, value);

 
        /* return the (unchanged) node pointer */
        return root;
    }

    insert(key) {
        this.#insertRec(this.root,key);
    }

    #deleteRec(root,val) {
        // The tree is empty
        if (root === null) {
            return root;
        }
        // Going down the tree
        if (val < root.value) {
            root.leftChild = this.#deleteRec(root.leftChild, val)
        } else if (val > root.value) {
            root.rightChild = this.#deleteRec(root.rightChild,val)
        // If the val is the root Node
        } else {
            // If the root DOES NOT have 2 children
            if (root.leftChild === null) {
                return root.rightChild
            } else if (root.rightChild === null) {
                return root.leftChild
            }

            // Node WITH 2 children
            root.value = minRoot(root.rightChild);

            root.rightChild = this.#deleteRec(root.rightChild, root.val)
        }
        return root
    }



    delete(val) {
        this.#deleteRec(this.root, val)
    }
 
        #minNode() {
        let current_node = this.root;
        while (current_node.leftChild) {
            current_node = current_node.leftChild
        }
        return current_node
    }

    find(target, root=this.root) {
        if (root === null || root.value === target) {
            return root
        }if (root.value < target) {
            return this.find(target,root.rightChild)
        }
        return this.find(target,root.leftChild,)
    }

    levelOrder(root = this.root) {
        if (root === null) {
            return null
        }
        let queue = [];
        queue.push(root);
        while (queue.length > 0) {;
            let current_node = queue[0];
            if (current_node.leftChild) {
                queue.push(current_node.leftChild)
            }if (current_node.rightChild) {
                queue.push(current_node.rightChild)
            };
            console.log(current_node.value);
            queue.shift();
        }

    }

    levelOrderRec(queue = [this.root],node = this.root) {
        if (node === null) {
            return null
        }
        let current_node = queue[0];
        while (queue.length > 0) {
            console.log(current_node.value);
            if (current_node.leftChild) {
                queue.push(current_node.leftChild)
            }
            if (current_node.rightChild) {
                queue.push(current_node.rightChild)
            }
            queue.shift()
            this.levelOrderRec(queue,current_node)
        }
        return
    }

 
    preorder(node = this.root) {
        if (node === null) {
            return;
        }
        console.log(node.value);
        this.preorder(node.leftChild);
        this.preorder(node.rightChild);

    }

    inorder (node = this.root) {
        if (node === null) {
            
            return
        }
        this.inorder(node.leftChild);
        console.log(node.value);
        this.inorder(node.rightChild);

    }


    postorder(node = this.root) {
        if (node === null) {
            return
        }
        this.postorder(node.leftChild);
        this.postorder(node.rightChild);
        console.log(node.value)
    }

    height(node = this.root) {
        if (node === null) {
            return 0
        };

        let leftAns = this.height(node.leftChild);
        let rightAns = this.height(node.rightChild);

        return Math.max(leftAns,rightAns) + 1
    }

    depth (node,root = this.root) {
        let depth = -1;

        if (node === null) {
            return depth
        };

        if (root == node || (depth = this.depth(node,root.leftChild)) >= 0 ||
        (depth = this.depth(node,root.rightChild)) >= 0)
        {
            return depth + 1
        }

        return depth
    }

    isBalanced(root = this.root) {
        if (root === null) {
            return true
        }

        let leftHeight = this.height(root.leftChild);
        let rightHeight = this.height(root.rightChild);

        if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.leftChild) === true && this.isBalanced(root.rightChild) === true) {
            return true;
        }
        return false;
    }

    // Goes through every node and returns an array
    #traverse(node = this.root, array = []) {
        if (this.root === null) {
            return
        }
        array.push(node.value)
        if (node.leftChild) {
            this.#traverse(node.leftChild,array)
        }
        if (node.rightChild) {
            this.#traverse(node.rightChild,array)
        }
        return array
    }

    rebalance() {
        if (this.isBalanced()) {
            return
        }
        return new BinaryTree(this.#traverse())
    }


}
function Node(value) {
    value = value;
    rightChild = null;
    leftChild = null;

    return {
        value,
        leftChild,
        rightChild
    }
}


let random_tree = new BinaryTree(randomArray(10));
console.log(random_tree.isBalanced())
console.log("Postorder")
random_tree.postorder();
console.log("Preorder")
random_tree.preorder();
console.log("Inorder")
random_tree.inorder()
// Adding 5 new nodes with value greater than 100
random_tree.insert(152);
random_tree.insert(452);
random_tree.insert(154);
random_tree.insert(106);
random_tree.insert(301)
// Checking if the tree is balanced with the newly inserted nodes (should be false)
console.log(random_tree.isBalanced())
// Rebalancing the new tree
random_tree = random_tree.rebalance();
// Checking if after the rebalance the tree is actually balanced
console.log(random_tree.isBalanced())
console.log("Postorder")
random_tree.postorder();
console.log("Preorder")
random_tree.preorder();
console.log("Inorder")
random_tree.inorder()
