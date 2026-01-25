## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
```

## Migrations

```bash
# To create migrations use:
$ npm run migration:create src/database/migration/<MigrationName>

# To generate migrations use:
$ npm run migration:generate src/database/migration/<MigrationName>

# To run migrations use:
$ npm run migration:run
```

## Drop Schemas

```bash
# To drop schemas use:
$ npm run schema:drop
```

## API Docs

```bash
# To open API docs:
$ localhost:port/docs
```