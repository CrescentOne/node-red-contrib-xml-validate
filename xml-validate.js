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
    var async = require('async');
    var libxml = require('libxml-xsd');

    function xmlvalidate(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;  
        this.filename = config.filename;  

        var node = this;
        node.on("input", function(msg) {
          try {

            //var xsd = "<?xml version=\"1.0\"?>\r\n<xs:schema xmlns:xs=\"http:\/\/www.w3.org\/2001\/XMLSchema\"\r\ntargetNamespace=\"http:\/\/www.w3schools.com\"\r\nxmlns=\"http:\/\/www.w3schools.com\"\r\nelementFormDefault=\"qualified\">\r\n\r\n<xs:element name=\"note\">\r\n  <xs:complexType>\r\n    <xs:sequence>\r\n      <xs:element name=\"to\" type=\"xs:string\"\/>\r\n      <xs:element name=\"from\" type=\"xs:string\"\/>\r\n      <xs:element name=\"heading\" type=\"xs:string\"\/>\r\n      <xs:element name=\"body\" type=\"xs:string\"\/>\r\n    <\/xs:sequence>\r\n  <\/xs:complexType>\r\n<\/xs:element>\r\n\r\n<\/xs:schema>";

            //var xml = "<?xml version=\"1.0\"?>\r\n<note>\r\n  <to>Tove<\/to>\r\n  <froms>Jani<\/from>\r\n  <heading>Reminder<\/heading>\r\n  <body>Don\'t forget me this weekend!<\/body>\r\n<\/note>";

            async.waterfall([
              function load_schema(next) {

                libxml.parseFile(node.filename, function(err, schema){
                  if (err) {
                    next({ _msgid: msg._msgid, payload: { result: err }});
                  } else {
                    next(null, { schema: schema, message: msg});
                  }

                });
              }, function parse_xml(data, next) {
                  data.schema.validate(data.message.payload, function(err, validation){
                    // err contains any technical error 
                    // validationError is an array, null if the validation is ok
                    var msgs = [];

                    if (err || validation) {
                    
                      msgs.push(null);
                      msgs.push(data.message);
                      msgs.push({ _msgid: data.message._msgid, payload: { result: err, validation: validation }});
                    
                    } else {

                      msgs.push(data.message);
                      msgs.push(null);
                      msgs.push(null);

                    }
                      
                    node.send(msgs);
                  });                     
              }
            ], function(err) {
              var msgs = [];

              msgs.push(null);
              msgs.push(null);
              msgs.push(err);

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
