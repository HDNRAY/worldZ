// const Node = (data) => {
// 	this.parent = parent.id,
// 		this.data = data,
// 		this.children = []
// }
//
// const Tree = (data) => {
// 	this.root = new Node(data)
// }
//
// Tree.prototype.traverseDF = callback => {
// 	(function recurse(currentNode) {
// 		for (let node of currentNode.children) {
// 			recurse(node)
// 		}
//
// 		callback(currentNode)
// 	})(this.root)
// }
//
// Tree.prototype.traverseBF = callback => {
// 	var queue = new Queue();
//
// 	queue.enqueue(this.root);
//
// 	currentNode = queue.dequeue();
//
// 	while (currentNode) {
// 		for (var i = 0, length = currentNode.children.length; i < length; i++) {
// 			queue.enqueue(currentNode.children[i]);
// 		}
//
// 		callback(currentNode);
// 		currentNode = queue.dequeue();
// 	}
// }
//
// Tree.prototype.contains = function(callback, traversal) {
// 	traversal.call(this, callback);
// };
//
// Tree.prototype.add = function(data, toData, traversal) {
// 	//实例一个node
// 	var child = new Node(data),
// 		parent = null,
// 		//找爹函数
// 		callback = function(node) {
// 			if (node.data === toData) {
// 				parent = node;
// 			}
// 		};
// 	//按某种方式执行找爹函数
// 	this.contains(callback, traversal);
// 	//找到了吗
// 	if (parent) {
// 		//找到了，领走，认爹
// 		parent.children.push(child);
// 		child.parent = parent;
// 	} else {
// 		//没找到，报错：没这个爹
// 		throw new Error('Cannot add node to a non-existent parent.');
// 	}
// };