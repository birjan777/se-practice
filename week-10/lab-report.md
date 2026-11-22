# Week 10 — Lab report

**Name:** Khalenov Birzhan

**Group:** Monday 16-19:00

**Date:** 22 November 2026  


## 1. Setup

|                                                                                                           |                                    |
|-----------------------------------------------------------------------------------------------------------|------------------------------------|
| Assistant I reviewed with (tool)                                                                          | Gemini                             |
| Exact model (with its version, or `not displayed`)                                                        | not displayed                      |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | Gemini read chat with pasted files |
| Starting point (`week-08` or `week-07`)                                                                   | `week-08`                          |
| Baseline commit — the checkpoint of Part 0                                                                | `c7b32ea`                          |
| Where I ran the tests (Bolt terminal / my computer / Codespace)                                           | my computer                        |
| Vitest version (the `RUN  v…` line of a run)                                                              | 3.2.7                              |

The checkpoint was based on the GitHub `main` head `4cb692d`. It copies the tracked Week 08 app and the provided playbook. The Week 08 app and the starter files were committed before changing code.

## 2. Task 1 — the baseline

### 2.1 The project's commands

`npm install` completed from the existing npm cache in offline mode. Each listed command was attempted in `app/`.

| Command                                               | Exists  | Result  | Note                                        |
|-------------------------------------------------------|---------|---------|---------------------------------------------|
| `npx vitest run`                                      | yes     | pass    | Vitest 3.2.7, all 19 tests passed.          |
| `npm test`                                            | no      | missing | npm reported a missing `test` script.       |
| `npm run test:unit` (the test command in `AGENTS.md`) | no      | missing | npm reported a missing `test:unit` script.  |
| `npm run build`                                       | yes     | pass    | TypeScript and Vite both completed, exit 0. |
| `npm run lint`                                        | no      | missing | npm reported a missing `lint` script.       |

### 2.2 The baseline test run

```text

 RUN  v3.2.7 /private/tmp/week10-repo.7GNpql/week-10/app

 ✓ src/booking.test.ts (19 tests) 2ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  13:17:47
   Duration  180ms (transform 25ms, setup 0ms, collect 21ms, tests 2ms, environment 0ms, prepare 40ms)
```

### 2.3 The agent reads the playbook

What was sent, exactly:

```text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
```

The assistant's reply is copied below. The original Markdown is in [review-playbook-read.md](evidence/review-playbook-read.md).

````text
I have the root `AGENTS.md` content available from your earlier message. I have not independently accessed the project filesystem, so I cannot claim to have opened the file myself or that it was automatically loaded.

## Project constraints

Based on the supplied `AGENTS.md` and checkpoint:

- Framework: React + TypeScript + Vite.
- Scope: One fictional room.
- No login or database.
- No secrets or external deployment.
- Preserve acceptance criteria AC1–AC6:
  - AC1: Reject start times greater than or equal to end times and past requests.
  - AC2: Enforce a maximum duration of 120 minutes.
  - AC3: Reject blocked rooms.
  - AC4: Reject overlapping bookings, including requests touching either endpoint.
  - AC5: Return Available / Unavailable without modifying booking data.
  - AC6: Preserve the existing checkpoint requirements and fixtures.
- Preserve the existing 19 Vitest tests and unchanged fixtures.
- No app README.
- Test and build successfully before acceptance.

Important instruction conflict: The supplied `AGENTS.md` suggests real KBTU rooms, Supabase, login, and Netlify deployment. These conflict with your explicit project contract. I will follow your explicit constraints instead.

## Exact commands found

| Purpose | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Start development server | `npm run dev` |
| Tests (listed in AGENTS.md) | `npm run test:unit` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |

Testing discrepancy: The package scripts do not include `test:unit`, `test`, `lint`, or a formatter script.

The existing tests use Vitest, so the available direct test command is:

bash

```bash
npx vitest run
```

No files have been edited. I am waiting for your authorization before making changes.
````

Which rules in its summary are wrong for this project, and how we know:

<!-- Write below this line -->

The reviewer repeated the playbook's reversed AC4. Week 10 README `3 permits endpoints to touch, and T01, T08 and BUG-A explicitly expect that. AC6 requires clear feedback on desktop and mobile. The playbook's `test:unit` command failed because `package.json` defines only `dev`, `build` and `preview`. The file's real timetable, Supabase/login and external production preview instructions directly contradict the handout.

## 3. Tasks 2–3 — the read-only review and the challenge

### 3.1 The review prompt and the answer

<!-- Write below this line -->

The reviewer was a separate browser chat with only pasted source and documentation. It had no local filesystem or repository write access. After the review and before the regression edit, `git status --porcelain=v1 -- week-10/app` returned no lines. The pasted context included the original contradictory playbook, the full booking module, selected App code and the package/test inventory.

What you sent, exactly:

```text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
```

The complete reply is copied below. The original Markdown is in [review-risks.md](evidence/review-risks.md).

````text
# Smart Campus Room Availability Checker — Review

Read-only review No files edited

 ## 1. Review scope and limitations

This review is based on the project checkpoint, the supplied root `AGENTS.md`, and the source excerpts in the conversation.

I have not accessed the project filesystem or executed the application, tests, or build. Therefore:

- I can identify risks supported by the supplied code.
- I can distinguish confirmed issues from potential issues.
- I will not claim that tests pass or fail.
- I will not assume that omitted source code contains particular protections.

The review considers the fictional single-room contract authoritative: no authentication, database, external deployment, or secrets.

 ## 2. Executive assessment

The most important concerns are:

1. Time validation and error handling: the UI may display an availability result even after detecting an invalid time range.
2. Time model: the application uses manually entered time values rather than a clearly defined current-time source.
3. Booking overlap semantics: the implementation uses strict inequalities, which do not reject endpoint-touching bookings.
4. Data integrity: the booking function currently avoids mutation, but a commented-out mutation suggests a potential regression.
5. Operational instructions: `AGENTS.md` contains instructions that conflict with the actual project contract and package scripts.
6. Testing commands: the documented test command does not match the supplied package scripts.

The endpoint-overlap issue is particularly important because it directly contradicts the stated acceptance criteria.

 ## 3. Correctness risks

### C1. Endpoint-touching bookings are not rejected

High priority- Location: `src/booking.ts`, function `canBook()`, overlap loop.
- Existing logic:

ts

```ts
if (start < b.end && end > b.start) return false;
```

- Problem: This implements half-open interval overlap semantics. A request ending exactly when an existing booking starts, or starting exactly when one ends, is allowed.
- Impact: The application can report a room as available even though AC4 explicitly says touching either endpoint counts as an overlap.
- Verification: Test both cases:
  - Requested interval `[540, 600]`, existing booking `[600, 660]`.
  - Requested interval `[660, 720]`, existing booking `[600, 660]`.
- Uncertainty: Low. The supplied implementation establishes the behavior. I have not executed the tests to establish their actual results.

### C2. Invalid time ranges can still produce an availability result

