import {APIGatewayProxyResult} from "aws-lambda";
import {NotFoundException} from "./exception/NotFoundException";
import * as yup from "yup";
import {InvalidRequest} from "./exception/InvalidRequest";


// COMMON
export const defaultHeaders = {
  "content-type": "application/json",
};

export function handleError(error: Error): APIGatewayProxyResult {
  console.error(error)

  if (error instanceof NotFoundException) {
    return {
      statusCode: error.statusCode,
      headers: defaultHeaders,
      body: error.responseBody
    }
  }

  if (error instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: JSON.stringify({
        errors: error.errors,
      }),
    };
  }

  if (error instanceof InvalidRequest) {
    return {
      statusCode: error.statusCode,
      headers: defaultHeaders,
      body: error.responseBody
    }
  }

  if (error instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: JSON.stringify({error: `invalid request body format : "${error.message}"`}),
    };
  }
  throw error;
}