import generateInfoMarkdown from "@/markdown/info";
import generateSecurityMarkdown from "@/markdown/security";
import generateServerMarkdown from "@/markdown/server";
import { genererateTocMarkdown } from "@/markdown/toc";
import generateCoverMarkdown from "@/markdown/cover";
import { OpenAPIV3 } from "openapi-types";
import generateEndpointsMarkdown from "@/markdown/endpoints";
import { Config } from "@/types";

export async function generateMarkdown(
  schema: OpenAPIV3.Document,
  config?: Partial<Config>
): Promise<string> {

  let full_str = "";

  full_str += generateInfoMarkdown(schema, config);

  full_str += generateServerMarkdown(schema, config);

  full_str += await generateSecurityMarkdown(schema, config);

  full_str += `<div class="page-break"></div>`;
  full_str += "\n\n";

  /* ENDPOINTS */
  const endpoints_md = generateEndpointsMarkdown(schema, config);
  full_str += endpoints_md;

  /* TOC */
  if (config?.include_toc) {
    const toc = genererateTocMarkdown(full_str, config);
    full_str = toc + full_str;
  }

  /* COVER PAGE */
  if (config?.include_cover) {
    const cover = generateCoverMarkdown(schema, config);
    full_str = cover + full_str;
  }

  return full_str;
}