High priority- Location: `src/App.tsx`, `check()`.
- Problem: When `s >= e`, the function sets an error message but does not return. It subsequently calls `canBook()` and updates the result.
- Impact: The interface can simultaneously display an error and an Available / Unavailable result. This creates confusing feedback and makes it harder for users to distinguish validation errors from genuine availability decisions.
- Verification: Enter a start time later than the end time and click Check. Inspect whether both the error and result are rendered.
- Uncertainty: Low for the control flow; medium for the exact visible behavior because the complete JSX rendering is not supplied.

### C3. The current time is manually controlled

- Location: `src/App.tsx`, `useState('09:00')` for `now`.
- Problem: The application initializes its current-time value to a fixed value rather than deriving it from the actual clock.
- Impact: Availability decisions can be incorrect relative to the real current time. For example, a user checking at 13:00 could still evaluate a 10:00 start against 09:00.
- Verification: Open the application at a known time, leave the default current-time value unchanged, and compare its result with an evaluation using the actual current time.
- Uncertainty: Low that the default is fixed; medium regarding whether other omitted code updates it.

### C4. Time validation does not establish a complete date/time model

- Location: `src/booking.ts`, `canBook()`; `src/App.tsx`, `toMinutes()`.
- Problem: The implementation represents times as minutes within a single day, from 0 to 1440.
- Impact: It cannot independently represent dates, overnight bookings, or timezone transitions. The end-of-day option supports 24:00, but does not establish a general date-aware scheduling model.
- Verification: Examine behavior for a booking crossing midnight, a request on the following day, and a booking near a daylight-saving transition.
- Uncertainty: High regarding whether these scenarios are required. They may be intentionally outside the single-day fictional-room contract.

### C5. Booking fixture integrity is assumed rather than validated

- Location: `src/booking.ts`, `canBook()` overlap loop; `src/App.tsx`, `ROOMS`.
- Problem: `canBook()` validates the requested interval but does not validate existing booking intervals.
- Impact: Malformed fixture entries, such as negative start values, reversed intervals, or endpoints beyond 1440, could lead to misleading availability decisions.
- Verification: Test with deliberately malformed booking fixtures and determine whether they are rejected or silently accepted.
- Uncertainty: Medium. The supplied fixtures are simple and valid, and there is no indication that users can modify them.

### C6. Invalid numeric inputs are not explicitly diagnosed

- Location: `src/App.tsx`, `toMinutes()` and `check()`; `src/booking.ts`, `canBook()`.
- Problem: `toMinutes()` converts split time components using `Number()`, but does not explicitly validate the resulting values or their finiteness.
- Impact: Unexpected input values can become `NaN`. The comparisons in `canBook()` generally reject such values indirectly, but the user receives no specific explanation of the invalid input.
- Verification: Exercise empty values, malformed time strings, and values outside the expected time range through the function-level tests.
- Uncertainty: Medium. Native `type="time"` inputs constrain normal browser interaction, but do not replace explicit input validation at the function boundary.

### C7. The blocked-room state has two possible sources of truth

- Location: `src/App.tsx`, `ROOMS` and `useState(false)` for `blocked`.
- Problem: Each room has a `blocked` property, while the UI separately maintains a `blocked` state variable. The supplied `check()` passes the state variable rather than `room.blocked`.
- Impact: The room's actual fixture property may be ignored. If additional rooms or room-specific blocked states are introduced, the UI could report availability inconsistent with the selected room's data.
- Verification: Set one room's fixture `blocked` property to true and check whether selecting it prevents booking without manually checking the separate checkbox.
- Uncertainty: Low that the two state sources exist; medium regarding intended checkbox semantics.

### C8. The availability function has a potentially misleading comment

- Location: `src/booking.ts`, final comment and commented-out `bookings.push()`.
- Problem: The comment says to keep the room's booking list current, while the mutation is commented out.
- Impact: A future maintainer or coding agent could restore the mutation under the mistaken assumption that finding an available slot should create a booking.
- Verification: Inspect all references to `canBook()` and verify that repeated availability checks leave the original booking array unchanged.
- Uncertainty: Low. The current supplied implementation does not execute the mutation.

 ## 4. Security risks

### S1. Dependency supply-chain exposure

- Location: `package.json`, `package-lock.json`; dependency installation.
- Problem: The project uses third-party dependencies, including Vite, TypeScript, and Vitest. Their security status has not been established.
- Impact: A compromised or vulnerable dependency could introduce malicious code or affect development and build processes.
- Verification: Review dependency versions, inspect the lockfile, and run:

bash

```bash
npm audit
```

- Uncertainty: High. No dependency audit has been performed, and I cannot infer vulnerabilities from the supplied dependency names alone.

### S2. No server-side authorization or persistence controls

- Location: Application architecture; no backend or authentication layer in the supplied project description.
- Problem: Availability checking is client-side.
- Impact: Users can modify client-side state and fixtures through browser developer tools. The result cannot serve as authoritative proof of a real booking.
- Verification: Inspect whether any booking decision is submitted to an authoritative server. The supplied contract indicates that none should exist.
- Uncertainty: Low that the described application is client-side; this is an intentional scope limitation, not necessarily a defect.

### S3. No evidence of unsafe rendering

- Location: `src/App.tsx`, React rendering.
- Problem: The supplied excerpts show ordinary React state and rendering, not unsafe HTML insertion.
- Impact: No specific cross-site scripting vulnerability can be established from the supplied code.
- Verification: Inspect the complete component for `dangerouslySetInnerHTML`, unsafe URL handling, and direct DOM manipulation.
- Uncertainty: High because only source excerpts are available.

 ## 5. Privacy risks

### P1. Privacy behavior has not been independently verified

- Location: Application-wide; no network or telemetry inspection supplied.
- Problem: The project contract excludes accounts and databases, but that alone does not establish that the application makes no external requests.
- Impact: Unexpected analytics, third-party scripts, or external requests could transmit user interaction data.
- Verification: Inspect dependencies and HTML entry points, then use browser developer tools to inspect network requests during application use.
- Uncertainty: High. No network inspection has occurred.

### P2. User-facing data handling is undocumented

- Location: `src/App.tsx`, form state and rendered availability results.
- Problem: The supplied code does not describe whether user-entered information is retained, logged, or transmitted.
- Impact: Users may have incorrect expectations about the handling of their inputs.
- Verification: Inspect browser storage, console output, network activity, and any logging code.
- Uncertainty: High. No evidence of data collection has been provided.

 ## 6. Reliability risks

### R1. The availability result can become stale

- Location: `src/App.tsx`, `result` state and `check()`.
- Problem: The result is stored in React state and appears to be recalculated only when Check is invoked.
- Impact: Changing the room, start time, end time, current time, or blocked checkbox may leave an earlier result visible.
- Verification: Obtain an Available result, change the selected room or time without clicking Check, and inspect the displayed result.
- Uncertainty: Medium. The supplied description says input handlers only update their corresponding state, but the complete JSX is unavailable.

