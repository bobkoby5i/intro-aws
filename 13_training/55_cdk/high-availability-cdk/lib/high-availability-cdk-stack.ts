import * as cdk from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HighAvailabilityCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC_utworzona_w_CDK', {
      cidr: '172.16.0.0/16',
      maxAzs: 1,
      natGateways: 0,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'Public-subnet',
          cidrMask: 24,
        }
      ]
    });

    const securityGroup = new ec2.SecurityGroup(this,
      'cdkSecurity', {
      vpc,
      description: 'Pozwalaj na SSH i http',
      allowAllOutbound: true
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Pozwalaj na ssh z dowolnego adresu ip');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Pozwalaj na http z dowolnego adresu ip');


    //-12-----
    const commandsUserData = ec2.UserData.forLinux();
    commandsUserData.addCommands('sudo su');
    commandsUserData.addCommands('sudo yum update -y');
    commandsUserData.addCommands('sudo yum install -y httpd');
    commandsUserData.addCommands('sudo systemctl start httpd');
    commandsUserData.addCommands('sudo systemctl enable httpd');
    commandsUserData.addCommands('sudo echo "Witaj świecie z $(hostname -f)" > /var/www/html/index.html');


    //-13-----
    const instance = new ec2.Instance(this, 'Jedyna-instancja', {
      vpc: vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType:
          ec2.SubnetType.PUBLIC
      }),
      securityGroup: securityGroup,
      instanceName: 'Jedyna-instancja',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'guru-koby5i-20210205_EC2_MyUSE1KP',
      userData: commandsUserData,
    })


    //-14-----
    new cdk.CfnOutput(this, 'Pierwsza-instancja-IP', {
      value: instance.instancePublicIp
    })


    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'HighAvailabilityCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
