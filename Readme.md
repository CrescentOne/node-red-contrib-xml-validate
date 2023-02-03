# Node-RED XML Validator Node

A Node-RED node to validate XML strings against a specified XSD.

## Requirements

- Node-RED
- Java SDK Kit
- All other requirements necessary for running Node-RED

## Installation

1. Run the following command in the root/node_modules directory of your Node-RED installation:
* npm install red-contrib-xml-validate

2. Restart Node-RED

## Usage

1. Drag the XML Validator node onto the flow canvas
2. Double-click the node to open its configuration screen
3. Set the display name as desired
4. Enter the path to the XSD file
5. Connect the XML Validator node to an input node that outputs the XML string to `msg.payload`
6. The XML Validator node will look for the XML string in `msg.payload`
7. If the XML string is valid, the XML Validator node will output to output #1
8. If the XML string is invalid, the XML Validator node will output to output #2
9. If there is an error with the input, the XML Validator node will output to output #3

## Contributing

Feel free to contribute to this project by submitting a pull request or opening an issue.