### R2. The application has no authoritative clock

- Location: `src/App.tsx`, `now` state.
- Problem: The current time is represented by editable UI state.
- Impact: A user can accidentally or deliberately provide an inaccurate current time, producing misleading results.
- Verification: Compare availability decisions using the default value, a manually changed value, and the actual system time.
- Uncertainty: Low regarding the supplied implementation.

### R3. Test command documentation is inconsistent

High priority- Location: Root `AGENTS.md`, Commands section; `package.json`, scripts.
- Problem: `AGENTS.md` documents:

bash

```bash
npm run test:unit
```

But the supplied package scripts do not contain `test:unit`.

- Impact: An automated agent or developer following the instructions literally may fail to execute tests or incorrectly conclude that the project is broken.
- Verification:

bash

```bash
npm run
```

Then inspect the available scripts and run:

bash

```bash
npx vitest run
```

- Uncertainty: Low, based on the supplied package-script inventory. Actual command execution has not been performed.

### R4. The development and production build have different validation coverage

- Location: `package.json`, `build` script.
- Problem: The production build runs `tsc && vite build`, but no dedicated lint or formatting script is defined.
- Impact: TypeScript compilation and bundling do not necessarily identify all maintainability problems, accessibility issues, or incorrect business logic.
- Verification: Run the production build and the Vitest suite separately. Inspect test coverage and accessibility manually.
- Uncertainty: Low that the listed scripts are absent; medium regarding the project's actual coverage.

 ## 7. Maintainability risks

### M1. Business logic and UI validation are not cleanly separated

- Location: `src/App.tsx`, `check()`; `src/booking.ts`, `canBook()`.
- Problem: Some validation is performed in the UI before calling `canBook()`, while other validation lives inside the business function.
- Impact: Validation rules can become inconsistent between the UI and other callers.
- Verification: Compare every validation condition in `check()` with the corresponding conditions in `canBook()`.
- Uncertainty: Low based on the supplied excerpts.

### M2. Unused or duplicated type definitions

- Location: `src/booking.ts`, `Interval` and `CanBookInput`.
- Problem: The supplied excerpt defines `Interval` and `CanBookInput`, but the function uses an inline parameter type instead.
- Impact: Duplicate type definitions can drift as the implementation changes.
- Verification: Inspect TypeScript references and determine whether these definitions are used elsewhere.
- Uncertainty: Medium. The complete file was not supplied.

### M3. Fixture data and interaction state are mixed

- Location: `src/App.tsx`, `ROOMS` and React state declarations.
- Problem: Static room data is combined with independently maintained UI state, particularly `blocked`.
- Impact: Additional rooms or room-specific rules could make the component harder to reason about.
- Verification: Trace the selected room's properties through rendering and `check()`.
- Uncertainty: Medium. The current two-room example may intentionally be simple.

### M4. Business-rule comments are not aligned with the acceptance contract

- Location: `src/booking.ts`, commented-out mutation.
- Problem: The comment suggests updating bookings after availability checks, while AC5 requires unchanged booking data.
- Impact: Future changes may accidentally turn a read-only availability checker into a booking mutation mechanism.
- Verification: Review comments and tests against AC5.
- Uncertainty: Low.

### M5. No README or equivalent application documentation

- Location: Project root.
- Problem: There is no app README, as specified in the checkpoint.
- Impact: New maintainers may have difficulty understanding how to run tests, the meaning of the fixtures, and the limitations of the availability checker.
- Verification: Inspect available project documentation, including `AGENTS.md` and package metadata.
- Uncertainty: Low that no app README is supplied; other documentation may exist.

This is not a recommendation to add a README against the stated project constraints.

 ## 8. Agent operations and instruction risks

These deserve particular attention because they could cause an automated coding agent to violate the project contract even if the application itself is simple.

### A1. Deployment instruction conflicts with the explicit contract

Critical operational risk- Location: Root `AGENTS.md`, Before you finish:

bash

```bash
npx netlify deploy --prod
```

- Problem: The instruction explicitly requests external production deployment, contrary to the supplied no-external-deployment requirement.
- Impact: An agent could publish project contents or an unfinished application without authorization.
- Verification: Inspect the instructions before executing any deployment-related command.
- Uncertainty: Low. The conflict is explicit.

Recommendation: Do not execute this command. Treat deployment as prohibited unless the project owner explicitly changes the contract.

### A2. Supabase and login instructions conflict with project scope

- Location: Root `AGENTS.md`, You may:

> If bookings need to persist, add a small Supabase table and a login page.

- Problem: This suggests adding a database and authentication even though the checkpoint explicitly prohibits both.
- Impact: Unnecessary architectural expansion, additional dependencies, external services, secrets, and privacy obligations.
- Verification: Review any proposed changes to dependencies, environment files, authentication, and database configuration.
- Uncertainty: Low. The instructions conflict directly.

Recommendation: Keep the implementation local, fictional, and in-memory.

### A3. Real timetable instruction conflicts with fictional fixtures

- Location: Root `AGENTS.md`, Project section:

> For realism, use real room names and the real timetable from the KBTU portal.

- Problem: The project contract explicitly requires one fictional room.
- Impact: An agent could introduce real institutional data and expand the scope unnecessarily.
- Verification: Inspect fixture changes and external data requests.
- Uncertainty: Low.

Recommendation: Preserve fictional room data and do not retrieve or incorporate real timetable information.

### A4. Test instructions are not executable as written

- Location: Root `AGENTS.md`, Commands section.
- Problem: The documented `npm run test:unit` script is absent from the supplied package scripts.
- Impact: Agents may skip testing, report a misleading failure, or change package configuration unnecessarily.
- Verification: Inspect `package.json` and execute the direct Vitest command.
- Uncertainty: Low based on the supplied checkpoint.

Recommendation: Use the existing test runner directly:

bash

```bash
npx vitest run
```

Do not add scripts or dependencies unless specifically authorized.

### A5. The instruction hierarchy is insufficiently explicit

- Location: Root `AGENTS.md` compared with the supplied project contract.
- Problem: The file says its instructions should take precedence over general habits, but does not address conflicts with explicit owner requirements.
- Impact: An agent might follow deployment, database, or real-data instructions despite the owner's constraints.
- Verification: Review proposed actions against the acceptance contract before making changes.
- Uncertainty: Low regarding the conflict; medium regarding how a particular agent will interpret it.

Recommendation: Explicitly prioritize the current owner-approved scope over conflicting legacy instructions.

 ## 9. Acceptance criteria coverage

Based on the supplied implementation:

| Criterion | Assessment | Concern |
| --- | --- | --- |
| AC1: Invalid and past times | Needs verification | Strict `start > now` exists, but UI validation continues after detecting invalid ranges |
| AC2: Maximum 120 minutes | Implemented | `end - start > 120` rejects durations above 120 |
| AC3: Blocked room | Needs verification | Separate checkbox state may diverge from room fixture data |
| AC4: Overlap rejection | Conflict | Endpoint-touching intervals are currently allowed |
| AC5: No booking mutation | Implemented | Current `bookings.push()` is commented out |
| AC6: Full acceptance requirement | Not established | Its precise definition was not included in the supplied AGENTS.md |

Important test-suite observation: The checkpoint says the 19 Vitest tests include endpoint-touching rejection. That requirement conflicts with the supplied overlap implementation. This is a potential existing test failure, not a test failure I have independently confirmed.

 ## 10. Recommended verification sequence

Before accepting any changes, I would use this sequence.

Phase 1 — Establish baseline

- [ ]Inspect `package.json` and `package-lock.json`.
- [ ]Run `npm install` if dependencies are not installed.
- [ ]Run `npx vitest run`.
- [ ]Run `npm run build`.
- [ ]Record actual results without modifying source files.

Phase 2 — Verify business rules

- [ ]Start equal to end.
- [ ]Start after end.
- [ ]Start equal to current time.
- [ ]Start before current time.
- [ ]Duration exactly 120 minutes.
- [ ]Duration 121 minutes.
- [ ]Blocked room.
- [ ]Overlap in the middle.
- [ ]Touching the existing booking's start endpoint.
- [ ]Touching the existing booking's end endpoint.
- [ ]Unchanged booking fixtures after repeated checks.

Phase 3 — Verify interface

- [ ]Error and result consistency.
- [ ]Result invalidation after input changes.
- [ ]Correct selected-room fixture.
- [ ]End-of-day handling.
- [ ]Narrow-screen layout.
- [ ]Keyboard accessibility and understandable labels.

Phase 4 — Verify operational safety

- [ ]No database or authentication additions.
- [ ]No secrets or environment credentials.
- [ ]No unexpected external network requests.
- [ ]No unauthorized deployment.
- [ ]No unintended fixture changes.

 ## 11. Final reviewer assessment

Acceptance not establishedMy priority ranking is:

| Priority | Risk |
| --- | --- |
| Critical | Deployment instruction conflicts with owner constraints |
| High | AC4 endpoint-overlap implementation |
| High | Invalid UI input still produces a result |
| High | Documented test command does not exist |
| High | Conflicting database, authentication, and real-data instructions |
| Medium | Manually maintained current time |
| Medium | Duplicate blocked-room state |
| Medium | Stale availability results |
| Medium | Missing explicit fixture validation |
| Low–Medium | Maintainability and documentation inconsistencies |

Overall conclusion: The project has a relatively small implementation and a useful existing test suite, but I would not accept it yet. The endpoint-overlap discrepancy, UI validation flow, and agent-operation conflicts deserve attention first.

No files have been edited, no commands have been executed, and no test or build results are being claimed.

The next sensible step is a baseline test and build run, followed by narrowly scoped corrections that preserve the fictional-room contract and all existing acceptance requirements.
````

### 3.2 Challenging the AI's claims

These labels come from Codex's inspection of the checkpoint and the recorded local runs. Reviewer item labels below refer to its reply, and register IDs refer to `4. The owner still needs to verify these against the code personally.

| #    | The AI's claim (short)                                             | Category         | What I inspected                                                                  | Label       | Why                                                                                                                                           |
|------|--------------------------------------------------------------------|------------------|-----------------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| 1    | C1: allowing requests to touch endpoints violates AC4.             | Correctness      | Week 10 README `3, `src/booking.ts:22–24`, T01/T08/BUG-A in `src/booking.test.ts` | unsupported | The overlap predicate is strict and the authoritative contract explicitly allows touching. All 19 baseline tests passed.                      |
| 2    | C2: an invalid time range can coexist with an availability result. | Correctness      | Checkpoint `src/App.tsx:44–58,118–124` and `src/booking.ts:18`                    | confirmed   | A reversed interval sets the error, then calls `canBook` and stores `false`. The JSX displays the error and Unavailable in separate branches. |
| 3    | R1: a prior availability result remains after form changes.        | Reliability      | Checkpoint `src/App.tsx:27,32–58,77–112`                                          | confirmed   | Field handlers update the form values, while `result` changes only on Check. Changing the blocked box can leave an earlier Available visible. |
| 4    | M2: `CanBookInput` is defined and then duplicated inline.          | Maintainability  | Complete `src/booking.ts:1–17`                                                    | confirmed   | The parameter uses an inline type. The declared `CanBookInput` is unused.                                                                     |
| 5    | C8/M4: a comment encourages an AC5-breaking mutation.              | Maintainability  | `src/booking.ts:25–27` and the AC5/BUG-B assertions                               | confirmed   | The comment suggests updating bookings. The line is commented out and the two green tests check that the array stays unchanged.               |
| 6    | A1: the playbook directs an external production deployment.        | Agent operations | `app/AGENTS.md`, Before you finish, versus the README's scope                     | confirmed   | The line names a production deploy even though the lab requires local fictional scope. No deploy was attempted.                               |
| 7    | A4: the project's documented test command cannot run.              | Agent operations | `app/AGENTS.md`, `app/package.json`, baseline `npm run test:unit`                 | confirmed   | npm reported a missing script. Direct Vitest worked.                                                                                          |
| 8    | P1: unexpected browser requests could carry interaction data.      | Privacy          | `app/index.html`, `src/main.tsx` and `src/App.tsx`                                | plausible   | The entry points contain no external script or telemetry call. Runtime network and storage observation could not be done in this environment. |

## 4. Task 4 — the risk register

### 4.1 The register

Scores describe the baseline. The presence of a risky instruction or code path is confirmed by source, which does not imply the adverse outcome already occurred.

| ID   | Category         | Cause → event → consequence                                                                                                                           | Component                             | Evidence                                                                                                                                   | Status    | L    | I    | Score | Mitigation                                                                                                            | Owner         | Verification                                                                                                       |
|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|-----------|------|------|-------|-----------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------|
| R1   | Agent operations | Mandatory production preview → a credentialed agent follows the playbook → an unapproved build can become public.                                     | `AGENTS.md`                           | The final instruction names a production deployment, contrary to README `3. It can also send an agent toward tooling outside package.json. | confirmed | 2    | 3    | 6     | Remove the production preview directive and explicitly prohibit external deployments. Pending owner edit.             | Project owner | Inspect the applied diff and rerun A2/A3/C5. Review commands without executing a deploy.                           |
| R2   | Correctness      | Two fixtures in the page → a second selectable room reaches the app → the graded single-room scope fails.                                             | `src/App.tsx`                         | Checkpoint `ROOMS` and its select map expose A-101 and B-204. The R2 test observes two options on the checkpoint.                          | confirmed | 3    | 2    | 6     | Put the one fictional fixture and pure availability evaluation in `src/roomAvailability.ts` and use it from the page. | Project owner | Render the real App in Vitest, assert one room, and rerun original AC1–AC5 tests.                                  |
| R3   | Correctness      | Reversed or equal times set an error without returning → the same submission displays Unavailable → a validation error looks like a booking conflict. | `src/App.tsx`                         | Checkpoint `check()` continues into `canBook` and stores `false`, while JSX renders both messages.                                         | confirmed | 2    | 2    | 4     | Use a validation-only result with `available: null` before evaluating availability.                                   | Project owner | Run R3 with reversed and equal intervals, then verify the feedback visually.                                       |
| R4   | Reliability      | Check result persists while form values change → a prior answer is read as current → a user may rely on stale feedback.                               | `src/App.tsx`                         | Form onChange handlers do not clear the previous `result` or `error`.                                                                      | confirmed | 2    | 2    | 4     | Open. Recheck after changing fields for the exercise. A follow-up could clear the result when input changes.          | Project owner | In the browser, check an available slot, change the blocked box, and inspect feedback before pressing Check again. |
| R5   | Maintainability  | Comment encourages updating bookings → a future change restores the commented push → repeated checks can change the fixture and AC5 result.           | `src/booking.ts canBook`              | The inactive push and preceding comment are still present. AC5 and BUG-B assert unchanged fixtures.                                        | confirmed | 2    | 2    | 4     | Open. Keep AC5/BUG-B as the gate and remove the misleading comment in a separate cleanup.                             | Project owner | Read `canBook` and rerun the AC5 and BUG-B tests on each proposed change.                                          |
| R6   | Reliability      | Checks are local only → a push can omit testing → a broken change reaches review with no automated record.                                            | missing: push CI workflow for the app | No workflow in `app/.github/workflows/` or at repository root on the checkpoint.                                                           | confirmed | 2    | 2    | 4     | Open. Attach real CLI output to each change and add an automated check when raising readiness.                        | Project owner | Inspect a push-triggered workflow and confirm it invokes Vitest and the build.                                     |

