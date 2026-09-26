# Lab Report — Practice #03: Requirements Engineering with AI

## 1. Scenario and business rules

The system is a Smart Campus study room booking system for the KBTU library.

The scenario defines exactly two actors:

- Student
- Administrator

The scenario defines exactly six use cases:

- UC-01 View availability
- UC-02 Book room
- UC-03 Cancel booking
- UC-04 Block or unblock room
- UC-05 Review usage
- UC-06 Send confirmation

Business rules:

- R1: A booking must start in the future.
- R2: A booking can last at most two hours.
- R3: Two bookings for the same room must not overlap.
- R4: A blocked room cannot be booked.

Out of scope:

- Payments, fees, fines, or penalties
- Check-in, attendance, or QR functionality
- Equipment, cleaning, or maintenance requests
- SMS, push, or reminder notifications beyond UC-06
- Registration, passwords, or authentication
- Waiting lists or queues
- Screens, colours, databases, or servers

Two ambiguities were identified:

1. A booking ending exactly when another booking begins: whether this counts as an overlap under R3.
2. A booking lasting exactly two hours: whether equality is allowed under R2.

---

## 2. User stories (Part 1)

The first AI-generated user stories contained several out-of-scope and invented elements. Examples included equipment, sensors, SSO authentication, personal dashboards, maintenance, emergency events, SMS/email reminders, and check-in.

The original AI output was preserved during the review process.

After review, the stories were rewritten to match the six supplied use cases and the scenario.

### Final stories

- **US-01 — View availability:** Student wants to view which study rooms are available, so they can choose a free room.
- **US-02 — Book room:** Student wants to book an available room for a time slot, so they can reserve it for studying.
- **US-03 — Cancel booking:** Student wants to cancel a booking they made, so the reservation is released.
- **US-04 — Block or unblock room:** Administrator wants to block or unblock a room, so they can control whether the room can be booked.
- **US-05 — Review usage:** Administrator wants to review room usage over a period, so they can understand room usage.
- **US-06 — Send confirmation:** Student wants confirmation when a booking or cancellation is completed, so they know the action was recorded.

Each story has a priority and an assumption.

---

## 3. User story review (Part 1)

The generated stories were reviewed against the supplied scenario.

| # | Review decision | Reason                                                                                                             |
|---|-----------------|--------------------------------------------------------------------------------------------------------------------|
| 1 | Rewrite         | The generated story added capacity, location, equipment, and sensors that were not in scope.                       |
| 2 | Rewrite         | Booking was in scope, but SSO authentication was not part of the scenario.                                         |
| 3 | Rewrite         | Cancellation was in scope, but a personal dashboard was not specified.                                             |
| 4 | Delete          | SMS/email reminders and check-in were outside the supplied scope.                                                  |
| 5 | Delete          | Configurable booking policies and a three-day advance limit were not specified.                                    |
| 6 | Rewrite         | Review usage is in scope, but real-time analytics, capacity planning, logs, and check-in timestamps were invented. |
| 7 | Rewrite         | Block/unblock is in scope, but reservation overrides, maintenance, and emergency events were not specified.        |

The assistant invented several out-of-scope elements, including equipment, sensors, SSO authentication, personal dashboards, SMS/email reminders, check-in, maintenance, and emergency events. Each generated story was checked against the explicit out-of-scope list.

The final result contains six stories because the scenario specifies exactly six fixed use cases. One revised story was kept for each supplied use case so that the final requirements cover the complete supplied scope without adding new functionality.

---

## 4. Acceptance criteria (Part 2)

The original AI-generated acceptance criteria were also reviewed.

The original output assumed a standard Meeting Room Booking System and introduced details such as:

- authentication
- server time
- room maintenance status
- interface messages
- updating an existing booking

These details were not part of the supplied scenario.

The generated criteria were therefore rewritten using only the supplied business rules and use cases.

### Selected stories

Acceptance criteria were created for three selected stories:

- US-02 Book a room
- US-03 Cancel a booking
- US-04 Block or unblock a room

There are 11 criteria in total.

### Important assumptions

- **Overlap:** A booking that ends exactly when another booking begins is allowed under R3, because the two bookings do not overlap in time.
- **Duration:** A booking of exactly two hours is allowed under R2, because "at most two hours" includes two hours.

### US-02 — Book a room

- **AC-01:** A future booking for an available and unblocked room with a duration of two hours or less is created successfully.
- **AC-02:** A booking that starts in the past is rejected.
- **AC-03:** A booking lasting more than two hours is rejected.
- **AC-04:** An overlapping booking for the same room is rejected.
- **AC-05:** A booking starting exactly when another booking ends is allowed if all other rules are satisfied.

