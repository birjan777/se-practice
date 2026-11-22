# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

## 1. Setup and starting point

| Item                  | Value                                       |
|-----------------------|---------------------------------------------|
| Assistant (tool)      | Gemini                                      |
| Assistant model       | not displayed                               |
| Starting point        | week-08                                     |
| Baseline commit       | aea0c64                                     |
| Language (ts or js)   | ts                                          |
| Vitest version        | 3.2.7                                       |
| Where I ran the tests | Local macOS terminal in the SIS 04 checkout |

### 1.1 Baseline run

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

The catalog has four fictional rooms with a capacity, equipment list, block status and bookings for each. The equipment choices are projector, video conferencing and whiteboard. The list updates as attendees or equipment change. If no room matches, the page says “No rooms match these filters.” After checking a slot, selecting another room repeats the check for the same times against that room's bookings. A blocked room stays visible with its status and always returns Unavailable.

### 4.2 Demonstration

| Screenshot | What it shows |
| --- | --- |
| [`evidence/filter-match.png`](evidence/filter-match.png) | Desktop, 8 attendees and both projector and whiteboard. Only A-101 and C-305 match. |
| [`evidence/filter-empty.png`](evidence/filter-empty.png) | Desktop, 30 attendees and the same equipment. There are no matching rooms and the page suggests adjusting the filters. |
| [`evidence/switch-a.png`](evidence/switch-a.png) | Desktop, 8 attendees with no equipment selected. A-101 is Unavailable for 10:00–11:00 because it already has a booking at that time. |
| [`evidence/switch-b.png`](evidence/switch-b.png) | Desktop, switching to B-204 with 10:00–11:00 unchanged gives Available without clicking the check button again. |
| [`evidence/narrow.png`](evidence/narrow.png) | 390 × 844 browser viewport. Room cards stack and B-204 still shows Available. The measured document width was 390 px. |

The desktop viewport was 1280 × 720. The browser check also confirmed that blocked D-412 returns Unavailable for 10:00–11:00. On B-204, setting the end to 09:00 using the keyboard and checking a 10:00 start produced just the validation message.

## 5. Refactoring (Task 3)

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | Defines the room and interval types and the four fictional fixtures. |
| `src/booking.ts` | Checks time and overlap. `checkRoom` gives `canBook` the chosen room's bookings and block status. |
| `src/filter.ts` | Applies the capacity and all-equipment rules. |
| `src/App.tsx` | Reads filters and times, calls the rules, and renders the catalog and feedback. |

[Before](diagrams/before.puml) and [after](diagrams/after.puml) are component diagrams. Both rendered on the PlantUML web server.

### 5.2 Design decisions

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| Keep blocked matches visible and label them. | Hide blocked matches in `filterRooms`. | F1 and F2 describe room requirements. F3 describes availability. The user can see why D-412 matches the filters but cannot be booked. |
| Keep the checked slot and derive the result from the selected room. | Cache the boolean returned by the last click. | The baseline cached the result even when the selection changed. The F5 test and the two screenshots cover the same slot producing different results. Editing the time inputs clears the old feedback. |
| Use the existing `canBook` through `checkRoom`. | Implement a second set of time and overlap rules for the catalog. | The 19 baseline cases preserve the endpoint and duration decisions. The room-specific tests exercise the same rules through the new entry point. |

### 5.3 Duplication removed

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| `App.tsx:4–5` and `booking.ts:1` both defined the interval shape. | One `Interval` type in `rooms.ts` supplies the room booking and request shapes. |
| `booking.ts:3–16` defined the same input shape in `CanBookInput` and on the function signature. | `canBook` uses the named type. The type reuses fields from `Room` and `BookingRequest`. |
| `App.tsx:44` and `booking.ts:18` both checked that the start is before the end. | `isDayInterval` in `booking.ts` supplies the rule for both availability and invalid-time feedback. |

## 6. Automated tests (Task 4)

