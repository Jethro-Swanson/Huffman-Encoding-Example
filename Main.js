"use strict"

// Author: Jethro Swanson
// Date  : 10/04/2022
// REMARKS: Encodes the specified file to a Huffman encoded representaion of
// 		    that file (not an actual encoded version as 1s and 0s are still stored
//			as chars rather than bits)
//
//-----------------------------------------


let HuffEncode = require("./HuffEncode.js");

function main()
{
	let fileName = "hamlet.txt" //Change this file name to encode a different file
	
	let encoder = new HuffEncode(fileName);
	encoder.encode()
	
	console.log("Program completed succesfully.");
	
}

main();