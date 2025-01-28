#!/usr/bin/env node

import 'tsconfig-paths/register.js';
import { program } from "commander";
import * as fs from 'fs';
import { generatePdf } from '@/index';

program
  .name("openapi-to-pdf")
  .description("Create PDF API reference documentation from OpenAPI 3.0.x specification files.")
  .version("1.0.0")

program
  .argument('<input>', 'specify input openapi 3.0.x yaml file')
  .option('-o, --output <output-file>', 'output file path', 'api-reference.pdf')
  .option('-t, --title <title>', 'title of the api reference document')
  .option('--subtitle <subtitle>', 'sub-title of the api reference document')
  .action(async (input, options) => {

    try {

      const output_file: string = options.output;
      const title: string | undefined = options.title;
      const subtitle: string | undefined = options.subtitle;

      const oas = fs.readFileSync(input, 'utf-8');

      const pdf_content = await generatePdf(oas, title, subtitle);

      fs.writeFileSync(output_file, pdf_content);

    } catch (e) {
      console.error(e);
      console.error("Failed to convert OpenAPI file.")
    }

  })

program.parse(process.argv);
