
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

        insertRec(root,value) {
 
        /*
         * If the tree is empty, return a new node
         */
        if (root == null) {
            root = Node(value);
            return root;
        }
 
        /* Otherwise, recur down the tree */
        if (value < root.value)
            root.leftChild = this.insertRec(root.leftChild, value);
        else if (value > root.value)
            root.rightChild = this.insertRec(root.rightChild, value);

 
        /* return the (unchanged) node pointer */
        return root;
    }

    insert(key) {
        this.insertRec(this.root,key);
    }
 

    find(target, root=this.root) {
        if (root === null || root.value === target) {
            return root
        }if (root.value < target) {
            return this.find(target,root.rightChild)
        }
        return this.find(target,root.leftChild,)
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
console.log(tree.root)
console.log(tree.find(8))
short_tree.insert(4)
short_tree.insert(0)
short_tree.insert(-15)
short_tree.insert(45)
console.log(short_tree.insert(69))
console.log(short_tree)


