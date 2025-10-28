# Testing Documentation

## Overview

This project uses **Jest** and **React Testing Library** for unit testing React components.

## Installation

Install the required testing dependencies:

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## Test Files

### 1. StructuredData Component Tests
**File:** `components/seo/structured-data.test.tsx`

Tests the SEO structured data component for proper schema.org markup:

- ✅ Verifies blogPosting schema renders with correct data
- ✅ Verifies service schema renders with correct data
- ✅ Tests multiple schema objects rendering
- ✅ Tests XSS protection

**Coverage:**
- Blog posting schema validation
- Service schema validation
- Multiple schemas handling
- Security (XSS prevention)

### 2. NewsletterForm Component Tests
**File:** `components/newsletter-form.test.tsx`

Tests the newsletter subscription form functionality:

- ✅ Verifies form rendering
- ✅ Verifies modal opens upon form submission
- ✅ Verifies API is NOT called before consent confirmation
- ✅ Verifies API is called ONLY after consent is confirmed
- ✅ Tests success message display
- ✅ Tests error handling
- ✅ Tests loading states
- ✅ Tests modal cancellation

**Coverage:**
- Form submission flow
- Consent modal integration
- API call timing and conditions
- Success/error message handling
- Loading states
- User cancellation behavior

### 3. NewsletterConsentModal Component Tests
**File:** `components/newsletter/newsletter-consent-modal.test.tsx`

Tests the consent modal component:

- ✅ Verifies modal rendering when open
- ✅ Verifies privacy policy and terms links
- ✅ Verifies onConfirm callback is called when confirmation button is clicked
- ✅ Verifies onOpenChange is called when cancel button is clicked
- ✅ Tests accessibility attributes
- ✅ Tests modal state management

**Coverage:**
- Modal rendering and visibility
- Button interactions
- Callback functions
- Accessibility compliance
- Link attributes and targets

## Test Requirements Fulfilled

All requested test cases have been implemented:

1. ✅ **StructuredData component renders with correct blogPosting schema on blog post pages**
   - Test: `components/seo/structured-data.test.tsx` - line 6-34

2. ✅ **StructuredData component renders with correct service schema on service detail pages**
   - Test: `components/seo/structured-data.test.tsx` - line 53-73

3. ✅ **NewsletterForm opens the NewsletterConsentModal upon form submission**
   - Test: `components/newsletter-form.test.tsx` - line 58-74

4. ✅ **NewsletterConsentModal calls onConfirm when confirmation button is clicked**
   - Test: `components/newsletter/newsletter-consent-modal.test.tsx` - line 77-91

5. ✅ **NewsletterForm calls subscription API only after consent is confirmed**
   - Test: `components/newsletter-form.test.tsx` - line 90-115

## Test Structure

Each test file follows this structure:

```typescript
describe('ComponentName', () => {
  describe('Feature Group', () => {
    it('should behave in expected way', () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```

## Mocking

The tests use appropriate mocking strategies:

- **API Calls**: Mocked using `jest.mock('@/lib/api')`
- **Child Components**: Mocked for isolated testing where needed
- **User Interactions**: Simulated using `@testing-library/user-event`

## Best Practices

- ✅ Tests are isolated and independent
- ✅ Uses semantic queries (getByRole, getByLabelText)
- ✅ Tests user behavior, not implementation details
- ✅ Proper async handling with waitFor
- ✅ Clear test descriptions
- ✅ Comprehensive coverage of user flows

## Troubleshooting

### Common Issues

**Issue**: Tests fail with module resolution errors
**Solution**: Ensure Jest configuration in `jest.config.js` has correct path mappings

**Issue**: Tests timeout
**Solution**: Check async operations are properly awaited with `waitFor`

**Issue**: Component not rendering
**Solution**: Verify all required props are provided in test render

## Next Steps

To extend testing coverage:

1. Add integration tests for complete user flows
2. Add E2E tests using Playwright or Cypress
3. Test error boundaries and edge cases
4. Add visual regression tests
5. Add performance tests

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
