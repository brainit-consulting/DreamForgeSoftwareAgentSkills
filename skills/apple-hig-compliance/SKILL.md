---
name: apple-hig-compliance
description: Audit, plan, implement, and verify mobile-responsive web UI/UX using Apple Human Interface Guidelines adapted for the web, WCAG accessibility, and robust responsive engineering. Use this skill whenever a user asks to review or improve a website or web app for phones, iPhone, iPad, Safari, touch use, mobile responsiveness, Apple HIG, accessible dialogs/forms, compact navigation, responsive tables, safe areas, zoom/reflow, mobile performance, or cross-device UX, even when they do not explicitly name Apple guidelines. This is for responsive web products, not only native iOS apps.
compatibility: Requires repository or page access for evidence-based work. Browser automation is strongly recommended. Node.js is optional for the bundled contrast checker.
---

# Apple HIG Compliance for responsive web apps

Apply Apple interaction principles to the web without making the product look or behave like a fake native iOS app. Preserve the product's own design system, platform conventions, URLs, semantic HTML, and browser behavior.

This is an independent community workflow. It is not affiliated with, endorsed by, or certified by Apple. Treat "compliance" as an evidence-based review target, not a formal certification or guarantee.

## Start with the user's authorization

Classify the request before acting:

- **Audit, review, diagnose, or plan:** inspect and report. Do not change product code unless the user also asks for implementation.
- **Implement, improve, fix, or build:** inspect, write a concrete plan when the repository requires one, implement the changes, and verify them in a browser.
- **Live URL only:** audit what can be observed and distinguish rendered evidence from implementation assumptions.
- **Codebase only:** inspect source and run the app when practical. Do not claim device behavior that was not rendered.

Read the repository's agent instructions and design-system documentation before proposing or changing UI. Treat existing brand tokens and component patterns as constraints unless the user explicitly requests a redesign.

## Ground the work in evidence

Use both rendered behavior and source evidence when available.

1. Inspect the information architecture and critical journeys.
2. Establish a viewport baseline at 320x568, 375x812, 390x844, 812x375 landscape, 768x1024, 1024x768, 1280x720, and 1440x900.
3. Measure page overflow, control rectangles, fixed/sticky chrome, modal bounds, and data-dense layouts. Do not rely only on screenshots.
4. Inspect semantic names, roles, states, descriptions, live regions, keyboard order, and focus behavior.
5. Trace each visible issue to the responsible component, style, asset, or state transition.
6. Record exact evidence such as `scrollWidth`, target dimensions, contrast ratios, asset bytes, or failing keyboard behavior.

Browser emulation is useful but is not physical Safari or VoiceOver. State the distinction. Recommend a final real-device pass when release risk warrants it.

When exact Apple or WCAG guidance may have changed, consult current primary sources. Prefer Apple's Human Interface Guidelines, WebKit documentation, and W3C/WAI material.

## Apply the web-adapted HIG checklist

Read [references/compliance-checklist.md](references/compliance-checklist.md) before a whole-app audit or implementation. Focus first on critical journeys and shared components because a shell, dialog, form, or table fix often improves many routes.

Core principles:

- **Clarity:** content and controls remain readable, named, and understandable at compact widths.
- **Deference:** UI chrome supports the task rather than consuming scarce phone space.
- **Depth and hierarchy:** navigation, sheets, dialogs, progress, and feedback make state changes understandable.
- **Direct manipulation:** touch controls are comfortably sized and provide immediate feedback.
- **Adaptivity:** layouts recompose for available space instead of merely shrinking or forcing sideways scrolling.
- **Forgiveness:** destructive actions explain consequences, errors are recoverable, and focus returns predictably.

## Prioritize findings

Use this order unless evidence suggests a higher-risk issue:

1. Blocked tasks, inaccessible controls, focus escape, or destructive-action risk.
2. Page-level overflow, essential horizontal scrolling, obscured content, or unreachable actions.
3. Primary touch targets below the web-adapted 44x44 CSS px product target and cramped adjacent actions.
4. Missing accessible names, state, error association, progress semantics, or keyboard hints.
5. Small-text contrast, zoom/reflow, reduced motion, and safe-area defects.
6. Mobile performance, unnecessary polling, oversized assets, and avoidable client work.
7. Visual polish that does not affect task completion.

Severity should reflect user impact, reach, and confidence, not visual annoyance alone.

## Design responsive behavior

Prefer recomposition over scaling:

- Keep a compact identity and one primary action in narrow headers; move secondary navigation into an accessible menu or sheet.
- Collapse multi-column cards intentionally and preserve reading order.
- Replace essential phone tables with cards, definition lists, disclosure rows, or focused detail screens. Keep a table only where it fits.
- Put the primary action and primary identity in the first view of each card.
- Preserve filter, sort, pagination, and form state across responsive changes.
- Use progressive disclosure for long descriptions and advanced settings.
- Allow content to wrap. Avoid fixed widths that create page overflow.
- Test long labels, localization expansion, Display Zoom, and 200 percent reflow equivalents.

Do not apply a global 44px minimum to every inline text link. That can damage paragraph layout. Enlarge the actual component hit region with padding, `min-height`, `min-width`, or a block-level wrapper where appropriate.

