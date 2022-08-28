# sls-node-rest-api

A Serverless Framework Project for a REST HTTP API for CRUD operations on DynamoDB.

1. `git@github.com:bobkoby5i/intro-aws.git`

2. `npm install`

3. `serverless deploy`

### To deploy application to DEV env

Run in console in directory `./system-announcements`

```bash
serverless deploy
```

or

```bash
serverless deploy --stage dev
serverless deploy function -f listPets --stage dev
```

as result in console there will be:

```bash
Deploying bob-pets-ts to stage dev (eu-central-1)

✔ Service deployed to stack bob-pets-ts-dev (107s)

endpoints:
  POST - https://kj3g8lxou2.execute-api.eu-central-1.amazonaws.com/dev/pets
  GET - https://kj3g8lxou2.execute-api.eu-central-1.amazonaws.com/dev/pets
  GET - https://kj3g8lxou2.execute-api.eu-central-1.amazonaws.com/dev/pets/{id}
  PUT - https://kj3g8lxou2.execute-api.eu-central-1.amazonaws.com/dev/pets/{id}
  DELETE - https://kj3g8lxou2.execute-api.eu-central-1.amazonaws.com/dev/pets/{id}
functions:
  createPet: bob-pets-ts-dev-createPet (22 kB)
  listPets: bob-pets-ts-dev-listPets (22 kB)
  getPet: bob-pets-ts-dev-getPet (22 kB)
  updatePet: bob-pets-ts-dev-updatePet (22 kB)
  deletePet: bob-pets-ts-dev-deletePet (22 kB)

1 deprecation found: run 'serverless doctor' for more details
```



Add a pet:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets --data '{ "petName": "Bella", "petBreed": "Corgi" }'`

Sample response:
`{"id":"618b4190-6917-11e7-82a3-ed6b88661fcb","petName":"Bella","petBreed":"Corgi","createdAt":1500093479977,"updatedAt":1500093479977}`

Add another pet:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets --data '{ "petName": "Riley", "petBreed": "Jack Russell Mix" }'`

List all pets:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets`

List the details of a specific pet (in this case Bella from above):
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets/618b4190-6917-11e7-82a3-ed6b88661fcb`

General structure for listing specific pet details:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets/id`

Training by - https://github.com/fernando-mc/serverless-node-rest-api
Inspired by - https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb
