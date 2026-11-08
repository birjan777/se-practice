# Week 08 — Lab report

**Name:** Khalenov Birzhan

**Group:**
Monday 16:00-19-00

**Date:** 08.11.2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

|                                                                                             |                          |
|---------------------------------------------------------------------------------------------|--------------------------|
| Assistant I debugged with (tool)                                                            | not displayed            |
| Exact model (with its version, or `not displayed`)                                          | not displayed            |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | prompt-only simulation   |
| Where I ran the tests (Bolt terminal / my computer / Codespace)                             | my computer              |
| Vitest version (the `RUN  v…` line of a run)                                                | Vitest 3.2.7             |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/`              | 3.2.7                    |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text

 RUN  v3.2.7 /Users/khalenovbirzhan/Documents/se-practice/week-08/app

 ✓ src/booking.test.ts (17 tests) 9ms
   ✓ canBook function test suite (AC1–AC5) > T01: 660–720 (touching after) should be allowed 2ms
   ✓ canBook function test suite (AC1–AC5) > T02: 540–570 (starts now) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T03: 720–720 (zero duration) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T04: 750–720 (reversed) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T05: 1380–1441 (past day end) should be rejected 1ms
   ✓ canBook function test suite (AC1–AC5) > T06: 720–840 (120 minutes) should be allowed 0ms
   ✓ canBook function test suite (AC1–AC5) > T07: 720–841 (121 minutes) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T08: 570–600 (touching before) should be allowed 0ms
   ✓ canBook function test suite (AC1–AC5) > T09: 630–690 (partial overlap) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T10: 570–690 (contains booking) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T11: 615–645 (inside booking) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T12: 600–660 (identical interval) should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T13: 660–720, blocked = true should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > T14: 630–690, bookings = [] should be allowed 0ms
   ✓ canBook function test suite (AC1–AC5) > AC5: Available request leaves bookings array unchanged 1ms
   ✓ canBook function test suite (AC1–AC5) > X1: 0–60; now = 0, blocked = false, bookings = [] should be rejected 0ms
   ✓ canBook function test suite (AC1–AC5) > X2: 1380–1440; now = 540, blocked = false, bookings = [] should be allowed 0ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  18:33:06
   Duration  520ms (transform 52ms, setup 0ms, collect 61ms, tests 9ms, environment 0ms, prepare 99ms)

```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
RUN  v3.2.7 /Users/khalenovbirzhan/Documents/se-practice/week-08/app

 ❯ src/booking.test.ts (17 tests | 3 failed) 7ms
× canBook function test suite (AC1–AC5) > T01: 660–720 (touching after) should be allowed 4ms
→ expected false to be true // Object.is equality
✓ canBook function test suite (AC1–AC5) > T02: 540–570 (starts now) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T03: 720–720 (zero duration) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T04: 750–720 (reversed) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T05: 1380–1441 (past day end) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T06: 720–840 (120 minutes) should be allowed 0ms
✓ canBook function test suite (AC1–AC5) > T07: 720–841 (121 minutes) should be rejected 0ms
× canBook function test suite (AC1–AC5) > T08: 570–600 (touching before) should be allowed 0ms
→ expected false to be true // Object.is equality
✓ canBook function test suite (AC1–AC5) > T09: 630–690 (partial overlap) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T10: 570–690 (contains booking) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T11: 615–645 (inside booking) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T12: 600–660 (identical interval) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T13: 660–720, blocked = true should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T14: 630–690, bookings = [] should be allowed 0ms
× canBook function test suite (AC1–AC5) > AC5: Available request leaves bookings array unchanged 1ms
→ expected [ { start: 800, end: 860 }, …(1) ] to deeply equal [ { start: 800, end: 860 } ]
✓ canBook function test suite (AC1–AC5) > X1: 0–60; now = 0, blocked = false, bookings = [] should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > X2: 1380–1440; now = 540, blocked = false, bookings = [] should be allowed 0ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > T01: 660–720 (touching after) should be allowed
AssertionError: expected false to be true // Object.is equality
- Expected
- Received
- true
- false
 ❯ src/booking.test.ts:10:20
8|     const bookings = [{ start: 600, end: 660 }];
9|     const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
10|     expect(result).toBe(true);
|                    ^
11|   });
12| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > T08: 570–600 (touching before) should be allowed
AssertionError: expected false to be true // Object.is equality
- Expected
- Received
- true
- false
 ❯ src/booking.test.ts:53:20
51|     const bookings = [{ start: 600, end: 660 }];
52|     const result = canBook({ start: 570, end: 600, now: DEFAULT_NOW, blocked: false, bookings });
53|     expect(result).toBe(true);
|                    ^
54|   });
55| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > AC5: Available request leaves bookings array unchanged
AssertionError: expected [ { start: 800, end: 860 }, …(1) ] to deeply equal [ { start: 800, end: 860 } ]
- Expected
- Received
  [
  {
  "end": 860,
  "start": 800,
  
  },
- {
- "end": 720,
- "start": 660,
- },
  ]
 ❯ src/booking.test.ts:97:22
95|     const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
96|     expect(result).toBe(true);
97|     expect(bookings).toEqual(initialBookings);
|                      ^
98|   });
99| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯

 Test Files  1 failed (1)
Tests  3 failed | 14 passed (17)
Start at  18:56:41
Duration  242ms (transform 27ms, setup 0ms, collect 24ms, tests 7ms, environment 0ms, prepare 41ms)

