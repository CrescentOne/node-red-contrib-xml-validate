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

module.exports = (RED) =>
{
    const validator = require('xsd-schema-validator');

    function xmlvalidate(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.xsd = config.xsd;

        let node = this;
        node.on("input", (msg) =>
        {
            try
            {
                validator.validateXML(msg.payload, msg.xsd ?? node.xsd, (err, result) =>
                {
                    if (err)
                    {
                        this.status(
                            {
                                fill:"yellow",
                                shape:"dot",
                                text:"invalid"
                            });

                        node.send([null, msg, { _msgid: msg._msgid, error: err.msg, payload: result }]);
                    }
                    else
                    {
                        this.status(
                            {
                                fill:"green",
                                shape:"dot",
                                text:"valid"
                            });
                        
                        node.send([msg, null, null]);
                    }
                });

            }
            catch (err)
            {
                node.error(err.message);
                this.status(
                    {
                        fill:"red",
                        shape:"dot",
                        text:"error"
                    });
            }
        });
    }

    RED.nodes.registerType("xml-validate", xmlvalidate);
}