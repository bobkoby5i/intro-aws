import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {fetchAllPets, fetchPetById, deletePetById, savePet} from "./service/PetService";
import {Pet} from "./model/Pet";
import {v4} from "uuid";
import * as yup from "yup";
import {InvalidRequest} from "./exception/InvalidRequest";
import {CreatePetRequestDto} from "./dto/createPetRequestDto";
import {defaultHeaders, handleError} from "./handlers";


// create new Pet
// get request. 
// convert request to Pet obiect/class
export const createPet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("POST Pet");
    const pet = await createPetFromRequestBody(event);

    await savePet(pet);
    return {
      statusCode: 201,
      headers: defaultHeaders,
      body: JSON.stringify(pet, null, 2)
    };
  } catch (error) {
    return handleError(error as Error);
  }
}


// delete Pet
export const deletePet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const petId = event.pathParameters?.petId as string;
    console.log("DELETE pet with id " + petId);

    await fetchPetById(petId);

    await deletePetById(petId);
    return {
      statusCode: 204,
      body: ""
    }
  } catch (error) {
    return handleError(error as Error);
  }
}

// GET pets/{id}
export const getPet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const petId = event.pathParameters?.petId as string;
    console.log("GET pet with id " + petId);

    const pet = await fetchPetById(petId)
    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify(pet)
    }
  } catch (error) {
    return handleError(error as Error);
  }
}

// GET pets
export const getAllPets = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const pets = await fetchAllPets();
  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: JSON.stringify(pets)
  }
}


// update Announcement
export const updatePet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const petId = event.pathParameters?.petId as string;
    console.log("PUT pet with id " + petId);
    const createPetRequestDto = await validatePayloadAndGetCreatePetRequestDto(event); // dto.CreatePetRequestDto
    const petNew = await createPetFromPetRequestDto(createPetRequestDto);

    const pet = await fetchPetById(petId);

    const now      = new Date().toISOString();
    pet.petBreed   = petNew.petBreed;
    pet.petName    = petNew.petName;
    pet.dob        = petNew.dob;
    pet.sex        = petNew.sex;
    pet.registered = petNew.registered;
    pet.updatedAt  = now;

    await savePet(pet);
    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify(pet)
    }
  } catch (error) {
    return handleError(error as Error);
  }
}


async function createPetFromRequestBody(event: APIGatewayProxyEvent): Promise<Pet> {
  const createPetRequestDto = await validatePayloadAndGetCreatePetRequestDto(event); // dto.CreatePetRequestDto
  const petId = v4(); // TODO to chyba Dynamo nadaje ID. (wtedy wiadomo co to jest)

  const now = new Date().toISOString();
  const createdAt = now;
  const updatedAt = now;

  const petName   = createPetRequestDto.petName;
  const petBreed  = createPetRequestDto.petBreed;
  const sex  = createPetRequestDto.sex;
  const dob  = createPetRequestDto.dob.toISOString().substring(0, 10);
  const registered  = createPetRequestDto.registered.toISOString();

  return new Pet(petId, petName, petBreed, sex, dob, registered, createdAt, updatedAt);
}

async function createPetFromPetRequestDto(createPetRequestDto: CreatePetRequestDto): Promise<Pet> {
  const petId = v4(); // TODO to chyba Dynamo nadaje ID. (wtedy wiadomo co to jest)

  const now = new Date().toISOString();
  const createdAt = now;
  const updatedAt = now;

  const petName   = createPetRequestDto.petName;
  const petBreed  = createPetRequestDto.petBreed;
  const sex  = createPetRequestDto.sex;
  const dob  = createPetRequestDto.dob.toISOString().substring(0, 10);
  const registered  = createPetRequestDto.registered.toISOString();

  return new Pet(petId, petName, petBreed, sex, dob, registered, createdAt, updatedAt);
}





//// PRIVATE methods
const createPetRequestDtoSchema = yup.object().shape({
  registered: yup.date().required(),
  //messages: yup.object().required()
  petName: yup.string().required(),
  petBreed: yup.string().required(),
  dob: yup.date().required(),
  sex: yup.string().oneOf(['BOY', 'GIRL']).required() 
}).noUnknown();

async function validatePayloadAndGetCreatePetRequestDto(event: APIGatewayProxyEvent): Promise<CreatePetRequestDto> {
  const requestBody = JSON.parse(event.body as string);
  console.log("validatePayloadAndGetCreatePetRequestDto() ...");
  console.log(requestBody);
  await createPetRequestDtoSchema.validate(requestBody, {abortEarly: false});

  const petName = requestBody.petName;
  const petBreed = requestBody.petBreed;
  const sex = requestBody.sex;
  const dob = new Date(requestBody.dob);
  const registered = new Date(requestBody.registered);

  const now = new Date();

  if (dob >= now) {
    throw new InvalidRequest("DOB must be in the past ");
  }

  if (registered >= now) {
    throw new InvalidRequest("registered must be in the past ");
  }  

  return new CreatePetRequestDto(petName, petBreed, sex, dob, registered);
}