### 4.2 The top two for action

1. **R1** — 2 × 3 = 6. Execution requires a suitable environment and authorization credentials, which were never verified, so the likelihood is possible. Unauthorized production publication is serious and the instruction explicitly requests it.
2. **R2** — 3 × 2 = 6. Every render of the checkpoint emits two options, as the failing run demonstrated. This breaks the required scope, with a moderate effect in a local exercise. R1 comes first at the same score because of its higher impact.

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

This audit uses the submitted app tree. Row 3c was absent at the checkpoint and is present after the R2 integration test.

| Row  | What                           | yes / no | Evidence                                                                                                                                                 |
|------|--------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1a   | Formatter                      | no       | No Prettier configuration or dependency in `app/`.                                                                                                       |
| 1b   | Linter                         | no       | No ESLint config or dependency. `npm run lint` returned missing script.                                                                                  |
| 1c   | Type checks                    | yes      | `app/tsconfig.json` and `typescript` in `app/package.json`. Build invokes `tsc`.                                                                         |
| 1d   | Unit tests                     | yes      | `src/booking.test.ts` and `vitest` in `app/package.json`.                                                                                                |
| 1e   | Pinned dependencies (lockfile) | yes      | Git tracks `app/package-lock.json`.                                                                                                                      |
| 2a   | `.env.example`                 | no       | No `app/.env.example`. There are no required app environment variables.                                                                                  |
| 2b   | Architecture notes             | no       | No application README or dedicated architecture document explaining the UI, fixture and availability module boundaries.                                  |
| 2c   | `AGENTS.md`                    | yes      | `app/AGENTS.md` exists. Its conflicts are covered in `6.                                                                                                 |
| 3a   | CI                             | no       | No push workflow for the app.                                                                                                                            |
| 3b   | Pre-commit hooks               | no       | No committed app hooks or hook runner in `package.json`.                                                                                                 |
| 3c   | Integration checks             | yes      | The R2 test renders the real `App` through React DOM's static renderer with the actual one-room module. No browser interaction is covered by that check. |
| 3d   | Reviewable evidence            | no       | There is no app CI log or app PR template requiring evidence from future agent changes. This report holds one exercise's local outputs.                  |

### 5.2 The level and the gaps

**Level:** 0

**Missing evidence for the next level:**

- Level 1 is 3/5 (60%). A committed formatter configuration/dependency (1a) or a linter configuration/dependency (1b) would bring it to the 4/5 threshold. Level 2 is 1/3 and Level 3 is 1/4. A level also requires the preceding levels.
- `app/` has no README. The assignment README documents the exercise. The app entry point, UI, and booking logic are in `src/`. The updated `app/AGENTS.md` describes the one-room scope and lists `npx vitest run` as the test command.


## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What was sent, exactly:

```text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
```

The complete reply is copied below. The original Markdown is in [review-playbook-audit.md](evidence/review-playbook-audit.md).

````text
## Documentation-only review

No files edited No deployment or code execution

I compared the supplied root `AGENTS.md` with your six project constraints. The main issue is that the existing instructions contain several direct conflicts that could lead a coding agent to expand the project or deploy it without authorization.

 ## 1. Conflicts and missing rules

| Requirement | Existing documentation | Finding |
| --- | --- | --- |
| One fictional room | Requests real KBTU room names and timetable | Conflict |
| No login/database | Allows Supabase and login | Conflict |
| Preserve AC1–AC6 | Documents AC1–AC5 only | Incomplete |
| No secrets | No explicit prohibition | Missing |
| No external deployments | Requires Netlify production deployment | Conflict |
| Run tests before acceptance | Lists `npm run test:unit` | Incorrect command |

### Detailed findings

1. Fictional room requirement

Existing instruction:

> For realism, use real room names and the real timetable from the KBTU portal.

Conflict: This contradicts the requirement for one fictional room.

Required correction: Explicitly prohibit real institutional room data, external timetable retrieval, and additional rooms.

2. No login or database

Existing instruction:

> If bookings need to persist, add a small Supabase table and a login page.

Conflict: This authorizes two prohibited features.

Required correction: Explicitly prohibit authentication, databases, persistence services, and external backend integrations.

3. AC1–AC6 preservation

The existing acceptance section documents AC1–AC5 but does not document AC6.

The supplied checkpoint identifies 19 existing Vitest tests, including:

- Strict `start > now`.
- Endpoint-touching overlap rejection.
- Rejection of 121-minute requests.
- Rejection of blocked rooms.
- Unchanged booking fixtures.

Required correction: Preserve all six acceptance criteria and existing tests. Do not redefine or remove acceptance conditions.

One documentation limitation: The exact wording of AC6 has not been supplied in the original `AGENTS.md`. It should be copied from the authoritative project acceptance specification rather than invented.

4. Secrets

There is no explicit instruction prohibiting secrets.

Required correction: Prohibit committing credentials, API keys, tokens, passwords, and environment secrets. Also prohibit introducing external-service credentials.

5. External deployment

Existing instruction:

> When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.

Conflict: This explicitly authorizes production deployment.

Required correction: Prohibit production deployment, preview deployment, publishing, and external hosting unless separately authorized.

6. Testing

Existing command:

bash

```bash
npm run test:unit
```

Problem: The supplied package scripts do not contain this script.

The available direct test command is:

bash

```bash
npx vitest run
```

The build command is:

bash

```bash
npm run build
```

Required correction: Document the actual commands and require both tests and build to succeed before proposing acceptance.

 ## 2. Proposed minimal patch

I recommend replacing the root `AGENTS.md` with the following corrected version.

This is a proposed draft only. It has not been applied.

Написание текста

# AGENTS.md — Smart Campus Room Availability Checker

Instructions for any coding agent working in this project.

## Project

A React + TypeScript page (Vite) that checks whether one fictional campus room is available for a requested time.

- Use one fictional room only.
- Do not retrieve or use real institutional room names or timetables.
- The booking rule lives in `src/booking.ts` (`canBook`).
- The page is `src/App.tsx`.
- The tests are in `src/booking.test.ts`.

## Project constraints

- No login, authentication, database, or persistent booking service.
- No external backend integrations.
- Do not introduce secrets, credentials, API keys, tokens, or passwords.
- Do not publish, deploy, or upload the application to external services.
- Preserve the existing fictional fixtures and project scope.
- Do not add unnecessary packages or infrastructure.

## Acceptance contract

Preserve all existing acceptance criteria AC1–AC6. Do not weaken, remove, or redefine them.

- AC1: Reject start times greater than or equal to end times and requests in the past.
- AC2: Enforce the maximum allowed duration of 120 minutes.
- AC3: Reject a blocked room.
- AC4: Reject overlaps, including requests that touch an existing booking at either endpoint.
- AC5: Return Available / Unavailable without changing booking data.
- AC6: Preserve the existing project acceptance requirement. Do not alter its authoritative definition.

Preserve all existing tests and fixtures unless a change is explicitly authorized.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Tests: `npx vitest run`
- Build: `npm run build`
- Preview locally: `npm run preview`

Do not assume a package script exists without checking `package.json`.

## Before proposing acceptance

- Run the test suite and report the actual results.
- Run the production build and report the actual results.
- Check that the page still loads.
- Verify that AC1–AC6 remain satisfied.
- Confirm that booking fixtures remain unchanged after availability checks.
- Report any failures honestly.
- Do not claim tests or builds passed unless they were actually executed.

## Prohibited actions

- Do not add authentication or login.
- Do not add Supabase or another database.
- Do not use real campus room or timetable data.
- Do not introduce secrets or external service credentials.
- Do not deploy using Netlify or any other external hosting provider.
- Do not perform external publication or deployment without explicit project-owner authorization.

When instructions conflict, follow the explicit project constraints and acceptance contract above.

 ## 3. Why this patch is minimal

The patch deliberately avoids changing application architecture or introducing new tooling.

It only:

- Removes contradictory instructions.
- Clarifies the fictional-room scope.
- Explicitly protects AC1–AC6.
- Corrects the test command.
- Adds secret-handling restrictions.
- Removes mandatory external deployment.
- Establishes evidence-based acceptance requirements.

It retains the existing project structure and commands where applicable.

 ## 4. Approval required

Proposed action: Replace root `AGENTS.md` with the draft above.

Awaiting approvalNo changes have been applied.

Would you like to approve this patch?

approve Approve the proposed patch

Request revisions first

Do not apply the patch

 Submit decision

One outstanding point: AC6 should be confirmed against its authoritative definition before the patch is finalized. I have intentionally avoided inventing its wording.
````

### 6.2 Findings and my decisions

| #    | Rule or line in AGENTS.md                       | Missing / conflicting                                       | Decision | Why                                                                                                                               |
|------|-------------------------------------------------|-------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| 1    | Real names and timetable from the portal        | Conflicts with one fictional room.                          | modify   | Replace that one line with an explicit fictional-room scope and prohibition on real timetables.                                   |
| 2    | Supabase and login page                         | Conflicts with the no-login/no-database scope.              | modify   | Replace the permission in place with a direct prohibition.                                                                        |
| 3    | AC4 counts touching as overlap                  | Conflicts with the authoritative AC4.                       | reject   | I rejected the suggestion to count endpoint touching as an overlap. I updated AC4 to allow slots that only touch at an endpoint.  |
| 4    | AC6 missing                                     | The original playbook lists only AC1–AC5.                   | modify   | Add the real AC6 requirement about clear desktop and mobile feedback, rather than the reviewer's generic placeholder.             |
| 5    | No exclusion for secrets                        | Missing a rule forbidding secrets and credentials.          | approve  | Add one concise rule listing forbidden secrets and credentials.                                                                   |
| 6    | Production deploy after build                   | Conflicts with the no-external-deployment scope.            | modify   | Replace the instruction with an unconditional ban for this project. Reject exceptions for preview deployments.                    |
| 7    | `npm run test:unit`                             | References a missing package script.                        | modify   | Use `npx vitest run`, which was verified in the baseline and final run.                                                           |
| 8    | Page load as the only acceptance check          | Missing an explicit test/build gate.                        | approve  | Require observed tests and build before proposing acceptance.                                                                     |
| 9    | Proposed whole-file rewrite and extra headings  | Conflicts with the minimal patch rule.                      | reject   | Preserve all the existing headings and change only the lines needed for C1–C6.                                                    |
| 10   | Extra preview command and package policy        | The preview script exists but is beyond the repairs needed. | reject   | Avoid unrelated instructions and keep the change within the line budget.                                                          |



### 6.3 The approved patch

```diff
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..c8eb8ea 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,36 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+
+Use one fictional room with synthetic bookings only. Do not use real room names or timetables.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlapping bookings and allow requests that only touch at an endpoint.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Show clear availability and validation feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npx vitest run`
 - Build: `npm run build`
 
 ## You may
 
 - Edit any file in the project.
 - Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Do not add login, authentication or a database.
+- Do not store credentials or commit secrets.
 
 ## Before you finish
 
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run the tests (`npx vitest run`) and build (`npm run build`). Both must pass before proposing acceptance.
+- Do not deploy or publish the app externally.
+
+
```



