import { Config } from "@/types";
import { OpenAPIV3 } from "openapi-types";

export default function generateCoverMarkdown(
  schema: OpenAPIV3.Document,
  config?: Partial<Config>
): string {

  const title = config?.texts?.title ?? schema.info.title;
  const subtitle = config?.texts?.subtitle ?? "API Reference Document";

  let cover_str = "";

  cover_str += `<h1 style="font-size: 48px; line-height: 1.2; font-weight: 700; margin-top: 150px; margin-bottom: 0px">${title}</h1>`
  cover_str += "\n\n";

  if (subtitle) {
    cover_str += `<p style="font-size: 16px; margin: 0px">${subtitle}</p>`;
    cover_str += "\n\n";
  }

  cover_str += `<div class="page-break"></div>`;
  cover_str += "\n\n";

  return cover_str;
}