## Build accessible interaction foundations

Shared foundations usually deliver the largest return:

- A visible-on-focus skip link targeting the main landmark.
- A consistent, high-contrast `:focus-visible` treatment.
- Use 44x44 CSS px as the preferred web product target for primary touch controls, adapting Apple's 44x44-point guidance and aligning with WCAG's enhanced target. WCAG 2.2 AA permits a 24x24 CSS px minimum with exceptions; record separately whether a control meets the AA floor and the stronger product target. Add enough separation between adjacent targets.
- Real buttons and links rather than click handlers on generic elements.
- Modal dialogs with an accessible name, initial focus, Tab and Shift+Tab containment, Escape close, body scroll lock, background `inert` plus `aria-hidden`, and focus restoration.
- Safe-area support with `viewport-fit=cover` and `env(safe-area-inset-*)` only where full-bleed or fixed UI needs it.
- Status and errors announced through appropriately scoped live regions without repeatedly interrupting assistive technology.

For nested dialogs or sheets, only the topmost modal should respond to Escape. Restore the underlying modal's accessibility state when the top layer closes.

## Make forms work well on iPhone and assistive technology

For every input, textarea, select, chip group, and custom control:

- Provide a stable programmatic name using a visible label, `aria-labelledby`, or an equivalent semantic relationship.
- Connect helper and error text with `aria-describedby`.
- Set `aria-invalid` only when invalid and announce submission errors with `role="alert"` or a suitable live region.
- Use the correct `type`, `inputMode`, `autoComplete`, `autoCapitalize`, and `spellCheck` behavior.
- Expose selected chips or toggles with `aria-pressed`, checked state, or native controls.
- Expose pending state with `aria-busy`, disabled controls where appropriate, and concise status text.
- Use semantic progress bars with numeric value and a useful accessible label.
- Keep controls at least 16 CSS px on iPhone to avoid unintended focus zoom unless the product deliberately handles that behavior.

Do not use placeholders as the only label.

## Treat performance as part of mobile UX

Inspect the critical phone path for:

- Responsive images with truthful `sizes`, appropriate formats, intrinsic dimensions, and deliberate preload or lazy-loading behavior.
- Large source assets that remain in the deployment after replacement.
- Client-rendered duplicates hidden only by CSS when the data set is large.
- Polling that overlaps, continues while hidden or offline, or retries without backoff.
- Heavy below-the-fold components, unbounded result rendering, and avoidable hydration.
- Motion that ignores `prefers-reduced-motion`.

For polling, wait for one request to finish before scheduling the next. Pause when the document is hidden or offline, resume deliberately, and cap exponential backoff.

## Implement in risk-reducing phases

For nontrivial changes, use this order:

1. **Foundation:** overflow, breakpoints, navigation, targets, focus, contrast, landmarks, and modal infrastructure.
2. **Journeys:** forms, registry/list patterns, dialogs, destructive actions, progress, and sharing.
3. **Performance:** images, result paging, polling lifecycle, rendering boundaries, and motion.
4. **Polish:** copy, spacing, visual hierarchy, and secondary states.

Keep changes within the existing design language. Use design tokens. If a needed color or measurement is missing from the system, propose or add a named token rather than scattering one-off values.

## Verify proportionally to risk

For implementation work:

1. Run the repository's type checking, linting, tests, content checks, and production build.
2. Exercise the feature in a real browser after code checks pass.
3. Repeat the viewport matrix and record `clientWidth` versus `scrollWidth`.
4. Scan visible primary controls for width and height below 44px.
5. Test keyboard order, skip link, focus visibility, modal wrap, Escape, and return focus.
6. Inspect the accessibility tree for names, roles, descriptions, state, progress, and live feedback.
7. Test offline, hidden-tab, retry, reduced-motion, empty, error, loading, and long-content states when relevant.
8. Verify responsive asset selection and loading behavior, not only source code props.

Do not claim an acceptance item passed without evidence. If physical iOS Safari or VoiceOver is unavailable, report the browser and semantic checks completed and leave a clearly named device follow-up.

## Produce useful deliverables

For an audit, use [references/report-template.md](references/report-template.md). Lead with the user impact, then evidence, source location, recommendation, and acceptance criteria.

For implementation, maintain the repository's plan or status documentation when required. The final handoff should state:

- What changed.
- Which critical journeys and shared components improved.
- Exact verification commands and browser matrix results.
- Any remaining device-only or product-decision follow-up.
- Whether changes were committed or deployed.

## Avoid common failure modes

- Do not imitate iOS navigation bars, tab bars, typography, or materials unless the product brief calls for them.
- Do not declare a design "Apple compliant" from appearance alone.
- Do not treat a horizontally scrollable table as a complete mobile solution when primary information or actions are offscreen.
- Do not hide focus outlines without a visible replacement.
- Do not disable user zoom.
- Do not preload every prominent image; verify whether it is actually above the fold at each layout.
- Do not add ARIA where native semantics already express the behavior.
- Do not conflate browser emulation with an actual iPhone, iPad, Safari, or VoiceOver test.
