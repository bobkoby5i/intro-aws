import {Pet} from "../model/Pet";
import AWS from "aws-sdk";
import {NotFoundException} from "../exception/NotFoundException";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.PETS_DYNAMODB_TABLE as string;

export async function fetchPets(): Promise<Array<Pet>> {
  const output = await docClient
  .scan({
    TableName: tableName,
    //FilterExpression: 'startDateTime <= :currentDate AND endDateTime >= :currentDate',
    //ExpressionAttributeValues: {':currentDate': new Date().toISOString()}
  })
  .promise();
  return output.Items as Pet[]
}

export async function fetchAllPets(): Promise<Array<Pet>> {
  const output = await docClient
  .scan({
    TableName: tableName
  })
  .promise();
  return output.Items as Pet[];
}

export async function savePet(pet: Pet): Promise<void> {
  await docClient
  .put({
    TableName: tableName,
    Item: pet,
  })
  .promise();
}

export async function fetchPetById(petId: string): Promise<Pet> {
  const output = await docClient
  .get({
    TableName: tableName,
    Key: {
      petId: petId,
    },
  })
  .promise();

  if (!output.Item) {
    throw new NotFoundException("pet", petId);
  }
  return output.Item as Pet;
}

export async function deletePetById(petId: string): Promise<void> {
  await docClient
  .delete({
    TableName: tableName,
    Key: {
      petId: petId,
    },
  })
  .promise();
}