# Display Logic

## Operations and Tags

The endpoints section list out all the operations (path + method) of your API. There are two scenarios that are considered:
1. When you specify tags in at least one operations; and 
2. When you don't use tags.

**When tags are used in your API**, the operations are grouped by tags. Before listing out the operations under it, each tag section will display the tag's `description` and `externalDocs.url` contents if these are specified in your OpenAPI schema. 

Operations which don't have any tags will be grouped into a "tag" called `Others` at the very end. You can configure the naming of this "tag" using the `headings.untagged_operations` option (see [configuration](./Configuration.md)).

Additionally, if you specify multiple tags under an operation, that operation will be displayed under both tags so we don't recommend you do so.

**When you don't specify tags in any of your operations**, all operations are just listed directly.

## Properties in a Schema

Schemas are flattened into a single table by this tool. The **JSON dot notation is used** to indicate keys.

For example, when this schema is referenced:

```yaml
type: object
properties:
    title:
        type: string
    categories:
        type: array
        items:
            type: string
```

It would generate this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|object|No|-|-|
|post.title|string|No|-|-|
|post.categories|array|No|-|-|
|post.categories[*]|string|No|-|-|


## Handling `allOf` in a Schema

When encountering `allOf`, this tool performs a deep merge of the array of schema objects within it. Every subsequent schema overwrites the previous schema when conflicting keys exist—similar to how this is handled in javascript. 

For example, when this schema is referenced:

```yaml
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

It would generate this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|object|No|-|-|
|post.title|string|No|ExampleB|-|
|post.subtitle|string|No|-|-|

**If the schema objects have a different `type`**, the subsequent schema overwrites the previous one too.

For example, when this schema is referenced:

```yaml
allOf:
    - type: string
    - type: object
      properties:
        title:
            type: string
```

It would generate this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|object|No|-|-|
|post.title|string|No|-|-|

## Handling `anyOf` and `oneOf` in a Schema

When encountering `anyOf` or `oneOf`, the table will display the options available and how the options must be handled by consumers of your API.

For example, when this schema is referenced:

```yaml
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

It would generate this table:

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

And this schema when referenced:

```yaml
oneOf:
    - type: string
    - type: object
      properties:
        title:
            type: string
```

Would generate this table:

|Key|Type|Required|Example|Notes|
|-|-|-|-|-|
|post|One of The Options|No|-|Must exactly match one of the options.|
|*Option 1 for post*|||||
|post|string|No|||
|*Option 2 for post*|||||
|post|object|No|||
|post.title|string|No|||


## Table of Contents
