# Coding Standards and Best Practices

This document outlines the coding standards and best practices for the Future Screenshots project. All contributors must follow these guidelines to maintain code quality, consistency, and maintainability.

## General Principles

### Code Quality Philosophy

- **Functional and Maintainable:** Write code that is easy to understand, modify, and extend
- **Performance-Conscious:** Optimize for both runtime performance and bundle size
- **Accessible:** All features must meet WCAG AA accessibility standards
- **Type-Safe:** Leverage TypeScript's type system to catch errors at compile time
- **Avoid Over-Engineering:** Keep solutions simple and focused on current requirements

### Avoid Over-Engineering

Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused:

- **Don't add unrequested features** - A bug fix doesn't need surrounding code cleaned up
- **Don't add extra configurability** - Simple features don't need complex configuration systems
- **Don't add documentation unless it's complex** - Don't add docstrings, comments, or type annotations to code you didn't change
- **Only add comments where logic isn't self-evident** - Code should be self-documenting when possible
- **Don't add error handling for impossible scenarios** - Trust internal code and framework guarantees
- **Only validate at system boundaries** - User input and external APIs need validation; internal code doesn't
- **Don't use feature flags for simple changes** - Just change the code directly
- **Don't create utilities for one-time operations** - Three similar lines of code is better than a premature abstraction
- **Don't design for hypothetical future requirements** - Implement only what's needed now

### Backwards Compatibility

- Avoid backwards-compatibility hacks like:
  - Renaming unused variables with `_` prefix
  - Re-exporting types that are no longer used
  - Adding `// removed` comments for deleted code
- **If something is unused, delete it completely**

## TypeScript Standards

### Type Safety

```typescript
// ✅ GOOD: Use strict type checking
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // implementation
}

// ✅ GOOD: Type inference when obvious
const userName = getUser('123').name; // string is inferred

// ❌ BAD: Using 'any' type
function processData(data: any) { // Don't do this
  return data.value;
}

// ✅ GOOD: Use 'unknown' when type is uncertain
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return data.value;
  }
}
```

### TypeScript Configuration

- Strict mode enabled in `tsconfig.json`
- ES2022 target
- Experimental decorators enabled
- Strict null checks
- No implicit any
- No unused locals/parameters (enforced)

## Angular Standards

### Component Architecture

#### Standalone Components

```typescript
// ✅ GOOD: Standalone component (default in Angular 19+)
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do NOT set standalone: true - it's the default
})
export class ExampleComponent {
  // implementation
}

// ❌ BAD: Using NgModules
@NgModule({ ... }) // Don't use modules
```

#### Component Properties

```typescript
// ✅ GOOD: Use input() and output() functions
import { Component, input, output } from '@angular/core';

@Component({ ... })
export class ExampleComponent {
  // Input
  userName = input.required<string>();
  userId = input<string>(''); // with default

  // Output
  userClick = output<string>();

  handleClick() {
    this.userClick.emit(this.userId());
  }
}

// ❌ BAD: Using decorators
@Input() userName!: string; // Don't use decorators
@Output() userClick = new EventEmitter<string>();
```

#### Host Bindings

```typescript
// ✅ GOOD: Use host object
@Component({
  selector: 'app-example',
  host: {
    '[class.active]': 'isActive()',
    '(click)': 'handleClick()',
    '[attr.aria-label]': 'ariaLabel()',
  }
})
export class ExampleComponent {
  isActive = signal(false);
  ariaLabel = signal('Example component');
}

// ❌ BAD: Using @HostBinding and @HostListener
@HostBinding('class.active') isActive = false; // Don't use
@HostListener('click') handleClick() { } // Don't use
```

#### Change Detection

```typescript
// ✅ GOOD: Always use OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

#### Template and Style Paths

```typescript
// ✅ GOOD: Relative paths for external templates/styles
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.less']
})

// ✅ GOOD: Inline templates for small components
@Component({
  selector: 'app-small',
  template: `<div>{{ message() }}</div>`,
  styles: [`div { color: blue; }`]
})
```

### State Management

#### Signals

```typescript
// ✅ GOOD: Use signals for component state
import { Component, signal, computed } from '@angular/core';

@Component({ ... })
export class ExampleComponent {
  // Writable signal
  count = signal(0);

  // Computed signal (derived state)
  doubleCount = computed(() => this.count() * 2);

  // Update signal
  increment() {
    this.count.update(c => c + 1); // ✅ GOOD
    // or
    this.count.set(5); // ✅ GOOD for setting directly
  }

  // ❌ BAD: Don't use mutate
  badUpdate() {
    this.count.mutate(c => c++); // Don't use mutate
  }
}
```

#### Pure State Transformations

```typescript
// ✅ GOOD: Keep state transformations pure
items = signal<Item[]>([]);

