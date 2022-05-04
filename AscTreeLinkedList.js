"use strict"

let KeyNode = require("./KeyNode");
let HuffTree = require("./HuffTree"); 

// CLASS: AscTreeLinkedList
//
// Author: Jethro Swanson
//
// REMARKS: Allows the creation of ordered linked list of trees, in ascending order based on tree weights.
//
//-----------------------------------------
class AscTreeLinkedList
{
	#top;//node with the smallest tree in it
	#size;//number of nodes in the linked list
	
	constructor()
	{
		this.#top = null;
		this.#size = 0;
	}
	
			
	//------------------------------------------------------
	// add
	//
	// PURPOSE: adds a new tree to the linked list as a key node, in asceding order based on the key value, in this case the weight of the tree input 
	// PARAMETERS:
	//     data - HuffTree to be stored in the linked list
	//------------------------------------------------------
	add(data)
	{
		if(data instanceof HuffTree)
		{
			let prevNode = undefined;
			let currNode = undefined;
			let newNode = new KeyNode(null, data);

			//if list is empty add new node as top
			if(this.#top == null)
			{
				this.#top = newNode;
			}
			//if new tree is smallest tree add it to the top of the list 
			else if(this.#top.data.compareTo(data) > 0)
			{
				currNode = this.#top;
				
				this.#top = newNode; 
				newNode.next = currNode;
			}
			//otherwise add new node in ascending order
			else
			{
				currNode = this.#top;
				
				while(currNode != null && currNode.data.compareTo(data) < 0 )
				{
					prevNode = currNode;
					currNode = currNode.next;
				}
				
				prevNode.next = newNode;
				newNode.next = currNode;
			}
			
			this.#size++;
		}
	}
	
	//------------------------------------------------------
	// pop
	//
	// PURPOSE: Removes and returnes the smallest tree in the list
	// Returns: A HuffTree object or null if the list is empty
	//------------------------------------------------------
	pop()
	{
		let removedNode = this.#top;
		let treeData = undefined;
		
		if(this.#top != null)
		{
			this.#top = this.#top.next;
			this.#size--;
			treeData = removedNode.data;
		}
		else
		{
			treeData = null;
		}
		
		return treeData;
	}

	get size()
	{
		return this.#size;
	}
	
	get top()
	{
		return this.#top;
	}
}

module.exports = AscTreeLinkedList;