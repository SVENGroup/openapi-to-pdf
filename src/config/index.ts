import { deepMerge } from "@/utils/merge"
import { PdfConfig } from "md-to-pdf/dist/lib/config"
import * as fs from 'fs';
import { Config } from "@/types";

export const base_config: Partial<Config> = {
  include_cover: true,
  include_toc: true,
  headings: {
    toc: 'Contents',
    info: 'General Information',
    servers: 'Servers',
    security: 'Security',
    endpoints: 'Operations',
    untagged_endpoints: 'Others'
  },
  pdf_config: {
    page_media_type: 'print',
    highlight_style: 'github-dark',
    pdf_options: {
      printBackground: true, // eslint-disable-line @typescript-eslint/naming-convention
      outline: true,
      format: "A4",
      margin: {
        top: "15mm",
        bottom: "15mm",
        right: "15mm",
        left: "15mm",
      }
    }
  }
}

export function getConfigFromFile(file?: string): Partial<Config> {
  if (file) {
    const config_file_contents = fs.readFileSync(file, 'utf8');
    return JSON.parse(config_file_contents);
  }

  return {};
}

export function getConfig(config?: Partial<Config>): Partial<Config> {
  const templated_pdf_config = getPdfConfigWithHeaderFooter(config?.pdf_config ?? {}, config?.texts);
  const templated_config = deepMerge(config, { pdf_config: templated_pdf_config });
  return deepMerge(templated_config, base_config);
}

export function getPdfConfigWithHeaderFooter(pdf_config: Partial<PdfConfig>, texts?: Partial<Config['texts']>): Partial<PdfConfig> {

  if (!texts?.footer && !texts?.header) {
    return {};
  }

  const configured: Partial<PdfConfig> = {
    pdf_options: {
      displayHeaderFooter: true, // eslint-disable-line @typescript-eslint/naming-convention
      headerTemplate: `<style>#footer, #header {margin-right: 14.5mm; margin-left: 14.5mm; font-family: system-ui; font-size: 8px; }</style><section id="header"><div>${texts?.header ?? ''}</div></section>`, // eslint-disable-line @typescript-eslint/naming-convention
      footerTemplate: `<section id="#footer"><div>${texts?.footer ?? ''}</div></section>`, // eslint-disable-line @typescript-eslint/naming-convention
    }
  }

  return deepMerge(configured, pdf_config);
}
