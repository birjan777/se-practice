# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- | --- |
| Assistant (tool) | ChatGPT (web) |
| Assistant model | not displayed |
| Starting point | week-08 |
| Baseline commit | aea0c64 |
| Language (ts or js) | ts |
| Vitest version | 3.2.7 |
| Where I ran the tests | Local macOS terminal in the SIS 04 checkout |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
 RUN  v3.2.7 /private/tmp/sis04-project.Vc4T8M/sis-04/app

 ✓ src/booking.test.ts (19 tests) 2ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  16:40:51
   Duration  187ms (transform 25ms, setup 0ms, collect 19ms, tests 2ms, environment 0ms, prepare 40ms)
```

## 2. Context for the assistant

### 2.1 Repository map

```text
src/App.tsx — React form, inline room fixtures, selection, time parsing and feedback.
src/booking.ts — canBook checks time, duration, blocking and overlap.
src/booking.test.ts — 19 existing Vitest regression cases.
src/index.css — layout and result styles.
src/main.tsx and index.html — React and browser entry points.
vite.config.ts, tsconfig.json and package.json — build and test setup.
```

### 2.2 The context message as sent

```text
Review the baseline for SIS 04 in read-only mode. Use this one context message and give only analysis and a small numbered plan. No code or edits yet.

Repository map
- src/App.tsx: React form, two inline room fixtures, room selection, time parsing, feedback and existing bookings.
- src/booking.ts: pure canBook function that checks time, duration, blocking and overlap.
- src/booking.test.ts: existing Vitest regression tests.
- src/index.css: layout and result styling.
- src/main.tsx, index.html, vite.config.ts, tsconfig.json and package.json: application entry and tool setup.

AC1: Reject start >= end and past requests. The baseline also rejects start equal to now.
AC2: Accept at most 120 minutes.
AC3: Reject blocked rooms.
AC4: Reject overlap and allow slots that only touch at endpoints.
AC5: Return availability without changing bookings.
AC6: Keep clear responsive results on desktop and mobile.
F1: Keep rooms with capacity >= attendees.
F2: Keep rooms with ALL selected equipment.
F3: A blocked room is never available.
F4: Show a clear empty state if no room matches.
F5: Switching rooms refreshes the result using that room's own bookings.

Constraints: four or more fictional rooms with id, name, capacity, equipment, blocked and bookings. Fixed demo time. No login, payments, live APIs or database. Keep the canBook contract and add rooms.ts, filter.ts with filterRooms and booking.ts with checkRoom. Keep the existing tests.

Baseline evidence from src/App.tsx: lines 7–10 put room data inside the UI. Lines 21–30 store roomId and a separate global blocked checkbox. Lines 32–58 parse times and call canBook with the checkbox but room.bookings. Line 68 changes only roomId. Lines 118–124 display error and result separately. src/booking.ts lines 18–24 already enforce valid times, 120 minutes, blocking and strict overlap.

Name at least three maintainability risks with file/function evidence and priority, propose numbered test-first steps, and mention an optional UI choice with its trade-off. Please answer in English in at most 260 words.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | Catalog data is coupled to the view | `src/App.tsx:4–10` | The component defines the room type and two fixtures. They have bookings but no capacity or equipment for F1 and F2. | High |
| 2 | Blocking applies across room selections | `src/App.tsx:23`, `check():50–56` | The call uses the global checkbox for `blocked` and the selected room for `bookings`. The checkbox ignores the selected room's own blocked value. | High |
| 3 | Selection can leave a stale result | `src/App.tsx:68`, `check():58` | The selection handler changes only `roomId`. The old boolean persists when another room's bookings appear. | High |
| 4 | Invalid times can display two messages | `src/App.tsx:44–58,118–124`, `src/booking.ts:18` | The view sets an error for the reversed interval and still passes it to `canBook`, which rejects it. Both messages can then render. | Medium |

### 3.2 Improvement plan — before editing

1. Keep all 19 regression cases and mark their existing AC and boundary coverage in the titles.
2. Add failing filter tests for exact capacity, one seat short, all selected equipment and zero matches. Move the demo catalog to `rooms.ts` and implement `filterRooms`.
3. Add failing tests for a blocked room, different bookings for the same slot, an unknown room and the filter-to-booking flow. Implement `checkRoom` using the existing `canBook` rules.
4. Connect the catalog and rules to the form. Keep the last checked slot so a room change immediately shows the correct result. Check the empty state, a blocked room, and feedback at desktop and phone widths.
5. Compare the baseline and final modules, update the diagrams and run the full Vitest suite and both submission checks.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| “`filterRooms` against capacity, all selected equipment and blocked rooms.” | Modified | F1 and F2 determine the filtered list. F3 is enforced by `checkRoom`. A blocked room that meets the other criteria stays visible with a label and its availability check returns false. The follow-up design review supported this boundary. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.2 Exchange 2

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
