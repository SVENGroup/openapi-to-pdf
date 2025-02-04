# Configuration

This tool is highly configurable. This document outlines how you can configure your PDF output and the options you have.

## Usage

You can configure the PDF output by specifying a configuration file in the command:

```shell
openapi-to-pdf path/to/openapi.yaml --config path/to/config.json
```

You can also pass an object that partially matches the `Config` type when using this tool programmatically.

```ts
import { generatePdf, Config} from '@svengroup/openapi-to-pdf';

const config: Partial<Config> = {
    max_toc_level: 3
}

const schema = {/* OpenAPI V3 Schema */};

const pdf_contents = generatePdf(schema, config);

```

## Configuration Options

Here are the configuration options that you can set (none of these are required):

|Key|Type|Example|Notes|
|-|-|-|-|
|include_cover|boolean|`true`|Whether or not a cover page is included. <ul><li>default: `true`</li><ul>|
|include_toc|boolean|`true`|Whether or not the table of contents section is included. <ul><li>default: `true`</li><ul>|
|max_toc_level|integer|`3`|Control the maximum heading level in the table of contents. This is especially useful if the API is rather large as it prevents the TOC from being too long. If left as `undefined` the TOC level is not limited.  <ul><li>default: `undefined`</li><ul>|
|headings|object||An object that controls the heading texts.|
|headings.toc|string|`Contents`|Heading text for the table of contents section.  <ul><li>default: `Contents`</li><ul>|
|headings.info|string|`General Information`|Heading text for the general information section. This contains the contents of the OpenAPI `info` attribute.<ul><li>default: `General Information`</li><ul>|
|headings.security|string|`Security`|Heading text for the security section. This contains the contents of the OpenAPI `components.securitySchemes` attribute. <ul><li>default: `Security`</li><ul>|
|headings.endpoints|string|`Operations`|Heading text for the endpoints section. This sections contains all the paths and their methods grouped by tags.<ul><li>default: `Operations`</li><ul>|
|headings.untagged_endpoints|string|`Others`|Heading text used for the category of endpoints which do not have tags when tags are used by other operations. This can create conflicts with your actual tags so make sure to define one different from the default if `Others` is an actual tag you use.<ul><li>default: `Others`</li><ul>|
|texts|object||Additional text used in the generated API reference document.|
|texts.title|string|`My App`|Title of the document. Shows up on the cover page. If left as `undefined`, the contents of the OpenAPI `info.title` attribute is used.<ul><li>default: `undefined`</li><ul>|
|texts.subtitle|string|`API Reference Documentation`|Subtitle of the document. Shows up on the cover page underneath the title. <ul><li>default: `undefined`</li><ul>|
|texts.info|string||Additional descriptive / introductory text. Shows up under the information section after the contents of the OpenAPI `info.description` attribute.<ul><li>default: `Contents`</li><ul>|
|texts.header|string||Text that appears in the header section of all pages.<ul><li>default: `undefined`</li><ul>||
|texts.footer|string||Text that appears in the footer section of all pages.<ul><li>default: `undefined`</li><ul>||
|texts.pre_endpoints_section|string|`# Guides \n\n Here's how to ...`|Additional section that shows up on a separate page before the endpoints section. This is useful for including process flows or guides in your documentation.<ul><li>default: `undefined`</li><ul>||
|texts.post_endpoints_section|string|`# Annex \n\n 1. Lorem ipsum`|Additional section that shows up on a separate page after the endpoints section. This is useful for including external references, acknowledgements or an annex.<ul><li>default: `undefined`</li><ul>||
|pdf_config|object||PDF Configuration as specified by [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf). The default configuration creates an A4 PDF document with 15mm margins all around.|

Any options set through the command line interface take precedence over the configuration file like when using the `--title` and `--subtitle` options.

All `string` type fields support Github Flavored Markdown.

When either the  `pdf_config.pdf_options.headerTemplate` or `pdf_config.pdf_options.footerTemplate` is defined, the default styling for the header and/or footer will be ignored. Thus, you must specify your own styling within those options similar to how it is defined in the `getPdfConfigWithHeaderFooter` function of [/src/config/index.ts](./src/config/index.ts).

If specifying a different paper size or margins from the default, you must also adjust the styling of the header and footer through the `pdf_config.pdf_options.headerTemplate` option.
