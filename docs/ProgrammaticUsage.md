# Programmatic Usage

You can use this tool inside your Javascript and TypeScript projects as a package.

## Installation

First intall this package as a dependency in your project:

```shell
npm i @svengroup/openapi-to-pdf
```

Then you can import the functions and types (if using TypeScript):

```ts
import { generateMarkdown, generatePdf, OpenAPIV3, Config} from '@svengroup/openapi-to-pdf';
```

Both functions accept a schema object which must match the `OpenAPIV3.Document` interface.

Both functions also accept a config object which must partially match the `Config` type. See [configuration](./Configuration.md) for more information about the options available.

## Generating a PDF file

You can use the `generatePdf` function to generate a PDF file similar to when using the cli. 

This function returns a promise to a `Buffer<ArrayBufferLike>` which is the PDF's file contents. This can then be saved to the local storage for further use or even saved externally to an object storage service like S3.

### Example:

```ts
import { generatePdf, OpenAPIV3, Config } from '@svengroup/openapi-to-pdf';
import * as fs from 'fs';

const schema: OpenAPIV3.Document = {/* OpenAPI Schema */};

const config: Partial<Config> = { max_toc_level: 3};

const pdf_content = await generatePdf(schema, config);

fs.writeFileSync('api-reference.pdf', pdf_content);

```

## Generating Markdown Content

You can also opt to simply extract the markdown content that the PDF file is actually based off of.

This function returns a promise to a `string`. You can then do whatever you want with this like saving it as a `.md` file or processing it for displaying as HTML.

> When using this function, the `texts.header`, `texts.footer` and `pdf_config` options of the configuration are ignored.

### Example:

```ts
import { generateMarkdown, OpenAPIV3, Config } from '@svengroup/openapi-to-pdf';

const schema: OpenAPIV3.Document = {/* OpenAPI Schema */};

const config: Partial<Config> = { max_toc_level: 3};

const markdown_content = await generateMarkdown(schema, config);

```