### US-03 — Cancel a booking

- **AC-06:** A student's own booking can be cancelled.
- **AC-07:** After cancellation, the time slot can become available for a new booking unless another booking or block prevents it.
- **AC-08:** A student cannot cancel another student's booking.

### US-04 — Block or unblock a room

- **AC-09:** When an administrator blocks a room, the room cannot be booked.
- **AC-10:** When an administrator unblocks a room, it can be booked again if the other booking rules are satisfied.
- **AC-11:** A student cannot book a blocked room.

The criteria include invalid and boundary cases, including a past start time, a duration greater than two hours, overlapping bookings, and a booking that starts exactly when another booking ends.

---

## 5. Acceptance criteria review (Part 2)

The original AI output contained criteria based on functionality that was not in the scenario.

| Generated item                    | Problem                                                                                                   | What I changed it to                                                    |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Story 1 — Book a Meeting Room     | Included authentication, server time, maintenance status, and interface messages that were not specified. | Rewrote the criteria for US-02 using only the supplied booking rules.   |
| Story 2 — Update Existing Booking | Updating an existing booking is not one of the six supplied use cases.                                    | Removed it and selected only supplied use cases for the final criteria. |

### Open questions

**A. Booking ending exactly when another begins**

Decision: **Allowed.**

Reason: Two bookings with one ending exactly when the next starts do not overlap in time.

**B. Booking lasting exactly two hours**

Decision: **Allowed.**

Reason: R2 says a booking can last "at most two hours", so exactly two hours satisfies the rule.

The original AI criteria did not clearly test these two boundary cases. The final criteria explicitly test both cases.

---

## 6. Use-case diagram (Part 3)

The final PlantUML diagram contains:

- exactly two actors: Student and Administrator
- exactly six supplied use cases
- one system boundary
- only justified actor associations
- no screens, databases, servers, or internal components

The final diagram is stored in:

`requirements/use-cases.puml`

The rendered diagram was checked using Omni Viewer.

Rendered diagram:

https://omni-viewer-web.web.app/share/g0vKBVa_1NvLZHab

The final actor associations are:

- Student → View availability
- Student → Book room
- Student → Cancel booking
- Administrator → Block or unblock room
- Administrator → Review usage

Book room and Cancel booking include Send confirmation because confirmation is part of the supplied use-case scope.

---

## 7. Diagram review (Part 3)

The original AI-generated diagram incorrectly connected Administrator to UC-01 View availability.

I removed this association because the supplied scenario does not explicitly assign View availability to the Administrator.

| Element                            | Problem                                                           | What I changed |
|------------------------------------|-------------------------------------------------------------------|----------------|
| Administrator → View availability  | The association was not explicitly justified by the scenario.     | Removed it.    |
| Student → View availability        | No problem.                                                       | Kept it.       |
| Student → Book room                | No problem.                                                       | Kept it.       |
| Student → Cancel booking           | No problem.                                                       | Kept it.       |
| Administrator → Block/unblock      | No problem.                                                       | Kept it.       |
| Administrator → Review usage       | No problem.                                                       | Kept it.       |
| Book room → Send confirmation      | Justified because booking confirmation is supplied by UC-06.      | Kept include.  |
| Cancel booking → Send confirmation | Justified because cancellation confirmation is supplied by UC-06. | Kept include.  |

The diagram contains only the two specified actors and six specified use cases. No screens, databases, servers, or internal components appear.

---

## 8. Traceability (Part 5)

The traceability table contains one row for each of the six use cases.

- Use cases with **no story** behind them: None.
- Stories with **no use case** they belong to: None.
- Criteria that test **no rule** from section 1: None.

The largest gap is that three use cases have no acceptance criteria:

- UC-01 View availability
- UC-05 Review usage
- UC-06 Send confirmation

This is because acceptance criteria were intentionally created only for the three selected stories: US-02, US-03, and US-04.

These gaps identify parts of the requirements that still need validation criteria. They are reported as traceability gaps rather than being hidden or filled by inventing new requirements.

---

## 9. Checker runs

### `check_requirements.py and validate_submission.py`

