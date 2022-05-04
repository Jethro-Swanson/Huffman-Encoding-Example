"use strict"

// CLASS: KeyNode
//
// Author: Jethro Swanson
//
// REMARKS: Node that contains a key in addition to data
//
//-----------------------------------------
class KeyNode
{
	#key;
	#data;
	#next;
	
	constructor(key, data, next)
	{
		if(arguments.length >= 2)
		{
			this.#key = key;
			this.#data = data;
			this.#next = next;
		}
		else
		{
			throw new Error("KeyNode must have at least 2 arguments, key and value");
		}
	}
	
	get key()
	{
		return this.#key;
	}
	
	get data()
	{
		return this.#data;
	}
	
	get next()
	{
		return this.#next;
	}
	
	set data(newData)
	{
		this.#data = newData;
	}
	
	set next(nextNode)
	{
		this.#next = nextNode;
	} 
}

module.exports = KeyNode;
