"use strict"

// CLASS: TreeNode
//
// Author: Jethro Swanson
//
// REMARKS: Nodes of the HuffTrees
//
//-----------------------------------------
 class TreeNode
 {
	 #leafChar; //charecter stored in the node if its a leaf node
	 #weight; //weight assinged to the node
	 #left; //left child node
	 #right; // right child node
	 
	//------------------------------------------------------
	// constructor
	//
	// PURPOSE: Creates a TreeNode object.
	// PARAMETERS:
	//     c - charecter to be stored in the node (may be null or undefined if the node is not a leaf node)
	//     weight - how much weight is allocated to this node
	//     left - left child node (only used if this is not a leaf node)
	//     right - right child node (only used if this is not a leaf node)
	//------------------------------------------------------
	 constructor(c, weight, left, right)
	 {
		 if(arguments.length < 2)
		 {
			 throw new Error("TreeNode must have a minimum of 2 arguments, a char and a weight, please give at least 2 arguments to create a TreeNode object");
		 }
		 else if(arguments.length == 2)
		 {
			this.#leafChar = c;
			this.#weight = weight;
			this.#left = null;
			this.#right = null;
		 }
		 else if(arguments.length == 3)
		 {
			this.#leafChar = c;
			this.#weight = weight;
			this.#left = left
			this.#right = null;
		 }
		 else if(arguments.length >= 4)
		 {
			this.#leafChar = c;
			this.#weight = weight;
			this.#left = left;
			this.#right = right;
		 }
	 }
	 
	 get leafChar()
	 {
		return this.#leafChar;
	 }
	 
	 get weight()
	 {
		 return this.#weight;
	 }
	 
	 get left()
	 {
		 return this.#left;
	 }
	 
	 get right()
	 {
		 return this.#right;
	 }
	 
 }

module.exports = TreeNode;