```text
$ python3 tests/check_requirements.py
PASS   US-1  user-stories.md         no placeholders left
PASS   US-2  user-stories.md         6 stories, IDs US-01…US-06
PASS   US-3  user-stories.md         every story has the required sentence shape
PASS   US-4  user-stories.md         every story has a priority
PASS   US-5  user-stories.md         every story declares an assumption
PASS   US-6  user-stories.md         only Student and Administrator appear as roles
PASS   US-7  user-stories.md         nothing from the out-of-scope list appears
PASS   AC-1  acceptance-criteria.md  no placeholders left
PASS   AC-2  acceptance-criteria.md  three sections, all naming real stories: US-02, US-03, US-04
PASS   AC-3  acceptance-criteria.md  every section has 3 to 5 uniquely numbered criteria
PASS   AC-4  acceptance-criteria.md  all 11 criteria are complete Given/When/Then
PASS   AC-5  acceptance-criteria.md  every section covers an invalid or boundary case
PASS   AC-6  acceptance-criteria.md  2 assumptions listed before the criteria
PASS   AC-7  acceptance-criteria.md  both open questions are settled in the assumptions
PASS   PU-1  use-cases.puml          valid PlantUML block, no placeholders
PASS   PU-2  use-cases.puml          exactly two actors: Student, Administrator
PASS   PU-3  use-cases.puml          all six use cases present
PASS   PU-4  use-cases.puml          system boundary present
PASS   PU-5  use-cases.puml          no screens, databases or internal components
PASS   PU-6  use-cases.puml          no unjustified actor associations found
PASS   TR-1  traceability.md         all six use cases have a row
PASS   TR-2  traceability.md         every ID in the table resolves
PASS   TR-3  traceability.md         every story appears in the table
------------------------------------------------------------------------
23 PASS · 0 FAIL · 0 ERROR   (23 checks)
Shape is clean. This says nothing about whether the requirements are good.

$ python3 tests/validate_submission.py
submission.yml — submission.yml
------------------------------------------------------------------------
PASS   schema                                    1
PASS   week                                      03
PASS   student.name                              Khalenov Birzhan
PASS   student.student_id                        25B030042
PASS   student.github                            birjan777
PASS   assistant.tool                            Gemini
PASS   assistant.model                           3.6 Flash
PASS   counts.user_stories                       6
PASS   counts.acceptance_criteria_sets           3
PASS   checker                                   23 PASS · 0 FAIL · 0 ERROR
NOTE   checker                                   you are claiming a clean run — it will be re-run at your commit, so make sure it is true
PASS   checker.commit                            53573f4
PASS   assumptions.overlap_touching_bookings     allowed
PASS   assumptions.exactly_two_hours             allowed
PASS   traceability.use_cases_not_covered        UC-01, UC-05, UC-06
PASS   traceability.stories_not_traced           []
PASS   review_findings                           3 findings
PASS   review_findings[1]                        US-01 View availability was revised to remove out-of-scope e…
PASS   review_findings[2]                        US-02 Book room was revised to use only the supplied booking…
PASS   review_findings[3]                        UC-01 View availability, UC-05 Review usage, and UC-06 Send …
PASS   honesty.can_explain_everything_submitted  yes
PASS   honesty.ai_usage_disclosed                yes
------------------------------------------------------------------------
21 PASS · 0 FAIL · 0 ERROR · 1 note
Shape is fine. This says nothing about whether the work is good.
```

|                         | PASS | FAIL | ERROR |
|-------------------------|------|------|-------|
| check_requirements.py   | 23   | 0    | 0     |
| validate_submission.py  | 21   | 0    | 0     |

Commit these numbers were produced at:
`53573f4`

Every FAIL, one line each: what it is and what you decided to do about it.

- No FAIL remained in the final checker runs. An earlier US-7 failure was caused by the words "attendance" and "check-in" appearing in US-05; the assumption was revised to avoid introducing those out-of-scope concepts.

Did you run the checks by hand instead of with Python?

- No. Both checks were run using the provided Python scripts.


### 10. Conclusion (150–200 words)
1. The most wrong part of the generated requirements was that the assistant added details that were not in the scenario. 
For example, the generated stories mentioned equipment, sensors, SSO authentication, check-in, attendance, maintenance, and SMS/email reminders. 
It also incorrectly connected Administrator to UC-01 View availability in the first use-case diagram. I could have caught these problems without a checker by comparing 
every generated requirement with the scenario's explicit out-of-scope list, the six fixed use cases, and the two actors.


2. The assistant got useful structure right quickly. It produced six user stories covering the six supplied use cases, 
added priorities and assumptions, and produced a PlantUML diagram with the required actors and use cases. 
Creating this initial structure by hand would have taken noticeably longer, especially writing and organizing the six stories and diagram syntax.


3. I would rewrite US-02 Book a room first before handing the requirements to an implementer. It contains the most important business rules: the 
booking must start in the future, last no more than two hours, must not overlap another booking, and cannot use a blocked room. These rules directly affect
implementation and validation. I would make these conditions explicit and testable so that an implementer cannot interpret them differently.

