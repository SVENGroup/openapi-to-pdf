import generateMarkdown from "@/markdown";
import validate from "@/validate";

export async function generatePdf(
  oas: string,
  title?: string,
  subtitle?: string,
): Promise<Buffer<ArrayBufferLike>> {

  console.info('Validating OpenAPI Schema ...');
  const schema = await validate(oas);

  console.info('Generating Contents ...');
  const markdown_str = await generateMarkdown(schema, title, subtitle);

  console.info('Generating PDF File ...');
  const { mdToPdf } = await import("md-to-pdf");
  const pdf = await mdToPdf(
    { content: markdown_str },
    {
      page_media_type: 'print',
      highlight_style: 'github-dark',
      pdf_options: {
        printBackground: true, // eslint-disable-line @typescript-eslint/naming-convention
        outline: true,
        headerTemplate: `<style>#footer {margin-right: 14.5mm; margin-left: 14.5mm; font-family: system-ui; font-size: 8px; }</style>`, // eslint-disable-line @typescript-eslint/naming-convention
        footerTemplate: `<section id="#footer"><div><b>PROPRIETARY AND CONFIDENTIALITY NOTICE:</b> This document contains information confidential and proprietary to SVENINGENUITY, INC. and may not be used, disclosed, or reproduced in whole and in part without the prior written authorization from SVENINGENUITY, INC. and those so authorized may only use the information for the purpose consistent with the authorization.</div></section>`, // eslint-disable-line @typescript-eslint/naming-convention
        format: "A4",
        margin: {
          top: "15mm",
          bottom: "15mm",
          right: "15mm",
          left: "15mm",
        }
      }
    }
  );

  return pdf.content;

}

