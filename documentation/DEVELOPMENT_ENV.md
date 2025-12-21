# Development Environment Setup

This guide will help you set up your local development environment for the Future Screenshots project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v20 or later)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Should output: `v20.x.x` or higher

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`
   - Should output: `10.x.x` or higher

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

### Recommended Tools

- **Visual Studio Code** - Recommended IDE
  - Download from: https://code.visualstudio.com/
  - Recommended extensions:
    - Angular Language Service
    - ESLint
    - Prettier
    - GitLens
    - Angular Snippets

- **Chrome/Chromium** - Required for testing
  - Used by Karma test runner
  - Includes DevTools for debugging

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/whiletrue-industries/future-screenshots.git
cd future-screenshots
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`:

**Runtime Dependencies:**
- Angular 19.2 framework
- RxJS for reactive programming
- Leaflet for maps
- Three.js for 3D visualizations
- Firebase integration
- Marked for markdown rendering
- Lottie for animations

**Development Dependencies:**
- Angular CLI
- TypeScript compiler
- Testing frameworks (Karma, Jasmine)
- Type definitions for third-party libraries

### 3. Verify Installation

```bash
npm run ng version
```

You should see output showing Angular CLI and related package versions.

## Development Workflow

### Running the Development Server

Start the local development server:

```bash
npm start
```

This will:
- Compile the Angular application
- Start a development server on `http://localhost:4200`
- Watch for file changes and automatically reload
- Enable source maps for debugging

The application should automatically open in your default browser. If not, navigate to http://localhost:4200.

### Using Testing Credentials

When running the app locally, you'll need to pass credentials via URL query parameters. The format varies by route but typically includes:

**Testing Workspace Credentials:**
- Workspace ID: `61358757-cf32-483f-847f-3e4eb3855408`
- API Key (Collaborator): `212aa064-4d02-4edb-8f0b-9f649d026fb2`
- API Key (Admin): `e79d200e-b5e3-4043-9c4b-6deddb642fb0`

**Example URLs:**

```
# Main app with workspace
http://localhost:4200/?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2

# Admin interface
http://localhost:4200/admin/login?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=e79d200e-b5e3-4043-9c4b-6deddb642fb0

# Showcase
http://localhost:4200/showcase/output-map?workspace=61358757-cf32-483f-847f-3e4eb3855408
```

**Note:** Some routes may require both keys or different combinations. Check the specific route's requirements or ask the project maintainer if unsure.

### Development Server Options

```bash
# Start on a specific port
ng serve --port 4201

# Open browser automatically
ng serve --open

# Enable verbose logging
ng serve --verbose

# Watch mode with specific configuration
npm run watch
```

### Building the Project

#### Development Build

```bash
npm run build
```

Builds the project to the `dist/` directory with:
- Development optimizations
- Source maps enabled
- Faster build times

#### Production Build

```bash
ng build --configuration production
```

Builds optimized production bundles:
- Minification and tree-shaking
- AOT (Ahead-of-Time) compilation
- Bundle optimization
- No source maps
- Output to `dist/app/browser/`

#### Build Specific Apps

The project has multiple build targets:

```bash
# Build main app
npm run build:app

# Build showcase
npm run build:showcase

# Build admin interface
npm run build:admin
```

### Server-Side Rendering (SSR)

The project supports SSR for improved performance and SEO.

#### Build for SSR

```bash
ng build --configuration production
```

This creates both browser and server bundles.

#### Serve SSR Locally

```bash
# Serve main app with SSR
npm run serve:ssr:app

# Serve showcase with SSR
npm run serve:ssr:showcase

# Serve admin with SSR
npm run serve:ssr:admin
```

The SSR server runs on `http://localhost:4000` by default.

## Project Structure

```
/Users/adam/Code/art/screenshots/
├── projects/app/              # Main application source
│   ├── src/
│   │   ├── app/              # Application components and services
│   │   │   ├── scanner/      # Camera scanning feature
│   │   │   ├── discuss/      # AI chat interface
│   │   │   ├── home/         # Home page with map
│   │   │   ├── showcase/     # Public showcases
│   │   │   ├── admin/        # Admin interface
│   │   │   └── ...           # Other components
│   │   ├── locale/           # i18n translation files
│   │   │   ├── messages.en.json
│   │   │   ├── messages.he.json
│   │   │   └── messages.nl.json
│   │   └── public/           # Static assets
│   ├── tsconfig.app.json     # TypeScript config for app
│   └── tsconfig.spec.json    # TypeScript config for tests
├── dist/                     # Build output (generated)
├── node_modules/             # Dependencies (generated)
├── angular.json              # Angular workspace configuration
├── package.json              # npm dependencies and scripts
├── tsconfig.json             # Root TypeScript configuration
├── .browserslistrc          # Browser support targets
└── documentation/            # Project documentation
```

## IDE Setup

### Visual Studio Code

#### Recommended Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

#### Recommended Extensions

Install from VS Code marketplace:

```
Angular.ng-template
dbaeumer.vscode-eslint
esbenp.prettier-vscode
eamodio.gitlens
johnpapa.Angular2
```

### IntelliJ IDEA / WebStorm

