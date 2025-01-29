import generateInfoMarkdown from "@/markdown/info";
import generateSecurityMarkdown from "./security";
import generateServerMarkdown from "./server";
import genererateToc from "./toc";
import generateCoverMarkdown from "./cover";
import { OpenAPIV3 } from "openapi-types";
import generateEndpointsMarkdown from "@/markdown/endpoints";

export default async function generateMarkdown(
  schema: OpenAPIV3.Document,
  title?: string,
  subtitle?: string,
): Promise<string> {

  let full_str = "";

  const info_md = generateInfoMarkdown(schema);
  full_str += info_md;

  const server_md = generateServerMarkdown(schema);
  full_str += server_md;

  const security_md = await generateSecurityMarkdown(schema);
  full_str += security_md;

  /* ENDPOINTS */
  full_str += `<div class="page-break"></div>`;
  full_str += "\n\n";
  const endpoints_md = generateEndpointsMarkdown(schema);
  full_str += endpoints_md;

  /* TOC */
  const toc = genererateToc(full_str);
  full_str = toc + full_str;

  /* COVER PAGE */
  if (!title) {
    title = schema.info.title;
  }

  if (!subtitle) {
    subtitle = "API Reference Document";
  }

  const cover = generateCoverMarkdown(title, subtitle);
  full_str = cover + full_str;


  return full_str;
}
