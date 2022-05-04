"use strict"

let Hashable = require("./Hashable.js");

// CLASS: StringHash
//
// Author: Jethro Swanson
//
// REMARKS: Allows the use of a string as a hash key 
//
//-----------------------------------------
class StringHash extends Hashable
{
	#string;
	#hashPrime;//prime number used for hashing string
	
	constructor(string)
	{
		if(arguments.length == 0)
		{
			throw new Error("Must have at least 1 string parameter to construct " + this.constructor.name);
		}
		else
		{
			if(typeof(string) == "string")
			{
				super();
				this.#string = string;
				this.#hashPrime = 5;//chosen prime number for hashing strings
			}
			else
			{
				throw new Error("Must input a string value for first parameter to create " + this.constructor.name);
			}
		}
	}
	
	//------------------------------------------------------
	// hashVal
	//
	// PURPOSE: converts the string given to a hashed value
	// Returns: A number representing the hashed form of the string
	//------------------------------------------------------
	hashVal()
	{
		let hashResult = 0;
		
		for(let i =0; i<this.#string.length; i++)
		{
			hashResult += this.#string.charCodeAt(i)*(Math.pow(this.#hashPrime,(this.#string.length-i)))//hashes the current charecter in the string and adds it to the hash result
		}
		
		return hashResult;
	}
	
	equals(x)
	{
		return (this.#string === x.#string)
	}
	
	get value()
	{
		return this.#string;
	}
	
}

module.exports = StringHash;