addItem(item: Item) {
  this.items.update(current => [...current, item]); // Pure - creates new array
}

// ❌ BAD: Mutating state
addItemBad(item: Item) {
  this.items().push(item); // Don't mutate
}
```

### Templates

#### Control Flow

```typescript
// ✅ GOOD: Use native control flow
@if (user()) {
  <div>{{ user().name }}</div>
} @else {
  <div>No user</div>
}

@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}

@switch (status()) {
  @case ('loading') { <div>Loading...</div> }
  @case ('error') { <div>Error!</div> }
  @default { <div>Ready</div> }
}

// ❌ BAD: Using structural directives
<div *ngIf="user()">{{ user().name }}</div> // Don't use
<div *ngFor="let item of items()">{{ item.name }}</div> // Don't use
```

#### Class and Style Bindings

```typescript
// ✅ GOOD: Use binding syntax
<div [class.active]="isActive()"
     [class.disabled]="isDisabled()">
</div>

<div [style.color]="textColor()"
     [style.font-size.px]="fontSize()">
</div>

// ❌ BAD: Using ngClass and ngStyle
<div [ngClass]="{'active': isActive()}"> // Don't use
<div [ngStyle]="{'color': textColor()}"> // Don't use
```

#### Template Expressions

```typescript
// ✅ GOOD: Simple expressions, no functions
<div>{{ userName() }}</div>
<div>{{ user().fullName }}</div>

// ❌ BAD: Arrow functions in templates
<button (click)="() => doSomething()"> // Not supported

// ❌ BAD: Globals like Date in templates
<div>{{ new Date() }}</div> // 'Date' not available in template

// ✅ GOOD: Define in component
@Component({ ... })
export class ExampleComponent {
  currentDate = signal(new Date());
}

// Template
<div>{{ currentDate() }}</div>
```

#### Async Pipe

```typescript
// ✅ GOOD: Use async pipe for observables
<div>{{ userData$ | async }}</div>

