Huffman Encode Example

Description: 
	Reads a .txt file, as specified in the Main.js, and creates a representation of what the file
	would look like if it were to be encoded using huffman encoding (it doesn't actually reduce file 
	size due to the 1s and 0s being sored as charecters for simplicity) 

Usage Instructions:

	1. Open the file named Main.js and in the main class file at line 16
	   replace "hamlet.txt" with the name of the file you wish to encode.
	   Note: This file must be in the same directory as the program files

	2. Run the following in the command line (Must have node installed on system to run js files)
		node.exe Main.js
	   
	3. The encoded file will be created in the same directory with the same name 
           as the input file except with .huff appended to the end of the name, example:
		   
			sampleFile.txt.huff