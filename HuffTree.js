"use strict"

let TreeNode = require("./TreeNode.js");

// CLASS: HuffTree
//
// Author: Jethro Swanson
//
// REMARKS: Represents a Huffman binary tree allowing the creation and searching of the trees
//
//-----------------------------------------
class HuffTree
{
	#root;//top node of the tree
	
		//------------------------------------------------------
		// constructor
		//
		// PURPOSE: Creates a new HuffTree, either by inserting the input charecter into a new leaf node, or by setting the input node to be the root of a new tree
		// PARAMETERS:
		//     charOrRoot - Either a charecter value to be placed in a new leaf node in the new tree or a node to be made the root node of the new tree
		//     weight - How much weight is attributed to this tree, only used if charOrRoot is a charecter
		//------------------------------------------------------
		constructor(charOrRoot, weight)
		{
			if(arguments.length < 1)
			{
				throw new Error("HuffTree must be given at least 2 parameters to be created, a charecter and a weight");
			}
			else if(arguments.length == 1)
			{
				if(charOrRoot instanceof TreeNode)
				{
					this.#root = charOrRoot
				}
				else 
				{
					throw new Error("1 argument of type: " + typeof(charOrRoot) + " but HuffTree must have 1 TreeNode argument or, a char and a weight(number) argument.");
				}
			}
			else
			{
				this.#root = new TreeNode(charOrRoot, weight);
			}
		}
		
				
		//------------------------------------------------------
		// combine
		//
		// PURPOSE: Takes two trees and merges them together, the weight of the new tree is the sum of the weights of the 
        //   two combined trees.		
		// PARAMETERS:
		//     leftTree - The HuffTree that will occupy the left side of the new tree
		//		rightTree - The HuffTree that will occupy the right side of the new tree
		// Returns: A HuffTree containing all nodes of the input two trees and a new root node containing there summed weights
        //------------------------------------------------------
		static combine(leftTree, rightTree)
		{
			let combinedWeight = leftTree.weight + rightTree.weight;
			let newRoot = new TreeNode(null, combinedWeight, leftTree.rootNode, rightTree.rootNode);
			let newTree = new HuffTree(newRoot);
			
			return newTree;
		}
		
		
		//------------------------------------------------------
		// compareTo
		//
		// PURPOSE: determins which tree will come first/has lowest weight, if weights are the same the tree with the smallest 
		//charecter will come first. 
		// PARAMETERS:
		//     otherTree - The HuffTree to do the comparison with
		// Returns: returns 1 if the parameter tree will come first or -1 if the calling tree should come first
        //------------------------------------------------------
		compareTo(otherTree)
		{
			let compareVal = 0;
			
			if(otherTree instanceof HuffTree)
			{
				//compares the weights to find which tree comes first
				if(this.weight > otherTree.weight)
				{
					compareVal = 1;
				}
				else if(this.weight < otherTree.weight)
				{
					compareVal = -1;
				}
				else
				{
					//handles if otherTree is smaller by char value
					if(this.getSmallest() > otherTree.getSmallest())
					{
						compareVal = 1
					}
					else
					{
						compareVal = -1;
					}
				}
			}
			else
			{
				throw new Error("HuffTree.compareTo() must be passed a HuffTree object");
			}
			
			return compareVal;
		}
		
		
		getSmallest()
		{
			return this.smallestChar(this.#root);
		}
		
		
		//------------------------------------------------------
		// smallestChar
		//
		// PURPOSE: Recursivly searches through the tree to find the smallest char value and then returns that value. 
		// PARAMETERS:
		//     currNode - top node of the current portion of the tree we are searching
		// Returns: A string of the smallest charecter found in the tree
        //------------------------------------------------------
		smallestChar(currNode)
		{
			let smallChar1 = undefined
			let smallChar2 = undefined
			let smallestReturnChar = undefined;
			
			if(currNode.left == null && currNode.right == null)
			{
				return currNode.leafChar;
				if(currSmallest == null || currSmallest > currNode.leafChar)
				{
					smallestReturnChar = currNode.leafChar;
				}
			}
			else
			{
				smallChar1 = this.smallestChar(currNode.left)
				smallChar2 = this.smallestChar(currNode.right)
				
				if(smallChar1 < smallChar2)
				{
					smallestReturnChar = smallChar1;
				}
				else
				{
					smallestReturnChar = smallChar2;
				}
			}
			
			return smallestReturnChar;
		}
	
		//------------------------------------------------------
		// search
		//
		// PURPOSE: Uses a recursive method to search for a target value in a binary tree of nodes, recording every left/right branch in a string, 
		//          where every left branch is represented as a 0 and every right branch is represented as a 1. Example 100101 = right left left ....
		//          The root node is tested first to see if "" is a valid path, and only recusivly searches for the charecter if it is not the root node
		//          to ensure a return string of "" from the recursive search indicates a faliure to find the required node.
		// PARAMETERS:
		//     targetChar - charecter we are trying to find
		// Returns: A string representation of the path taken from the root node to the leaf node with the target char in it, as a series of 0s and 1s for left 
		//          and right respectivly. returns a string of "" if it is not found in any leaf nodes.
        //------------------------------------------------------
		search(targetChar)
		{
			let pathString = undefined;
			
			//checks if the root node contains the target value and only recusivly searches if if it doesn't
			if(this.#root.leafChar === targetChar)
			{
				pathString = "";
			}
			
			else
			{
				pathString = this.recursiveSearch(targetChar, this.#root, "", "");
				
				//ensures that in the case no viable path was found (since we already testes the root node for path "") we will return null
				if(pathString === "")
				{
					pathString = null
				}
			}
			return pathString;
		}
		
		//------------------------------------------------------
		// recursiveSearch
		//
		// PURPOSE: Recursivly searches for a target value in a binary tree of nodes, recording every left/right branch in a string, where every left branch
		//          is represented as a 0 and every right branch is represented as a 1. Example 100101 = right left left ....
		// PARAMETERS:
		//     targetChar - charecter we are trying to find
		//     currNode - node location in the tree we will start our search
		//     traversalString - current string representation of path taken to get to target char if it is found
		//     lastMove - string representation of if the current node is the left or right child of the parent, represented as left = "0" right = "1"
		// Returns: A string representation of the path taken from the root node to the leaf node with the target char in it, as a series of 0s and 1s for left 
		//          and right respectivly. returns a string of "" if it is not found in any leaf nodes.
        //------------------------------------------------------
		recursiveSearch(targetChar, currNode, traversalString, lastMove)
		{
			let leftVal = "0";
			let rightVal = "1";
						
			//handles case where the current node contains our targetChar 
			if(currNode.leafChar === targetChar)
			{
				traversalString += lastMove;
			}
			else if(currNode.left == null && currNode.right == null)
			{
				traversalString = ""
			}
			else
			{
				//recursivly searches through all nodes branching from the left of the current node 
				traversalString = this.recursiveSearch(targetChar, currNode.left, traversalString, leftVal);
				
				if(traversalString.length>0)
				{
					traversalString = lastMove + traversalString;
				}
				
				//recursivly searches right side of tree if left side did not contain target char
				else
				{
					traversalString = this.recursiveSearch(targetChar, currNode.right, traversalString, rightVal);
					
					if(traversalString.length>0)
					{
						traversalString = lastMove + traversalString;
					}
				}
			}
			
			return traversalString
		}
		
		
		get weight()
		{
			return this.#root.weight;
		}
		
		get rootNode()
		{
			return this.#root;
		}
}

module.exports = HuffTree;
