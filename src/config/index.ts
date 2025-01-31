import { deepMerge } from "@/utils/merge"
import { PdfConfig } from "md-to-pdf/dist/lib/config"
import * as fs from 'fs';

export type Config = {
  /** Whether or not to include a cover page. */
  include_cover: boolean,
  /** Whether or not to include the Table of Contents section. */
  include_toc: boolean,
  /** Maximum level included in the Table of Contents. */
  max_toc_level?: number,
  headings: {
    /** Heading text for the Table of Contents section. */
    toc: string,
    /** Heading text for the `info` section from the OpenAPI schema. */
    info: string,
    /** Heading text for the `servers` section from the OpenAPI schema. */
    servers: string,
    /** Heading text for the `security` section from the OpenAPI schema. */
    security: string,
    /** Heading text for the Endpoints section where all operations in the OpenAPI schema are listed */
    endpoints: string
    /** Heading text for the category of all operations without the `tags` property when `tags` are specified by other operations. */
    untagged_endpoints: string
  },
  texts: {
    /** Title of the document. Shows up on the cover page. */
    title: string,
    /** Subtitle of the document. Shows up on the cover page. */
    subtitle: string,
    /**
     * Additional descriptive information / introductory text. Shows up under the General Information section after `info.description` from the OpenAPI schema.
     * */
    info: string,
    /** Header text for all pages. */
    header: string,
    /** Footer text for all pages. */
    footer: string,
  },
  pdf_config: Partial<PdfConfig>
}

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

function getPdfConfigWithHeaderFooter(pdf_config: Partial<PdfConfig>, texts?: Partial<Config['texts']>): Partial<PdfConfig> {

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
