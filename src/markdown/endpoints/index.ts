import { OpenAPIV3 } from "openapi-types";
import { generateParametersMarkdown } from "./request";
import { generateSchemaMarkdown } from "./schema";
import { generateRequestBodyMarkdown, generateResponsesMarkdown } from "./response";
import { deepMerge } from "@/utils/merge";
import { getToc, Toc } from "../toc";

const http_methods = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
];

export type Operations = {
  [operation: string]: OpenAPIV3.OperationObject
}

export type UntaggedOperations = {
  [path: string]: Operations
}

let untagged_operations: UntaggedOperations = {};

export default function generateEndpointsMarkdown(
  schema: OpenAPIV3.Document
): string {
  let endpoints_str = "";

  endpoints_str += "# Endpoints";
  endpoints_str += "\n\n";

  const tags = schema.tags;
  const paths = schema.paths;

  const actual_tags = getActualTags(paths);

  if (actual_tags.length > 0) {
    for (const actual_tag of actual_tags!) {

      /* TAG */
      endpoints_str += generateTagMarkdown(actual_tag, tags);

      /* OPERATIONS */
      endpoints_str += generateOperationsMarkdown(paths, actual_tag);
    }

    endpoints_str += generateUntaggedOperationsMarkdown(tags);

  } else {
    endpoints_str += generateOperationsMarkdown(paths);
  }

  untagged_operations = {};
  return endpoints_str;
}

export function getActualTags(paths: OpenAPIV3.PathsObject): string[] {
  let actual_tags: string[] = [];

  for (const key_value of Object.entries(paths)) {
    const path_item = key_value[1];
    for (const [key, value] of Object.entries(path_item!)) {
      if (http_methods.includes(key)) {
        /** @ts-expect-error http method key always operation obj */
        if (value.tags) {
          /** @ts-expect-error http method key always operation obj */
          actual_tags = [...actual_tags, ...value.tags];
        }
      }
    }
  }

  actual_tags = [... new Set(actual_tags)];

  return actual_tags;
}

export function getTagObject(
  name: string,
  tags?: OpenAPIV3.TagObject[]
): OpenAPIV3.TagObject | null {

  if (!tags) {
    return null;
  }

  for (const tag of tags) {
    if (tag.name === name) {
      return tag;
    }
  }

  return null;
}

export function getOperationsFromPath(
  path_item: OpenAPIV3.PathItemObject,
  tag?: string,
  find_no_tag?: boolean
): Operations {

  const operations: Operations = {};

  for (const [key, value] of Object.entries(path_item)) {
    if (http_methods.includes(key)) { // check only http method keys
      if (find_no_tag) {
        /** @ts-expect-error http method key always operation obj */
        if (!value.tags) {
          /** @ts-expect-error http method key always operation obj */
          operations[key] = value;
        }
      } else if (tag) {
        /** @ts-expect-error http method key always operation obj */
        if (value.tags?.includes(tag)) {
          /** @ts-expect-error http method key always operation obj */
          operations[key] = value;
        }
      } else {
        /** @ts-expect-error http method key always operation obj */
        operations[key] = value;
      }
    }
  }

  return operations;
}

export function generateTagMarkdown(
  actual_tag: string,
  tags?: OpenAPIV3.TagObject[]
): string {

  let endpoints_str = "";

  endpoints_str += `## ${actual_tag}`;
  endpoints_str += "\n\n";

  const tag = getTagObject(actual_tag, tags);
  if (tag?.description) {
    endpoints_str += tag.description;
    endpoints_str += "\n\n";
  }

  if (tag?.externalDocs?.url) {
    endpoints_str += `Read more about this category here: [${tag?.externalDocs?.url}](${tag?.externalDocs?.url})`;
    endpoints_str += "\n\n";
  }

  return endpoints_str;
}

export function generateOperationsMarkdown(
  paths: OpenAPIV3.PathsObject,
  actual_tag?: string,
): string {

  let endpoints_str = "";

  const h = actual_tag ? "#" : ""; // prefix for headers (if tag is used or not)

  let operations_toc: Toc = [];

  for (const [path, path_item] of Object.entries(paths)) {

    const operations = getOperationsFromPath(path_item!, actual_tag);

    if (actual_tag) {
      const untagged_operations_of_path = getOperationsFromPath(path_item!, undefined, true);

      if (Object.keys(untagged_operations_of_path).length > 0) {
        if (untagged_operations[path]) {
          untagged_operations[path] = { ...untagged_operations[path], ...untagged_operations_of_path };
        } else {
          untagged_operations[path] = untagged_operations_of_path;
        }
      }
    }

    for (const [method, operation] of Object.entries(operations)) {

      const operation_title = generateOperationTitleMarkdown(h, path, method, operation);

      operations_toc = [...operations_toc, ...getToc(operation_title)];

      endpoints_str += operation_title;

      endpoints_str += generateOperationMarkdown(h, operation, path_item);
    }

  }

  const toc_markdown = generateOperationsTocMarkdown(operations_toc);

  return toc_markdown + endpoints_str;
}

