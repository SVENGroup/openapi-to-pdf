#!/usr/bin/env node

import 'tsconfig-paths/register.js';
import { program } from "commander";
import { toHtml } from '@/index';
import * as fs from 'fs';

program
  .name("openapi-to-pdf")
  .description("Create PDF API reference documentation from OpenAPI 3.0.x specification files.")
  .version("1.0.0")

program
  .argument('<input>', 'specify input openapi 3.0.x yaml file')
  .option('-o, --output <output-file>', 'output file path', 'api-reference.pdf')
  .action(async (input, options) => {

    try {

      console.log(input);
      console.log(options.output)

      const oas = fs.readFileSync(input, 'utf-8');

      await toHtml(oas);

    } catch (e) {
      console.error(e);
      console.error("Failed to convert OpenAPI file.")
    }

  })

program.parse(process.argv);