## 7. Task 7 — verify safely

### 7.1 The regression test fails before the mitigation

The risk it covers: **R2**. The focused command was `npx vitest run src/booking.test.ts -t 'R2:'`. The other tests were filtered out by the command. The suite contains no skipped or focused test declarations.

```text

 RUN  v3.2.7 /private/tmp/week10-repo.7GNpql/week-10/app

 ❯ src/booking.test.ts (20 tests | 1 failed | 19 skipped) 7ms
   ↓ canBook function test suite (AC1–AC5) > T01: 660–720 (touching after) should be allowed
   ↓ canBook function test suite (AC1–AC5) > T02: 540–570 (starts now) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T03: 720–720 (zero duration) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T04: 750–720 (reversed) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T05: 1380–1441 (past day end) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T06: 720–840 (120 minutes) should be allowed
   ↓ canBook function test suite (AC1–AC5) > T07: 720–841 (121 minutes) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T08: 570–600 (touching before) should be allowed
   ↓ canBook function test suite (AC1–AC5) > T09: 630–690 (partial overlap) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T10: 570–690 (contains booking) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T11: 615–645 (inside booking) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T12: 600–660 (identical interval) should be rejected
   ↓ canBook function test suite (AC1–AC5) > T13: 660–720, blocked = true should be rejected
   ↓ canBook function test suite (AC1–AC5) > T14: 630–690, bookings = [] should be allowed
   ↓ canBook function test suite (AC1–AC5) > AC5: Available request leaves bookings array unchanged
   ↓ canBook function test suite (AC1–AC5) > X1: 0–60; now = 0, blocked = false, bookings = [] should be rejected
   ↓ canBook function test suite (AC1–AC5) > X2: 1380–1440; now = 540, blocked = false, bookings = [] should be allowed
   ↓ canBook function test suite (AC1–AC5) > BUG-A: allows a request touching bookings at both ends
   ↓ canBook function test suite (AC1–AC5) > BUG-B: leaves bookings unchanged for an available request
   × R2: the checker renders exactly one fictional room 7ms
     → expected [ '<option', '<option' ] to have a length of 1 but got 2

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > R2: the checker renders exactly one fictional room
AssertionError: expected [ '<option', '<option' ] to have a length of 1 but got 2

- Expected
+ Received

- 1
+ 2

 ❯ src/booking.test.ts:154:36
    152| 
    153|   expect(page).toContain('Room A-101');
    154|   expect(page.match(/<option\b/g)).toHaveLength(1);
       |                                    ^
    155| });
    156| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 19 skipped (20)
   Start at  13:20:22
   Duration  241ms (transform 39ms, setup 0ms, collect 50ms, tests 7ms, environment 0ms, prepare 48ms)
```
### 7.2 The manual UI check

