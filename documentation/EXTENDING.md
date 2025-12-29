# Extending the Platform

This guide explains how to extend the Future Screenshots platform with new features, components, and modules.

## Overview

Future Screenshots is built with extensibility in mind, using Angular's modular architecture and standalone components. This document covers common extension scenarios and best practices for adding new functionality.

## Before You Start

Before extending the platform:

1. **Read the documentation:**
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the system
   - [CODING_STANDARDS.md](./CODING_STANDARDS.md) - Follow conventions
   - [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Match the design

2. **Check existing code** - Look for similar features to use as templates

3. **Create an issue** - Document what you plan to build

4. **Plan first** - Use the workflow in CLAUDE.md to create an implementation plan

## Adding New Components

### 1. Generate Component

Use Angular CLI to generate new components:

```bash
# Generate component in specific directory
ng generate component app/my-feature

# Or using shorthand
ng g c app/my-feature
```

This creates:
```
app/my-feature/
├── my-feature.component.ts
├── my-feature.component.html
├── my-feature.component.less
```

### 2. Component Structure

Follow the standard component pattern:

```typescript
import { Component, ChangeDetectionStrategy, signal, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-feature',
  imports: [CommonModule],
  templateUrl: './my-feature.component.html',
  styleUrls: ['./my-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.my-feature]': 'true'
  }
})
export class MyFeatureComponent {
  // Inputs using input() function
  title = input.required<string>();
  subtitle = input<string>('');

  // Outputs using output() function
  featureAction = output<string>();

  // State using signals
  isActive = signal(false);
  count = signal(0);

  // Computed values
  displayText = computed(() => {
    return `${this.title()} - ${this.count()}`;
  });

  // Methods
  handleAction() {
    this.featureAction.emit('action-data');
  }
}
```

### 3. Component Styling

Create component styles in `my-feature.component.less`:

```less
@import '../../common.less';

.my-feature {
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: 16px;
    background: @color-creme;
    padding: 24px;

    &__header {
        font-size: 24px;
        font-weight: 700;
        color: @color-primary;
    }

    &__content {
        font-size: 18px;
    }
}
```

### 4. Component Template

```html
<div class="my-feature">
    <div class="my-feature__header">
        {{ title() }}
        @if (subtitle()) {
            <span class="my-feature__subtitle">{{ subtitle() }}</span>
        }
    </div>

    <div class="my-feature__content">
        <button class="button primary" (click)="handleAction()">
            Action
        </button>
    </div>
</div>
```

## Adding New Routes

### 1. Create Route Component

Generate a new component for the route:

```bash
ng g c app/my-route
```

### 2. Add to Router Configuration

Update `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { MyRouteComponent } from './my-route/my-route.component';

export const routes: Routes = [
  {
    path: 'my-route',
    loadComponent: () => import('./my-route/my-route.component')
      .then(m => m.MyRouteComponent)
  },
  // With route parameters
  {
    path: 'my-route/:id',
    loadComponent: () => import('./my-route/my-route.component')
      .then(m => m.MyRouteComponent)
  },
  // Existing routes...
];
```

### 3. Add Navigation

Add navigation to the route in your templates:

```html
<!-- Router link -->
<a [routerLink]="['/my-route']">My Route</a>

<!-- Programmatic navigation -->
<button (click)="navigateToRoute()">Go</button>
```

In component:
```typescript
import { Router } from '@angular/router';

export class MyComponent {
  private router = inject(Router);

  navigateToRoute() {
    this.router.navigate(['/my-route']);
  }

  navigateWithParams() {
    this.router.navigate(['/my-route', '123']);
  }
}
```

### 4. Access Route Parameters

```typescript
import { ActivatedRoute } from '@angular/core';

export class MyRouteComponent {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // Get route parameter
    const id = this.route.snapshot.paramMap.get('id');

    // Or subscribe to parameter changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
    });

    // Get query parameters
    const workspace = this.route.snapshot.queryParamMap.get('workspace');
  }
}
```

## Adding New Services

### 1. Generate Service

```bash
ng generate service services/my-service

# Or
ng g s services/my-service
```

### 2. Service Structure

```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Singleton service
})
export class MyService {
  // Dependencies using inject()
  private http = inject(HttpClient);

  // Service state using signals
  private data = signal<any[]>([]);

  // Public read-only access
  readonly data$ = this.data.asReadonly();

  // Methods
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>('/api/data');
  }

  updateData(newData: any[]) {
    this.data.set(newData);
  }
}
```

### 3. Use Service in Components

```typescript
import { MyService } from '../services/my-service';

export class MyComponent {
  private myService = inject(MyService);

  ngOnInit() {
    this.myService.fetchData().subscribe(data => {
      console.log(data);
    });
  }
}
```

## Extending the API

### 1. Add New API Endpoints

The backend is in a separate repository: https://github.com/whiletrue-industries/chronomaps-server

To add new API endpoints:

1. **Backend (Python/Cloud Functions):**
   - Add new Cloud Function in backend repo
   - Define request/response schemas
   - Deploy to Google Cloud Functions

2. **Frontend (ApiService):**
   - Add method to `ApiService`

Example addition to `api.service.ts`:

```typescript
export class ApiService {
  private http = inject(HttpClient);

  // Add new method
  getCustomData(workspaceId: string, apiKey: string): Observable<CustomData[]> {
    const params = new HttpParams()
      .set('workspace', workspaceId)
      .set('api_key', apiKey);

    return this.http.get<CustomData[]>('/api/custom-data', { params });
  }

  postCustomData(data: CustomData, workspaceId: string, apiKey: string): Observable<CustomData> {
    const params = new HttpParams()
      .set('workspace', workspaceId)
      .set('api_key', apiKey);

    return this.http.post<CustomData>('/api/custom-data', data, { params });
  }
}
```

### 2. Define Data Models

Create TypeScript interfaces for API data:

```typescript
// models/custom-data.ts
export interface CustomData {
  id: string;
  workspace_id: string;
  name: string;
  value: number;
  created_at: number;
  metadata?: Record<string, any>;
}
```

## Adding New Showcases

Showcases are public-facing visualizations of workspace data.

### 1. Create Showcase Component

```bash
ng g c app/showcase/my-showcase
```

### 2. Lightbox with Chat Feature

The platform includes a lightbox component with integrated chat functionality for discussing items in showcase views. This feature allows users to click on any photo in a showcase to:

- View it in full screen
- Open a chat sidebar to discuss and analyze the item
- Receive AI-powered insights about the image
- Use pre-baked conversation options
- Approve metadata changes

#### Using the Lightbox

The lightbox is integrated into the showcase-ws component:

```typescript
import { LightboxService } from './lightbox.service';
import { ThreeRendererService } from './three-renderer.service';

export class ShowcaseComponent {
  private lightboxService = inject(LightboxService);
  private rendererService = inject(ThreeRendererService);

  ngOnInit() {
    // Set up photo click handler
    this.rendererService.setPhotoClickCallback((photoId: string, photoData: PhotoData) => {
      this.lightboxService.openLightbox(photoData.metadata);
    });
  }
}
```

#### Lightbox Service API

```typescript
// Open lightbox with photo
lightboxService.openLightbox(photoMetadata: PhotoMetadata);

// Close lightbox
lightboxService.closeLightbox();

// Toggle chat sidebar
lightboxService.toggleChat();

// Update photo metadata
lightboxService.updatePhotoMetadata(metadata: Partial<PhotoMetadata>);
```

#### Customizing the Chat

The chat component supports:
- Initial AI analysis display
- Pre-baked response options
- Metadata change approval workflow
- Backup creation for previous content

To customize pre-baked options:

```typescript
export class LightboxChatComponent {
  prebakedOptions: PrebakedOption[] = [
    {
      id: 'custom-option',
      label: 'Your Label',
      prompt: 'The full prompt text to send'
    }
  ];
}
```

### 3. Add Showcase Route

```typescript
// app.routes.ts
{
  path: 'showcase/my-showcase',
  loadComponent: () => import('./showcase/my-showcase/my-showcase.component')
    .then(m => m.MyShowcaseComponent)
}
```

### 3. Use ShowcaseApiService

```typescript
import { ShowcaseApiService } from '../showcase-api.service';

export class MyShowcaseComponent {
  private showcaseApi = inject(ShowcaseApiService);
  items = signal<any[]>([]);

  async ngOnInit() {
    const workspaceId = this.route.snapshot.queryParamMap.get('workspace');

    if (workspaceId) {
      const data = await this.showcaseApi.getItems(workspaceId);
      this.items.set(data);
    }
  }
}
```

### 4. Visualize Data

Choose visualization approach:

**2D Map (Leaflet):**
```typescript
import { LeafletService } from '../leaflet.service';

export class MyShowcaseComponent {
  private leaflet = inject(LeafletService);

  initMap() {
    const map = this.leaflet.createMap('map-container');
    this.items().forEach(item => {
      this.leaflet.addMarker(map, item.location, item.name);
    });
  }
}
```

**3D Scene (Three.js):**
```typescript
import * as THREE from 'three';

export class MyShowcaseComponent {
  initScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    const renderer = new THREE.WebGLRenderer();

    // Add objects, lighting, etc.
  }
}
```

**Custom Visualization:**
```html
<div class="showcase-grid">
  @for (item of items(); track item.id) {
    <div class="showcase-item">
      <img [src]="item.image_url" [alt]="item.name">
      <p>{{ item.name }}</p>
    </div>
  }
</div>
```

## Adding Custom Fields to Workspaces

Workspaces can have custom fields for collecting additional data.

### 1. Define Custom Fields (Backend)

In workspace configuration:

```typescript
interface WorkspaceConfig {
  custom_fields: Array<{
    name: string;
    type: 'text' | 'number' | 'select' | 'multiselect';
    label: string;
    required: boolean;
    options?: string[];  // For select/multiselect
    placeholder?: string;
  }>;
}
```

### 2. Render Custom Fields (Frontend)

In `collect-properties` component:

```html
@for (field of workspace().custom_fields; track field.name) {
  <div class="form-field">
    <label>{{ field.label }}</label>

    @if (field.type === 'text') {
      <input
        type="text"
        [name]="field.name"
        [required]="field.required"
        [placeholder]="field.placeholder">
    }

    @if (field.type === 'select') {
      <select [name]="field.name" [required]="field.required">
        @for (option of field.options; track option) {
          <option [value]="option">{{ option }}</option>
        }
      </select>
    }
  </div>
}
```

### 3. Submit Custom Field Data

```typescript
export class CollectPropertiesComponent {
  submitForm() {
    const formData = {
      image_url: this.imageUrl(),
      location: this.selectedLocation(),
      properties: this.customFieldValues()  // Custom field values
    };

    this.api.createItem(formData, this.workspaceId(), this.apiKey());
  }
}
```

## Extending the Scanner

### 1. Add Pre-Processing Steps

Modify `scanner.component.ts`:

```typescript
export class ScannerComponent {
  async captureImage() {
    const imageData = this.getImageFromCamera();

    // Add custom pre-processing
    const enhanced = await this.enhanceImage(imageData);
    const filtered = await this.applyFilter(enhanced);

    this.state.setImage(filtered);
    this.router.navigate(['/confirm']);
  }

  private async enhanceImage(imageData: string): Promise<string> {
    // Custom enhancement logic
    return imageData;
  }
}
```

### 2. Add Custom Scanning Modes

```typescript
export class ScannerComponent {
  scanMode = signal<'document' | 'photo' | 'qr'>('document');

  switchMode(mode: 'document' | 'photo' | 'qr') {
    this.scanMode.set(mode);
    this.reinitializeScanner();
  }

  private reinitializeScanner() {
    if (this.scanMode() === 'qr') {
      // Initialize QR scanner
    } else if (this.scanMode() === 'document') {
      // Initialize document scanner
    }
  }
}
```

## Adding Internationalization

### 1. Add New Language

1. **Add locale to Angular configuration** (`angular.json`):

```json
{
  "i18n": {
    "locales": {
      "en": "projects/app/src/locale/messages.en.json",
      "he": "projects/app/src/locale/messages.he.json",
      "nl": "projects/app/src/locale/messages.nl.json",
      "fr": "projects/app/src/locale/messages.fr.json"  // Add new
    }
  }
}
```

2. **Create translation file:**

```bash
cp projects/app/src/locale/messages.en.json projects/app/src/locale/messages.fr.json
```

3. **Translate strings** in the new file

4. **Add font support** (if needed) in `public/fonts/`

### 2. Mark Strings for Translation

```html
<!-- Template -->
<h1 i18n="@@welcomeMessage">Welcome</h1>
<p i18n="@@description">Description text</p>

<!-- With description and meaning -->
<button i18n="Button label|Submit form button@@submitButton">Submit</button>
```

### 3. Extract and Update Translations

```bash
ng extract-i18n
```

This updates all locale files with new translation keys.

## Adding Analytics/Tracking

### 1. Create Analytics Service

```bash
ng g s services/analytics
```

```typescript
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackEvent(category: string, action: string, label?: string, value?: number) {
    // Send to analytics platform
    console.log('Event:', { category, action, label, value });
  }

  trackPageView(path: string) {
    console.log('Page view:', path);
  }
}
```

### 2. Track Events

```typescript
export class MyComponent {
  private analytics = inject(AnalyticsService);

  handleAction() {
    this.analytics.trackEvent('User', 'Click', 'Submit Button');
  }
}
```

### 3. Track Route Changes

```typescript
// app.component.ts
export class AppComponent {
  private router = inject(Router);
  private analytics = inject(AnalyticsService);

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analytics.trackPageView(event.urlAfterRedirects);
      }
    });
  }
}
```

## Adding Authentication

### 1. Create Auth Guard

```bash
ng g guard guards/auth
```

```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
```

### 2. Apply Guard to Routes

```typescript
// app.routes.ts
{
  path: 'admin',
  canActivate: [authGuard],
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
}
```

## Custom Directives

### 1. Create Directive

```bash
ng g directive directives/auto-focus
```

```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 100);
  }
}
```

### 2. Use Directive

```html
<input appAutoFocus type="text">
```

## Custom Pipes

### 1. Create Pipe

```bash
ng g pipe pipes/time-ago
```

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: number): string {
    const seconds = Math.floor((Date.now() - value) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }
}
```

### 2. Use Pipe

```html
<p>Posted {{ item.created_at | timeAgo }}</p>
```

## Testing Extensions

When adding new features, include tests:

```typescript
describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;
  let fixture: ComponentFixture<MyFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeatureComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on action', () => {
    let emittedValue: string | undefined;
    component.featureAction.subscribe(value => {
      emittedValue = value;
    });

    component.handleAction();

    expect(emittedValue).toBe('action-data');
  });
});
```

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines.

## Performance Considerations

When extending the platform:

### 1. Lazy Loading

Always use lazy loading for routes:

```typescript
// ✅ GOOD: Lazy loaded
{
  path: 'feature',
  loadComponent: () => import('./feature/feature.component')
}

