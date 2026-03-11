# Testing Guide for TalPro Website

## Overview

This project uses **Vitest** as the testing framework, chosen for its:
- Native Vite integration (faster test execution)
- Better TypeScript support
- Modern testing API compatible with Jest
- Built-in UI dashboard for test visualization

## Running Tests

Since test scripts cannot be directly added to package.json due to system restrictions, use these commands:

```bash
# Run tests in watch mode
npx vitest

# Run tests with UI dashboard
npx vitest --ui

# Run tests once (CI mode)
npx vitest run

# Run tests with coverage report
npx vitest run --coverage
```

**Recommended package.json scripts** (to be added manually if needed):
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Test Organization

```
tests/
  ├── components/     # Component tests (UI components)
  ├── schema/        # Schema validation tests (Zod schemas)
  ├── utils/         # Utility function tests
  ├── api/           # API endpoint tests (future)
  └── setup.ts       # Test setup and global configuration
```

## Writing Tests

### Component Tests

Component tests are located in `tests/components/` and use `@testing-library/react` for rendering and testing components.

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeTruthy();
  });
});
```

**Best Practices:**
- Test user behavior, not implementation details
- Use semantic queries (getByRole, getByLabelText, getByText)
- Use data-testid attributes sparingly, only when necessary
- Mock external dependencies (API calls, routing, etc.)

### Schema Validation Tests

Schema tests verify that Zod schemas correctly validate data structures.

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { mySchema } from '@shared/schema';

describe('My Schema', () => {
  it('should validate valid data', () => {
    const result = mySchema.safeParse({ name: 'John' });
    expect(result.success).toBe(true);
  });

  it('should reject invalid data', () => {
    const result = mySchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });
});
```

**Best Practices:**
- Test both valid and invalid inputs
- Test edge cases (empty strings, null, undefined, boundary values)
- Verify error messages when appropriate

### Utility Function Tests

Test pure functions that don't depend on external state or side effects.

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { myUtilityFunction } from '@/lib/utils';

describe('myUtilityFunction', () => {
  it('should return expected output for given input', () => {
    expect(myUtilityFunction('input')).toBe('expected output');
  });
});
```

### API Tests (Future)

API tests will test Express routes and endpoints.

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/server/app';

describe('GET /api/endpoint', () => {
  it('should return 200 and data', async () => {
    const response = await request(app).get('/api/endpoint');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});
```

## Current Test Coverage

### ✅ Implemented Tests

1. **Canonical Component** (`tests/components/Canonical.test.tsx`)
   - Tests canonical URL rendering
   - Tests query string stripping
   - Tests hash fragment stripping

2. **Contact Inquiry Schema** (`tests/schema/validation.test.ts`)
   - Tests valid contact inquiry validation
   - Tests missing required fields rejection
   - Tests invalid email format rejection
   - Tests optional fields handling

3. **Blog Post Schema** (`tests/schema/validation.test.ts`)
   - Tests valid blog post validation
   - Tests missing required fields
   - Tests optional fields (tags, images)

4. **Utility Functions** (`tests/utils/utils.test.ts`)
   - Tests className merger (cn function)
   - Tests conditional classes
   - Tests Tailwind class conflict resolution

## Testing Patterns

### Arrange-Act-Assert Pattern

```typescript
it('should do something', () => {
  // Arrange: Set up test data and conditions
  const input = 'test';
  
  // Act: Execute the code being tested
  const result = functionUnderTest(input);
  
  // Assert: Verify the result
  expect(result).toBe('expected');
});
```

### Mocking with Vitest

```typescript
import { vi } from 'vitest';

// Mock a module
vi.mock('module-name', () => ({
  exportedFunction: vi.fn(() => 'mocked value')
}));

// Mock a function
const mockFn = vi.fn();
mockFn.mockReturnValue('value');
```

### Testing Async Code

```typescript
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

## Configuration

### vitest.config.ts

The Vitest configuration includes:
- React plugin for JSX support
- jsdom environment for DOM testing
- Global test APIs (describe, it, expect)
- Path aliases (@, @shared) matching the main project

### tests/setup.ts

Global setup that runs before all tests:
- Imports `@testing-library/jest-dom` for additional matchers
- Can be extended with global mocks or test utilities

## Best Practices

1. **Write Descriptive Test Names**
   - Use clear, specific descriptions
   - Follow pattern: "should [expected behavior] when [condition]"

2. **Test One Thing Per Test**
   - Each test should verify a single behavior
   - Avoid multiple assertions for different behaviors

3. **Keep Tests Independent**
   - Tests should not depend on each other
   - Reset state between tests when needed

4. **Mock External Dependencies**
   - Mock API calls, database queries, external services
   - Use Vitest's built-in mocking capabilities

5. **Keep Tests Fast**
   - Avoid unnecessary delays or timeouts
   - Mock slow operations
   - Use in-memory implementations when possible

6. **Use TypeScript**
   - Leverage type safety in tests
   - Import types from shared schemas

## Troubleshooting

### Tests Not Running

- Ensure all dependencies are installed: `npm install`
- Check that vitest.config.ts is properly configured
- Verify test files match the pattern `*.test.ts` or `*.test.tsx`

### Import Errors

- Verify path aliases in vitest.config.ts match your project structure
- Check that `@testing-library/jest-dom` is imported in setup.ts

### Mock Not Working

- Ensure mocks are defined before imports
- Use `vi.mock()` at the top level, not inside tests
- Check mock implementation matches expected interface

## Coverage Expectations

Target coverage goals:
- **Critical Components**: 80%+ (Canonical, Layout, Navigation)
- **Schema Validations**: 90%+ (All Zod schemas)
- **Utility Functions**: 85%+ (Pure functions)
- **API Endpoints**: 70%+ (Core business logic)

## Next Steps

Future testing enhancements:
1. Add E2E tests with Playwright or Cypress
2. Add visual regression tests
3. Set up CI/CD integration for automated testing
4. Add performance testing
5. Increase coverage for all components
6. Add integration tests for API endpoints

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
