"use strict"

let fs = require('fs');//gets file reading abilities
let Dictionary = require("./Dictionary");
let AscTreeLinkedList = require("./AscTreeLinkedList");
let StringHash = require("./StringHash");
let HuffTree = require("./HuffTree");

// CLASS: HuffEncode
//
// Author: Jethro Swanson
//
// REMARKS: Provides functionality of reading and re-encoding text files via huffman encoding
//
//-----------------------------------------
class HuffEncode
{
	#fileName;
	#ASCII_COUNT
	#ASCII_PRINT
	
	constructor(fileName)
	{
		this.#ASCII_COUNT = 128;//total number of printable ascii charecters
		this.#ASCII_PRINT = 32;//start of the printable charecters 
		
		if(arguments.length >= 1)
		{
			this.#fileName = fileName;
		}
		else
		{
			throw new Error("HuffEnode requires at least one argument, the name of the file to be endoded");
		}
	}
	
			
	//------------------------------------------------------
	// encode
	//
	// PURPOSE: opens and converts the file whoes name was input and then converts it to a Huffman Encoded format, creating a new file of the same name as the original
    // 		except with .huff at the end in encoded format	
	//------------------------------------------------------
	encode()
	{
		let fileContents = fs.readFileSync(this.#fileName, "utf-8"); //opens the input file
		let currChar = ""; //current char of the input file we are looking at
		let charKey = undefined; //hash key for the current string
		let charFreq = undefined; //number the current char has appeared
		let currTree = undefined; //current huffman tree
		let combTree = undefined;//huffman tree to be combined with currTree
		let outputName = this.#fileName + ".huff"; // name of output file
		let treeList = new AscTreeLinkedList; //sorted linked list of Huffman trees 
		let occurancePercentage = 1/(fileContents.length);//records how much each occurance of a char adds to its percentage likelyhood
		let asciiStr = "" ;//string of all ascii values that occured in the file, allowing only those values to be itterated through
		let pathDict = new Dictionary(this.#ASCII_COUNT);//creates a dictionary for storing the paths to charecters in the huffman tree
		let charFreqDict = new Dictionary(this.#ASCII_COUNT);//creates dictionary to hold how frequently a charecter appears
		let pathString = undefined; //holds current string form of the path to a char

		for(let i =0; i<fileContents.length; i++)
		{
			currChar = fileContents.charAt(i)
			charKey = new StringHash(currChar)
			
			//if the charecter has appeared before add 1 to freq
			if(charFreqDict.contains(charKey))
			{
				
				charFreq = charFreqDict.get(charKey);
				charFreq += occurancePercentage;
				charFreqDict.put(charKey, charFreq);
			}
			//otherwise make a new entry for char recoring the first occurance
			else
			{
				charFreqDict.put(charKey, occurancePercentage);
			}
		}

		//for every printable ascii charecter, if it is in the dictionary create a tree of it and add it to the sorted list  
		for(let i = 0; i<this.#ASCII_COUNT; i++)
		{
			charKey = new StringHash(String.fromCharCode(i));
			
			if(charFreqDict.contains(charKey))
			{
				currTree = new HuffTree(String.fromCharCode(i), charFreqDict.get(charKey));
				treeList.add(currTree);
				asciiStr = asciiStr + String.fromCharCode(i);
			}
		}
		
		//repeatedly combines the two smallest trees untill they have all been combined to a single tree
		while(treeList.size >1)
		{
			currTree = treeList.pop();
			combTree = treeList.pop();
			
			currTree = HuffTree.combine(currTree, combTree);
			
			treeList.add(currTree);
		}
		
		currTree = treeList.pop();//retrieves the final completed tree
		
		//creates the tree path to each of the ascii charecters found in the file 
		for(let i =0; i<asciiStr.length; i++)
		{
			charKey = new StringHash(asciiStr.charAt(i));
			pathString = currTree.search(asciiStr.charAt(i));
			
			if(pathString != null)
			{
				pathDict.put(charKey, pathString);
			}
		}
		
		fs.writeFileSync(outputName, "");//creates a new empty output file
		
		//encodes original file as path strings
		for(let i =0; i<fileContents.length; i++)
		{
			charKey = new StringHash(fileContents.charAt(i));
			
			pathString = pathDict.get(charKey);
			
			fs.appendFileSync(outputName, pathString + " ");
		}
		
		fs.appendFileSync(outputName, "\n");//adds the final newline charecter to the output file.
	}
}

module.exports = HuffEncode;