/*
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

module.exports = function (RED) {
    var RED = require(process.env.NODE_RED_HOME+"/red/red");    
    var util = require('util');
    var validator = require('xsd-schema-validator');

    function xmlvalidate(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;  
        this.filename = config.filename;  

        var node = this;
        node.on("input", function(msg) {
          try {

            //var xsd = "<?xml version=\"1.0\"?>\r\n<xs:schema xmlns:xs=\"http:\/\/www.w3.org\/2001\/XMLSchema\"\r\ntargetNamespace=\"http:\/\/www.w3schools.com\"\r\nxmlns=\"http:\/\/www.w3schools.com\"\r\nelementFormDefault=\"qualified\">\r\n\r\n<xs:element name=\"note\">\r\n  <xs:complexType>\r\n    <xs:sequence>\r\n      <xs:element name=\"to\" type=\"xs:string\"\/>\r\n      <xs:element name=\"from\" type=\"xs:string\"\/>\r\n      <xs:element name=\"heading\" type=\"xs:string\"\/>\r\n      <xs:element name=\"body\" type=\"xs:string\"\/>\r\n    <\/xs:sequence>\r\n  <\/xs:complexType>\r\n<\/xs:element>\r\n\r\n<\/xs:schema>";

            //var xml = "<?xml version=\"1.0\"?>\r\n<note>\r\n  <to>Tove<\/to>\r\n  <froms>Jani<\/from>\r\n  <heading>Reminder<\/heading>\r\n  <body>Don\'t forget me this weekend!<\/body>\r\n<\/note>";

            validator.validateXML(msg.payload, node.filename, function(err, result) {
              var msgs = [];

              if (err) {
              
                msgs.push(null);
                msgs.push(msg);
                msgs.push({ _msgid: msg._msgid, payload: result });
              
              } else {

                msgs.push(msg);
                msgs.push(null);
                msgs.push(null);

              }
                
              node.send(msgs);
            });

          } catch(err) {
              node.error(err.message);
          }
      });                
    }

    //
    RED.nodes.registerType("xml-validate", xmlvalidate);

}
