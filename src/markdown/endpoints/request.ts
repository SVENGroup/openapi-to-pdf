import { OpenAPIV3 } from "openapi-types";
import { generateNestedSchemaTableRowMarkdown, generateOneAnyOfSchemaTableRowMarkdown, generateSchemaNotesMarkdown, generateSchemaTableRowExampleColMarkdown, handleAllOf } from "./schema";

export function getParametersIn(
  used_in: string,
  parameters?: OpenAPIV3.ParameterObject[],
): OpenAPIV3.ParameterObject[] {

  if (!parameters) {
    return [];
  }

  let parameters_in: OpenAPIV3.ParameterObject[] = [];

  for (const parameter of parameters) {
    if (parameter.in === used_in) {
      parameters_in = [...parameters_in, parameter];
    }
  }

  return parameters_in;
}

export function generateParametersMarkdown(
  h: string,
  used_in: string,
  parameters?: OpenAPIV3.ParameterObject[]
): string {
  let endpoints_str = "";

  endpoints_str += generateParameterTitleMarkdown(h, used_in);

  const path_parameters = getParametersIn(used_in, parameters);
  if (path_parameters.length < 1) {
    switch (used_in) {
      case "path":
        endpoints_str += "No Path Parameters.";
        break;
      case "query":
        endpoints_str += "No Query Parameters.";
        break;
      case "header":
        endpoints_str += "No Request Headers";
        break;
      case "cookie":
        endpoints_str += "No Cookies.";
        break;
      default:
        endpoints_str += "No Parameters.";
        break;
    }
    endpoints_str += "\n\n";
  } else {
    endpoints_str += generateParametersTableMarkdown(path_parameters);
  }

  return endpoints_str;
}

export function generateParameterTitleMarkdown(
  h: string,
  used_in: string
): string {
  let endpoints_str = "";

  switch (used_in) {
    case "path":
      endpoints_str += `${h}### Path Parameters`;
      break;
    case "query":
      endpoints_str += `${h}### Query Parameters`;
      break;
    case "header":
      endpoints_str += `${h}### Request Headers`;
      break;
    case "cookie":
      endpoints_str += `${h}### Cookies`;
      break;
    default:
      break;
  }
  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateParametersTableMarkdown(
  parameters: OpenAPIV3.ParameterObject[]
): string {
  let endpoints_str = "";

  endpoints_str += "|Key|Type|Required|Example|Notes|\n";
  endpoints_str += "|-|-|-|-|-|\n";

  for (const parameter of parameters) {
    endpoints_str += generateParameterTableRowMarkdown(parameter);
  }

  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateParameterTableRowMarkdown(
  parameter: OpenAPIV3.ParameterObject
): string {
  let endpoints_str = "";

  /** @ts-expect-error we resolve all references */
  let schema: OpenAPIV3.SchemaObject | undefined = parameter.schema;

  schema = schema ? handleAllOf(schema) : undefined;

  const input_schema = schema ?? {}; // for input in schema functions

  if (schema?.readOnly) {
    return ""; // override if readonly
  }

  if (schema?.anyOf || schema?.oneOf) {
    return generateOneAnyOfSchemaTableRowMarkdown(
      parameter.name,
      schema,
      parameter.required ? [parameter.name] : [],
      'request'
    )
  }

  /* NAME */
  endpoints_str += `|${parameter.name}`;

  /* TYPE */
  endpoints_str += generateParameterTableRowTypeColMarkdown(schema);

  /* REQUIRED */
  endpoints_str += generateParameterTableRowRequiredColMarkdown(parameter);

  /* EXAMPLE */
  endpoints_str += generateSchemaTableRowExampleColMarkdown(input_schema);

  /* NESTED */
  endpoints_str += generateSchemaNotesMarkdown(schema);

  /* NESTED */
  endpoints_str += generateNestedSchemaTableRowMarkdown(
    parameter.name,
    input_schema,
    'request'
  )

  return endpoints_str;
}

export function generateParameterTableRowTypeColMarkdown(
  schema?: OpenAPIV3.SchemaObject
): string {
  let endpoints_str = "";

  endpoints_str += `|${schema?.type ?? '-'}`;

  return endpoints_str;
}

export function generateParameterTableRowRequiredColMarkdown(
  parameter: OpenAPIV3.ParameterObject
): string {
  let endpoints_str = "";

  if (parameter.required) {
    endpoints_str += `|Yes`;
  } else {
    endpoints_str += `|No`;
  }

  return endpoints_str;
}
