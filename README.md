# Future Screenshots (Chronomaps)

Future Screenshots is an AI-powered participatory mapping platform that enables users to capture, scan, and discuss their visions for the future of specific locations.

## Documentation

- **[User Guide](documentation/USER_GUIDE.md)** - How to use the platform and navigate showcase views
- **[Architecture](documentation/ARCHITECTURE.md)** - System design and components
- **[Development Environment](documentation/DEVELOPMENT_ENV.md)** - Setup and development workflow
- **[Coding Standards](documentation/CODING_STANDARDS.md)** - Code style and best practices
- **[Design System](documentation/DESIGN_SYSTEM.md)** - UI/UX guidelines
- **[Extending](documentation/EXTENDING.md)** - Adding new features
- **[Testing](documentation/TESTING.md)** - Testing strategies
- **[DevOps](documentation/DEVOPS.md)** - Deployment and operations

## Quick Start

This project uses [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Testing Credentials

For local development, use these testing credentials in URL parameters:
- Workspace ID: `61358757-cf32-483f-847f-3e4eb3855408`
- API Key (collaborator): `212aa064-4d02-4edb-8f0b-9f649d026fb2`
- API Key (admin): `e79d200e-b5e3-4043-9c4b-6deddb642fb0`

Example URL: `http://localhost:4200/showcase-ws?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
