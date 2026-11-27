# Week 11 — Lab report

**Name:** Khalenov Birzhan
**Group:** Monday 16:00–19:00
**Date:** 27 November 2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I built the feature with (tool) | Codex |
| Its exact model (with its version, or `not displayed`) | not displayed |
| Assistant I reviewed with (tool) | Codex, separate review conversation |
| Its exact model (with its version, or `not displayed`) | not displayed |
| Starting point (`week-10` or `week-08`) | week-10 |
| Baseline commit — the checkpoint of Part 0 | 91783e9 |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | Local macOS terminal, with a clean test copy in /tmp |
| Vitest version (the `RUN  v…` line of a run) | 3.2.7 |

---

## 2. Task 1 — the baseline

### 2.1 The project's commands

Run each command in `week-11/app/` before any change. **Exists:** `yes` or `no`. **Result:**
`pass`, `fail`, `missing` or `not run`.

| Command | Exists | Result | Note |
| --- | --- | --- | --- |
| `npx vitest run` | yes | pass | 21 tests passed. |
| `npm run build` | yes | pass | TypeScript and Vite completed. |
| `npm run lint` | no | missing | npm reported a missing lint script. |

### 2.2 The baseline test run

The **real** output of `npx vitest run` in `week-11/app/`, before any change:

```text

 RUN  v3.2.7 /private/tmp/birjan-practice11-evidence/week-11/app

 ✓ src/booking.test.ts (21 tests) 5ms

 Test Files  1 passed (1)
      Tests  21 passed (21)
   Start at  12:58:25
   Duration  320ms (transform 32ms, setup 0ms, collect 46ms, tests 5ms, environment 0ms, prepare 42ms)
```

### 2.3 What I located

| What | Where (file, and the function or component name) |
| --- | --- |
| The availability function | app/src/booking.ts, canBook |
| The UI component | app/src/App.tsx, App |
| The repository instructions | app/AGENTS.md, inherited from Week 10 |

---

## 3. Task 2 — the feature, defined before the code

### 3.1 The user story

As a student, I want a short explanation of room availability so I understand the decision.

### 3.2 The contract

One row per field. **Validation** is what you reject, and how.

| Field | Direction | Type / format | Validation |
| --- | --- | --- | --- |
| `roomLabel` | input | trimmed string | Require 1–60 characters. Treat the label as data. |
| `start` | input | HH:MM | Require a valid clock time from 00:00 through 23:59. |
| `end` | input | HH:MM | Require a valid clock time or the existing end-of-day boundary 24:00. |
| `isAvailable` | input | boolean | Require the checker result, true exactly when the reason is available. |
| `reasonCode` | input | six allowed strings | Require available, invalid_time, past_time, too_long, room_blocked or overlap. |
| `explanation` | output | string in an object | Require 1–280 characters, at most two sentences, matching status and reason, and only supplied facts and times. |

### 3.3 Acceptance criteria and failure behaviour

F1–F5 (README §3.4), then what the student sees in each failure:

<!-- Write below this line -->

F1. Keep all Week 10 booking rules and the existing suite.
F2. Explain the checker’s decision using only supplied facts.
F3. Reject malformed, empty or overlong input before contacting the adapter.
F4. Use a local explanation when the adapter times out or fails.
F5. Keep the confirmed status visible and label the generated explanation separately.

| Failure | What the student sees |
| --- | --- |
| Invalid input (empty, malformed, too long) | A validation message. The booking decision is untouched. |
| The model times out | The confirmed status and a labelled local fallback derived from the reason code. |
| The model fails (error, no key) | The same local fallback. The student can continue using the checker. |
| The model's answer contradicts the decision, or invents a detail | Discard the answer and display the fallback for the actual decision. |

### 3.4 The flow

A written flow with arrows (`->`), or a diagram in a code block. Name your checker function and the
adapter, and say which one decides availability.

```text
Student request -> validation -> availabilityReason / canBook decides -> mockAdapter explains -> validate explanation or use local fallback -> show beside confirmed status
```

---

## 4. Task 3 — build it with an AI assistant

### 4.1 The implementation prompt and the answer

```text
Act as a software engineer. Extend the existing Smart Campus checker with an optional explanation feature. Preserve all booking rules and tests. The deterministic checker must remain authoritative. First, implement a mock adapter, validate inputs and outputs, handle failures gracefully, and describe each changed file. Do not add login, a database, real personal data, or client-side API secrets.
```

