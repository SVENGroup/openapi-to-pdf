import { Config } from "@/types";
import { OpenAPIV3 } from "openapi-types";

export type SecuritySchemes = { [key: string]: OpenAPIV3.SecuritySchemeObject };

export default async function generateSecurityMarkdown(schema: OpenAPIV3.Document, config?: Partial<Config>): Promise<string> {

  const sec = schema.security;
  const sec_schemes = schema.components?.securitySchemes;

  let sec_str = "";

  if (sec && sec_schemes) {
    sec_str += `# ${config?.headings?.security ?? 'Security'}`;
    sec_str += "\n\n";
    sec_str += "The following security schemes are used by this API for authentication and authorization. These must be taken into account in every request unless otherwise stated.";
    sec_str += "\n\n";

    /** @ts-expect-error we resolve all references */
    sec_str += await generateApiKeysMarkdown(sec_schemes);

    /** @ts-expect-error we resolve all references */
    sec_str += generateBasicMarkdown(sec_schemes);

    /** @ts-expect-error we resolve all references */
    sec_str += generateBearerMarkdown(sec_schemes);

    /** @ts-expect-error we resolve all references */
    sec_str += generateOidcMarkdown(sec_schemes);

    /** @ts-expect-error we resolve all references */
    sec_str += await generateOauthMarkdown(sec_schemes);

  }

  return sec_str;
}

async function generateApiKeysMarkdown(security_schemes: SecuritySchemes): Promise<string> {

  let sec_str = "";

  const match = getMatchingSecuritySchemes(security_schemes, 'apiKey');

  if (Object.keys(match).length > 0) {
    const changeCase = await import("change-case"); // eslint-disable-line @typescript-eslint/naming-convention

    const security_scheme = Object.entries(match)[0][1]

    sec_str += "## API Key Authentication";
    sec_str += "\n\n";

    sec_str += security_scheme.description ?? "This API is secured through API Keys which you must obtain separately.";
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
    const security_scheme = Object.entries(match)[0][1]

    sec_str += "## Basic Authentication";
    sec_str += "\n\n";

    sec_str += security_scheme.description ?? "This API is secured through basic authentication.";
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
    const security_scheme = Object.entries(match)[0][1]

    sec_str += "## Bearer Authentication";
    sec_str += "\n\n";

    sec_str += security_scheme.description ?? "This API is secured through bearer token authentication.";
    sec_str += "\n\n";

    /** @ts-expect-error always HttpSecurityScheme */
    sec_str += `To authenticate requests, include the token ${security_scheme.bearerFormat ? `in ${security_scheme.bearerFormat} format ` : ''}prefixed with \`Bearer \` in the request as the value of the \`Authorization\` header.`;
    sec_str += "\n\n";

    sec_str += "```http\nGET /example\nHost: example.com\nAuthorization: Bearer dXNlcjE6cGFzc3dvcmQxMjM=\n```";
    sec_str += "\n\n";
  }

  return sec_str;
}

function generateOidcMarkdown(security_schemes: SecuritySchemes): string {
  let sec_str = "";

  const match = getMatchingSecuritySchemes(security_schemes, 'openIdConnect');

  if (Object.entries(match).length > 0) {
    /** @ts-expect-error only for OpenIdSecurityScheme */
    const security_scheme: OpenAPIV3.OpenIdSecurityScheme = Object.entries(match)[0][1];

    sec_str += "## OpenID Connect (OIDC) Authentication";
    sec_str += "\n\n";

    sec_str += security_scheme.description ?? "This API is secured using the [OpenID Connect (OIDC) protocol](https://openid.net/specs/openid-connect-core-1_0-final.html).";
    sec_str += "\n\n";

    sec_str += `Discovery URL: [${security_scheme.openIdConnectUrl}](${security_scheme.openIdConnectUrl})`;
    sec_str += "\n\n";

  }

  return sec_str;
}

async function generateOauthMarkdown(security_schemes: SecuritySchemes): Promise<string> {
  let sec_str = "";

  const match = getMatchingSecuritySchemes(security_schemes, 'oauth2');

  if (Object.entries(match).length > 0) {
    /** @ts-expect-error only for OAuth2SecurityScheme */
    const security_scheme: OpenAPIV3.OAuth2SecurityScheme = Object.entries(match)[0][1];

    sec_str += "## OAuth 2.0 Authorization";
    sec_str += "\n\n";

    sec_str += security_scheme.description ?? "This API is secured using the [OAuth 2.0 authorization framework](https://datatracker.ietf.org/doc/html/rfc6749).";
    sec_str += "\n\n";

    sec_str += await generateOauthFlowsMarkdown(security_scheme);

  }

  return sec_str;
}

async function generateOauthFlowsMarkdown(
  security_scheme: OpenAPIV3.OAuth2SecurityScheme
): Promise<string> {
  const changeCase = await import("change-case"); // eslint-disable-line @typescript-eslint/naming-convention

  let sec_str = ""

  for (const [type, flow] of Object.entries(security_scheme.flows)) {

    sec_str += `### ${changeCase.capitalCase(type)} Flow`;
    sec_str += "\n\n";

    sec_str += `This API supports the ${changeCase.noCase(type)} flow.`;
    sec_str += "\n\n";

    for (const [key, value] of Object.entries(flow)) {

      if (key === 'scopes') {
        sec_str += `- Scopes\n`;

        for (const [scope, desc] of Object.entries(value)) {
          sec_str += `\t- \`${scope}\`: ${desc}\n`;
        }

        continue;
      }

      const field = changeCase.capitalCase(key).replace('Url', 'URL');

      sec_str += `- ${field}: [${value}](${value})\n`;
    }

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