### 6.1 Test plan

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | T02 AC1: 540–570 (starts now) should be rejected | Start and current time both 540 → false. |
| AC2 | T06 B1 AC2: 720–840 (120 minutes) should be allowed | Exactly 120 minutes → true. |
| AC3 | T13 AC3: 660–720, blocked = true should be rejected | Room blocked → false. |
| AC4 | T01 B3 AC4: 660–720 (touching after) should be allowed | Start equals the existing booking's end → true. |
| AC5 | AC5: Available request leaves bookings array unchanged | A free slot is available and the bookings array stays equal to its original contents. |
| F1 | F1 B5: a room at exact capacity is included | 8 seats and 8 attendees → included. |
| F2 | F2: every requested item must be present | Projector plus whiteboard → only the room with both items. |
| F3 | F3: a blocked room is unavailable even with no bookings | Blocked room with an empty schedule → false. |
| F4 | F4: impossible criteria return no matching rooms | 20 attendees and a whiteboard in the test catalog → empty list. |
| F5 | F5: the same slot can be free in one room and busy in another | 600–660 → true in the free room and false in the busy room. |
| B1 | T06 B1 AC2: 720–840 (120 minutes) should be allowed | 120 minutes → true. |
| B2 | T07 B2: 720–841 (121 minutes) should be rejected | 121 minutes → false. |
| B3 | T01 B3 AC4: 660–720 (touching after) should be allowed | A request touches 600–660 at 660 → true. |
| B4 | T09 B4: 630–690 (partial overlap) should be rejected | A request overlaps 600–660 for 30 minutes → false. |
| B5 | F1 B5: a room at exact capacity is included | 8 seats for 8 attendees → included. |
| B6 | B6: a room one seat short is excluded | 7 seats for 8 attendees → excluded. |
| INT | INT: the filtered room is checked against its own bookings | Filter for 8 attendees and a whiteboard → busy room only. Its overlapping request is false and its bookings stay unchanged. |

### 6.2 Commands

```text
npm install --offline --no-audit --no-fund
CI=1 NO_COLOR=1 npx vitest run | tee /tmp/sis04-baseline-vitest.log
CI=1 NO_COLOR=1 npx vitest run src/filter.test.ts 2>&1 | tee /tmp/sis04-filter-red.log
CI=1 NO_COLOR=1 npx vitest run | tee /tmp/sis04-filter-green.log
CI=1 NO_COLOR=1 npx vitest run src/booking.test.ts 2>&1 | tee /tmp/sis04-booking-red.log
CI=1 NO_COLOR=1 npx vitest run | tee /tmp/sis04-booking-green.log
CI=1 NO_COLOR=1 npx vitest run | tee /tmp/sis04-final-vitest.log
npm run build | tee /tmp/sis04-build.log
npm run dev -- --host 127.0.0.1 --port 5184 --strictPort
npx vite preview --host 127.0.0.1 --port 5185 --strictPort
```

Before the filter module existed, the filter suite stopped with `Cannot find module './filter'`. It then ran with 24 tests passing in total. Before adding `checkRoom`, the booking suite reported 19 passed and four failed with `checkRoom is not a function`. After adding it, the full suite passed all 28 tests. The final browser screenshots were taken from the production build served locally.

### 6.3 Final run

```text
 RUN  v3.2.7 /private/tmp/sis04-project.Vc4T8M/sis-04/app

 ✓ src/filter.test.ts (5 tests) 2ms
 ✓ src/booking.test.ts (23 tests) 3ms

 Test Files  2 passed (2)
      Tests  28 passed (28)
   Start at  16:48:09
   Duration  189ms (transform 42ms, setup 0ms, collect 50ms, tests 4ms, environment 0ms, prepare 73ms)
```

`npm run build` also passed. The build ran TypeScript before Vite.

## 7. Quality evaluation (Task 5)

| Measure                                            | Original                                                                                                      | Final                                                                                                                                | How I obtained it                                                                                                           |
|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Automated tests passed / total                     | 19/19                                                                                                         | 28/28                                                                                                                                | The full Vitest runs in §1.1 and §6.3.                                                                                      |
| Duplicated logic locations removed                 | 3 repeated definitions or checks                                                                              | 0 repeated definitions or checks for those three cases                                                                               | Counted the rows in §5.3 after comparing the baseline source with the final files.                                          |
| Code structure: modules and their responsibilities | 4 non-test files in `app/src`. App owned the fixtures and the form.                                           | 6 non-test files in `app/src`. App presents the UI, rooms holds fixtures, filter handles matching, and booking handles availability. | Compared the baseline file list and `git ls-files app/src`. Excluded `*.test.ts` and counted the CSS file in both versions. |
| Remaining limitation                               | The default current time was 09:00 and could be changed manually. The app used only its inline demo schedule. | The catalog still uses static demo bookings and now checks requests against a fixed 09:00.                                           | Compared the original current-time input with `DEMO_NOW` and the fixtures in the new code.                                  |

## 8. AI evidence appendix

