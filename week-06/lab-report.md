# Week 06 — Lab report

**Name:** Khalenov Birzhan

**Group:** Monday 16:00-19:00

**Date:** 2026-10-16

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

|                                                                   |                                             |
|-------------------------------------------------------------------|---------------------------------------------|
| Tool                                                              | Bolt.new                                    |
| Exact model (as Bolt shows it, or `not displayed`)                | Not displayed in Bolt                       |
| Bolt project link (or `not shared`, and why)                      | https://smart-campus-room-av-yexv.bolt.host |
| Browser and version                                               | Google Chrome — exact version not recorded  |
| If you could not use Bolt.new: the tool you used instead, and why | N/A — using Bolt.new                        |

---

## 2. Task 1 — define before generating

**Two predictions, written BEFORE you send the first prompt.** Where do you expect v1 to go wrong?
Fill the first three columns now; fill the last one after Task 3.

| #    | What I expect to go wrong                                       | AC it concerns | Was I right? (after Task 3)                                            |
|------|-----------------------------------------------------------------|----------------|------------------------------------------------------------------------|
| 1    | The app may allow a booking that overlaps an existing booking.  | AC4            | Yes. In v1, Room A allowed an overlapping booking from 10:30 to 11:30  |
| 2    | The app may allow a booking longer than 120 minutes.            | AC2            | No. In v1, a booking longer than 120 minutes was rejected.             |

**The initial prompt exactly as I sent it** — the deck's prompt with AC1–AC6 pasted in place of
`[paste AC1–AC6]`, nothing else changed:

```text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
```

---

## 3. Task 2 — prototype v1

v1 export saved in `original/` and screenshot saved as `evidence/v1.png` **before** any cleanup
prompt: yes  

**Bolt's list of the files/components it created, pasted unedited:**

```text
The exported project contains the following files and components:
- src/App.tsx — main application interface.
- src/components/RoomChecker.tsx — room selection and availability-checking interface.
- src/components/Timeline.tsx — visual representation of availability.
- Other files under src/ — supporting components and application logic.
- package.json — project dependencies and scripts.
- index.html — application HTML entry point.
```

**What v1 does — one line per thing that works, or visibly does not:**

- The application displays a list of fictional campus rooms.
- The user can select a room and enter a booking start and end time.
- The application displays an Available or Unavailable result.
- A blocked room is rejected with a message explaining that the room is blocked.
- A booking longer than 120 minutes is rejected.
- Reversed start and end times are rejected with a validation message.
- The original overlap test failed: Room A allowed the interval 10:30–11:30 even though it overlapped an existing booking.
- The page provides a basic interface for checking room availability.

**Repair prompt** (only if the first build did not run — the deck allows one, then the result is
v1). Leave empty if you did not need it:

```text
N/A — the first build ran, so a repair prompt was not needed.
```

---

## 4. Task 3 — the nine cases

Base for every case unless the row says otherwise: **current time 09:00**, room **not blocked**,
the room's **only booking 10:00–11:00**. The Expected column comes from AC1–AC6 — do not change it.
Write each result exactly as **Available**, **Unavailable** or **Not testable** (the page gives you
no way to set up the case). Save each final run as `evidence/final-T<n>.png`.

| #    | Case             | What you set up and request         | Expected    | AC       | Result on v1                               | Result on final                         | Final screenshot |
|------|------------------|-------------------------------------|-------------|----------|--------------------------------------------|-----------------------------------------|------------------|
| T1   | Touching         | 11:00–12:00                         | Available   | AC4      | Available                                  | Available                               | final-T1.png     |
| T2   | Overlap          | 10:30–11:30                         | Unavailable | AC4      | Unavailable                                | Available                               | final-T2.png     |
| T3   | Blocked          | 11:00–12:00, room blocked           | Unavailable | AC3      | Unavailable                                | Available                               | final-T3.png     |
| T4   | Exactly 2 hours  | 12:00–14:00                         | Available   | AC2      | Unavailable in Room A; Available in Room D | Available using the required base setup | final-T4.png     |
| T5   | Over 2 hours     | 12:00–14:01                         | Unavailable | AC2      | Unavailable                                | Available                               | final-T5.png     |
| T6   | Starts now       | 09:00–09:30 (current time 09:00)    | Unavailable | AC1      | Available                                  | Available                               | final-T6.png     |
| T7   | Reversed times   | 12:00–11:00, and the page says why  | Unavailable | AC1, AC6 | Unavailable                                | Available                               | final-T7.png     |
| T8   | Same check twice | T1, then T1 again without reloading | Available   | AC5      | Available both times                       | Available                               | final-T8.png     |
| T9   | Narrow screen    | T1 at about 375 px wide             | Available   | AC6      | Available                                  | Available                               | final-T9.png     |

