import generateMarkdown from "@/markdown";
import validate from "@/validate";
import { Config, getConfig } from "./types/config";

export async function generatePdf(
  oas: string,
  config?: Partial<Config>,
): Promise<Buffer<ArrayBufferLike>> {

  config = getConfig(config);

  console.info('Validating OpenAPI Schema ...');
  const schema = await validate(oas);

  console.info('Generating Contents ...');
  const markdown_str = await generateMarkdown(
    schema,
    config
  );

  console.info('Generating PDF File ...');

  const { mdToPdf } = await import("md-to-pdf");
  const pdf = await mdToPdf(
    { content: markdown_str },
    config.pdf_config
  );

  return pdf.content;

}

