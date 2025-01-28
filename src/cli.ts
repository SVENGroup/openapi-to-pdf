#!/usr/bin/env node

import 'tsconfig-paths/register';
import { program } from "commander";
import { myFunction } from "@/index";

program
  .name("openapi-to-pdf")
  .description("Create PDF API reference documentation from OpenAPI 3.0.x specification YAML files.")
  .version("1.0.0")

program
  .argument('<input>', 'specify input openapi 3.0.x yaml file')
  .option('-o, --output <output-file>', 'output file path', 'api-reference.pdf')
  .action((input, options) => {
    console.log(input);
    console.log(options.output)
  })

program.parse(process.argv);
