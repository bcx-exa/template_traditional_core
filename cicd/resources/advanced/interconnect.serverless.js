const AWS = require('aws-sdk');

var ec2 = new AWS.EC2();

var params = {
    TransitGatewayAttachmentId: 'STRING_VALUE', /* required */
    DryRun: true || false
  };
  ec2.acceptTransitGatewayPeeringAttachment(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });