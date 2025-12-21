# Testing Documentation

This document outlines testing strategies, frameworks, guidelines, and best practices for the Future Screenshots project.

## Current Testing Status

**Important:** This project currently has minimal test coverage. The Angular schematics are configured with `skipTests: true`, meaning new components generated via CLI don't automatically include test files.

**Going Forward:** As the project matures, we aim to increase test coverage, especially for critical user flows and business logic.

## Testing Strategy

### Testing Pyramid

We follow the standard testing pyramid approach:

```
        ╱ ╲
       ╱ E2E╲         ← Few, high-value end-to-end tests
      ╱ Tests╲
     ├─────────┤
    ╱Integration╲     ← Moderate number of integration tests
   ╱    Tests    ╲
  ├───────────────┤
 ╱  Unit Tests    ╲   ← Many fast, focused unit tests
╱                  ╲
└──────────────────┘
```

#### Unit Tests (Base Layer)

- **Scope:** Individual components, services, pipes, directives
- **Purpose:** Verify isolated functionality
- **Coverage Goal:** 70%+ for business logic
- **Speed:** Very fast (milliseconds)

#### Integration Tests (Middle Layer)

- **Scope:** Multiple components/services working together
- **Purpose:** Verify interactions and data flow
- **Coverage Goal:** Critical user flows
- **Speed:** Moderate (seconds)

#### E2E Tests (Top Layer)

- **Scope:** Full application workflows
- **Purpose:** Verify user-facing functionality
- **Coverage Goal:** Core user journeys
- **Speed:** Slower (seconds to minutes)

## Testing Frameworks

### Unit and Integration Testing

**Framework:** Jasmine + Karma

- **Jasmine:** Testing framework (describe, it, expect)
- **Karma:** Test runner that launches browsers
- **Chrome:** Default browser for running tests

### Configuration Files

- **Karma config:** Configured in `angular.json`
- **TypeScript config:** `projects/app/tsconfig.spec.json`

### Jasmine Syntax

```typescript
describe('ComponentName', () => {
  // Test setup
  beforeEach(() => { });
  afterEach(() => { });

  // Test cases
  it('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

## Running Tests

### Run All Tests

```bash
npm test
```

This will:
- Start Karma test runner
- Launch Chrome browser
- Execute all `.spec.ts` files
- Watch for changes and re-run tests
- Display results in terminal and browser

### Run Tests Once (CI Mode)

```bash
ng test --watch=false --browsers=ChromeHeadless
```

Useful for:
- Continuous integration
- Pre-commit verification
- Quick validation

### Run Specific Test File

```bash
ng test --include='**/my-component.spec.ts'
```

### Generate Code Coverage

```bash
ng test --code-coverage --watch=false
```

Coverage report generated in `coverage/` directory.

View report:
```bash
open coverage/index.html
```

### Debug Tests

```bash
# Run with debugging enabled
ng test --browsers=Chrome --watch=true
```

Then click "DEBUG" button in the Karma browser window.

## Writing Unit Tests

### Component Testing

#### Basic Component Test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScannerComponent } from './scanner.component';

describe('ScannerComponent', () => {
  let component: ScannerComponent;
  let fixture: ComponentFixture<ScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### Testing Signals

```typescript
import { signal } from '@angular/core';

describe('SignalComponent', () => {
  it('should update signal value', () => {
    const count = signal(0);

    expect(count()).toBe(0);

    count.set(5);
    expect(count()).toBe(5);

    count.update(c => c + 1);
    expect(count()).toBe(6);
  });

  it('should compute derived values', () => {
    const count = signal(5);
    const doubled = computed(() => count() * 2);

    expect(doubled()).toBe(10);

    count.set(10);
    expect(doubled()).toBe(20);
  });
});
```

#### Testing Inputs and Outputs

```typescript
describe('UserCardComponent', () => {
  it('should accept input values', () => {
    const fixture = TestBed.createComponent(UserCardComponent);

    // Set input using fixture.componentRef
    fixture.componentRef.setInput('userName', 'John Doe');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('John Doe');
  });

  it('should emit output events', () => {
    const fixture = TestBed.createComponent(UserCardComponent);
    const component = fixture.componentInstance;

    let emittedValue: string | undefined;
    component.userClick.subscribe((value: string) => {
      emittedValue = value;
    });

    component.handleClick('user-123');

    expect(emittedValue).toBe('user-123');
  });
});
```

#### Testing Template Rendering

```typescript
describe('Component Template', () => {
  it('should render user name', () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.componentRef.setInput('userName', 'Jane Smith');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const nameElement = compiled.querySelector('.user-name');

    expect(nameElement.textContent).toBe('Jane Smith');
  });

  it('should show error message when error is present', () => {
    const fixture = TestBed.createComponent(FormComponent);
    const component = fixture.componentInstance;

    component.error.set('Invalid input');
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Invalid input');
  });
});
```

#### Testing User Interactions

```typescript
describe('Button Click', () => {
  it('should increment count on button click', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(component.count()).toBe(0);

    button.click();
    fixture.detectChanges();

    expect(component.count()).toBe(1);
  });
});
```

### Service Testing

#### Basic Service Test

```typescript
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch workspace data', () => {
    const mockWorkspace = {
      id: '123',
      name: 'Test Workspace'
    };

    service.getWorkspace('123').subscribe(workspace => {
      expect(workspace).toEqual(mockWorkspace);
    });

    const req = httpMock.expectOne('/api/workspace/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockWorkspace);
  });
});
```

#### Testing with Dependencies

```typescript
describe('Service with Dependencies', () => {
  let service: UserService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    // Create spy object
    const apiSpy = jasmine.createSpyObj('ApiService', ['getData']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });

    service = TestBed.inject(UserService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should call ApiService', () => {
    apiService.getData.and.returnValue(of({ data: 'test' }));

    service.loadData();

    expect(apiService.getData).toHaveBeenCalled();
  });
});
```

### Pipe Testing

```typescript
import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    const result = pipe.transform(date, 'short');

    expect(result).toBe('1/15/24');
  });
});
```

### Directive Testing

```typescript
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div appHighlight>Test</div>`,
  imports: [HighlightDirective]
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should highlight element', () => {
    divEl.nativeElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(divEl.nativeElement.style.backgroundColor).toBe('yellow');
  });
});
```

