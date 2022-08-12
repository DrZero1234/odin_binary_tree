
// Generates an len long array with values between 0-200
function randomArray(len) {
    var arr = [];
    for (var i=0; i<len; i++) {
        arr.push(Math.round(Math.random() * 200))
}
    return arr
}

console.log(randomArray(10))
class BinaryTree {
    constructor(arr) {
        const sorted_arr = arr.sort(function(a,b){return a-b})
        this.root = this.buildTree(sorted_arr)
    }

    buildTree(arr,start=0,end=arr.length-1) {
        const sorted_arr = arr.sort(function(a,b){return a-b})
        if (start > end) { return null};
        let mid = Math.floor((start + end) / 2)
        let node = Node(sorted_arr[mid]);

        node.leftChild = this.buildTree(sorted_arr,start,mid-1)
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

    inorder(node = this.root) {

    }



    // First Walks to the left then to the right

    
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

const tree = new BinaryTree( [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const short_tree = new BinaryTree([1,2,3])
const emptyTree = new BinaryTree([]);
//console.log(tree.root)
//console.log(tree.find(8))
short_tree.insert(4)
short_tree.insert(0)
short_tree.insert(-15)
short_tree.insert(45)

short_tree.levelOrder()
console.log("Recursive: ")
short_tree.levelOrderRec()
//console.log(short_tree)
console.log("Pre order:")
short_tree.preorder()
console.log("Inorder")
short_tree.inorder()
console.log("Postorder");
short_tree.postorder()