1. Open the project directory
2. Enable Angular support: Settings → Languages & Frameworks → Angular
3. Set TypeScript version: Settings → Languages & Frameworks → TypeScript → Use TypeScript from `node_modules`
4. Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint

## Running Tests

### Unit Tests

Run all unit tests:

```bash
npm test
```

This will:
- Launch Karma test runner
- Open Chrome browser
- Execute all `.spec.ts` files
- Show results in terminal and browser
- Watch for changes and re-run tests

### Run Tests Once (CI Mode)

```bash
ng test --watch=false --browsers=ChromeHeadless
```

Useful for:
- Continuous integration
- Pre-commit checks
- Quick verification

### Test Coverage

Generate code coverage report:

```bash
ng test --code-coverage --watch=false
```

Coverage report will be generated in `coverage/` directory. Open `coverage/index.html` in a browser to view detailed coverage.

### Current Testing Status

**Note:** This project currently has minimal test coverage. Tests are skipped by default in schematics (`skipTests: true`). When adding new features, consider adding appropriate tests. See [TESTING.md](./TESTING.md) for testing guidelines.

## Code Generation

Use Angular CLI to generate new components, services, and other artifacts:

### Generate Component

```bash
ng generate component my-component

# or using shorthand
ng g c my-component

# Generate in specific folder
ng g c admin/my-component

# Generate with inline template
ng g c my-component --inline-template

# Generate with inline styles
ng g c my-component --inline-style
```

### Generate Service

```bash
ng generate service my-service

# or
ng g s my-service

# Generate in specific folder
ng g s services/my-service
```

### Generate Directive

```bash
ng g directive my-directive
```

### Generate Pipe

```bash
ng g pipe my-pipe
```

All generated code follows project standards (standalone components, signals, etc.).

## Internationalization (i18n)

The project supports three languages:

- **English (en)** - Default
- **Hebrew (he)** - RTL support
- **Dutch (nl)** - Nederlands

### Translation Files

Located in `projects/app/src/locale/`:
- `messages.en.json`
- `messages.he.json`
- `messages.nl.json`

### Extract Translation Strings

```bash
ng extract-i18n
```

This extracts translatable strings from templates and updates locale files.

### Build with Specific Locale

```bash
ng build --localize
```

This builds separate bundles for each locale.

### Serve Specific Locale

```bash
ng serve --configuration=development --localize=false
```

## Working with External Libraries

### Leaflet (Maps)

Leaflet is used for interactive maps. Type definitions are included.

```typescript
import * as L from 'leaflet';

const map = L.map('map').setView([51.505, -0.09], 13);
```

### Three.js (3D Visualization)

Three.js is used in showcase components.

```typescript
import * as THREE from 'three';

const scene = new THREE.Scene();
```

### OpenCV (cv.js)

OpenCV is loaded via CDN for document scanning. Available globally as `cv`.

Check if loaded:
```typescript
if (typeof cv !== 'undefined') {
  // OpenCV is available
}
```

## Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Use Sources tab to set breakpoints
3. Use Console for logging
4. Use Network tab to inspect API calls

### Angular DevTools

Install Angular DevTools extension for Chrome:
- Component tree inspection
- Change detection profiling
- Dependency injection tree
- State inspection

### Source Maps

Development builds include source maps, allowing you to debug TypeScript code directly in the browser.

### VSCode Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

Then press F5 to start debugging.

## Common Issues and Solutions

### Port Already in Use

If port 4200 is already in use:

```bash
ng serve --port 4201
```

### Node Module Issues

If you encounter dependency issues:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm's cache clean
npm cache clean --force
npm install
```

### TypeScript Version Mismatch

Ensure you're using the TypeScript version specified in `package.json`:

```bash
npx tsc --version
```

Should match `~5.7.2`. If not, reinstall dependencies.

### Build Fails Due to Memory

Increase Node.js memory limit:

```bash
export NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

### Camera Access Issues

When testing scanner locally:
- Use HTTPS or localhost (camera requires secure context)
- Grant camera permissions in browser
- Check browser console for errors

### SSR Hydration Warnings

If you see hydration warnings in console:
- Check for direct DOM manipulation
- Ensure server and client render the same content
- Use `isPlatformBrowser()` for browser-only code

## Environment Configuration

### Firebase Configuration

Firebase configuration is managed through `@angular/fire`. Check project configuration in the Angular app initialization.

**Note:** Do not commit Firebase credentials to the repository.

### API Endpoints

API endpoints are configured through the workspace settings. Backend server code is in a separate repository:

https://github.com/whiletrue-industries/chronomaps-server

### Development vs Production

The application automatically detects the environment. For local development:
- Use localhost URLs
- Use testing credentials (see above)
- Backend may point to development or staging server

## Getting Help

If you encounter issues:

1. Check this documentation and other docs in `/documentation`
2. Review existing issues on GitHub
3. Ask the team in project communications
4. Check Angular documentation: https://angular.dev

## Next Steps

- Read [CODING_STANDARDS.md](./CODING_STANDARDS.md) for code quality guidelines
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
- Read [CLAUDE.md](../CLAUDE.md) for workflow and contribution guidelines
- Check open issues on GitHub to find tasks

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Developer Guide](https://angular.dev/guide)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Three.js Documentation](https://threejs.org/docs/)