## Testing Best Practices

### Arrange-Act-Assert Pattern

```typescript
it('should update user name', () => {
  // Arrange - Set up test data and conditions
  const fixture = TestBed.createComponent(UserComponent);
  const component = fixture.componentInstance;

  // Act - Perform the action being tested
  component.updateName('New Name');

  // Assert - Verify the expected outcome
  expect(component.userName()).toBe('New Name');
});
```

### Test Isolation

```typescript
// ✅ GOOD: Each test is independent
describe('Counter', () => {
  let component: CounterComponent;

  beforeEach(() => {
    const fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance; // Fresh instance each test
  });

  it('test 1', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('test 2', () => {
    component.increment();
    expect(component.count()).toBe(1); // Starts at 0 again
  });
});

// ❌ BAD: Tests depend on each other
describe('Counter', () => {
  const component = new CounterComponent(); // Shared instance

  it('test 1', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('test 2', () => {
    component.increment();
    expect(component.count()).toBe(2); // Depends on test 1!
  });
});
```

### Descriptive Test Names

```typescript
// ✅ GOOD: Clear, descriptive names
it('should display error message when API call fails', () => {});
it('should disable submit button when form is invalid', () => {});

// ❌ BAD: Vague names
it('should work', () => {});
it('test 1', () => {});
```

### Test One Thing

```typescript
// ✅ GOOD: Focused test
it('should increment count by 1', () => {
  component.increment();
  expect(component.count()).toBe(1);
});

it('should update display when count changes', () => {
  component.count.set(5);
  fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('5');
});

// ❌ BAD: Testing multiple things
it('should increment and update display and emit event', () => {
  // Too much in one test
});
```

### Avoid Testing Implementation Details

```typescript
// ✅ GOOD: Test behavior
it('should show welcome message after login', () => {
  component.login('user@example.com');
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Welcome');
});

// ❌ BAD: Test implementation
it('should call private method _setWelcomeMessage', () => {
  component.login('user@example.com');
  expect(component['_setWelcomeMessage']).toHaveBeenCalled(); // Testing private method
});
```

## Mocking and Spies

### Creating Spies

```typescript
// Spy on existing method
const service = new MyService();
spyOn(service, 'getData').and.returnValue(of('mock data'));

// Create spy object
const mockService = jasmine.createSpyObj('MyService', ['getData', 'postData']);
mockService.getData.and.returnValue(of('mock data'));
```

### Spy Return Values

```typescript
// Return value
spy.and.returnValue('value');

// Return promise
spy.and.returnValue(Promise.resolve('value'));

// Return observable
spy.and.returnValue(of('value'));

// Call through to real implementation
spy.and.callThrough();

// Throw error
spy.and.throwError('error message');

// Custom implementation
spy.and.callFake((arg) => arg * 2);
```

### Verifying Spy Calls

```typescript
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(3);
expect(spy).toHaveBeenCalledWith('arg1', 'arg2');
expect(spy).not.toHaveBeenCalled();
```

## Asynchronous Testing

### Testing Promises

```typescript
it('should load data asynchronously', async () => {
  const result = await service.loadData();
  expect(result).toBeDefined();
});
```

### Testing Observables

```typescript
import { of } from 'rxjs';

it('should handle observable data', (done) => {
  service.getData().subscribe(data => {
    expect(data).toBe('expected');
    done();
  });
});

// Or use async/await with firstValueFrom
it('should handle observable data', async () => {
  const data = await firstValueFrom(service.getData());
  expect(data).toBe('expected');
});
```

### Testing with fakeAsync and tick

```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('should handle delayed operations', fakeAsync(() => {
  let value = '';

  setTimeout(() => { value = 'delayed'; }, 1000);

  tick(1000); // Simulate 1 second passing

  expect(value).toBe('delayed');
}));
```

## Accessibility Testing

### Manual Accessibility Checks

```typescript
it('should have proper ARIA attributes', () => {
  const button = fixture.nativeElement.querySelector('button');

  expect(button.getAttribute('aria-label')).toBe('Submit form');
  expect(button.getAttribute('role')).toBe('button');
});

it('should have proper heading hierarchy', () => {
  const headings = fixture.nativeElement.querySelectorAll('h1, h2, h3');

  expect(headings[0].tagName).toBe('H1');
  expect(headings[1].tagName).toBe('H2');
});
```

### Keyboard Navigation Testing

```typescript
it('should handle keyboard navigation', () => {
  const button = fixture.nativeElement.querySelector('button');

  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  fixture.detectChanges();

  expect(component.submitted()).toBe(true);
});
```

### Automated Accessibility Testing

Consider integrating axe-core for automated accessibility testing:

```bash
npm install --save-dev axe-core @axe-core/playwright
```

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

it('should pass accessibility checks', async () => {
  await injectAxe(page);
  await checkA11y(page);
});
```

## Integration Testing

### Testing Component Interactions

```typescript
describe('Parent-Child Interaction', () => {
  it('should pass data from parent to child', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    fixture.detectChanges();

    const childEl = fixture.debugElement.query(By.directive(ChildComponent));
    const childComponent = childEl.componentInstance;

    expect(childComponent.dataFromParent).toBe('expected value');
  });

  it('should handle child output events', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    const component = fixture.componentInstance;

    let receivedValue: string | undefined;
    component.handleChildEvent = (value: string) => {
      receivedValue = value;
    };

    const childEl = fixture.debugElement.query(By.directive(ChildComponent));
    const childComponent = childEl.componentInstance;

    childComponent.eventEmitter.emit('test value');

    expect(receivedValue).toBe('test value');
  });
});
```

### Testing with Router

```typescript
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('Navigation', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to user page', async () => {
    await router.navigate(['/user', '123']);

    expect(location.path()).toBe('/user/123');
  });
});
```

## E2E Testing

### Framework Options

While not currently implemented, consider these options for E2E testing:

1. **Playwright** (Recommended)
   - Modern, fast, reliable
   - Multi-browser support
   - Great debugging tools

2. **Cypress**
   - Developer-friendly
   - Time-travel debugging
   - Real-time reloading

3. **WebdriverIO**
   - Mature ecosystem
   - Mobile testing support

### Example E2E Test (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('should complete scan workflow', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // Click scan button
  await page.click('button:has-text("Scan")');

  // Wait for camera
  await expect(page.locator('video')).toBeVisible();

  // Capture image
  await page.click('button:has-text("Capture")');

  // Verify confirmation page
  await expect(page).toHaveURL(/.*confirm/);
});
```

## Testing Coverage Goals

### Minimum Coverage Targets

- **Critical business logic:** 90%+
- **Services:** 80%+
- **Components:** 70%+
- **Overall project:** 60%+

### Coverage Reports

Generate and review coverage:

```bash
ng test --code-coverage --watch=false
open coverage/index.html
```

Review:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## Continuous Integration

### Running Tests in CI

Add to `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run test -- --watch=false --browsers=ChromeHeadless
      - run: npm run test -- --code-coverage --watch=false
```

## Testing Checklist

Before committing code:

- [ ] All existing tests pass
- [ ] New functionality has tests
- [ ] Tests follow naming conventions
- [ ] Tests are independent and isolated
- [ ] Accessibility requirements tested
- [ ] Edge cases covered
- [ ] Error handling tested
- [ ] Async operations handled correctly

## Common Testing Patterns

### Testing Forms

```typescript
it('should validate required fields', () => {
  const form = component.userForm;

  expect(form.valid).toBeFalse();

  form.controls['name'].setValue('John');
  form.controls['email'].setValue('john@example.com');

  expect(form.valid).toBeTrue();
});
```

### Testing HTTP Errors

```typescript
it('should handle API errors', () => {
  service.getData().subscribe({
    next: () => fail('should have failed'),
    error: (error) => {
      expect(error.status).toBe(404);
    }
  });

  const req = httpMock.expectOne('/api/data');
  req.flush('Not found', { status: 404, statusText: 'Not Found' });
});
```

### Testing Local Storage

```typescript
it('should save to local storage', () => {
  spyOn(localStorage, 'setItem');

  service.savePreference('theme', 'dark');

  expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
});
```

## Resources

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [Testing Library](https://testing-library.com/docs/angular-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)

## Next Steps

To improve test coverage:

1. Start with critical user flows (scan → discuss → submit)
2. Add tests for core services (ApiService, StateService)
3. Test accessibility features
4. Add E2E tests for main workflows
5. Integrate testing into CI/CD pipeline
6. Set up automated coverage reporting
