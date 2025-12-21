# DevOps Documentation

This document describes deployment procedures, continuous integration, and operational practices for the Future Screenshots project.

## Overview

The project uses a fully automated deployment pipeline that builds and deploys the application to GitHub Pages on every push to the `main` branch.

### Deployment Architecture

- **Hosting Platform:** GitHub Pages
- **Deployment Branch:** `gh-pages` (automatically managed)
- **CI/CD:** GitHub Actions
- **Deployment Script:** `deploy.sh`
- **Build Tool:** Angular CLI
- **Automation:** Fully automated on push to main

## Deployment Pipeline

### Automated Deployment Flow

```
Developer pushes to main branch
    ↓
GitHub Actions workflow triggered
    ↓
Build environment setup (Ubuntu, Node 20)
    ↓
Dependencies installed (npm install)
    ↓
Deploy script execution (deploy.sh)
    ├─ Create temporary dist branch
    ├─ Build all locale versions (en, he, nl)
    ├─ Move builds to _dist directory
    ├─ Copy CNAME file (custom domain)
    ├─ Commit built files
    ├─ Create gh-pages branch from _dist
    ├─ Force push to gh-pages
    └─ Cleanup temporary branches
    ↓
GitHub Pages automatically publishes
    ↓
Site live at configured domain
```

## GitHub Actions Configuration

### Workflow File

Location: `.github/workflows/deploy.yml`

### Workflow Triggers

The deployment workflow runs on:

1. **Push to main branch**
   ```yaml
   push:
     branches: [ main ]
   ```

2. **Manual trigger**
   - Can be run manually from GitHub Actions tab
   ```yaml
   workflow_dispatch:
   ```

### Workflow Steps

#### 1. Checkout Code

```yaml
- uses: actions/checkout@v3
```

Checks out the repository code to the GitHub Actions runner.

#### 2. Setup Node.js

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '20'
```

Installs Node.js version 20 (LTS) for building the application.

#### 3. Install Dependencies

```yaml
- name: requirements
  run: npm install
```

Installs all npm dependencies from `package.json`.

#### 4. Configure Git Identity

```yaml
- name: git identity
  run: |
    git config user.email "adam.kariv@gmail.com"
    git config user.name "Adam Kariv"
```

Sets Git identity for commits during deployment.

#### 5. Build and Deploy

```yaml
- name: build and deploy
  run: ./deploy.sh
```

Executes the deployment script.

## Deployment Script

### Script Location

`deploy.sh` (project root)

### Script Breakdown

#### 1. Switch to Main Branch

```bash
git checkout main
```

Ensures deployment starts from the main branch.

#### 2. Create Distribution Branch

```bash
(git branch -D dist || true) && \
git checkout -b dist
```

Creates a temporary `dist` branch for build artifacts. Deletes existing branch if present.

#### 3. Remove .gitignore

```bash
rm .gitignore
```

Removes `.gitignore` to allow committing built files (normally ignored in development).

#### 4. Build Application

```bash
npm run build:app
```

Runs production build which:
- Compiles TypeScript to JavaScript
- Optimizes bundles (minification, tree-shaking)
- Generates three locale-specific builds (en, he, nl)
- Outputs to `dist/app/browser/{locale}/`
- Creates both browser and SSR bundles

Build configuration from `package.json`:
```json
"build:app": "ng build app --base-href=/"
```

#### 5. Organize Build Output

```bash
mv dist/app/browser/en _dist && \
mv dist/app/browser/he _dist && \
mv dist/app/browser/nl _dist
```

Moves locale builds to `_dist` directory with structure:
```
_dist/
├── en/     # English version
├── he/     # Hebrew version
└── nl/     # Dutch version
```

#### 6. Copy Custom Domain Configuration

```bash
(cp CNAME _dist/ || true)
```

Copies CNAME file if it exists (for custom domain configuration on GitHub Pages).

#### 7. Commit Build Artifacts

```bash
git add _dist && \
git commit -m dist
```

Commits all built files to the dist branch.

#### 8. Create GitHub Pages Branch

```bash
(git branch -D gh-pages || true) && \
git subtree split --prefix _dist -b gh-pages
```

Creates `gh-pages` branch containing only the `_dist` directory contents at root level.

#### 9. Push to GitHub

```bash
git push -f origin gh-pages:gh-pages
```

Force pushes the gh-pages branch to GitHub, triggering GitHub Pages deployment.

#### 10. Cleanup

```bash
git checkout main && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout .
```

Returns to main branch and removes temporary branches.

#### 11. Sync Main Branch

```bash
git push
```

Ensures main branch is synced (in case of any changes).

## Manual Deployment

### Prerequisites

- Write access to the repository
- Git configured locally
- Node.js 20+ installed
- All dependencies installed (`npm install`)

### Run Manual Deployment

From the project root:

```bash
./deploy.sh
```

This executes the same deployment process as CI/CD.

### Deploy from Different Branch

If you need to deploy from a branch other than main:

```bash
# Switch to your branch
git checkout my-feature-branch