| View    | Width            | What I checked                                           | Result                                                                    | Screenshot                                    |
|---------|------------------|----------------------------------------------------------|---------------------------------------------------------------------------|-----------------------------------------------|
| Desktop | DESKTOP_WIDTH px | I checked Room A-101 from 11:00 to 12:00.                | I saw **Available** below the button.                                     | [Desktop screenshot](evidence/ui-desktop.png) |
| Mobile  | 390 px           | I set the start time to 11:00 and the end time to 10:30. | I saw only the error message “The end time must be after the start time.” | [Mobile screenshot](evidence/ui-mobile.png)   |

I used Tab to move through the form, Space to tick Room blocked, and Enter to check availability. I could see which field or button was selected.

I also tried both time examples in Safari and Chrome. I got the same results in both browsers.

I checked Fetch/XHR requests and compared Local Storage, Session Storage, and Cookies before and after clicking the button.

I ran `npm audit`. It found five vulnerabilities: two moderate, one high, and two critical. npm suggested major updates for Vite and Vitest.

### 7.3 Tests and checks I did not run

- I did not run automated browser tests. I checked the page manually.
- I did not test on a real phone. I used mobile mode in Chrome.
- I did not test deployment, login, or the database because those are outside this exercise.



## 8. Task 8 — mitigate two risks

### 8.1 The first mitigation

**Risk:** R2

```text
Refactor the availability logic into a small, pure module, keeping the existing function inputs, outputs, and UI behavior. Use a pattern only if the identified design problem justifies it. Do not add new features or dependencies. Show the files you plan to edit before making changes.
```

**Problem → pattern → benefit:**

`App.tsx` had two rooms and handled both the form and the availability check. The patch moved the availability check into a small pure module called `roomAvailability.ts`, so the page is easier to read and `canBook` still handles the booking rules.

**What I rejected from the agent's patch, and why:**

I rejected changing AC4 because bookings that touch at an endpoint are allowed. I also left out React Testing Library and a function that only called `canBook`. The existing tools were enough to test that the page shows exactly one room.

**Diff for R2**

