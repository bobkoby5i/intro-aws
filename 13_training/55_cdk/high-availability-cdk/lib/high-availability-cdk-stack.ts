import * as cdk from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';

import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';



import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HighAvailabilityCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC_utworzona_w_CDK', {
      cidr: '172.16.0.0/16',
      maxAzs: 3,
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


    // //-12-----
    // const commandsUserData = ec2.UserData.forLinux();
    // commandsUserData.addCommands('sudo su');
    // commandsUserData.addCommands('sudo yum update -y');
    // commandsUserData.addCommands('sudo yum install -y httpd');
    // commandsUserData.addCommands('sudo systemctl start httpd');
    // commandsUserData.addCommands('sudo systemctl enable httpd');
    // commandsUserData.addCommands('sudo echo "Witaj świecie z $(hostname -f)" > /var/www/html/index.html');


    //-13-----
    // const instance = new ec2.Instance(this, 'Jedyna-instancja', {
    //   vpc: vpc,
    //   vpcSubnets: vpc.selectSubnets({
    //     subnetType:
    //       ec2.SubnetType.PUBLIC
    //   }),
    //   securityGroup: securityGroup,
    //   instanceName: 'Jedyna-instancja',
    //   instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2,
    //     ec2.InstanceSize.MICRO),
    //   machineImage: ec2.MachineImage.latestAmazonLinux({
    //     generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    //   }),
    //   keyName: 'guru-koby5i-20210205_EC2_MyUSE1KP',
    //   userData: commandsUserData,
    // })


    //-14-----
    // new cdk.CfnOutput(this, 'Pierwsza-instancja-IP', {
    //   value: instance.instancePublicIp
    // })


    // //-22-----
    // const instance1 = this.newInstance(vpc, securityGroup, 'Pierwsza-instancja', 'eu-central-1a');
    // const instance2 = this.newInstance(vpc, securityGroup, 'Drugainstancja', 'eu-central-1b');
    // const instance3 = this.newInstance(vpc, securityGroup, 'Trzecia-instancja', 'eu-central-1c');

    // //-24-----
    // const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
    //   vpc,
    //   internetFacing: true,
    //   securityGroup: securityGroup,
    // });
    // const listener = lb.addListener('Listener', {
    //   port: 80,
    //   open: true,
    // });
    // listener.addTargets('ApplicationFleet', {
    //   port: 80,
    //   healthCheck: {
    //     path: '/index.html',
    //   },
    //   targets: [new targets.InstanceTarget(instance1),
    //   new targets.InstanceTarget(instance2),
    //   new targets.InstanceTarget(instance3)]
    // });
    // new cdk.CfnOutput(this, 'Adres-loadbalancera', {
    //   value: lb.loadBalancerDnsName
    // })



    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'HighAvailabilityCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //-31-----
    const asg1 = this.newAutoScaling(vpc, securityGroup, 'Pierwszagrupa', 'eu-central-1a');
    const asg2 = this.newAutoScaling(vpc, securityGroup, 'Drugagrupa', 'eu-central-1b');
    const asg3 = this.newAutoScaling(vpc, securityGroup, 'Trzeciagrupa', 'eu-central-1c');
    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc,
      internetFacing: true,
      securityGroup: securityGroup,
    });
    const listener = lb.addListener('Listener', {
      port: 80,
      open: true,
    });
    listener.addTargets('ApplicationFleet', {
      port: 80,
      healthCheck: {
        path: '/index.html',
      },
      targets: [asg1, asg2, asg3]
    });

    asg1.scaleOnIncomingBytes('LimitIngressPerInstance', {
      targetBytesPerSecond: 100, //10 * 1024 * 1024 // 10 MB/s
      estimatedInstanceWarmup: cdk.Duration.seconds(30),
    });
    asg2.scaleOnCpuUtilization('KeepSpareCPU', {
      targetUtilizationPercent: 10,
      estimatedInstanceWarmup: cdk.Duration.seconds(30),
    });
    asg3.scaleOnRequestCount('LimitRPS', {
      targetRequestsPerMinute: 20,
      estimatedInstanceWarmup: cdk.Duration.seconds(30),
    });


    new cdk.CfnOutput(this, 'Adres-loadbalancera', {
      value: lb.loadBalancerDnsName
    });

  }

  //-19-----
  get availabilityZones(): string[] {
    return ['eu-central-1a', 'eu-central-1b', 'eu-central-1c'];
  }

  //-20-----
  newInstance(vpc: ec2.Vpc, sg: ec2.SecurityGroup, instanceName:
    string, azs: string): ec2.Instance {
    const commandsUserData = ec2.UserData.forLinux();
    commandsUserData.addCommands('sudo su');
    commandsUserData.addCommands('sudo yum update -y');
    commandsUserData.addCommands('sudo yum install -y httpd');
    commandsUserData.addCommands('sudo systemctl start httpd');
    commandsUserData.addCommands('sudo systemctl enable  httpd');
    commandsUserData.addCommands('sudo echo "Witaj świecie nowym z $(hostname -f)" > /var/www/html/index.html');
    const instance = new ec2.Instance(this, instanceName, {
      vpc: vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
        onePerAz: true,
        availabilityZones: [azs],
      },
      securityGroup: sg,
      instanceName: instanceName,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'guru-koby5i-20210205_EC2_MyUSE1KP',
      userData: commandsUserData,
    })
    return instance;
  }

  //-30-----
  newAutoScaling(vpc: ec2.Vpc, sg: ec2.SecurityGroup, Name: string,
    azs: string): autoscaling.AutoScalingGroup {
    const commandsUserData = ec2.UserData.forLinux();
    commandsUserData.addCommands('sudo su');
    commandsUserData.addCommands('sudo yum update -y');
    commandsUserData.addCommands('sudo yum install -y httpd');
    commandsUserData.addCommands('sudo systemctl start httpd');
    commandsUserData.addCommands('sudo systemctl enable httpd');
    commandsUserData.addCommands('sudo echo "Witaj świecie z $(hostname -f)" > /var/www/html/index.html');
    const asg = new autoscaling.AutoScalingGroup(this, Name, {
      vpc,
      securityGroup: sg,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
        onePerAz: true,
        availabilityZones: [azs],
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'guru-koby5i-20210205_EC2_MyUSE1KP',
      userData: commandsUserData,
      minCapacity: 1,
      maxCapacity: 5,
    });
    return asg;
  }

}