```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
RUN  v3.2.7 /Users/khalenovbirzhan/Documents/se-practice/week-08/app

 ❯ src/booking.test.ts (19 tests | 5 failed) 7ms
× canBook function test suite (AC1–AC5) > T01: 660–720 (touching after) should be allowed 4ms
→ expected false to be true // Object.is equality
✓ canBook function test suite (AC1–AC5) > T02: 540–570 (starts now) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T03: 720–720 (zero duration) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T04: 750–720 (reversed) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T05: 1380–1441 (past day end) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T06: 720–840 (120 minutes) should be allowed 0ms
✓ canBook function test suite (AC1–AC5) > T07: 720–841 (121 minutes) should be rejected 0ms
× canBook function test suite (AC1–AC5) > T08: 570–600 (touching before) should be allowed 0ms
→ expected false to be true // Object.is equality
✓ canBook function test suite (AC1–AC5) > T09: 630–690 (partial overlap) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T10: 570–690 (contains booking) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T11: 615–645 (inside booking) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T12: 600–660 (identical interval) should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T13: 660–720, blocked = true should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > T14: 630–690, bookings = [] should be allowed 0ms
× canBook function test suite (AC1–AC5) > AC5: Available request leaves bookings array unchanged 1ms
→ expected [ { start: 800, end: 860 }, …(1) ] to deeply equal [ { start: 800, end: 860 } ]
✓ canBook function test suite (AC1–AC5) > X1: 0–60; now = 0, blocked = false, bookings = [] should be rejected 0ms
✓ canBook function test suite (AC1–AC5) > X2: 1380–1440; now = 540, blocked = false, bookings = [] should be allowed 0ms
× canBook function test suite (AC1–AC5) > BUG-A: allows a request touching bookings at both ends 0ms
→ expected false to be true // Object.is equality
× canBook function test suite (AC1–AC5) > BUG-B: leaves bookings unchanged for an available request 0ms
→ expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > T01: 660–720 (touching after) should be allowed
AssertionError: expected false to be true // Object.is equality
- Expected
- Received
- true
- false
 ❯ src/booking.test.ts:10:20
8|     const bookings = [{ start: 600, end: 660 }];
9|     const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
10|     expect(result).toBe(true);
|                    ^
11|   });
12| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/5]⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > T08: 570–600 (touching before) should be allowed
AssertionError: expected false to be true // Object.is equality
- Expected
- Received
- true
- false
 ❯ src/booking.test.ts:53:20
51|     const bookings = [{ start: 600, end: 660 }];
52|     const result = canBook({ start: 570, end: 600, now: DEFAULT_NOW, blocked: false, bookings });
53|     expect(result).toBe(true);
|                    ^
54|   });
55| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/5]⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > AC5: Available request leaves bookings array unchanged
AssertionError: expected [ { start: 800, end: 860 }, …(1) ] to deeply equal [ { start: 800, end: 860 } ]
- Expected
- Received
  [
  {
  "end": 860,
  "start": 800,
  
  },
- {
- "end": 720,
- "start": 660,
- },
  ]
 ❯ src/booking.test.ts:97:22
95|     const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
96|     expect(result).toBe(true);
97|     expect(bookings).toEqual(initialBookings);
|                      ^
98|   });
99| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/5]⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > BUG-A: allows a request touching bookings at both ends
AssertionError: expected false to be true // Object.is equality
- Expected
- Received
- true
- false
 ❯ src/booking.test.ts:126:20
124|     });
125|
126|     expect(result).toBe(true);
|                    ^
127|   });
128| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/5]⎯

 FAIL  src/booking.test.ts > canBook function test suite (AC1–AC5) > BUG-B: leaves bookings unchanged for an available request
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]
- Expected
- Received
  [
  {
  "end": 660,
  "start": 600,
  
  },
- {
- "end": 780,
- "start": 720,
- },
  ]
 ❯ src/booking.test.ts:142:22
140|
141|     expect(result).toBe(true);
142|     expect(bookings).toEqual(before);
|                      ^
143|   });
144| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/5]⎯

 Test Files  1 failed (1)
Tests  5 failed | 14 passed (19)
Start at  19:51:02
Duration  306ms (transform 31ms, setup 0ms, collect 24ms, tests 7ms, environment 0ms, prepare 48ms)

```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input                                                                               | Expected                              | Actual                                                               | Suspected cause (line and why)                                                                                                                                               |
|--------|---------|-------------------------------------------------------------------------------------|---------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BUG-A  | T01     | start=660, end=720, now=DEFAULT_NOW, blocked=false, bookings=[{start:600, end:660}] | true                                  | false                                                                | The overlap check uses <= and >=, so a request that ends when an existing booking starts—or starts when one ends—is treated as overlapping and returns false, violating AC4. |
| BUG-B  | AC5     | start=660, end=720, now=DEFAULT_NOW, blocked=false, bookings=[{start:800, end:860}] | true; bookings остаётся без изменений | Результат true, но в bookings добавлен интервал {start:660, end:720} | The line with bookings.push({ start, end }) mutates the original bookings array before returning true, so the available slot is added to the input list, violating AC5.      |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check                                                                       | yes / no |
|-----------------------------------------------------------------------------|----------|
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes      |
| The first and the closing YAML delimiter are exactly three hyphens: `---`   | yes      |
| `name` is lowercase with hyphens, and `description` says WHEN to use it     | yes      |
| I read the whole file once: no passwords, API keys or private student data  | yes      |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
Archive:  bug-detector.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  11-08-2026 20:03   bug-detector/
        0  10-31-2026 17:36   bug-detector/.gitkeep
      569  11-08-2026 20:03   bug-detector/SKILL.md
---------                     -------
      569                     3 files
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->
I used a prompt-only simulation in a fresh ChatGPT chat. The skill was not installed or shown as enabled. I used this fallback because the Skills upload option was unavailable in the environment I used. Screenshot: evidence/install.png.

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->
