import { Config } from "@/types";

export function generatePreEndpointsMarkdown(config?: Partial<Config>): string {
  let custom_str = "";

  if (config?.texts?.pre_endpoints_section) {
    custom_str += config.texts.pre_endpoints_section;
    custom_str += `<div class="page-break"></div>`;
    custom_str += "\n\n";
  }


  return custom_str;
}

export function generatePostEndpointsMarkdown(config?: Partial<Config>): string {
  let custom_str = "";

  if (config?.texts?.post_endpoints_section) {
    custom_str += `<div class="page-break"></div>`;
    custom_str += "\n\n";
    custom_str += config.texts.post_endpoints_section;
  }

  return custom_str;
}