### 8.1 Exchange 1

**Tool and model:** Gemini, not displayed
**Date:** 22 November 2026
**Purpose:** Review the baseline from its repository map and selected code references.

**Prompt:**

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

**Output used:**

```text
[…]
Lines 32–58: Blocking is combined with the selected room's bookings.
[…]
Risk: results may not reflect the newly selected room's bookings, violating F5.
[…]
Add filter.ts and test filterRooms against capacity, all selected equipment and blocked rooms.
[…]
```

**Problems found:** The filter step bundled a booking rule with discovery.
**Changes made:** Moved the F3 check to `booking.ts`, leaving blocked rooms visible in matching results.
**Verified by:** Baseline `App.tsx` lines 21–30, 50–56 and 68, plus final F3 and F5 tests.

### 8.2 Exchange 2

**Tool and model:** Gemini , not displayed
**Date:** 22 November 2026
**Purpose:** Decide how the UI represents blocked rooms and refreshes the result.

**Prompt:**

```text
Check the design before implementation. The checklist gives blocked rooms an explicit label and F3 must reject them. Should filterRooms hide blocked rooms? For F5, compare storing a cached availability boolean per selection with retaining the last checked time slot and deriving its result for the selected room. Pick the simpler design and give one edge case for each choice. Do not edit files.
```

**Output used:**

```text
[…]
Recommendation: No. Keep blocked rooms visible but explicitly labelled as blocked and unavailable.
[…]
Keep the last checked start and end times as state. Whenever the selected room changes, derive availability again using that room's bookings and blocked status.
[…]
```

**Problems found:** A cached boolean could show the wrong result after a room change.
**Changes made:** Kept the request in state and derived the result using the selected room.
**Verified by:** F5 and the browser switch from A-101 to B-204 while keeping 10:00–11:00.

### 8.3 Exchange 3

**Tool and model:** Gemini, not displayed
**Date:** 22 November 2026
**Purpose:** Collect concrete single-rule and integration test scenarios.

**Prompt:**

```text
Propose concrete Vitest cases for pure filterRooms and checkRoom with test-local fictional fixtures. Include F1 at exact capacity, F2 equipment AND, F3 a blocked matching room, F4 no matches, F5 two room IDs with the same request and different bookings, B5 zero attendees, B6 no equipment, and INT filter then check the match. Preserve AC4 endpoint touching and AC5 immutability. Return a short case list with inputs and expected outputs only. No edits.
```

**Output used:**

```text
[…]
F2 – Equipment AND: Requested ["projector", "whiteboard"]; room has both → included. Room has only projector → excluded.
[…]
F5 – Room-specific bookings: Same request, 10:00–11:00:
Room A: no conflicting booking → available.
Room B: booking 10:30–11:30 → unavailable.
[…]
```

**Problems found:** The prompt mixed up the B5 and B6 IDs, and the answer carried those IDs forward. The proposed function signatures also differed from README §7.
**Changes made:** Used exact capacity for B5 and one seat short for B6, as specified in README §9. Used the assignment's argument objects and room ID.
**Verified by:** The final F2, F5, B5, B6 and INT tests passed. The 19 original cases also passed.

## 9. Checker results and known fails

The checker returned 33 PASS, 0 FAIL, and 0 ERROR on a clean copy without node_modules or build output.


## 10. AI reflection (Task 6)

In this assignment, I used AI to help extend the Smart Campus Room Availability Checker. The assistant received information about the existing files, the original booking rules, and the new requirements for room filtering. This context helped connect the changes to the existing application.

AI helped separate the application into modules for rooms, filtering, booking rules, and the interface. One suggestion needed correction. The assistant suggested filtering out blocked rooms. The final design keeps matching blocked rooms visible with a label and rejects them when checking availability. I think this makes the result easier to understand.

I personally checked the application in the browser. With eight attendees, a projector, and a whiteboard selected, only A-101 and C-305 remained. With thirty attendees, the application displayed an empty state. I also checked that D-412 was unavailable. Switching from A-101 to B-204 for the same time changed the result from Unavailable to Available.

I ran the automated tests and the production build. All 28 tests passed, and the build completed successfully. The tests helped verify details that are easy to miss manually, including the 120-minute limit, overlapping bookings, and exact room capacity.

The main lesson for me was that AI-generated code still needs verification against the requirements. Next, I would add automated browser tests for room switching and filtering. The current application also uses fictional bookings and a fixed current time, which limits it to demonstration purposes.
