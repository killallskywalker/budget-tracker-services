# About

Backend service for simple budget tracker build with node js , mongo db and using serverless framework . Contain service to add/delete/filter/ income,expenses and recurring payment . 

## Installation
```bash
npm install 
```

## Available Script

```BASH
npm start
```

Runs the app in the development mode. It can be access through 
http://localhost:4000/environment/api .
1.  By default it will run in dev .
2.  To change the default environment can update stage name in yaml file under provider -

```
provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
```
3.  Or you can run sls offline --stage environment .
4.  To connect to mongo , ensure you pass the env variable into ```config\environment.env.json``` which is require password and user . 

For more information you can refer at - 

 [Serverless framework](https://www.serverless.com)

## Monitoring 
For monitoring im using [Serverless framework](https://www.serverless.com) , with 1,000,000 events per month . 

## Demo
Live demo can be access here - 

[Simple budget tracker](http://simple-budget-tracker.s3-website-ap-southeast-1.amazonaws.com)
