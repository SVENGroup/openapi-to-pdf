# Display Logic

This document outlines how this tool displays the OpenAPI specification into a PDF.

## Table of Contents

A Table of contents (TOC) section is generated at the beginning of the PDF file after the cover page. 

By default, the TOC lists all headings in the document. You can control this behavior by specifying a `max_toc_level` option in the [configuration](./Configuration.md).

## Custom Sections

If there's a need to include content that isn't part of the OpenAPI specification you can add custom sections to the PDF file. Specify `texts.pre_endpoints_section` or `texts.post_endpoints` section in your [configuration](./Configuration.md) to add custom content in markdown.

This is useful for when you want to include process flows, guides, references, an annex, or any other content useful to the readers of your API documentation.

Take note that these custom sections are added on separate pages and have page breaks before or after to separate them from adjacent sections.

These sections are also included in the TOC so always start these with an H1 markdown text to denote the separate section. For example: 

```markdown
# Annex (Custom Section H1)

Your actual content ...
```

If you wish to add page breaks within these sections (e.g. you're adding multiple sections), simply add the following in your markdown:

```markdown
<div class="page-break"></div>
```

## Operations and Tags

The endpoints section list out all the operations (path + method) of your API. There are two scenarios that are considered:
1. When you specify tags in at least one operation; and 
2. When you don't use tags.

**When tags are used in your API**, the operations are grouped by tags. Before listing out the operations under it, each tag section will display the tag's `description` and `externalDocs.url` contents if these are specified in your OpenAPI file. 

Operations which don't have any tags will be grouped into a "tag" called `Others` at the very end. You can configure the naming of this "tag" using the `headings.untagged_operations` option (see [configuration](./Configuration.md)).

> If you specify multiple tags under an operation, that operation will be displayed under both tags so we don't recommend you do so.

**When you don't specify tags in any of your operations**, all operations are just listed directly.

## Properties in a Schema

Schemas are flattened into a single table by this tool. The **[JSON dot-notation](https://docs.oracle.com/en/database/oracle/oracle-database/19/adjsn/simple-dot-notation-access-to-json-data.html) is used** to indicate keys.

For example, when this schema:

```yaml
post:
    type: object
    properties:
        title:
            type: string
        categories:
            type: array
            items:
                type: string
```

Is generated as:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|object|No|-|-|
|post.title|string|No|-|-|
|post.categories|array|No|-|-|
|post.categories[*]|string|No|-|-|


## Handling `allOf` in a Schema

When encountering `allOf`, this tool performs a deep merge of the array of schema objects within it. Every subsequent schema overwrites the previous schema when conflicting keys exist—similar to how this is handled in javascript. 

For example, this schema:

```yaml
post:
    allOf:
        - type: object
          properties:
            title:
                type: string
                example: ExampleA
        - type: object
          properties:
            title:
                type: string
                example: ExampleB
            subtitle:
                type: string
```

Generates this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|object|No|-|-|
|post.title|string|No|ExampleB|-|
|post.subtitle|string|No|-|-|

**If the schema objects have different `type` properties**, the subsequent schema overwrites the previous one too.

For example, this schema:

```yaml
post:
    allOf:
        - type: string
        - type: object
          properties:
            title:
                type: string
```

Generated this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|object|No|-|-|
|post.title|string|No|-|-|

## Handling `anyOf` and `oneOf` in a Schema

When encountering `anyOf` or `oneOf`, the table will display the options available and how the options must be handled by consumers of your API.

For example, when this schema:

```yaml
post:
    anyOf:
        - type: object
          properties:
            title:
                type: string
                example: ExampleA
        - type: object
          properties:
            title:
                type: string
                example: ExampleB
            subtitle:
                type: string
```

Generated this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|One of The Options|No|-|May match multiple options simultaneously.|
|*Option 1 for post*|||||
|post|object|No|||
|post.title|string|No|ExampleA|-|
|*Option 2 for post*|||||
|post|object|No|||
|post.title|string|No|ExampleB|-|
|post.subtitle|string|No|-|-|

And this schema:

```yaml
post:
    oneOf:
        - type: string
        - type: object
          properties:
            title:
                type: string
```

Generates this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|One of The Options|No|-|Must exactly match one of the options.|
|*Option 1 for post*|||||
|post|string|No|||
|*Option 2 for post*|||||
|post|object|No|||
|post.title|string|No|||