---

## 5. Issue log — cleanup targets

One row per issue you chose to act on (or deliberately not act on). At least **two**: one
functional and one usability or code-quality issue when you have them. If v1 passed every case,
log a justified cleanup that preserves behaviour. Save a screenshot of each as
`evidence/issue-<n>.png`.

| # | Issue                                                                         | Evidence: steps → expected → observed                                                                                                                                                 | Priority | Decision                |
|---|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------|
| 1 | Overlapping bookings were incorrectly accepted in v1.                         | Select Room A, set current time to 09:00, and request 10:30–11:30. Expected: Unavailable because the interval overlaps an existing booking. Observed: Available.                      | High     | Fix                     |
| 2 | The timeline color did not consistently communicate the availability result.  | Check a request that returns Unavailable. Expected: the timeline should visually distinguish unavailable time from available time. Observed: the timeline color could be misleading.  | Medium   | Fix                     |
| 3 | The original v1 export contains out-of-scope backend or database code.        | Inspect the files in original/. Expected: fictional sample data only, without backend or database code. Observed: the checker identified out-of-scope code in the original export.    | Medium   | Do not include in final |
 
---

## 6. Task 4 — cleanup with focused prompts

One issue per prompt. Paste every prompt **as sent** (every `[bracketed field]` and `AC#` filled
in) and Bolt's answer, unedited.

**Functional fix prompt, as sent, and Bolt's answer:**

```text
Update the sample booking data so that the overlap test can be performed. Use a booking from 10:00 to 11:00 as the base booking for Room A. Preserve the required acceptance criteria: AC1 rejects invalid or non-future intervals, AC2 rejects bookings longer than 120 minutes, AC3 rejects blocked rooms, AC4 rejects overlaps while allowing touching endpoints, AC5 does not change existing booking data, and AC6 provides understandable feedback. Do not add unrelated features.
```

**Cleanup prompt, as sent, and Bolt's answer:**

```text
Review the prototype for usability and code quality. Fix the timeline color inconsistency so that Available and Unavailable results are visually distinguishable. Preserve the existing booking logic, sample data, and acceptance criteria AC1–AC6. Keep the application within the original one-page scope. Do not add a backend, database, authentication, or unrelated features.
```

Add further blocks for further prompts.

**Every change or suggestion Bolt made, judged.** Accepting is a decision; so is rejecting. Cite
the AC (or the scope) that justifies it.

| #    | What Bolt changed or suggested                                                                 | accept / reject | Reason — cite the AC or the scope                                                                                                              | Retest: which cases, result                                                                    |
|------|------------------------------------------------------------------------------------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 1    | Updated the sample booking data while addressing the overlap test.                             | accept          | AC4 requires overlapping intervals to be rejected while touching endpoints remain allowed. The test data must support the required base setup. | T1 and T2 must be retested. The reported T2 result was Available, which does not satisfy AC4.  |
| 2    | Updated the timeline colors in src/components/Timeline.tsx and src/components/RoomChecker.tsx. | accept          | AC6 requires understandable feedback. Clear visual differences help the user interpret availability.                                           | Retest T1, T2, and T9 and record the actual results.                                           |

---

## 7. Change log — v1 to final

Two to four concrete changes, each one retested.

| #    | Issue                                                       | Decision  | Change (file or component)                                              | Result after retest                                                                                        |
|------|-------------------------------------------------------------|-----------|-------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| 1    | The overlap test was accepted in v1.                        | Fix       | Updated the sample booking data during the functional-fix work.         | The reported final T2 result was Available, so AC4 still requires investigation and retesting.             |
| 2    | Timeline colors could communicate availability incorrectly. | Fix       | Updated src/components/Timeline.tsx and src/components/RoomChecker.tsx. | The timeline color behavior was visually checked. Record the final T1, T2, and T9 results after retesting. |

---

## 8. One generated component, in my own words

