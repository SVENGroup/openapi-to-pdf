# @svengroup/openapi-to-pdf

Create PDF API reference documentation from OpenAPI 3.0.x specification files. 

This tool works by first generating markdown content which is then converted into PDF.

## Sample PDF Output

You may view the sample PDF output here: [`/samples/api-reference.pdf`](./samples/api-reference.pdf).

It shows a PDF version of [`/samples/openapi.yaml`](./samples/openapi.yaml) when the configuration at [`/samples/config.json`](./samples/config.json) is used.

## Inclusions

This tool includes the following:

- Command line usage to generate PDF API reference documentation
- YAML and JSON OpenAPI 3.0.x support
- Fully configurable:
    - Header & footer
    - Cover page
    - Table of contents
    - Headings and texts
    - Custom Sections
    - PDF settings (thanks to [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf))
- Programmatic usage with markdown output
- TypeScript support

## Installation

To install this tool run the one of the following commands:

```shell
npm i -g @svengroup/openapi-to-pdf # install globally
npm i -D @svengroup/openapi-to-pdf # install as a dev dependency
npm i @svengroup/openapi-to-pdf # install as a dependency
```

## Usage

To convert an OpenAPI 3.0.x file to PDF simply run the following command:

```shell
openapi-to-pdf path/to/openapi.yaml
```

This will create an `api-reference.pdf` file in the same directory where the command was ran.

To view the different options for this tool, use the `--help` option:

```shell
openapi-to-pdf --help
```

## Display Logic

To understand how this tool displays the OpenAPI specification in PDF format, see [Display Logic](./docs/DisplayLogic.md).

## Configuration

You can configure the PDF output by specifying a configuration file in the command:

```shell
openapi-to-pdf path/to/openapi.yaml --config path/to/config.json
```

To read more about how to configure your PDF output and the options available, see [Configuration](./docs/Configuration.md).

## Programmatic Usage

You can also use this tool programmatically as a package in your Javascript and TypeScript projects:

```ts
import { generateMarkdown } from "@svengroup/openapi-to-pdf";

const md = generateMarkdown({/* OpenAPI V3 Schema Object */});
```

To read more about using this tool programmatically, see [Programmatic Usage](./docs/ProgrammaticUsage.md)

## To Do's

- Automated Tests
- Example Section in the PDF (JSON is a priority)
- Multi-file Support

## Contribution

Read the [Contribution Guide](./docs/CONTRIBUTING.md) for details on how to contribute.

## Acknowledgements

This tool was built upon the generous open source work of other developers, big thanks to:
- [@simonhaenisch](https://github.com/simonhaenisch) for  [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) which powers markdown to PDF conversion for this tool.
- [@seriousme](https://github.com/seriousme) for [@seriousme/openapi-schema-validator](https://github.com/seriousme/openapi-schema-validator) which this tool uses to validate and parse OpenAPI files. The `OpenAPIV3.Document` interface is also directly from this package.
- [TJ Holowaychuk](https://github.com/tj) for [commander.js](https://github.com/tj/commander.js) which made making the cli a lot easier.
- All the other developers who worked on the packages we use for this tool!
