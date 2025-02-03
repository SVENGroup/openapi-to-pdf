# @svengroup/openapi-to-pdf

Create PDF API reference documentation from OpenAPI 3.0.x specification files. 

This tool was created since we needed a NodeJS tool and the well loved [swagger2markup](https://github.com/Swagger2Markup/swagger2markup?tab=readme-ov-file) is written in Java and doesn't support OpenAPI v3 which we use internally at [The SVEN Group](https://svengroup.com).

## Sample PDF Output

You may view the sample PDF output here: [`/samples/api-reference.pdf`](./samples/api-reference.pdf).

It shows a PDF version of the sample OpenAPI specification when first opening the [Swagger Online Editor](https://editor.swagger.io/) and no configuration for this tool is set.

## Inclusions

This tool includes the following:

- Command line usage to generate PDF API reference documentation
- YAML and JSON OpenAPI 3.0.x support
- Fully configurable:
    - Header & footer
    - Cover page
    - Table of contents
    - Headings and texts
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

To view the different options for the same command run the `--help` option:

```shell
openapi-to-pdf --help
```

## Display Logic

To understand how this tool handles different scenarios in an OpenAPI schema, see [Display Logic](./docs/DisplayLogic.md).

## Configuration

You can configure the PDF output by specifying a configuration file in the command:

```shell
openapi-to-pdf path/to/openapi.yaml --config path/to/config.json
```

To read more about how to configure your PDF output and the options available, see [Configuration](./docs/Configuration.md).

## Programmatic Usage



## To Do's

- Automated Tests
- Example Section in the PDF (JSON is a priority)
- Multi-file Support

## Contribution

Read the [Contribution Guide](./docs/CONTRIBUTING.md) for details on how to contribute.

## Acknowledgements

