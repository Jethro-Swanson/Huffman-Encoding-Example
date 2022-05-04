"use strict"

let KeyNode = require("./KeyNode.js");
let Hashable = require("./Hashable.js");

// CLASS: Dictionary
//
// Author: Jethro Swanson
//
// REMARKS: Allows the storage of values based on hashed keys 
//
//-----------------------------------------
class Dictionary
{
	#hashArray
	
	constructor(size)
	{
		this.#hashArray = new Array(size);
	}
	
	//------------------------------------------------------
	// put
	//
	// PURPOSE: Stores a value inside an array at a hashed location, based on the given hashable key
	// PARAMETERS:
	//     k - hashable key indicating where in the array the value should be stored
	//     v - The value to store in the array
	//------------------------------------------------------
	put(k, v)
	{
		let index = undefined;
		let newNode = undefined;
		let currNode = undefined;

		//ensures given key value is actually a usable key
		if(k instanceof Hashable)
		{
			index = k.hashVal()%this.#hashArray.length;//expected index of current node, hash value modulo dictionary size
		    newNode = new KeyNode(k,v);
			
			//Finds the node with the same key and replaces its value with the new value
			if(this.contains(k))
			{
				currNode = this.#hashArray[index];
				if(currNode != null)
				{
					while(!(currNode.key.equals(k)))
					{
						currNode = currNode.next;
					}
					currNode.data = v;
				}
				else
				{
					throw new Error("Contains incorrectly stated a possition in the hash array of the Dictionary class was filled");
				}
			}
			
			//utalizes the fact that null == undefined for equality tests to insert node if no other nodes are there
			else if(this.#hashArray[index] == null)
			{
				this.#hashArray[index] = newNode;
			}
			
			//uses seperate chaining if another node is already in the location, placing the new node linked after the last node at the locations list
			else
			{
				currNode = this.#hashArray[index];
				
				while(currNode.next != null)
				{
					currNode = currNode.next;
				}
				
				currNode.next = newNode;
			}
		}
		else
		{
			throw new Error("Non-Hashable item input as k for put(k,v), Dictionary.put(k,v) only accepts Hashable items as keys");
		}
	}
	
	//------------------------------------------------------
	// get
	//
	// PURPOSE: Retrieves the value stored at the index indicated to by the hashable key input
	// PARAMETERS:
	//     k - hashable key of the value we wish to retrieve
	// Returns: The item stored at the requested index
	//------------------------------------------------------
	get(k)
	{
		let value = undefined;
		let currNode = undefined;
		let index = undefined;
		
		//ensures given key value is actually a usable key
		if(k instanceof Hashable)
		{
			
			//if the key is located in the dictonary, retrive its value 
			if(this.contains(k))
			{
				index = k.hashVal()%this.#hashArray.length;//expected index of current node, hash value modulo dictionary size
				currNode = this.#hashArray[index];
				
				while(!(currNode.key.equals(k)))
				{
					currNode = currNode.next;
				}
				
				value = currNode.data;
			}
		}
		else
		{
			throw new Error("Non-Hashable item input as k for get(k), Dictionary.get(k) only accepts Hashable items as keys")
		}
		
		return value;
	}
	
	//------------------------------------------------------
	// contains
	//
	// PURPOSE: Determins if a value is associated with the given key in the index
	// PARAMETERS:
	// 		k - hashable key to search for 
	// Returns: A boolean of true if a value in the array is stored at the location indicated by the key or false otherwise
	//------------------------------------------------------
	contains(k)
	{
		let index = undefined;
		let currNode = undefined;
		let keyFound = false;
		
		//ensures given key value is actually a usable key
		if(k instanceof Hashable)
		{
			index = k.hashVal()%this.#hashArray.length; 
			currNode = this.#hashArray[index];
			
			//itterates through all nodes at the expected index searching of one with key k
			while(currNode != null)
			{
				if(currNode.key.equals(k))
				{
					keyFound = true;
					currNode = null;
				}
				else
				{
					currNode = currNode.next;
				}
			}
			
		}
		else
		{
			throw new Error("Non-Hashable item input as k for contains(k), Dictionary.contains(k) only accepts Hashable items as keys")
		}
		
		return keyFound;
	}
	
	//------------------------------------------------------
	// isEmpty
	//
	// PURPOSE: Determins if the dictionary is empty
	// Returns: A boolean of true if no values are contained in the array or false otherwise
	//------------------------------------------------------
	isEmpty()
	{
		let empty = true;
		
		//searches every index of the dictonary to see if there are any used indicies
		for(let i=0; i<this.#hashArray.length; i++)
		{
			if(this.#hashArray[i] != null)
			{
				empty = false;
			}
		}
		
		return empty;
	}
}

module.exports = Dictionary;