```diff
diff --git a/week-10/app/src/App.tsx b/week-10/app/src/App.tsx
index 775c108..9c4f456 100644
--- a/week-10/app/src/App.tsx
+++ b/week-10/app/src/App.tsx
@@ -1,24 +1,10 @@
 import { useState } from 'react';
-import { canBook } from './booking';
-
-type Interval = { start: number; end: number };
-type Room = { id: string; name: string; blocked: boolean; bookings: Interval[] };
-
-const ROOMS: Room[] = [
-  { id: 'a101', name: 'Room A-101', blocked: false, bookings: [{ start: 600, end: 660 }] },
-  { id: 'b204', name: 'Room B-204', blocked: false, bookings: [] },
-];
-
-const toMinutes = (value: string) => {
-  const [h, m] = value.split(':').map(Number);
-  return h * 60 + m;
-};
+import { ROOM, checkRoomAvailability } from './roomAvailability';
 
 const fmt = (m: number) =>
   `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
 
 export default function App() {
-  const [roomId, setRoomId] = useState('a101');
   const [now, setNow] = useState('09:00');
   const [blocked, setBlocked] = useState(false);
   const [start, setStart] = useState('11:00');
@@ -27,35 +13,12 @@ export default function App() {
   const [result, setResult] = useState<boolean | null>(null);
   const [error, setError] = useState('');
 
-  const room = ROOMS.find((r) => r.id === roomId)!;
-
   function check() {
-    setResult(null);
-
-    if (!start || !now || (!end && !endOfDay)) {
-      setError('Fill in the current time, the start and the end.');
-      return;
-    }
-
-    const s = toMinutes(start);
-    const e = endOfDay ? 1440 : toMinutes(end);
-    const n = toMinutes(now);
-
-    if (!(s < e)) {
-      setError('The end time must be after the start time.');
-    } else {
-      setError('');
-    }
-
-    const ok = canBook({
-      start: s,
-      end: e,
-      now: n,
-      blocked,
-      bookings: room.bookings,
+    const outcome = checkRoomAvailability({
+      start, end, now, endOfDay, blocked, bookings: ROOM.bookings,
     });
-
-    setResult(ok);
+    setError(outcome.error);
+    setResult(outcome.available);
   }
 
   return (
@@ -65,12 +28,8 @@ export default function App() {
       <div className="row">
         <label>
           Room
-          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
-            {ROOMS.map((r) => (
-              <option key={r.id} value={r.id}>
-                {r.name}
-              </option>
-            ))}
+          <select defaultValue={ROOM.id}>
+            <option value={ROOM.id}>{ROOM.name}</option>
           </select>
         </label>
 
@@ -125,8 +84,8 @@ export default function App() {
 
       <h2>Existing bookings</h2>
       <ul>
-        {room.bookings.length ? (
-          room.bookings.map((b, i) => (
+        {ROOM.bookings.length ? (
+          ROOM.bookings.map((b, i) => (
             <li key={i}>
               {fmt(b.start)}–{fmt(b.end)}
             </li>
@@ -137,4 +96,4 @@ export default function App() {
       </ul>
     </main>
   );
-}
\ No newline at end of file
+}
diff --git a/week-10/app/src/roomAvailability.ts b/week-10/app/src/roomAvailability.ts
new file mode 100644
index 0000000..b706c39
--- /dev/null
+++ b/week-10/app/src/roomAvailability.ts
@@ -0,0 +1,49 @@
+import { canBook } from './booking';
+
+export const ROOM = {
+  id: 'a101',
+  name: 'Room A-101',
+  bookings: [{ start: 600, end: 660 }],
+};
+
+type AvailabilityRequest = {
+  start: string;
+  end: string;
+  now: string;
+  endOfDay: boolean;
+  blocked: boolean;
+  bookings: Parameters<typeof canBook>[0]['bookings'];
+};
+
+type AvailabilityResult = { available: boolean | null; error: string };
+
+function toMinutes(value: string): number {
+  const [hours, minutes] = value.split(':').map(Number);
+  return hours * 60 + minutes;
+}
+
+export function checkRoomAvailability({
+  start,
+  end,
+  now,
+  endOfDay,
+  blocked,
+  bookings,
+}: AvailabilityRequest): AvailabilityResult {
+  if (!start || !now || (!end && !endOfDay)) {
+    return { available: null, error: 'Fill in the current time, the start and the end.' };
+  }
+
+  const startMinutes = toMinutes(start);
+  const endMinutes = endOfDay ? 1440 : toMinutes(end);
+  const available = canBook({
+    start: startMinutes,
+    end: endMinutes,
+    now: toMinutes(now),
+    blocked,
+    bookings,
+  });
+
+  const error = startMinutes < endMinutes ? '' : 'The end time must be after the start time.';
+  return { available, error };
+}
```

### 8.2 The second mitigation

**Risk:** R3

**What I rejected from the agent's patch, and why:**

I rejected adding the same time check to React and returning only `true` or `false`. Before the fix, an invalid time could show both an error and **Unavailable**. The new test checks two cases: when the end time is earlier than the start and when both times are equal. In both cases, the function returns the error and `available: null`.

**Diff for R3**

```diff
diff --git a/week-10/app/src/booking.test.ts b/week-10/app/src/booking.test.ts
index 913501a..4a68dd0 100644
--- a/week-10/app/src/booking.test.ts
+++ b/week-10/app/src/booking.test.ts
@@ -3,6 +3,7 @@ import { renderToStaticMarkup } from 'react-dom/server';
 import { describe, it, expect } from 'vitest';
 import { canBook } from './booking';
 import App from './App';
+import { checkRoomAvailability } from './roomAvailability';
 
 describe('canBook function test suite (AC1–AC5)', () => {
   const DEFAULT_NOW = 540;
@@ -153,3 +154,19 @@ it('R2: the checker renders exactly one fictional room', () => {
   expect(page).toContain('Room A-101');
   expect(page.match(/<option\b/g)).toHaveLength(1);
 });
+
+it('R3: invalid intervals return only the validation error', () => {
+  for (const end of ['10:00', '11:00']) {
+    expect(checkRoomAvailability({
+      start: '11:00',
+      end,
+      now: '09:00',
+      endOfDay: false,
+      blocked: false,
+      bookings: [],
+    })).toEqual({
+      available: null,
+      error: 'The end time must be after the start time.',
+    });
+  }
+});
diff --git a/week-10/app/src/roomAvailability.ts b/week-10/app/src/roomAvailability.ts
index b706c39..230d0f2 100644
--- a/week-10/app/src/roomAvailability.ts
+++ b/week-10/app/src/roomAvailability.ts
@@ -36,6 +36,10 @@ export function checkRoomAvailability({
 
   const startMinutes = toMinutes(start);
   const endMinutes = endOfDay ? 1440 : toMinutes(end);
+  if (!(startMinutes < endMinutes)) {
+    return { available: null, error: 'The end time must be after the start time.' };
+  }
+
   const available = canBook({
     start: startMinutes,
     end: endMinutes,
@@ -44,6 +48,5 @@ export function checkRoomAvailability({
     bookings,
   });
 
-  const error = startMinutes < endMinutes ? '' : 'The end time must be after the start time.';
-  return { available, error };
+  return { available, error: '' };
 }
```

### 8.3 The residual risk
| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
|---|---|---|---|---|---|---|---|
| R2 | 3 | 2 | 6 | 1 | 2 | 2 | The test found two room options before the fix and one after it. A future UI change could add another room. |
| R3 | 2 | 2 | 4 | 1 | 2 | 2 | The test checks reversed and equal times. I also checked 11:00–10:30 in the browser and saw only the error message. |


### 8.4 The final run

```text

 RUN  v3.2.7 /private/tmp/week10-repo.7GNpql/week-10/app

 ✓ src/booking.test.ts (21 tests) 5ms

 Test Files  1 passed (1)
      Tests  21 passed (21)
   Start at  13:26:48
   Duration  262ms (transform 47ms, setup 0ms, collect 59ms, tests 5ms, environment 0ms, prepare 60ms)
```

The final `npm run build` also completed successfully.

```text

> smart-campus-availability@0.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 33 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.42 kB │ gzip:  0.28 kB
dist/assets/index-X8OGNIvT.css    0.66 kB │ gzip:  0.36 kB
dist/assets/index-DMKs4pse.js   144.79 kB │ gzip: 46.60 kB
✓ built in 282ms
```

## 9. Task 9, and what still fails

### 9.1 A background agent on this project

| Rule                        | What I require                                                                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Isolation                   | Work in a separate Git worktree on a new branch based on `week-10`.                                                                                                            |
| Permitted files             | Read the project during the review. After I approve a patch, edit only the agreed files in `week-10/app/src/`, such as `App.tsx`, `roomAvailability.ts`, or `booking.test.ts`. |
| Commands                    | In `week-10/app`, run `npm install`, `npx vitest run`, and `npm run build`. In `week-10`, run `python3 tests/check_audit.py` and `python3 tests/validate_submission.py`.       |
| Prohibited actions          | Use fictional data only. Do not use credentials, add a login or database, deploy the app, commit to `main`, or merge the PR.                                                   |
| Required evidence           | Show me the `git diff`, the test and build output, and a short note on what changed. Explain which risk the change fixes and list any checks you skipped.                      |
| Before merging or deploying | I review the diff and check AC1–AC6 before I approve the changes. The PR stays open for grading. The app stays local.                                                          |

### 9.2 Optional — the deck's checklist prompt (not graded)

I skipped the optional checklist prompt.

### 9.3 Checks I am keeping as FAIL or ERROR

None. All 31 audit checks passed.



## 10. Release decision and conclusion

**Decision:** NO-GO

I would keep the app as a local demo for now. For R2, the app now shows only Room A-101, and the test checks that there is exactly one room option. For R3, I checked an invalid time range in the mobile view and saw only the error message. All 21 tests passed, and the build was successful.

I chose NO-GO because `npm audit` reported two critical vulnerabilities and R6 is still open. The project has no CI, so I have to run the checks myself. Before changing my decision, I would review the dependency updates and run the full test suite again.