@for (item of items$ | async; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Services

#### Service Design

```typescript
// ✅ GOOD: Single responsibility, providedIn root
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Singleton service
})
export class UserService {
  // Use inject() function
  private http = inject(HttpClient);

  getUser(id: string) {
    return this.http.get(`/api/users/${id}`);
  }
}

// ❌ BAD: Constructor injection
export class UserService {
  constructor(private http: HttpClient) { } // Don't use constructor injection
}
```

#### Service Categories

- **API Services:** Backend communication (ApiService, ShowcaseApiService, AdminApiService)
- **State Services:** Global state management (StateService, AuthService)
- **Utility Services:** Platform detection, helpers (PlatformService)
- **Feature Services:** Domain-specific logic (LeafletService, ThreeRendererService)

### Dependency Injection

```typescript
// ✅ GOOD: Use inject() function
import { Component, inject } from '@angular/core';
import { ApiService } from './api.service';

@Component({ ... })
export class ExampleComponent {
  private api = inject(ApiService);
  private router = inject(Router);
}

// ❌ BAD: Constructor injection
constructor(private api: ApiService) { } // Don't use
```

### Routing and Lazy Loading

```typescript
// ✅ GOOD: Lazy load feature routes
const routes: Routes = [
  {
    path: 'showcase',
    loadComponent: () => import('./showcase/showcase.component')
      .then(m => m.ShowcaseComponent)
  }
];
```

## Accessibility Standards

### WCAG AA Requirements

All components and features MUST:

- Pass all AXE accessibility checks
- Meet WCAG AA minimum standards
- Include proper focus management
- Maintain sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Include appropriate ARIA attributes

### Focus Management

```typescript
// ✅ GOOD: Manage focus for dynamic content
@Component({
  host: {
    '[attr.role]': '"dialog"',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': '"dialog-title"'
  }
})
export class DialogComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
```

### Semantic HTML

```html
<!-- ✅ GOOD: Semantic HTML -->
<nav aria-label="Main navigation">
  <button type="button" aria-expanded="false">Menu</button>
</nav>

<main>
  <h1>Page Title</h1>
  <article>Content</article>
</main>

<!-- ❌ BAD: Div soup -->
<div class="nav">
  <div class="button">Menu</div>
</div>
```

### Images

```typescript
// ✅ GOOD: Use NgOptimizedImage for static images
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage]
})

// Template
<img ngSrc="/assets/logo.png"
     alt="Future Screenshots Logo"
     width="200"
     height="100">

// ❌ BAD: NgOptimizedImage with inline base64
<img ngSrc="data:image/png;base64,..." /> // Doesn't work

// ✅ GOOD: Regular img for base64
<img [src]="base64Image" alt="Scanned document">
```

## Forms

### Reactive Forms

```typescript
// ✅ GOOD: Use Reactive Forms
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule]
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}

// ❌ BAD: Template-driven forms
// Avoid using [(ngModel)] - use Reactive Forms instead
```

## Testing Standards

### Unit Testing

```typescript
// ✅ GOOD: Test component behavior
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });
});
```

### Test Coverage

While tests are currently minimal in this project (skipTests: true in schematics), new features should include:

- Unit tests for complex business logic
- Integration tests for critical user flows
- Accessibility tests using AXE

See [TESTING.md](./TESTING.md) for detailed testing guidelines.

## Code Organization

### File Structure

```
component-name/
├── component-name.component.ts      # Component logic
├── component-name.component.html    # Template (if external)
├── component-name.component.less    # Styles (if external)
└── component-name.component.spec.ts # Tests
```

### File Naming

- Component files: `kebab-case.component.ts`
- Service files: `kebab-case.service.ts`
- Directive files: `kebab-case.directive.ts`
- Pipe files: `kebab-case.pipe.ts`

### Import Organization

```typescript
// 1. Angular imports
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 2. Third-party imports
import { Observable } from 'rxjs';

// 3. Local imports
import { ApiService } from '../api.service';
import { User } from '../models/user';
```

## Performance Best Practices

### Change Detection Optimization

- Always use `OnPush` change detection
- Use signals for reactive state
- Avoid complex computations in templates
- Use `trackBy` functions with `@for`

```typescript
// ✅ GOOD: Track by function
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

### Bundle Size

- Lazy load routes
- Avoid importing entire libraries (use specific imports)
- Tree-shake unused code

```typescript
// ✅ GOOD: Specific imports
import { map } from 'rxjs/operators';

// ❌ BAD: Importing everything
import * as rxjs from 'rxjs'; // Don't do this
```

## Security Best Practices

### XSS Prevention

```typescript
// ✅ GOOD: Angular sanitizes automatically
<div>{{ userInput() }}</div>

// ⚠️ CAUTION: Only bypass sanitization if absolutely necessary
import { DomSanitizer } from '@angular/platform-browser';

sanitizer = inject(DomSanitizer);
safeHtml = this.sanitizer.sanitize(SecurityContext.HTML, untrustedHtml);
```

### API Security

- Never commit API keys or secrets
- Use environment variables for configuration
- Validate all user inputs
- Sanitize data before sending to backend

## Error Handling

### Component Error Handling

```typescript
// ✅ GOOD: Handle errors gracefully
export class ExampleComponent {
  error = signal<string | null>(null);
  loading = signal(false);

  async loadData() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await this.api.getData();
      this.data.set(data);
    } catch (err) {
      this.error.set('Failed to load data. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
```

## CLI Usage

### Generating Components

```bash
# ✅ GOOD: Use Angular CLI
ng generate component my-component
ng generate service my-service
ng generate directive my-directive

# Shortcuts
ng g c my-component
ng g s my-service
```

## Git Commit Standards

### Commit Messages

- Use clear, descriptive commit messages
- Focus on "why" rather than "what"
- Reference issue numbers when applicable

```
# ✅ GOOD
Add user authentication with Firebase
- Implement login/logout flow
- Add session persistence
- Integrate with AuthService

Fixes #42

# ❌ BAD
Updated files
Fixed stuff
```

### Commit Trailer

All commits must include the following trailer:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Documentation Standards

### Code Comments

- Only add comments where logic isn't self-evident
- Prefer self-documenting code
- Don't state the obvious

```typescript
// ❌ BAD: Obvious comment
// Set the user name
this.userName.set('John');

// ✅ GOOD: Explaining complex logic
// Calculate viewport-relative position accounting for scroll offset
// and element transformations to ensure accurate placement
const position = calculateAdjustedPosition(element, viewport);
```

### JSDoc

Use JSDoc for public APIs and complex functions:

```typescript
/**
 * Processes a scanned image using OpenCV document detection
 * and perspective correction.
 *
 * @param imageData - Base64 encoded image data
 * @param options - Processing options including quality and format
 * @returns Processed image as base64 string
 */
function processScannedImage(
  imageData: string,
  options: ProcessingOptions
): string {
  // implementation
}
```

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RxJS Documentation](https://rxjs.dev/)

## Enforcement

These standards are enforced through:

1. Code review process (see CLAUDE.md)
2. TypeScript strict mode
3. Build-time checks
4. Pull request templates
5. Automated checks (when configured)

For any questions or clarifications about these standards, consult the team or refer to the Angular 19 documentation.