// ❌ BAD: Eagerly loaded
import { FeatureComponent } from './feature/feature.component';
{
  path: 'feature',
  component: FeatureComponent
}
```

### 2. OnPush Change Detection

Always use OnPush:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 3. Signals Over RxJS

Prefer signals for state:

```typescript
// ✅ GOOD: Using signals
count = signal(0);
doubleCount = computed(() => this.count() * 2);

// ❌ Avoid when signals can do the job
count$ = new BehaviorSubject(0);
doubleCount$ = this.count$.pipe(map(c => c * 2));
```

### 4. Track By Functions

Always use track with @for:

```typescript
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

## Best Practices Checklist

When extending the platform, ensure:

- [ ] Code follows [CODING_STANDARDS.md](./CODING_STANDARDS.md)
- [ ] Styles follow [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [ ] Component uses OnPush change detection
- [ ] Signals used for reactive state
- [ ] Routes are lazy loaded
- [ ] Tests are included
- [ ] Accessibility requirements met (WCAG AA)
- [ ] Documentation updated
- [ ] Multi-language support considered
- [ ] Mobile-first design maintained
- [ ] Performance optimizations applied

## Getting Help

- Review existing similar features in the codebase
- Check [Angular documentation](https://angular.dev)
- Ask in project issues or discussions
- Refer to other documentation files in `/documentation`

## Contributing

Follow the workflow in `CLAUDE.md`:

1. Create or find an issue
2. Write implementation plan
3. Get user approval
4. Create feature branch
5. Implement with tests
6. Create pull request
7. Address review feedback
8. Merge when approved

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [CODING_STANDARDS.md](./CODING_STANDARDS.md) - Code quality
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design guidelines
- [TESTING.md](./TESTING.md) - Testing strategies
- [DEVELOPMENT_ENV.md](./DEVELOPMENT_ENV.md) - Setup guide
