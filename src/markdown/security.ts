import { OpenAPIV3 } from "openapi-types";

export type SecuritySchemes = { [key: string]: OpenAPIV3.SecuritySchemeObject };

export default async function generateSecurityMarkdown(schema: OpenAPIV3.Document): Promise<string> {

  const sec = schema.security;
  const sec_schemes = schema.components?.securitySchemes;

  let sec_str = "";

  if (sec && sec_schemes) {
    sec_str += "# Security";
    sec_str += "\n\n";
    sec_str += "The following security schemes are used by this API for authentication and authorization. These must be taken into account in every request unless otherwise stated.";
    sec_str += "\n\n";

    /** @ts-expect-error we resolve all references */
    sec_str += await generateApiKeysMarkdown(sec_schemes);

    /** @ts-expect-error we resolve all references */
    sec_str += generateBasicMarkdown(sec_schemes);

    /** @ts-expect-error we resolve all references */
    sec_str += generateBearerMarkdown(sec_schemes);

  }

  return sec_str;
}

async function generateApiKeysMarkdown(security_schemes: SecuritySchemes): Promise<string> {

  let sec_str = "";

  const match = getMatchingSecuritySchemes(security_schemes, 'apiKey');

  if (Object.keys(match).length > 0) {
    const changeCase = await import("change-case"); // eslint-disable-line @typescript-eslint/naming-convention

    sec_str += "## API Key Authentication";
    sec_str += "\n\n";

    sec_str += "This API is secured through API Keys which you must obtain separately.";
    sec_str += "\n\n";

    for (const [key, value] of Object.entries(match)) {
      sec_str += `### ${changeCase.capitalCase(key)}`;
      sec_str += "\n\n";

      /** @ts-expect-error always ApiKeySecurityScheme */
      sec_str += `To authenticate requests, include \`${value.name}\` as a request ${value.in}.${value.description ? ` ${value.description}` : ""}`;
      sec_str += "\n\n";

      /** @ts-expect-error always ApiKeySecurityScheme */
      sec_str += `\`\`\`http\nGET /example\nHost: example.com\n${value.name}: SAMPLE-API-KEY-a29@102&3djSF9\n\`\`\``;
      sec_str += "\n\n";
    }

  }

  return sec_str;
}

function generateBasicMarkdown(security_schemes: SecuritySchemes): string {
  let sec_str = "";

  const match = getMatchingSecuritySchemes(security_schemes, 'http', 'basic');

  if (Object.keys(match).length > 0) {
    sec_str += "## Basic Authentication";
    sec_str += "\n\n";

    sec_str += "This API is secured through basic authentication.";
    sec_str += "\n\n";

    sec_str += "To authenticate requests, Base64-encode a concatenated string of the username and password (`username:password`), prefix it with `Basic ` and include it in the request as the value of `Authorization` header.";
    sec_str += "\n\n";

    sec_str += "```http\nGET /example\nHost: example.com\nAuthorization: Basic dXNlcjE6cGFzc3dvcmQxMjM=\n```";
    sec_str += "\n\n";
  }

  return sec_str;
}

function generateBearerMarkdown(security_schemes: SecuritySchemes): string {
  let sec_str = "";

  const match = getMatchingSecuritySchemes(security_schemes, 'http', 'basic');

  if (Object.keys(match).length > 0) {
    const match_0 = match[0];

    sec_str += "## Bearer Authentication";
    sec_str += "\n\n";

    sec_str += "This API is secured through bearer token authentication.";
    sec_str += "\n\n";

    /** @ts-expect-error always HttpSecurityScheme */
    sec_str += `To authenticate requests, include the token ${match_0.bearerFormat ? `in ${match_0.bearerFormat} format ` : ''}prefixed with \`Bearer \` in the request as the value of the \`Authorization\` header.`;
    sec_str += "\n\n";

    sec_str += "```http\nGET /example\nHost: example.com\nAuthorization: Bearer dXNlcjE6cGFzc3dvcmQxMjM=\n```";
    sec_str += "\n\n";
  }

  return sec_str;
}

function getMatchingSecuritySchemes(security_schemes: SecuritySchemes, type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect', scheme?: 'basic' | 'bearer'): SecuritySchemes {

  const match: SecuritySchemes = {};

  for (const [key, value] of Object.entries(security_schemes)) {
    if (value.type === type) {
      if (scheme) {
        /** @ts-expect-error only for HttpSecurityScheme */
        if (value.scheme === scheme) {
          match[key] = value;
        }
      } else {
        match[key] = value;
      }
    }
  }

  return match;
}