export function generateUntaggedOperationsMarkdown(
  tags?: OpenAPIV3.TagObject[]
): string {
  let endpoints_str = "";
  if (Object.keys(untagged_operations).length > 0) {
    let operations_toc: Toc = [];

    for (const [path, operations] of Object.entries(untagged_operations)) {
      for (const [method, operation] of Object.entries(operations)) {
        const operation_title = generateOperationTitleMarkdown("#", path, method, operation);

        operations_toc = [...operations_toc, ...getToc(operation_title)];

        endpoints_str += operation_title;

        endpoints_str += generateOperationMarkdown("#", operation);
      }
    }

    const toc_markdown = generateOperationsTocMarkdown(operations_toc);

    const tag_title_markdown = generateTagMarkdown("Uncategorized", tags);

    endpoints_str = tag_title_markdown + toc_markdown + endpoints_str;

  }
  return endpoints_str;
}

export function generateOperationsTocMarkdown(
  toc: Toc
): string {
  let endpoints_str = "";

  if (toc.length > 0) {

    for (const toc_item of toc) {
      endpoints_str += `- [${toc_item.text}](#${toc_item.slug})\n`;
    }

    endpoints_str += `\n\n`;

  }

  return endpoints_str;
}

export function generateOperationMarkdown(
  h: string,
  operation: OpenAPIV3.OperationObject,
  path_item?: OpenAPIV3.PathItemObject,
): string {
  let endpoints_str = "";


  if (operation.summary) {
    endpoints_str += operation.summary;
    endpoints_str += "\n\n";
  }

  if (operation.description) {
    endpoints_str += operation.description;
    endpoints_str += "\n\n";
  }

  if (operation.externalDocs?.url) {
    endpoints_str += `Read more about this API endpoint here: [${operation.externalDocs.url}](${operation.externalDocs.url})`
    endpoints_str += "\n\n";
  }

  endpoints_str += generateOperationSecurityMarkdown(h, operation.security);

  /** @ts-expect-error we resolve all references */
  const parameters = getParameters(path_item?.parameters, operation.parameters);

  endpoints_str += generateParametersMarkdown(h, 'path', parameters);

  endpoints_str += generateParametersMarkdown(h, 'query', parameters);

  endpoints_str += generateParametersMarkdown(h, 'header', parameters);

  endpoints_str += generateParametersMarkdown(h, 'cookie', parameters);

  /** @ts-expect-error we resolve all references */
  endpoints_str += generateRequestBodyMarkdown(h, operation.requestBody);

  endpoints_str += generateResponsesMarkdown(h, operation.responses);

  return endpoints_str;
}

export function generateOperationTitleMarkdown(
  h: string,
  path: string,
  method: string,
  operation: OpenAPIV3.OperationObject,
): string {
  let endpoints_str = "";

  endpoints_str += `${h}## \`${method.toUpperCase()} ${path}\`${operation.operationId ? `(${operation.operationId})` : ''}`
  endpoints_str += "\n\n";

  return endpoints_str;
}

export function getParameters(
  path_parameters?: OpenAPIV3.ParameterObject[],
  operation_parameters?: OpenAPIV3.ParameterObject[]
): OpenAPIV3.ParameterObject[] {
  if (path_parameters && !operation_parameters) {
    return path_parameters;
  } else if (!path_parameters && operation_parameters) {
    return operation_parameters;
  } else if (path_parameters && operation_parameters) {
    return deepMerge(operation_parameters, path_parameters);
  }

  return [];
}

export function generateOperationSecurityMarkdown(
  h: string,
  security_requirements?: OpenAPIV3.SecurityRequirementObject[]
): string {
  if (!security_requirements) {
    return "";
  }

  let endpoints_str = "";

  endpoints_str += `${h}### Required Scopes`;
  endpoints_str += "\n\n";

  endpoints_str += `This endpoint requires the following scopes:\n\n`;

  for (const security_requirement of security_requirements) {
    for (const security_items of Object.entries(security_requirement)) {
      for (const security_item of security_items[1]) {
        endpoints_str += `- \`${security_item}\`\n`;
      }
    }
  }

  endpoints_str += "\n\n";


  return endpoints_str;
}

export function generateMediaTypeMarkdown(
  media_type: string,
  obj: OpenAPIV3.MediaTypeObject,
  display_for?: 'response' | 'request'
): string {
  let endpoints_str = "";

  endpoints_str += `Media Type: \`${media_type}\``;
  endpoints_str += "\n\n";

  if (obj.encoding) {
    endpoints_str += `Encoding: ${obj.encoding}`;
    endpoints_str += "\n\n";
  }

  if (obj.schema) {
    /** @ts-expect-error we resolve all references */
    endpoints_str += generateSchemaMarkdown(obj.schema, display_for);
  }

  return endpoints_str;

}

//export function generate(
//
//): string {
//  let endpoints_str = "";
//
//  return endpoints_str;
//}
//

