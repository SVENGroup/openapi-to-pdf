# SVEN General Template

This repository is a base template for all applications of The SVEN Group regardless of the language/framework.

## Inclusions

The following are included in this repository and are compliant with [The SVEN Coding Conventions & Standards](https://svengroup.atlassian.net/wiki/x/fgAsaw):
- [IDE Configuration File](#formatting)
- [.env.example](./.env.example)
- [Basic .gitignore File](./.gitignore)
- [License Definition](./.LICENSE)
- [README.md Template](./README.example.md)
- [Entity Relationship Diagram](./docs/erd.md)
- [Sample API Documentation in OpenAPI format](./docs/openapi.yaml)

## Using this template

1. Create a new repository and use this as a template: https://github.com/new?owner=SVENGroup&template_name=sven-general-template&template_owner=SVENGroup
2.  Replace this readme file with the appropriate content based on [this example](./README.example.md).
3. If [openapi.yaml](./docs/openapi.yaml) is irrelevant to your project, delete it.
4. Install your framework of choice and start coding!

## Environment Variables
- [.env.example](/.env.example)

## Formatting

This repository comes with a [.editorconfig](./.editorconfig) file to aid in formatting. This works with multiple IDEs but if you're using VSCode, make sure to install the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) plugin to make it work.

***DO NOT** install Prettier since it currently has issues with keeping line breaks that developers often add for readability.*

## References
- [Entity Relationship Diagram](./docs/erd.md)
- [Documentation](./docs)
- [The SVEN Coding Conventions & Standards](https://svengroup.atlassian.net/wiki/x/fgAsaw)