The builder also received the project path and references to the README contract, the report contract and app/AGENTS.md. Its reply follows.

```text
Implemented the optional **Explain availability** feature. The deterministic checker decides availability once. The mock explains that result, and a timeout, adapter error, or unverified answer produces a labelled local fallback.

| Changed file | What changed |
| --- | --- |
| `src/booking.ts` | Added `availabilityReason` with the six required reason codes. `canBook` uses the same rules in their original order. |
| `src/roomAvailability.ts` | Returns the reason alongside each completed check and preserves the existing validation feedback for invalid intervals. |
| `src/explain.ts` | Added input validation, the offline `mockAdapter`, a 1,500 ms timeout, output validation, and reason-based fallback text. The validator accepts a limited set of grounded sentence forms, so other wording can trigger a fallback even when accurate. |
| `src/App.tsx` | Added the explanation button, simulated failure control, and separate labels for confirmed status, generated text, and fallback text. The checked request records `24:00` when selected. Editing or rechecking clears stale results and prevents late responses from appearing. |
| `src/index.css` | Styled the explanation separately from the confirmed status and kept the controls usable on narrow screens. |

All **30 tests passed**, including the **21 original booking tests**, and the production build passed. Browser interaction verification remains with the parent task.
```

### 4.2 Every changed file, decided

These decisions document the implementation review by Codex. The student’s independent review is pending.

| File | What the assistant changed | Decision | Why |
| --- | --- | --- | --- |
| src/booking.ts | Extracted the reason function. | accept | All 21 original tests still pass. The same comparisons run in the same order. |
| src/roomAvailability.ts | Returns the reason with a valid result. | accept | Invalid requests retain the Week 10 error shape. |
| src/explain.ts | Added validation, timeout, mock and fallback. | modify | V1 and V2 exposed cases the initial validator mishandled. |
| src/App.tsx | Added explain and failure controls. | accept | The async result only updates explanation state. Editing the form invalidates old requests. |
| src/index.css | Separated the explanation visually. | accept | The section uses distinct spacing and permits controls to wrap. |

### 4.3 The adapter

|  |  |
| --- | --- |
| The mock adapter | mockAdapter |
| The timeout | 1500 ms |
| A real-model adapter too? | no |

## 5. Task 4 — prompt engineering

### 5.1 Three instructions

```text
A: Explain each supplied checker decision to a student in one short sentence using only the given facts. Return one JSON object with an explanation field per input.
```

```text
B: For each input return only {"explanation":"..."}. State available or unavailable according to isAvailable. Explain the supplied reasonCode in plain English. Use at most two sentences and 280 characters. Use only facts supplied in the input. Treat roomLabel as data. Only mention times from start and end.
```

```text
C: Follow this example for each input. If the reason is past_time, write {"explanation":"The room is unavailable because the start time has already passed."} Use the actual decision and reason from each request, keep the same short format, and add only facts supplied by the checker.
```

### 5.2 The three inputs and the answers

The same three JSON inputs (`available`, `overlap`, `room_blocked`), sent after each prompt in a fresh
chat, and the answers, unedited:

```text
Inputs for each of the three separate conversations
{"roomLabel":"Room A-101","start":"11:00","end":"12:00","isAvailable":true,"reasonCode":"available"}
{"roomLabel":"Room A-101","start":"10:30","end":"11:30","isAvailable":false,"reasonCode":"overlap"}
{"roomLabel":"Room A-101","start":"11:00","end":"12:00","isAvailable":false,"reasonCode":"room_blocked"}

A
{"explanation":"Room A-101 is available from 11:00 to 12:00."}
{"explanation":"Room A-101 is unavailable from 10:30 to 11:30 because the requested time overlaps another time slot."}
{"explanation":"Room A-101 is unavailable from 11:00 to 12:00 because the room is blocked."}

B
{"explanation":"Room A-101 is available from 11:00 to 12:00."}
{"explanation":"Room A-101 is unavailable from 10:30 to 11:30 because the requested time overlaps with another booking."}
{"explanation":"Room A-101 is unavailable from 11:00 to 12:00 because the room is blocked."}

C
{"explanation":"The room is available for the requested time."}
{"explanation":"The room is unavailable because the requested time overlaps another time slot."}
{"explanation":"The room is unavailable because it is blocked."}
```

### 5.3 The comparison

**Clarity** and **consistency:** 1 (poor) to 3 (good). **Agrees with the facts:** `yes` or `no`.
**Invented:** what it made up (a time, a booking, a person), or `nothing`.

| Prompt | Clarity | Consistency | Agrees with the facts | Invented |
| --- | --- | --- | --- | --- |
| A | 2 | 3 | yes | nothing |
| B | 3 | 3 | yes | nothing |
| C | 2 | 3 | yes | nothing |

### 5.4 The one I chose

**Chosen:** B

B explicitly identifies an existing booking in the overlap case. All three keep the decision, but only B also specifies both output limits and distinguishes the label from instructions. The chosen text is exported as SYSTEM_INSTRUCTION in explain.ts.

<!-- Why, from the table above. Then confirm it is in explain.ts as SYSTEM_INSTRUCTION. -->

---

## 6. Task 5 — tests

### 6.1 The test cases

| ID | Case | Expected | Observed | Verdict | How |
| --- | --- | --- | --- | --- | --- |
| E1 | available | Available at the touching boundary | Generated available explanation | pass | E1 F1: a request touching the end of a booking is available |
| E2 | overlap | Unavailable due to overlap | Unavailable and overlap in the explanation | pass | E2 F2: an overlap explains the unavailable decision |
| E3 | blocked room | Blocked reason | Blocked reason and matching text | pass | E3 F2: a blocked room is explained by the blocked-room rule |
| E4 | invalid time | Invalid interval reason | invalid_time and generated response | pass | E4 F2: a reversed interval has the invalid_time reason |
| E5 | past time | Past start reason | past_time and generated response | pass | E5 F2: an earlier start has the past_time reason |
| E6 | empty input | Reject before adapter | Rejected; zero calls | pass | E6 F3: a blank room label is rejected before the adapter runs |
| E7 | long input | Reject before adapter | 500 characters rejected; zero calls | pass | E7 F3: a 500-character label is rejected before the adapter runs |
| E8 | timeout | Fallback at 40 ms | Unresolved at 39 ms; fallback at 40 ms | pass | E8 F4: an unanswered request falls back at the timeout |
| E9 | simulated API failure | Local fallback; status preserved | Available fallback after throw | pass | E9 F4: a throwing adapter uses the local reason and preserves status |
| UI | UI never changes the deterministic decision | Confirmed status stays visible in both modes | Available remained visible for Room A-101, 11:00–12:00, in both modes | pass | In the running app, clicked Check availability and Explain availability, then enabled Simulate API failure and clicked Explain availability again. |

### 6.2 The run after the feature

```text

 RUN  v3.2.7 /private/tmp/birjan-practice11-evidence/week-11/app

 ✓ src/explain.test.ts (9 tests) 4ms
 ✓ src/booking.test.ts (21 tests) 5ms

 Test Files  2 passed (2)
      Tests  30 passed (30)
   Start at  13:05:49
   Duration  209ms (transform 54ms, setup 0ms, collect 83ms, tests 10ms, environment 0ms, prepare 78ms)
```

### 6.3 Screenshots

| File | What it shows |
| --- | --- |
| `evidence/explain-available.png` | Room A-101, 11:00–12:00. Confirmed status: Available. Generated explanation (mock) is visible. |
| `evidence/explain-fallback.png` | The same slot with Simulate API failure checked. Local fallback explanation is visible and the confirmed status remains Available. |

## 7. Task 6 — the agentic code review

### 7.1 The reviewer and its context

The separate Codex review used the checkpoint and feature commit as references. Its execution session was unavailable. It received the booking and explanation source, the UI logic and a description of the JSX changes, the E1–E9 tests, README criteria F1–F5 and AGENTS.md criteria AC1–AC6 in chat. The diff was supplied in excerpts. The reviewer only returned text and made no edits.

### 7.2 The review prompt and the answer

```text
Act as a read-only agentic code reviewer. Inspect the proposed diff in context, repository instructions, and tests. Review correctness, security, maintainability, and performance. For each issue, provide severity, affected file, evidence, reproduction or verification method, and a minimal recommendation. Do not edit files. Clearly distinguish confirmed findings from hypotheses.
```

```text
I reviewed the supplied diff content, the Week 10 booking criteria, F1–F5 and E1–E9. The booking refactor preserves the original comparisons and their order. The UI keeps the confirmed status separate and checks a request ID before displaying an asynchronous answer. I made no edits. The findings below are confirmed by inspection. The proposed tests still need to be run.

| ID | Severity and file | Evidence and verification | Minimal fix |
| --- | --- | --- | --- |
| V1 | Medium · `src/explain.ts` | `validateInput` accepts `12:30–12:00` with `isAvailable=true` and `reasonCode="available"`. Both times pass individual format checks. Use a spy adapter and verify this inconsistent request rejects before the adapter runs. E4’s reversed interval with `invalid_time` should still work. | Reject a reversed or zero-length interval paired with any reason other than `invalid_time`. |
| V2 | Medium · `src/explain.ts` | All three recorded prompt B answers begin with “Room A-101”. The validator accepts only statements beginning with “The room”. Replay the three exact responses through fake adapters and check whether the source is `generated`. | Accept the measured B response forms using the supplied label, times and reason. Retain whole-statement matching to reject invented details. |
| V3 | Low · `src/explain.test.ts` | E8 and E9 cover timeout and error. None of E1–E9 exercises a successful adapter response with a contradictory status or an invented time. | Add both cases and assert the fallback source and original decision. |
| V4 | Low · `src/explain.ts` | The supplied pre-fix module lacks `SYSTEM_INSTRUCTION`, which Part 4 requires. Check the final revision for the export and compare its value with prompt B in the report. | Export the chosen instruction verbatim. |

I would prioritise V1 and V2. The first can produce a generated explanation for an impossible availability claim. The second prevents even the experiment’s accurate answers from being displayed as generated.
```

### 7.3 The findings, verified

Verification below was performed by Codex. Student verification is pending.

| ID | Finding (short) | Category | Severity | File | How I verified it | Label | Found by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V1 | Available with impossible interval | correctness | medium | src/explain.ts | The V1 test failed before f22a28a: the promise resolved generated instead of rejecting. It passed after the fix. | confirmed | reviewer |
| V2 | Grounded B outputs rejected | correctness | medium | src/explain.ts | Replayed the three B samples. The first Vitest assertion expected generated and received fallback. All three pass after 43fcdb1. | confirmed | reviewer |
| V3 | Missing successful-but-invalid output tests | tests | low | src/explain.test.ts | Read every original E1–E9 adapter fixture. V3 now checks contradictory status and invented time. | confirmed | reviewer |
| V4 | Selected instruction missing from feature snapshot | maintainability | low | src/explain.ts | Compared 2462c9f with 5d8b3e7. The latter exports the recorded instruction. | confirmed | reviewer |

### 7.4 My own inspection, and the linter

Codex compared the committed booking test file with the checkpoint and verified that the provided checker and validator match the teaching archive byte for byte. A linter could check syntax. It would need project-specific knowledge to detect the disagreement between prompt B and the permitted explanation wording. Independent student inspection is pending.

## 8. Task 7 — repair and regression-test

### 8.1 The first fix

**Finding:** V1

**Why it is necessary:** An impossible interval could pass the adapter boundary as an available booking. The original booking decision and its precedence must survive validation.

**What I rejected from the assistant's proposal, and why:** Kept the recommendation and also checked the 120-minute boundary and the priority of past_time.

The diff (production code; regression tests are in the same commit)

```text
diff --git a/week-11/app/src/explain.ts b/week-11/app/src/explain.ts
index dc09c5d..3ebc0d9 100644
--- a/week-11/app/src/explain.ts
+++ b/week-11/app/src/explain.ts
@@ -47,6 +47,13 @@ function validateInput(value: unknown): ExplainInput {
       isAvailable !== (reasonCode === 'available')) {
     throw new Error('The availability status and reason must match the checker.');
   }
+  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
+  const duration = minutes(end) - minutes(start);
+  if ((duration <= 0) !== (reasonCode === 'invalid_time') ||
+      (reasonCode === 'too_long' && duration <= 120) ||
+      (duration > 120 && reasonCode !== 'past_time' && reasonCode !== 'too_long')) {
+    throw new Error('The interval and reason must match the checker.');
+  }
   return Object.freeze({ roomLabel: label, start, end, isAvailable, reasonCode });
 }
 
```

The follow-up shares the same maximum duration between the checker and input validation. This keeps a future rule change consistent across both modules.

```diff
diff --git a/week-11/app/src/booking.ts b/week-11/app/src/booking.ts
index 2e486ec..5fd81d6 100644
--- a/week-11/app/src/booking.ts
+++ b/week-11/app/src/booking.ts
@@ -8,13 +8,15 @@ type CanBookInput = {
   bookings: Interval[];
 };
 
+export const MAX_BOOKING_MINUTES = 120;
+
 export type ReasonCode =
   | 'invalid_time' | 'past_time' | 'too_long' | 'room_blocked' | 'overlap' | 'available';
 
 export function availabilityReason({ start, end, now, blocked, bookings }: CanBookInput): ReasonCode {
   if (!(0 <= start && start < end && end <= 1440)) return 'invalid_time';
   if (!(start > now)) return 'past_time';
-  if (end - start > 120) return 'too_long';
+  if (end - start > MAX_BOOKING_MINUTES) return 'too_long';
   if (blocked) return 'room_blocked';
   for (const b of bookings) {
     if (start < b.end && end > b.start) return 'overlap';
```

### 8.2 The second fix

**Finding:** V2

**Why it is necessary:** The chosen prompt produced factually correct answers that were consistently replaced by fallback. The validator must recognise these measured responses.

**What I rejected from the assistant's proposal, and why:** Kept the whole-sentence comparison and restricted named-room wording to identifiers. A status keyword alone would accept incorrect explanations.

The diff (production code; regression tests are in the same commit)

```text
diff --git a/week-11/app/src/explain.ts b/week-11/app/src/explain.ts
index 3ebc0d9..ecd5901 100644
--- a/week-11/app/src/explain.ts
+++ b/week-11/app/src/explain.ts
@@ -75,12 +75,20 @@ function validateOutput(output: unknown, input: ExplainInput): string | undefine
   // negations, invented details and instructions hidden after a correct status.
   const normalized = text.toLowerCase();
   const status = statusSentence(input).toLowerCase();
-  const reason = reasonFacts[input.reasonCode];
+  // The mock uses "the room". The chosen prompt can also use a room identifier.
+  const subjects = [status];
+  if (/^Room [a-z0-9-]{1,32}$/i.test(input.roomLabel)) {
+    subjects.push(status.replace('the room', input.roomLabel.toLowerCase()));
+  }
+  const reasons = [reasonFacts[input.reasonCode]];
+  if (input.reasonCode === 'overlap') reasons.push('the requested time overlaps with another booking');
   const slot = ` from ${input.start} to ${input.end}`;
-  for (const statement of [status, status + slot]) {
-    if (normalized === `${statement} because ${reason}.` ||
-        normalized === `${statement}. ${reason}.` ||
-        (input.isAvailable && normalized === `${statement}.`)) return text;
+  for (const subject of subjects) {
+    for (const statement of [subject, subject + slot]) {
+      if (input.isAvailable && normalized === `${statement}.`) return text;
+      if (reasons.some(reason => normalized === `${statement} because ${reason}.` ||
+          normalized === `${statement}. ${reason}.`)) return text;
+    }
   }
 }
 
```

### 8.3 The final run

```text

 RUN  v3.2.7 /private/tmp/birjan-practice11-evidence/week-11/app

 ✓ src/explain.test.ts (12 tests) 5ms
 ✓ src/booking.test.ts (21 tests) 5ms

 Test Files  2 passed (2)
      Tests  33 passed (33)
   Start at  13:35:00
   Duration  209ms (transform 62ms, setup 0ms, collect 81ms, tests 11ms, environment 0ms, prepare 87ms)
```

### 8.4 Ready for demonstration?

**Ready:** yes

**What remains unresolved:**

The feature is ready for demonstration. The live browser check confirmed the same decision in both modes. Independent student verification and reflection remain pending for submission.

## 9. Checks I am keeping as FAIL or ERROR

| Check | Why it stays |
| --- | --- |
| L12 | The course requires the student to write the reflection independently. |

## 10. Reflection

<!-- Write 80–150 words independently, referencing at least one finding ID and one E-series test. -->