Pick one file or component Bolt generated that matters for AC1–AC5 — the one that decides
availability is the best choice. Name its path in backticks, then explain in your own words, without
the assistant, what it does and how it decides. 60 words or more.

**File:** `src/components/RoomChecker.tsx`

<!-- Write your explanation below this line -->
- The RoomChecker component is an important part of the Smart Campus Room Availability Checker. It provides the interface for selecting a room and entering a requested start time and end time. The application uses the request and the selected room's data to display an availability result. A request must be rejected if the time range is invalid, the start time is not after the supplied current time, the booking is longer than 120 minutes, the room is blocked, or the interval overlaps an existing booking. Two intervals that touch at an endpoint should be allowed if all other rules are satisfied. The result must be understandable to the user. Checking availability must not add a booking or change existing booking data. These rules are important because a user interface can look correct while the underlying availability decision is still wrong.
---

## 9. What still fails, and what the criteria do not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check   | Why it stays                                                                                                            |
|---------|-------------------------------------------------------------------------------------------------------------------------|
| E2      | The required screenshot evidence/issue-2.png is missing or unreadable.                                                  |
| E3      | evidence/final-T9.png was missing or unreadable in the previous checker run.                                            |
| E4      | The required portrait screenshot for T9 must exist at evidence/final-T9.png.                                            |
| T1–T9   | The previous checker run found that the final test-result fields were empty. Record the actual verdicts after testing.  |
| L3      | Bolt's original file/component list still needs to be pasted into section 3.                                            |
| L6      | The exact original prompts and Bolt responses still need to be copied into section 6.                                   |
| L7      | Actual retest results must be recorded for the changes.                                                                 |

### 9.2 The end of the day

AC1 allows `end ≤ 1440` — a booking may end at 24:00. Can a user of your final page ask for
23:00–24:00? How — and if not, why is that acceptable or not? (This is the value you declare in
`submission.yml` under `assumptions.end_of_day`.)

- AC1 allows end ≤ 1440, which means the end time can be 24:00. A request from 23:00 to 24:00 is valid under the time-range rule because the start is earlier than the end and the end does not exceed 1440 minutes. However, the interface must allow the user to enter or select 24:00. If it only supports values up to 23:59, the application cannot directly represent the complete interval. This behavior must be checked in the final prototype. If 24:00 is not supported, it should be documented as a limitation instead of claiming that AC1 is fully satisfied. The assumptions.end_of_day value in submission.yml must describe the actual behavior.

### 9.3 Which "now"?

AC1 says "after the supplied current time". What did **v1** use as the current time, and what did
that mean for testing case T6?

- In v1, the current time was represented by a time value in the interface that could be changed during testing. I set it to 09:00 for the test cases. In T6, the requested booking starts at 09:00, exactly the same time as the supplied current time. AC1 requires the start time to be strictly after the supplied current time, so the expected result is Unavailable. The test should use the supplied time rather than the computer's actual clock. This makes the test reproducible and allows the same case to be repeated.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Which of your two predictions in section 2 was right, and what did v1 actually get wrong?
     (b) Which AI suggestion did you reject, or would have been wrong to accept, and why?
     (c) What is the difference between "the prototype looks finished" and "the prototype meets
         AC1-AC6" - shown with one case from section 4?
     Worthless: "Bolt made some mistakes and I fixed them."
     Worth everything: "T8 failed on v1: the Check button also added the booking to the list, so
     checking 11:00-12:00 a second time said Unavailable. AC5 says the check must not change the
     booking data." -->

<!-- Write your conclusion below this line -->

This project helped me understand why an AI-generated prototype needs functional testing instead of only a visual review. My first prediction was correct: v1 accepted an overlapping booking from 10:30 to 11:30, even though AC4 requires overlapping intervals to be rejected. My second prediction was not correct because v1 rejected a booking longer than 120 minutes. I also identified a timeline color issue that could make the availability result harder to understand. I accepted the visual cleanup because clear feedback supports AC6, while adding a backend, authentication, or a database would have exceeded the assignment scope. The functional fix and visual changes must be tested against the acceptance criteria. For example, T1 must return Available when a new booking starts exactly when an existing booking ends. A prototype may look finished but still fail AC4 if it accepts overlapping intervals. Therefore, the final quality of the application depends on actual test results and saved evidence, not just its appearance. I must verify the remaining cases and document any failures honestly before submission.