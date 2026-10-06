# Week 05 — Lab report

**Name:** Khalenov Birzhan

**Group:** Monday 16:00-19:00 / 25B030042

**Date:** 2026-10-06

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

|                                               |                         |
|-----------------------------------------------|-------------------------|
| Assistant (tool)                              | Gemini                  |
| **Exact** model name                          | Gemini 3.6 Flash        |
| Language and version                          | Python 3.13.5           |
| Path                                          | A                       |
| My Week 04 declaration for touching bookings  | allowed                 |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
### Implementation Plan for `can_book`

#### 1. Explicit Assumptions

* **Time Scale & Types:** All time values (`start`, `end`, `now`) are integers representing minutes since midnight ($0$ to $1440$).
* **Data Structures:** `existing` is a sequence (list or tuple) containing valid `(e_start, e_end)` integer tuples for active bookings. `blocked` is a boolean.
* **Mutability:** The function must not modify input data structures (e.g., `existing`).

---

#### 2. Ordered Logic Checks

1. **AC3 Check (Block State):**
* If `blocked` is `True`, immediately return `False`.


2. **AC1 Check (Valid Time Range & Future Booking):**
* Check bounds: $0 \le \text{start} < \text{end} \le 1440$.
* Check start time relative to current time: $\text{start} > \text{now}$.
* If any of these fail, return `False`.


3. **AC2 Check (Duration Limit):**
* Check duration: $(\text{end} - \text{start}) \le 120$.
* If exceeded, return `False`.


4. **AC4 Check (Overlap Detection):**
* Iterate through each `(e_start, e_end)` in `existing`.
* Overlap exists if $\max(\text{start}, \text{e\_start}) < \min(\text{end}, \text{e\_end})$.
* If an overlap is found, return `False`.


5. **AC5 Check (Success):**
* If all previous checks pass without returning, return `True`.



---

#### 3. Boundary Test Cases

| Case ID | Scenario / Boundary | Inputs (`start`, `end`, `now`, `blocked`, `existing`) | Expected | Target Vulnerability |
| --- | --- | --- | --- | --- |
| **B1** | Immediate start after `now` | `start=601`, `end=660`, `now=600`, `False`, `[]` | `True` | Checks if strict inequality $\text{start} > \text{now}$ is enforced vs. $\ge$. |
| **B2** | Same-minute booking | `start=600`, `end=660`, `now=600`, `False`, `[]` | `False` | Catching invalid `start == now` attempts. |
| **B3** | Maximum allowed duration | `start=100`, `end=220`, `now=0`, `False`, `[]` | `True` | Boundary condition $(\text{end} - \text{start}) = 120$. |
| **B4** | Exceeding duration by 1 min | `start=100`, `end=221`, `now=0`, `False`, `[]` | `False` | Over-duration handling ($121$ minutes). |
| **B5** | End of day limit | `start=1320`, `end=1440`, `now=1200`, `False`, `[]` | `True` | Validating maximum possible boundary ($\text{end} = 1440$). |
| **B6** | Out of bounds end time | `start=1330`, `end=1441`, `now=1200`, `False`, `[]` | `False` | Validating boundary upper limit ($\text{end} > 1440$). |
| **B7** | Endpoint touching (Before) | New: `(500, 600)`, Existing: `[(600, 700)]` | `True` | Validating that touching endpoints ($\text{end} = \text{e\_start}$) do not count as overlap. |
| **B8** | Endpoint touching (After) | New: `(700, 800)`, Existing: `[(600, 700)]` | `True` | Validating that touching endpoints ($\text{start} = \text{e\_end}$) do not count as overlap. |
| **B9** | Partial overlap (1 min) | New: `(599, 660)`, Existing: `[(600, 700)]` | `False` | Off-by-one interval inclusion errors. |
| **B10** | Existing interval inside | New: `(500, 700)`, Existing: `[(550, 650)]` | `False` | Enclosing interval check failures. |
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | The plan said that all time values, including `now`, are integers from 0 to 1440. | The contract says `now` is valid from 0 to 1439. AC1 allows the booking `end` to be 1440. | I did not add the 0–1440 rule for `now`; I followed the contract and AC1. |
| 2 | The plan said that `existing` can be a list or tuple containing booking tuples. | The contract only specifies that `existing` contains valid `(start, end)` tuples. It does not add a list/tuple requirement for the container. | I did not add an extra container-type rule. |



**Boundary cases the assistant suggested that I kept as tests:**

