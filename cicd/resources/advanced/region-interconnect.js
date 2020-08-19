//Imports
const AWS = require('aws-sdk');
require('dotenv').config();

// Global variables
let regions = [];
let vpcIds = [];

// Configure to test from local env
if(process.env.NODE_ENV == 'local') {
  var config = new AWS.Config({
    accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY
  });
  AWS.config.update(config);
}

// Get regions from env
const regionA = process.env.REGION_A;
const regionB = process.env.REGION_B;
const regionC = process.env.REGION_C;

// Add regions to list
regions.push(regionA, regionB, regionC);

// Run
const run = async () => {
  // Get cloudformation outputs
  regions.forEach(r => {
    AWS.config.update({region: r});
    
    const outputs = await getOutputs();
    const transitGW = await createTransitGW();
    const transitGWAttachVpc = await attachVpcToTransitGW();
    const transitGWattachTransitGW = await attachTransGWtoTransitGW();
  });
}

// Get Cloudformation output values
const getOutputs = async () => {
  try {
    const cloudformation = new AWS.CloudFormation();
    var outputs = await cloudformation.listExports(params).promise(); 

    return outputs;
  }
  catch(e)
  {
    console.error(e);
  }
}

// Create transit gateway
const createTransitGW = async () => {
  const ec2 = new AWS.EC2();
  var params = {
    Description: 'Transit Gateway',
    DryRun: false,
    Options: {
      AmazonSideAsn: '6500',
      AutoAcceptSharedAttachments: enable,
      DefaultRouteTableAssociation: enable,
      DefaultRouteTablePropagation: enable,
      DnsSupport: enable,
      MulticastSupport: disable,
      VpnEcmpSupport: enable
    },
    TagSpecifications: [
      {
        ResourceType: vpc,
        Tags: [
          {
            Key: 'Name',
            Value: 'Transit Gateway'
          }
        ]
      }
    ]
  };

  var result = await ec2.createTransitGateway(params).promise();
};





// var params = {
//     TransitGatewayAttachmentId: 'STRING_VALUE', /* required */
//     DryRun: true || false
//   };
//   ec2.acceptTransitGatewayPeeringAttachment(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });