"use strict"

let Hashable = require("./Hashable.js");

// CLASS: IntHash
//
// Author: Jethro Swanson
//
// REMARKS: Represents an int hash key
//
//-----------------------------------------
class IntHash extends Hashable
{
	#value;
	
	constructor(value)
	{
		if(arguments.length == 0)
		{
			throw new Error("Must have at least 1 value parameter to construct " + this.constructor.name);
		}
		else
		{
			super();
			this.#value = value;
		}
	}
	
	hashVal()
	{
		return this.#value;
	}
	
	equals(x)
	{
		return (this.#value === x.value);
	}
	
	get value()
	{
		return this.#value;
	}
}

module.exports = IntHash;