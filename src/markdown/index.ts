import generateInfoMarkdown from "@/markdown/info";
import generateSecurityMarkdown from "@/markdown/security";
import generateServerMarkdown from "@/markdown/server";
import genererateToc from "@/markdown/toc";
import generateCoverMarkdown from "@/markdown/cover";
import { OpenAPIV3 } from "openapi-types";
import generateEndpointsMarkdown from "@/markdown/endpoints";
import { Config } from "@/config";

export default async function generateMarkdown(
  schema: OpenAPIV3.Document,
  config: Partial<Config>
): Promise<string> {

  let full_str = "";

  const info_md = generateInfoMarkdown(schema, config);
  full_str += info_md;

  const server_md = generateServerMarkdown(schema, config);
  full_str += server_md;

  const security_md = await generateSecurityMarkdown(schema, config);
  full_str += security_md;

  /* ENDPOINTS */
  full_str += `<div class="page-break"></div>`;
  full_str += "\n\n";
  const endpoints_md = generateEndpointsMarkdown(schema, config);
  full_str += endpoints_md;

  /* TOC */
  if (config.include_toc) {
    const toc = genererateToc(full_str, config);
    full_str = toc + full_str;
  }

  /* COVER PAGE */
  if (config.include_cover) {
    const title = config.texts?.title ?? schema.info.title;

    const subtitle = config.texts?.subtitle ?? "API Reference Document";

    const cover = generateCoverMarkdown(title, subtitle);
    full_str = cover + full_str;
  }

  return full_str;
}
