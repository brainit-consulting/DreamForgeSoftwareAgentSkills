# Responsive web UX audit: [product]

**Date:** [YYYY-MM-DD]
**Scope:** [routes, URL, repository]
**Mode:** [audit only or implementation authorized]
**Test surface:** [browser, emulation, physical devices]

## Executive summary

- Overall risk: [Critical, High, Medium, Low]
- Strongest existing behavior: [brief]
- Highest-impact mobile problem: [brief]
- Recommended implementation order: [brief]

## Evidence baseline

| Viewport | Page overflow | Navigation | Primary action | Notes |
| --- | ---: | --- | --- | --- |
| 320x568 | [result] | [result] | [result] | [evidence] |
| 375x812 | [result] | [result] | [result] | [evidence] |
| 390x844 | [result] | [result] | [result] | [evidence] |
| 812x375 | [result] | [result] | [result] | [evidence] |
| 768x1024 | [result] | [result] | [result] | [evidence] |
| 1024x768 | [result] | [result] | [result] | [evidence] |
| 1280x720 | [result] | [result] | [result] | [evidence] |
| 1440x900 | [result] | [result] | [result] | [evidence] |

## Findings

### [Severity] [finding title]

- **User impact:** [task or audience affected]
- **Evidence:** [measurement, behavior, or accessibility-tree result]
- **Source:** [component/file/selector when known]
- **Recommendation:** [specific responsive or interaction pattern]
- **Acceptance criteria:** [observable pass conditions]
- **Confidence:** [High, Medium, Low]

Repeat findings in impact order.

## Implementation plan

### Phase 1: shared foundation

- [ ] [overflow/navigation/targets/focus/contrast/modal infrastructure]

### Phase 2: critical journeys

- [ ] [forms/data patterns/errors/progress/sharing]

### Phase 3: performance and polish

- [ ] [images/polling/rendering/motion/copy]

## Verification plan

- [ ] Full responsive viewport matrix.
- [ ] 200 percent reflow equivalent.
- [ ] Keyboard order, visible focus, modal containment, Escape, and return focus.
- [ ] Accessibility-tree names, roles, descriptions, state, progress, and live feedback.
- [ ] Offline, retry, hidden-tab, reduced-motion, empty, loading, error, and long-content states where relevant.
- [ ] Repository typecheck, lint, test, content validation, and production build.
- [ ] Physical iOS Safari or VoiceOver follow-up when required and not available during this audit.

## Completion criteria

- [product-specific measurable criteria]

## Constraints and non-goals

- Preserve the existing design system unless redesign was requested.
- Apply Apple interaction principles without imitating native iOS chrome.
- Distinguish browser emulation from physical-device testing.