- Start exactly one minute after `now` (`start > now`) — AC1.
- Start exactly at `now` — AC1.
- Exactly 120 minutes — AC2.
- 121 minutes — AC2.
- `end = 1440` — AC1.
- `end = 1441` — AC1.
- Touching at the end of an existing booking — AC4.
- Touching at the start of an existing booking — AC4.
- Partial overlap — AC4.
- An existing booking inside the requested interval — AC4.

---



## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.<ext>`, exactly as the assistant returned it: yes

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if blocked:` | AC3 | Yes. Returns `False` when the room is blocked. |
| 2 | `if not (0 <= start < end <= 1440 and start > now):` | AC1 | Yes. Checks valid time range and requires the booking to start after `now`. |
| 3 | `if (end - start) > 120:` | AC2 | Yes. Rejects bookings longer than 120 minutes. |
| 4 | `if max(start, e_start) < min(end, e_end):` | AC4 | Yes. Rejects overlapping bookings while allowing touching endpoints. |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

- None. The implementation stays within the stated AC1–AC5 scope.
 


---


## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| #    | Test name                                     | Request (start, end) | What differs from the base input | Expected | AC   | Result on v1 | Result on final |
|------|-----------------------------------------------|----------------------|----------------------------------|----------|------|--------------|-----------------|
| 1    | Touching end is allowed                       | (660, 720)           | —                                | True     | AC4  | True         | True            |
| 2    | Exactly 120 minutes is allowed                | (720, 840)           | —                                | True     | AC2  | True         | True            |
| 3    | Partial overlap is rejected                   | (630, 690)           | —                                | False    | AC4  | False        | False           |
| 4    | More than 120 minutes is rejected             | (720, 841)           | —                                | False    | AC2  | False        | False           |
| 5    | Blocked room is rejected                      | (660, 720)           | `blocked=True`                   | False    | AC3  | False        | False           |
| 6    | Start exactly at now is rejected              | (540, 570)           | —                                | False    | AC1  | False        | False           |
| 7    | Zero-length booking is rejected               | (600, 600)           | `existing=[]`                    | False    | AC1  | False        | False           |
| 8    | Reversed interval is rejected                 | (700, 600)           | `existing=[]`                    | False    | AC1  | False        | False           |
| 9    | End at 1440 is allowed                        | (1320, 1440)         | `now=1200, existing=[]`          | True     | AC1  | True         | True            |
| 10   | End after 1440 is rejected                    | (1320, 1441)         | `now=1200, existing=[]`          | False    | AC1  | False        | False           |
| 11   | Empty existing bookings allow a valid booking | (600, 660)           | `existing=[]`                    | True     | AC4  | True         | True            |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.


| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `can_book(600, 600, 540, False, [])` | `False` | `False` | `if not (0 <= start < end <= 1440 and start > now):` correctly rejects a zero-length interval because `start < end` is false. | No change needed. | No fix proposed; the original AI implementation already handles this edge case. |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
Here are the issues found in the implementation relative to the contract and acceptance criteria:

1. **Tuple unpacking assumes exactly 2 elements per item in `existing**`
* **Line:** `for e_start, e_end in existing:`
* **Violation:** Contract (`can_book(start, end, now, blocked, existing)`).
* **Issue:** The contract specifies that `existing` contains `(start, end)` tuples, but does not guarantee every element in a caller-provided iterable will be a valid length-2 sequence. If an invalid tuple or non-iterable is passed, unpacking fails before AC evaluation.


2. **No validation of element types or contents within `existing**`
* **Line:** `if max(start, e_start) < min(end, e_end):`
* **Violation:** Contract (`existing contains valid (start, end) tuples for this room's active bookings only`).
* **Issue:** Assuming elements in `existing` are numeric types without verifying causes runtime `TypeError` or unexpected behavior if invalid values leak into `existing`.


3. **No validation of `start` and `end` parameter types**
* **Line:** `if not (0 <= start < end <= 1440 and start > now):`
* **Violation:** AC1 (`0 <= start < end <= 1440, and start > now`) / Function contract.
* **Issue:** The logic directly compares `start`, `end`, and `now` using comparison operators without validating that `start` and `end` are integers, potentially raising `TypeError` if incompatible types are passed.


4. **No upper bound check for `now` parameter**
* **Line:** `if not (0 <= start < end <= 1440 and start > now):`
* **Violation:** Function contract (`now is valid (0-1439)`).
* **Issue:** The check enforces `start > now` and $0 \le \text{start}$, but does not explicitly guard against an invalid `now` value outside $[0, 1399]$ if $now \ge 1440$ is supplied.


