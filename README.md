# Summary

This Ansible Playbook is responsible for creating a new ECS cluster to host two independent multi-az load-balanced NodeJS services. 

The purpose of Ansible here is to serve as a single Point of Access for the operator to create this ECS demo with the dynamic CloudFormation parameters defined in the playbook.

For simplicity, this playbook uses the default us-east-1 VPC and its public AZ-a & AZ-b subnets in the new AWS account I created.

The playbook achieves this by creating 4 CloudFormation stacks via the included CloudFormation template YAML files (denoted by `cf-*.yaml`).

Here is an explanation of each CloudFormation template and the resources they create.

**1. cf-ecs-default-iam.yaml**

>Creates the default IAM role and it’s required policy required to launch ECS services.

1. IAM Role
2. IAM Policy

**2. cf-ecs-cluster.yaml**

>Creates a new ECS cluster and all the required resources it needs to receive and distribute traffic to the services it will host. 

1. ECS Cluster
2. ALB
3. ALB ListenerGroup
4. ALB SecurityGroup (to receive and forward HTTP traffic)
5. SecurityGroup for ECS services (to receive traffic on any port from the ALB). 

**3. cf-ecs-service.yaml**

>Creates a new ECS service, multi-az deploys it into the specified ECS cluster, and configures it to receive loadbalanced HTTP traffic over a specified URL path. 

1. ALB TargetGroup (which the service instanced will register to)
2. ALB ListenerRule (so the ALB can route traffic from a specific URL path to this service)
3. ECS TaskDefinition (which defines the service container specs)
4. ECS Service 


During the playbook execution, Ansible creates the following 4 CloudFormation stacks

**1. {{inventory_hostname}}-ecs-default-iam-Rob**

All future ECS services will use the IAM role created by this stack.
New AWS accounts should already have this role created, but for legacy support, its best we just create it ourselves.

**2. {{inventory_hostname}}-ecs-cluster-unqork-Rob**

The ECS cluster and the required resources to host services.

**3. {{inventory_hostname}}-ecs-service-qork-Rob**

The ‘qork’ service deployed into the ECS cluster.

**4. {{inventory_hostname}}-ecs-service-unqork-Rob**

The ‘unqork’ service deployed into the ECS cluster.


# Usage

1. Clone this repo

`git clone && cd unqork-ecs-ansible-cloudformation-demo/`

2. Ensure you are working off the correct branch

`git checkout dev`

3. Ensure your AWS credentials and region are exported to your shell. 

`export AWS_ACCESS_KEY_ID=accessKey`
`export AWS_SECRET_ACCESS_KEY=secretKey`
`export AWS_DEFAULT_REGION=us-east-1`

4. Ensure you have AWS access & confirm that there are no existing *active* CloudFormation stacks.

`aws cloudformation list-stacks`

5. Run the playbook

`ansible-playbook playbook.yml`


Upon successful playback execution, Ansible will print the hostname of the ALB that was assigned to the ECS cluster -- take note of this `hostname`.

Once you have the hostname, confirm that the execution was successful by navigating to the `qork` service in your web browser.

`hostname/qork`

Does it work? If so, please, have a drink on me :-)

`hostname/unqork`

