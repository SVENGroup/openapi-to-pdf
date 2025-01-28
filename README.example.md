# App Name

Short app description.

## Requirements

- PHP 8.2.x
- Node 20.18.x
- MySQL 8.x

## Installation

1. Clone this repository
```shell
git clone 
```
2. Set environment variables
```shell
cp .env.example .env
```
3. Install PHP dependencies
```shell
composer install
```
4. Install JS dependencies
```shell
npm install
```
5. Generate App Key
```shell
php artisan key:generate
``` 
6. Migrate and seed the database
```shell
php artisan migrate:fresh --seed 
```

## Environment Variables
- [.env.example](/.env.example)

## Linting

To lint PHP files run the following command:

```shell
composer lint # check for issues
composer lint-fix # automatically fix issues
```

To lint JS/TS files run the following command:

```shell
npm run lint 
```

Both `composer lint` and `npm run lint` are part of a git pre-commit hook. Make sure you set git hooks as executable with:

```shell
chmod ug+x .git/hooks/pre-commit # for UNIX systems
```

## Formatting

This repository comes with a [.editorconfig](./.editorconfig) file to aid in formatting. This works with multiple IDEs but if you're using VSCode, make sure to install the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) plugin to make it work.

*Prettier was not installed since it currently has issues with keeping line breaks that developers often add for readability.*

## Testing

Execute the following commands to run both backend and frontend tests:

``` shell
php artisan test # backend tests
npm run test # frontend tests
```

## Contributing

1. Create a new branch from the `dev` branch. Use the Jira Issue Key as the branch name.
1. Once done, create a Pull Request to the `dev` branch. Use this format as the PR Title: `Jira-Issue-Key: Jira Issue Title`

## References
- [Confluence Documentation]()
- [Entity Relationship Diagram](./docs/erd.md)
- [Technical Documentation](./docs)
- [Laravel Documentation](https://laravel.com/docs/11.x)
- [InertiaJS Documentation](https://inertiajs.com/)
- [Vue3 Documentation](https://vuejs.org/guide/introduction.html)