5. **Type annotations on the function signature restrict general sequences**
* **Line:** `def can_book(start: int, end: int, now: int, blocked: bool, existing: list[tuple[int, int]]) -> bool:`
* **Violation:** Function contract (`can_book(start, end, now, blocked, existing)`).
* **Issue:** Annotating `existing` strictly as `list[tuple[int, int]]` rejects other valid sequence types (such as `tuples` or custom iterables) that satisfy the contract requirement.

```

| #    | Suggestion                                                         | accept / reject | Reason — cite the AC or the contract line                                                                                                                                                                      | Suite after the change          |
|------|--------------------------------------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| 1    | Tuple unpacking assumes exactly 2 elements per item in `existing`. | reject          | The contract states that `existing` contains valid `(start, end)` tuples. Invalid tuple shapes are outside the stated input contract, so extra validation is not required.                                     | No change; 18 tests still pass. |
| 2    | No validation of element types or contents within `existing`.      | reject          | The contract states that `existing` contains valid `(start, end)` tuples. The function is not required to validate invalid input outside the contract.                                                         | No change; 18 tests still pass. |
| 3    | No validation of `start` and `end` parameter types.                | reject          | The contract defines the time values as integer minutes. AC1 specifies the valid time condition `0 <= start < end <= 1440` and `start > now`; separate type validation is not required.                        | No change; 18 tests still pass. |
| 4    | No upper bound check for `now`.                                    | reject          | The contract says `now` is valid in `0–1439`, but for `now >= 1440`, AC1 already makes every valid booking fail because `start <= 1439`, so an explicit upper-bound check does not change the function result. | No change; 18 tests still pass. |
| 5    | Type annotation on `existing` restricts general sequences.         | reject          | The supplied Python mapping specifies `existing` as a list of `(start, end)` tuples. The annotation does not add a booking rule that conflicts with AC1–AC5.                                                   | No change; 18 tests still pass. |


---
## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | No change to `booking.py`; v1 remained the final implementation. | The v1 implementation satisfied AC1–AC5. I expanded my own test suite with additional boundary, overlap, and input-unchanged tests. | `python3.13 -m unittest -v` → 18 tests passed. |
---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
test_blocked_room_is_rejected (test_booking.BookingTests.test_blocked_room_is_rejected) ... ok
test_empty_existing_bookings (test_booking.BookingTests.test_empty_existing_bookings) ... ok
test_end_after_1440_is_rejected (test_booking.BookingTests.test_end_after_1440_is_rejected) ... ok
test_end_at_1440_is_allowed (test_booking.BookingTests.test_end_at_1440_is_allowed) ... ok
test_exactly_two_hours_is_allowed (test_booking.BookingTests.test_exactly_two_hours_is_allowed) ... ok
test_existing_booking_inside_request_is_rejected (test_booking.BookingTests.test_existing_booking_inside_request_is_rejected) ... ok
test_existing_bookings_are_unchanged (test_booking.BookingTests.test_existing_bookings_are_unchanged) ... ok
test_existing_bookings_unchanged_after_overlap_check (test_booking.BookingTests.test_existing_bookings_unchanged_after_overlap_check) ... ok
test_over_two_hours_is_rejected (test_booking.BookingTests.test_over_two_hours_is_rejected) ... ok
test_partial_overlap_is_rejected (test_booking.BookingTests.test_partial_overlap_is_rejected) ... ok
test_request_inside_existing_booking_is_rejected (test_booking.BookingTests.test_request_inside_existing_booking_is_rejected) ... ok
test_reversed_interval_is_rejected (test_booking.BookingTests.test_reversed_interval_is_rejected) ... ok
test_same_interval_as_existing_booking_is_rejected (test_booking.BookingTests.test_same_interval_as_existing_booking_is_rejected) ... ok
test_start_before_day_is_rejected (test_booking.BookingTests.test_start_before_day_is_rejected) ... ok
test_start_must_be_after_now_at_day_end (test_booking.BookingTests.test_start_must_be_after_now_at_day_end) ... ok
test_starting_at_now_is_rejected (test_booking.BookingTests.test_starting_at_now_is_rejected) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_zero_length_booking_is_rejected (test_booking.BookingTests.test_zero_length_booking_is_rejected) ... ok

----------------------------------------------------------------------
Ran 18 tests in 0.000s

OK
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
Week 05 - can_book: the function, your tests, the evidence   (Path A)

PASS   F1   the six cases from the task table           6 of 6 cases
PASS   F2   AC1 time order and day bounds               5 of 5 cases
PASS   F3   AC1 the start is in the future              5 of 5 cases
PASS   F4   AC2 at most 120 minutes                     3 of 3 cases
PASS   F5   AC3 a blocked room accepts nothing          2 of 2 cases
PASS   F6   AC4 every kind of overlap is rejected       5 of 5 cases
PASS   F7   AC4 touching endpoints are allowed          3 of 3 cases
PASS   F8   AC4 every existing booking is checked       4 of 4 cases
PASS   F9   AC5 the result is a real Boolean            3 of 3 cases
PASS   F10  AC5 the inputs are left unchanged           2 of 2 cases
PASS   O1   the assistant's first version is kept       v1 kept (32 lines)
PASS   S1   your suite has at least 11 tests            18 tests
PASS   S2   your suite is green on your own code        18 tests, OK
PASS   M1   your tests catch a fault in AC1             caught by test_start_must_be_after_now_at_day_end, test_starting_at_now_is_rejected
FAIL   M2   your tests catch a fault in AC1             NOT caught - a can_book that breaks AC1 passed all 18 of your tests that follow the contract
PASS   M3   your tests catch a fault in AC1             caught by test_zero_length_booking_is_rejected
PASS   M4   your tests catch a fault in AC2             caught by test_end_at_1440_is_allowed, test_exactly_two_hours_is_allowed
PASS   M5   your tests catch a fault in AC3             caught by test_blocked_room_is_rejected
PASS   M6   your tests catch a fault in AC4             caught by test_touching_end_is_allowed
FAIL   M7   your tests catch a fault in AC4             NOT caught - a can_book that breaks AC4 passed all 18 of your tests that follow the contract
PASS   M8   your tests catch a fault in AC4             caught by test_existing_booking_inside_request_is_rejected
PASS   M9   your tests catch a fault in AC5             caught by test_existing_bookings_are_unchanged
FAIL   M10  your tests catch a fault in AC5             NOT caught - a can_book that breaks AC5 passed all 18 of your tests that follow the contract
PASS   L1   report 1: tool, model and language          tool, model and language recorded
PASS   L2   report 2: the plan, and what you corrected  plan pasted, 12 row(s) on what you corrected or verified
PASS   L3   report 3: v1 mapped to AC1-AC4              4 conditions mapped, AC1-AC4 all present
PASS   L4   report 4: at least 11 tests listed
PASS   L5   report 5: debugging evidence
PASS   L6   report 6: critique pasted, 5 points judged
PASS   L7   report 7: change log
PASS   L8   report 8.1: real output of your suite
PASS   L9   report 10: conclusion of 120-180 words

SUMMARY pass=29 fail=3 error=0
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---


## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays                                                                                                                  |
|-------|-------------------------------------------------------------------------------------------------------------------------------|
| M2    | My test suite did not catch one faulty implementation that breaks AC1. The final implementation itself passes the AC1 checks. |
| M7    | My test suite did not catch one faulty implementation that breaks AC4. The final implementation itself passes the AC4 checks. |
| M10   | My test suite did not catch one faulty implementation that breaks AC5. The final implementation itself passes the AC5 checks. |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

- The function does not explicitly validate non-integer time values. A value such as `600.5` can be compared and used in the calculations, while a string such as `"600"` can cause a `TypeError` during the comparisons or arithmetic. This is acceptable because the contract specifies that time values are integers, so non-integer inputs are outside the required input domain.

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

- The upper bound `now <= 1439` can never be the only reason a request is rejected. If `now` were 1440 or greater, a valid booking must still have `start <= 1439`, so the AC1 condition `start > now` would already be false. Therefore, checking the upper bound of `now` separately would not change the result for a booking request.


---


## 10. Conclusion (120–180 words)

This practice helped me understand how AI-assisted coding can be used together with software engineering practices. I used Gemini to create the first implementation of the `can_book` function and checked it against the acceptance criteria. I kept the original AI version unchanged and created tests for valid bookings, invalid time ranges, duration, blocked rooms, overlaps, touching endpoints, and unchanged input data. The final implementation passed all functional checks from F1 to F10 and my test suite also passed. M2, M7, and M10 remained undetected, so I reported them honestly.

### Answers

**(a)** The overlap condition `max(start, e_start) < min(end, e_end)` finds whether the intervals have a real common part. If the values are equal, the bookings only touch, so touching is allowed.

**(b)** M2, M7, and M10 were not detected because my tests did not target the exact behaviour changed by those faulty implementations.

**(c)** I decided how to handle non-integer time values. They are outside the contract, so I did not add extra validation.