# Modify deploy.sh temporarily to skip main checkout
# Or manually run build steps:
npm run build:app
# ... follow remaining steps from deploy.sh
```

**Warning:** Manual deployments outside the standard workflow should be avoided. Always merge to main and let CI/CD handle deployment when possible.

## Build Configuration

### Angular Build Settings

Location: `angular.json`

### Build Targets

The project has multiple build targets configured:

#### App Target (Main Application)

```json
"app": {
  "architect": {
    "build": {
      "configurations": {
        "production": {
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "budgets": [...]
        }
      }
    }
  }
}
```

#### Localization

All three locales are built simultaneously:

```json
"localize": ["en", "he", "nl"]
```

Each locale gets its own output directory:
- `dist/app/browser/en/`
- `dist/app/browser/he/`
- `dist/app/browser/nl/`

### Build Budgets

Size limits configured to prevent bundle bloat:

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "1.5mb",
    "maximumError": "2mb"
  }
]
```

- **Warning threshold:** 1.5 MB
- **Error threshold:** 2 MB
- Build fails if bundles exceed error threshold

### Optimization Features

Production builds enable:

- **AOT Compilation** - Ahead-of-time compilation for faster runtime
- **Tree Shaking** - Remove unused code
- **Minification** - Compress JavaScript and CSS
- **Bundle Optimization** - Optimal code splitting
- **Output Hashing** - Cache busting with content hashes
- **License Extraction** - Extract third-party licenses

## GitHub Pages Configuration

### Custom Domain

If using a custom domain, ensure CNAME file exists in project root:

```
# CNAME file content
your-custom-domain.com
```

The deploy script automatically copies this to the deployed site.

### Pages Settings

GitHub Pages settings (Repository → Settings → Pages):

- **Source:** Deploy from branch
- **Branch:** gh-pages
- **Folder:** / (root)

### HTTPS

GitHub Pages provides free HTTPS via Let's Encrypt. Ensure "Enforce HTTPS" is enabled in repository settings.

## Environment Management

### Environment Variables

The project currently doesn't use traditional environment files. Configuration is managed through:

1. **Build-time constants** - Defined in TypeScript code
2. **Workspace configuration** - API endpoints and settings fetched at runtime
3. **Firebase configuration** - Managed through @angular/fire

### Adding Environment Configuration

If needed, create environment files:

```typescript
// projects/app/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};

// projects/app/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
```

Update `angular.json` to use file replacements:

```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "projects/app/src/environments/environment.ts",
        "with": "projects/app/src/environments/environment.prod.ts"
      }
    ]
  }
}
```

## Monitoring and Logging

### Error Tracking

The application includes Sentry integration for error tracking:

Location: `projects/app/src/app/app.config.ts`

```typescript
import * as Sentry from '@sentry/angular';

// Sentry initialization (currently disabled)
// Uncomment and configure when ready
```

To enable Sentry:

1. Create a Sentry project at https://sentry.io
2. Get your DSN (Data Source Name)
3. Update app.config.ts with configuration:
   ```typescript
   Sentry.init({
     dsn: 'YOUR_SENTRY_DSN',
     environment: 'production',
     tracesSampleRate: 1.0
   });
   ```

### Build Logs

GitHub Actions logs are available at:
```
https://github.com/whiletrue-industries/future-screenshots/actions
```

Each workflow run shows:
- Build output
- Test results (if running)
- Deployment status
- Error messages

### Deployment Status

Check deployment status:

1. **GitHub Actions tab** - Shows workflow runs
2. **Deployments** - Repository deployments page
3. **GitHub Pages settings** - Shows current deployment status

## Rollback Procedures

### Rollback to Previous Version

GitHub Pages deployment history is available through git history:

#### Option 1: Revert Main Branch

```bash
# Find the commit to rollback to
git log

# Revert to specific commit
git revert <commit-hash>

# Push to trigger redeployment
git push origin main
```

#### Option 2: Force Deploy Previous Build

