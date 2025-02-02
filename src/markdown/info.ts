import { Config } from "@/types";
import { OpenAPIV3 } from "openapi-types";

const indefinite = require('indefinite');

export default function generateInfoMarkdown(
  schema: OpenAPIV3.Document,
  config?: Partial<Config>
): string {

  const info = schema.info;

  let info_str = "";

  info_str += "# General Information";
  info_str += "\n\n";

  /* title & ver */
  info_str += `${info.title} v${info.version}`;
  info_str += "\n\n";

  /* description */
  if (info.description) {
    info_str += `${info.description}`;
    info_str += "\n\n";
  }

  /* added info */
  if (config?.texts?.info) {
    info_str += config.texts.info;
    info_str += "\n\n";
  }

  /* tos */
  info_str += generateTosMarkdown(info);


  /* contact */
  info_str += generateContactMarkdown(info);


  /* license */
  info_str += generateLicenseMarkdown(info);

  return info_str;
}

export function generateTosMarkdown(info: OpenAPIV3.Document["info"]): string {
  let info_str = "";
  if (info.termsOfService) {

    info_str += "## Terms of Service";
    info_str += "\n\n";

    info_str += `Usage of this API is subject to its Terms of Service which you may access at [${info.termsOfService}](${info.termsOfService}).`;
    info_str += "\n\n";
  }
  return info_str;
}

export function generateContactMarkdown(info: OpenAPIV3.Document["info"]): string {
  let info_str = "";
  if (info.contact && (info.contact.email || info.contact.name || info.contact.url)) {
    info_str += "## Contact";
    info_str += "\n\n";

    if (info.contact.name) {
      info_str += `- Name: ${info.contact.name}`;
      info_str += "\n";
    }

    if (info.contact.email) {
      info_str += `- Email: [${info.contact.email}](mailto:${info.contact.email})`;
      info_str += "\n";
    }

    if (info.contact.url) {
      info_str += `- URL: [${info.contact.url}](${info.contact.url})`
      info_str += "\n";
    }

    info_str += "\n";

  }
  return info_str;
}

export function generateLicenseMarkdown(info: OpenAPIV3.Document["info"]): string {
  let info_str = "";
  if (info.license?.name) {
    info_str += "## License"
    info_str += "\n\n";

    const license_text = indefinite(info.license.name);

    info_str += `This API is under ${license_text} license.`
    info_str += "\n\n";

    if (info.license.url) {
      info_str += `Read the full license here: [${info.license.url}](${info.license.url})`;
      info_str += "\n\n";
    }
  }
  return info_str;
}
