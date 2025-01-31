import { PdfConfig } from "md-to-pdf/dist/lib/config"

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
