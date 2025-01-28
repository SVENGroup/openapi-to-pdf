#!/usr/bin/env node

import 'tsconfig-paths/register';
import { program } from "commander";
import { myFunction } from "@/index";

program
  .name("my-cli-tool")
  .description("A CLI tool that also works as a function")
  .option("-n, --name <name>", "Provide a name")
  .action((options) => {
    console.log(myFunction(options.name));
  });

program.parse(process.argv);
