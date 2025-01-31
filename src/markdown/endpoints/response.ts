import { getHttpStatusName } from "@/utils/status";
import { OpenAPIV3 } from "openapi-types";
import { generateMediaTypeMarkdown } from ".";
import { generateSubSectionTocMarkdown, getToc } from "../toc";
import { Toc } from "@/types";

export function generateResponsesMarkdown(
  h: string,
  responses: OpenAPIV3.ResponsesObject
): string {
  let endpoints_str = "";

  const responses_title = generateResponsesTitleMarkdown(h);

  let responses_toc: Toc = [];

  for (const [code, response] of Object.entries(responses)) {

    const response_title_markdown = generateResponseTitleMarkdown(h, code);

    responses_toc = [...responses_toc, ...getToc(response_title_markdown)];

    endpoints_str += generateResponseTitleMarkdown(h, code);

    /** @ts-expect-error we resolve all references */
    endpoints_str += generateResponseMarkdown(h, response);
  }

  const responses_toc_markdown = generateSubSectionTocMarkdown(responses_toc);

  return responses_title + responses_toc_markdown + endpoints_str;
}

export function generateResponsesTitleMarkdown(h: string): string {
  let endpoints_str = "";

  endpoints_str += `${h}### Responses`;
  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateResponseMarkdown(
  h: string,
  response: OpenAPIV3.ResponseObject
): string {
  let endpoints_str = "";

  if (response.description) {
    endpoints_str += response.description;
    endpoints_str += "\n\n";
  }

  /** @ts-expect-error we resolve all references */
  endpoints_str += generateResponseHeadersMarkdown(h, response.headers);

  endpoints_str += generateResponseBodyMarkdown(h, response.content);


  return endpoints_str;
}

export function generateResponseTitleMarkdown(h: string, code: string): string {
  let endpoints_str = "";

  const title = `${code} ${getHttpStatusName(code)}`;

  endpoints_str += `${h}#### \`${title}\``;
  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateResponseHeadersMarkdown(
  h: string,
  headers?: { [key: string]: OpenAPIV3.HeaderObject }
): string {
  let endpoints_str = "";

  endpoints_str += `${h}##### Response Headers`;
  endpoints_str += "\n\n";

  if (headers) {
    endpoints_str += generateResponseHeadersTableMarkdown(headers);
  } else {
    endpoints_str += "No Specific Response Headers.";
    endpoints_str += "\n\n";
  }

  return endpoints_str;
}

export function generateResponseHeadersTableMarkdown(
  headers: { [key: string]: OpenAPIV3.HeaderObject }
): string {
  let endpoints_str = "";

  endpoints_str += "|Key|Type|Required|Example|\n";
  endpoints_str += "|-|-|-|-|\n";

  for (const [key, header] of Object.entries(headers)) {
    endpoints_str += generateResponseHeadersTableRowMarkdown(key, header);
  }

  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateResponseHeadersTableRowMarkdown(
  key: string,
  header: OpenAPIV3.HeaderObject
): string {
  let endpoints_str = "";

  endpoints_str += `|${key}`;

  /** @ts-expect-error we resolve all references */
  const schema: OpenAPIV3.SchemaObject = header.schema;

  endpoints_str += `|${schema?.type ?? '-'}`;

  if (header.required) {
    endpoints_str += `|Yes`;
  } else {
    endpoints_str += `|No`;
  }

  if (header.example) {
    endpoints_str += `|${header.example}`;
  } else {
    endpoints_str += `|-`
  }

  endpoints_str += "|\n";

  return endpoints_str;
}

export function generateResponseBodyMarkdown(
  h: string,
  body?: { [key: string]: OpenAPIV3.MediaTypeObject }
): string {
  let endpoints_str = "";

  endpoints_str += `${h}##### Response Body`;
  endpoints_str += "\n\n"

  if (body) {
    endpoints_str += generateResponseBodyTablesMarkdown(body);
  } else {
    endpoints_str += "No Response Body";
    endpoints_str += "\n\n";
  }

  return endpoints_str;
}

export function generateResponseBodyTablesMarkdown(
  body: { [key: string]: OpenAPIV3.MediaTypeObject }
): string {
  let endpoints_str = "";

  for (const [media_type, obj] of Object.entries(body)) {
    endpoints_str += generateMediaTypeMarkdown(media_type, obj, 'response');
  }

  return endpoints_str;
}
