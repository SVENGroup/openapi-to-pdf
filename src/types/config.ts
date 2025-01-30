import { PdfConfig } from "md-to-pdf/dist/lib/config"

export type Config = {
  headings?: {
    toc?: string,
    info?: string,
    servers?: string,
    security?: string,
    endpoints?: string
    uncategorized_endpoints?: string
  },
  texts?: {
    info?: string,
    footer?: string,
  },
  pdf_config?: PdfConfig
}
