node-red-contrib-xml-validate
=============================

[![NPM](https://nodei.co/npm/node-red-contrib-xml-validate.png)](https://nodei.co/npm/node-red-contrib-xml-validate/)

[Node-Red][1] node to validate xml content using [xsd-schema-validator][2].

This node check if xml content in msg.payload is valid according the xsd schema provided. After validate,  the xml content is redirect to one of the 2 outputs available based on validation results. The first one outputs only valid xml content and the second one outputs only invalid xml content. The 3rd output outputs only xml validation error messages.

#Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-xml-validate


#Nodes
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-xml-validate/master/node.png)

###Example 1: load xml from file 
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-xml-validate/master/flow1.png)
```json
[{"id":"9d25497d.63e3e8","type":"xml-validate","z":"e6defec6.66bc2","name":"validate schema from file \"people.xsd\"","filename":"node_modules\\node-red-contrib-xml-validate\\people.xsd","x":677,"y":259,"wires":[["3c05fbc3.d6cca4"],["dde5ae24.4474a"],["63f3c37a.94c41c"]]},{"id":"3c05fbc3.d6cca4","type":"debug","z":"e6defec6.66bc2","name":"valid xml","active":true,"console":"false","complete":"payload","x":1027,"y":199,"wires":[]},{"id":"63f3c37a.94c41c","type":"debug","z":"e6defec6.66bc2","name":"error results","active":true,"console":"false","complete":"payload","x":1037,"y":319,"wires":[]},{"id":"8c9d41f8.0aa28","type":"inject","z":"e6defec6.66bc2","name":"trigger","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":97,"y":99,"wires":[["62aac75a.c0baf8"]]},{"id":"62aac75a.c0baf8","type":"file in","z":"e6defec6.66bc2","name":"from xml file \"people.xml\"","filename":"node_modules\\node-red-contrib-xml-validate\\people.xml","format":"utf8","x":337,"y":179,"wires":[["9d25497d.63e3e8"]]},{"id":"dde5ae24.4474a","type":"debug","z":"e6defec6.66bc2","name":"invalid xml","active":true,"console":"false","complete":"true","x":1037,"y":259,"wires":[]}]
```
###Example 2: inject xml string
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-xml-validate/master/flow2.png)
```json
[{"id":"2e6cd596.df3dca","type":"xml-validate","z":"e6defec6.66bc2","name":"","filename":"node_modules\\node-red-contrib-xml-validate\\pet.xsd","x":610,"y":615,"wires":[["5765c4e.840c63c"],["b18f315e.3f49f"],["2a40200a.a8fc6"]]},{"id":"5765c4e.840c63c","type":"debug","z":"e6defec6.66bc2","name":"this xml is valid","active":true,"console":"false","complete":"payload","x":880,"y":555,"wires":[]},{"id":"202f02bf.1751ce","type":"inject","z":"e6defec6.66bc2","name":"xml snippet","topic":"","payload":"<?xml version=\"1.0\"?> <pet><name>Tom</name></pet>","payloadType":"str","repeat":"","crontab":"","once":false,"x":350,"y":615,"wires":[["2e6cd596.df3dca"]]},{"id":"b18f315e.3f49f","type":"debug","z":"e6defec6.66bc2","name":"this xml is not valid","active":true,"console":"false","complete":"payload","x":890,"y":615,"wires":[]},{"id":"2a40200a.a8fc6","type":"debug","z":"e6defec6.66bc2","name":"validation errors","active":true,"console":"false","complete":"payload","x":880,"y":675,"wires":[]}]
```
###Example 3: a more complex example, validate xml in cascade.
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-xml-validate/master/flow3.png)
```json
[{"id":"7762f7b8.89c388","type":"xml-validate","z":"b85a5dfb.2ea4e","name":"validate schema from file \"people.xsd\"","filename":"node_modules\\node-red-contrib-xml-validate\\people.xsd","x":550,"y":1160,"wires":[["fb420bb6.8e03b8"],["471db0c2.b9ef8"],["a96f46f0.10b888"]]},{"id":"fb420bb6.8e03b8","type":"debug","z":"b85a5dfb.2ea4e","name":"valid xml","active":true,"console":"false","complete":"payload","x":1160,"y":980,"wires":[]},{"id":"a96f46f0.10b888","type":"debug","z":"b85a5dfb.2ea4e","name":"error results","active":true,"console":"false","complete":"true","x":1170,"y":1340,"wires":[]},{"id":"88bbf37a.7cae3","type":"inject","z":"b85a5dfb.2ea4e","name":"trigger","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":130,"y":900,"wires":[["556e0b3e.ee5744"]]},{"id":"556e0b3e.ee5744","type":"file in","z":"b85a5dfb.2ea4e","name":"from xml file \"note.xml\"","filename":"node_modules\\node-red-contrib-xml-validate\\note.xml","format":"utf8","x":250,"y":1040,"wires":[["7762f7b8.89c388"]]},{"id":"8bf2789.22e1b88","type":"debug","z":"b85a5dfb.2ea4e","name":"certainly invalid xml","active":true,"console":"false","complete":"true","x":1190,"y":1160,"wires":[]},{"id":"471db0c2.b9ef8","type":"xml-validate","z":"b85a5dfb.2ea4e","name":"try another schema","filename":"node_modules\\node-red-contrib-xml-validate\\note.xsd","x":910,"y":1160,"wires":[["fb420bb6.8e03b8"],["8bf2789.22e1b88"],["a96f46f0.10b888"]]}]
```
###Example 4: discovery the xml type
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-xml-validate/master/flow4.png)
```json
[{"id":"3f95e2b5.78a8ee","type":"xml-validate","z":"b85a5dfb.2ea4e","name":"check for people.xsd","filename":"node_modules\\node-red-contrib-xml-validate\\people.xsd","x":500,"y":1760,"wires":[["997a9ef1.0ffad"],["1848cabd.a06ec5"],["86c55fe5.e93f7"]]},{"id":"997a9ef1.0ffad","type":"debug","z":"b85a5dfb.2ea4e","name":"its a xml of type \"people\"","active":true,"console":"false","complete":"payload","x":790,"y":1660,"wires":[]},{"id":"86c55fe5.e93f7","type":"debug","z":"b85a5dfb.2ea4e","name":"error results","active":true,"console":"false","complete":"true","x":990,"y":1900,"wires":[]},{"id":"5dec8101.e932d","type":"inject","z":"b85a5dfb.2ea4e","name":"inject valid xml","topic":"","payload":"<?xml version=\"1.0\"?> <pet><name>Tom</name></pet>","payloadType":"str","repeat":"","crontab":"","once":false,"x":260,"y":1660,"wires":[["3f95e2b5.78a8ee"]]},{"id":"b4f9c76f.acab28","type":"debug","z":"b85a5dfb.2ea4e","name":"its a xml of type \"note\"","active":true,"console":"false","complete":"true","x":1060,"y":1720,"wires":[]},{"id":"1848cabd.a06ec5","type":"xml-validate","z":"b85a5dfb.2ea4e","name":"check for note.xsd","filename":"node_modules\\node-red-contrib-xml-validate\\note.xsd","x":770,"y":1760,"wires":[["b4f9c76f.acab28"],["626ef524.98908c"],["86c55fe5.e93f7"]]},{"id":"626ef524.98908c","type":"xml-validate","z":"b85a5dfb.2ea4e","name":"check just a well formed xml","filename":"node_modules\\node-red-contrib-xml-validate\\pet.xsd","x":1080,"y":1800,"wires":[["85f3937.5be287"],[],["312ff3d.c30c70c"]]},{"id":"85f3937.5be287","type":"debug","z":"b85a5dfb.2ea4e","name":"xml of type 'unknow'","active":true,"console":"false","complete":"true","x":1360,"y":1720,"wires":[]},{"id":"312ff3d.c30c70c","type":"debug","z":"b85a5dfb.2ea4e","name":"this is not a valid xml","active":true,"console":"false","complete":"true","x":1360,"y":1860,"wires":[]}]
```
#Author

[Alessandro Holanda][3]


[1]:http://nodered.org
[2]:https://www.npmjs.com/package/xsd-schema-validator
[3]:https://github.com/alessh