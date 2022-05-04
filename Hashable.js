"use strict"

// CLASS: Hashable
//
// Author: Jethro Swanson
//
// REMARKS: Abstract class providing structure for hashable key values 
//
//-----------------------------------------
class Hashable
{
	constructor()
	{
		if(this.constructor.name === "Hashable")
		{
			throw new Error("Class Hashable is abstract and cannot be created");
		}
	}
	
	hashVal()
	{
		throw new Error("No implementation of abstract method hashVal() in " + this.constructor.name);
	}
	
	equals(x)
	{
		throw new Error("No implementation of abstract method equals() in " + this.constructor.name);
	}
	
	get value()
	{
		throw new Error("No implementaoin of abstract method get value() in " + this.constructor.name);
	}
}

module.exports = Hashable;