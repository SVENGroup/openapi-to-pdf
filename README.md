# SVENGroup/openapi-to-pdf

Create PDF API reference documentation from OpenAPI 3.0 specification YAML files.

## Requirements

- Node 20.18.x

## Installation

1. Clone this repository
```shell
git clone https://github.com/SVENGroup/openapi-to-pdf.git
```
2. Install JS dependencies
```shell
npm install
```


## Environment Variables
- [.env.example](/.env.example)

## Linting

To lint JS/TS files run the following command:

```shell
npm run lint 
```

The `npm run lint` command is part of a git pre-commit hook. Make sure you set git hooks as executable with:

```shell
chmod ug+x .githooks/pre-commit # for UNIX systems
```

## Formatting

This repository comes with a [.editorconfig](./.editorconfig) file to aid in formatting. This works with multiple IDEs but if you're using VSCode, make sure to install the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) plugin to make it work.

*Prettier was not installed since it currently has issues with keeping line breaks that developers often add for readability.*

## Testing

Execute the following commands to run both backend and frontend tests:

``` shell
npm run test # frontend tests
```

## Contributing

1. Create a new branch from the `dev` branch. Use the Jira Issue Key as the branch name.
1. Once done, create a Pull Request to the `dev` branch. Use this format as the PR Title: `Jira-Issue-Key: Jira Issue Title`

## References
- [Technical Documentation](./docs)
