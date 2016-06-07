node-red-contrib-xml-validate
=============================

[![NPM](https://nodei.co/npm/node-red-contrib-xml-validate.png)](https://nodei.co/npm/node-red-contrib-xml-validate/)

[Node-Red][1] node to validate xml content using [libxml-xsd][2].

This node check if xml content in msg.payload is valid according the xsd schema provided. After validate,  the xml content is redirect to one of the 2 outputs available based on validation results. The first one outputs only valid xml content and the second one outputs only invalid xml content. 

#Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-xml-validate

PS: if you have trouble with native compiler node-gyp in Windows 8.1, like this:
```
	The imported project "C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V110\Microsoft.Cpp.Default.props" was not found
```
try create a link between VS versions:
```
	PS C:\> cd C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0
	PS C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0> cmd /c mklink /d V110 V140
```
or something like this:
```
	set VCTargetsPath=C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V140
	npm install <package>
```
or
```
	npm install libxml-xsd --save --msvs_version=2015
```

#Nodes
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-xml-validate/master/node.png)

###Example 1: load xml from file 
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-xml-validate/master/flow1.png)

###Exmaple 2: inject xml string
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-xml-validate/master/flow2.png)

###Example 3: a more complex example, validate xml in cascade.
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-xml-validate/master/flow3.png)

###Example 4: discovery the xml type
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-xml-validate/master/flow4.png)

#Author

[Alessandro Holanda][3]


[1]:http://nodered.org
[2]:https://www.npmjs.com/package/libxml-xsd
[3]:https://github.com/alessandro-holanda