```bash
# Checkout previous gh-pages state
git checkout gh-pages
git reset --hard <previous-commit-hash>

# Force push
git push -f origin gh-pages

# Return to main
git checkout main
```

#### Option 3: Manual Redeploy

```bash
# Checkout old code version
git checkout <old-commit-hash>

# Run deployment
./deploy.sh

# Return to latest
git checkout main
```

## Troubleshooting

### Deployment Failures

#### Build Fails

Check GitHub Actions logs for:
- TypeScript compilation errors
- Missing dependencies
- Test failures (if enabled)
- Bundle size exceeding budgets

**Solution:** Fix errors locally, test with `npm run build`, then push to main.

#### Deploy Script Fails

Common issues:
- Git conflicts
- Permission issues
- Missing CNAME file (non-critical)

**Solution:** Check logs, run `./deploy.sh` locally to debug.

#### GitHub Pages Not Updating

1. Check GitHub Actions completed successfully
2. Verify gh-pages branch updated
3. Check GitHub Pages settings
4. Clear browser cache
5. Wait a few minutes (Pages can take 1-5 minutes to update)

### Build Performance

#### Slow Builds

If builds are slow:

1. **Check bundle sizes** - Use `ng build --stats-json` and analyze
2. **Reduce dependencies** - Remove unused packages
3. **Optimize images** - Compress assets
4. **Use build cache** - GitHub Actions caches node_modules

#### Out of Memory

If builds fail with memory errors:

Update `.github/workflows/deploy.yml`:

```yaml
- name: build and deploy
  run: |
    export NODE_OPTIONS=--max-old-space-size=4096
    ./deploy.sh
```

## Backend Deployment

### Backend Repository

Backend code is in a separate repository:
https://github.com/whiletrue-industries/chronomaps-server

### Backend Stack

- **Platform:** Google Cloud Functions
- **Language:** Python
- **Database:** Firestore
- **Authentication:** Firebase Auth

### Backend Deployment

Backend deployment is managed separately. Refer to the backend repository's documentation for deployment procedures.

### Frontend-Backend Coordination

When deploying changes that affect both frontend and backend:

1. Deploy backend changes first
2. Verify backend is working
3. Deploy frontend changes
4. Test integration

## Security Considerations

### Secrets Management

**Important:** Never commit sensitive data:
- API keys
- Firebase credentials
- Authentication tokens
- Private keys

Use GitHub Secrets for sensitive values in Actions:

```yaml
- name: deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: ./deploy.sh
```

### Access Control

- **Repository access:** Limit write access to main branch
- **GitHub Actions:** Use minimal required permissions
- **Deployment keys:** Rotate regularly

### Security Scanning

Consider adding to CI/CD:
- Dependency vulnerability scanning (npm audit)
- Code security analysis
- HTTPS enforcement checks

## Performance Optimization

### CDN and Caching

GitHub Pages provides:
- Global CDN distribution
- Automatic caching headers
- HTTPS support

### Build Optimization

To improve build performance:

1. **Differential loading** - Separate bundles for modern/legacy browsers
2. **Lazy loading** - Route-based code splitting
3. **Prerendering** - SSR for faster initial load
4. **Asset optimization** - Image compression, font subsetting

### Monitoring Performance

Use tools to monitor:
- Google Lighthouse scores
- Core Web Vitals
- Bundle size trends
- Build time metrics

## Continuous Integration Best Practices

### Branch Protection

Configure on main branch:
- Require pull request reviews
- Require status checks to pass
- Prevent force pushes
- Restrict who can push

### Automated Checks

Consider adding to workflow:

```yaml
- name: Lint
  run: npm run lint

- name: Test
  run: npm run test -- --watch=false --browsers=ChromeHeadless

- name: Security Audit
  run: npm audit --production
```

### Quality Gates

Set up quality requirements:
- All tests must pass
- No linting errors
- Bundle sizes within budgets
- Accessibility checks pass

## Deployment Checklist

Before deploying major changes:

- [ ] All tests pass locally
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Bundle sizes checked
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Breaking changes communicated
- [ ] Rollback plan ready

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DEVELOPMENT_ENV.md](./DEVELOPMENT_ENV.md) - Local development setup
- [TESTING.md](./TESTING.md) - Testing procedures
- Backend repository: https://github.com/whiletrue-industries/chronomaps-server

## Support and Contact

For deployment issues:
1. Check GitHub Actions logs
2. Review this documentation
3. Check GitHub Issues
4. Contact project maintainers

## Changelog

Deployment configuration changes should be documented:
- Date of change
- What was changed
- Why it was changed
- Impact on deployment process
