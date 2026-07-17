# Talpro Website Design and Accessibility Standard

Status: implementation standard for the Constitution v2.1 candidate

## System boundary

Talpro uses shared React components, Tailwind design tokens and the existing
Radix/Shadcn primitives. Published pages must reuse these foundations rather
than introduce route-specific interaction patterns.

## Mandatory page contract

- One skip link targeting `#main-content`, one `main` landmark and one H1.
- Logical heading order and descriptive link/button names.
- Every form control has a persistent accessible label and programmatic error.
- Keyboard access, visible focus, no positive `tabindex` and no keyboard trap.
- Decorative images use empty alternative text; informative images describe
  their purpose without repeating adjacent copy.
- Responsive layouts must remain usable at 320 CSS pixels and 400% zoom.
- Motion must respect `prefers-reduced-motion`; meaning cannot depend on motion.
- Colour cannot be the only status signal; WCAG 2.2 AA contrast is required.
- Video/audio requires captions or a transcript before publication.

## Automated release checks

`npm run verify:accessibility` checks the server-rendered document contract for
every governed route. `npm run verify:accessibility:browser` runs axe-core with
WCAG 2.2 AA and best-practice rules against every rendered route.
`npm run verify:performance` enforces deterministic JavaScript, CSS and HTML
budgets. These checks block the release but do not replace human assistive-
technology, contrast, zoom, reflow or device testing.

## Human evidence matrix

The release evidence pack must record tester, date, candidate SHA, browser,
device/OS, assistive technology, route set, result, defect ID and retest result.
Minimum coverage is:

- Keyboard-only operation in current Chrome, Firefox and Safari.
- VoiceOver on macOS/iOS and one Windows screen-reader path.
- 200% and 400% zoom, 320px reflow, reduced motion and high-contrast review.
- Form submission, consent, search, job discovery/application and error paths.

No page is certified from an automated score alone.
