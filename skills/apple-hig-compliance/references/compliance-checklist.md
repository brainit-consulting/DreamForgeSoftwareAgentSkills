# Responsive web compliance checklist

Use this checklist to gather evidence and define acceptance criteria. Apply only relevant sections, but do not skip shared-shell, input, or modal checks when those patterns exist.

## 1. Viewport and reflow

- The viewport uses device width and a usable initial scale.
- User zoom is not disabled with `maximum-scale=1` or `user-scalable=no`.
- Full-bleed fixed UI uses `viewport-fit=cover` only when safe-area handling is present.
- `document.documentElement.scrollWidth <= clientWidth` at each required compact viewport.
- No card, heading, code sample, chart, image, or fixed element widens the page.
- Content remains usable at a 320 CSS px viewport.
- A 200 percent desktop reflow equivalent does not clip or hide actions.
- Landscape does not expose a premature desktop layout that requires essential horizontal scrolling.
- Browser text-size changes do not cause overlap or truncated labels.

## 2. Navigation and shell

- The compact header preserves recognizable product identity.
- One clear primary action remains visible when useful.
- Secondary navigation moves into a menu or sheet before the row becomes cramped.
- The menu trigger exposes expanded state and an accessible relationship to its surface.
- Sticky elements do not obscure anchors, focused controls, validation messages, or browser UI.
- Main content has a landmark and a visible-on-focus skip link.
- Back navigation uses real links and predictable browser history behavior.
- Account and destructive actions are clearly separated.

## 3. Touch targets and gestures

- Primary buttons, icon buttons, menu items, chips, filters, disclosure controls, and compact links use a 44x44 CSS px hit region as the preferred web product target. Track WCAG 2.2 AA's 24x24 CSS px minimum (and its exceptions) separately; do not mislabel the 44px target as an AA requirement.
- Small visible icons can remain visually compact while their hit area is enlarged.
- Adjacent targets have enough separation to prevent accidental activation.
- Essential behavior does not require hover, a precise pointer, or a multi-finger gesture.
- Swipe or drag interactions have visible controls or keyboard alternatives.
- Disabled state does not remove necessary explanation.

Measure rendered rectangles. Do not infer target size from class names alone because flex shrinking, zoom, and inherited line height can change the result.

## 4. Typography, contrast, and visual clarity

- Body and control text remains readable without zoom.
- Form controls use at least 16 CSS px on iPhone unless focus zoom is intentionally managed.
- Small normal text meets 4.5:1 contrast.
- Large text meets 3:1 contrast.
- Non-text controls and focus indicators meet 3:1 against adjacent colors.
- Placeholder text is not the only label and remains legible.
- Muted tokens are tested on every background where they appear.
- Information does not depend only on color.
- Headings preserve a logical hierarchy at every breakpoint.
- Truncation is reserved for genuinely secondary content and exposes the full value when needed.

Run the bundled checker when verifying design tokens:

```bash
node scripts/contrast-check.mjs "#595959" "#FFFFFF"
```

## 5. Forms and mobile keyboards

- Every control has a programmatic name.
- Visible labels are associated with their controls.
- Helper and error text is connected by `aria-describedby`.
- Invalid state is exposed only when an error exists.
- Errors are specific, actionable, and announced.
- `type="email"`, `type="tel"`, `type="url"`, numeric modes, and search types match the data.
- `inputMode`, `autoComplete`, `autoCapitalize`, and `spellCheck` reduce typing friction.
- Password managers and one-time-code completion remain usable.
- Chip and segmented choices expose selected state.
- Pending submission cannot accidentally run twice and has an announced status.
- Required and optional status is understandable before submission.
- Keyboard focus moves to or clearly identifies validation failures when appropriate.

## 6. Dialogs, sheets, menus, and popovers

- The surface has the correct semantic role and accessible name.
- Modal surfaces expose `aria-modal="true"`.
- Initial focus lands on the least destructive useful control or the dialog itself.
- Tab and Shift+Tab wrap within a modal.
- Escape closes only the topmost modal when closing is safe.
- Focus returns to the invoking control.
- Background content receives both `inert` and `aria-hidden` while modal.
- Body scrolling is locked without losing the prior scroll state.
- The panel remains fully reachable in phone portrait and landscape.
- Close and menu controls are at least 44x44 CSS px.
- Safe-area padding protects controls near screen edges.
- Resize and breakpoint changes recompute bounds for draggable or resizable desktop panels.
- Pointer dismissal has a keyboard equivalent and does not dismiss during an in-progress destructive action.

## 7. Data-dense interfaces

- Primary identity, status, and action are visible without sideways scrolling.
- Phone layouts use cards, definition lists, disclosures, or focused detail views where tables do not fit.
- A table appears only at a width where its important columns and actions fit.
- Search and filters remain at least 44px high and wrap cleanly.
- Filter, sort, and search state survives responsive changes.
- Result counts update in a polite live region when useful.
- Large result sets render an initial page, windowed list, or explicit Load more control.
- Empty, loading, error, and no-match states are clear.

## 8. Feedback, status, and destructive actions

- Every asynchronous primary action exposes pending, success, and failure feedback.
- Live regions are scoped so routine updates do not become noisy.
- Semantic progress includes current value, bounds, and a useful label.
- Destructive or consequential actions explain impact before confirmation.
- Confirmation uses plain language and identifies the affected item.
- Cancel is easy to reach and receives safe initial focus when appropriate.
- Reversible operations say how to recover.
- Offline and retry states explain what will happen next.

## 9. Images and mobile performance

- Responsive images declare truthful `sizes`.
- Intrinsic width and height prevent layout shift.
- Above-the-fold preload is reserved for the likely LCP asset.
- Below-phone-fold imagery is lazy unless measurements justify eagerness.
- Source assets use an appropriate modern format and quality.
- Replaced heavy assets are removed from the deployment.
- Decorative images use empty alternative text; informative images describe their purpose.
- Mobile does not render large duplicate desktop and phone trees merely to hide one with CSS when the data set is expensive.
- Initial result and card rendering is bounded.

## 10. Network lifecycle and polling

- Polling is sequential: schedule the next request only after the current one settles.
- Polling pauses when `document.visibilityState` is not visible.
- Polling pauses offline and resumes on the online event.
- Failures use capped backoff.
- Cleanup cancels timers and listeners.
- Completion stops polling.
- The user can leave and return without corrupting state.
- Slow and failed states remain understandable to assistive technology.

## 11. Motion and sensory accessibility

- `prefers-reduced-motion` shortens or removes nonessential animation and transitions.
- Progress and state do not depend on animation alone.
- Flashing and rapid motion are absent.
- Auto-advancing content can be paused.
- Haptics or sound are not the sole feedback channel.

## 12. Sharing and platform integration

- Delivered content uses the Web Share API where available.
- A clipboard or visible-link fallback exists.
- Share cancellation is not reported as an error.
- Copy success is announced and does not rely only on color.
- External links identify new-context behavior when ambiguity would be harmful.

## 13. Verification record

Record:

- Browser and whether testing was emulated or physical.
- Viewport size and page-level overflow result.
- Minimum measured primary target dimensions.
- Contrast ratios and tested background pairs.
- Keyboard focus containment and restoration results.
- Accessibility-tree names, roles, states, and descriptions.
- Network, offline, reduced-motion, and long-content states tested.
- Typecheck, lint, test, content validation, and production build commands.
- Remaining device-only validation such as real iOS Safari or VoiceOver.
