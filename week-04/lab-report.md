# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

## 1. Setup

| Field             | Value                            |
|-------------------|----------------------------------|
| Name              | Khalenov Birzhan                 |
| Group             | 25B030042                        |
| AI assistant      | Gemini                           |
| Exact model       | Gemini 3.6 Flash                 |
| Renderer          | PlantUML web server              |
| Behaviour diagram | sequence                         |
| Stories used      | the reference set from README §3 |
---


## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.

### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.
```

### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
Generate PlantUML for Book room. Use Student, BookingService, and BookingRepository lifelines. Validate the supplied rules, then attempt the reservation. Show a successful confirmation and an unavailable-room alternative using alt. Label messages and replies. Explain new design components and all assumptions.
```

### 2.4 Focused correction prompts (if you sent any)

```text
none
```

### 2.5 Critique prompt

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```

 

---

## 3. Task 1 — use-case review

**Assumptions the AI listed:**  
1. The system implicitly knows the identity of the logged-in user, so a student can cancel only their own bookings.
2. Viewing room availability is not a mandatory prerequisite for booking.
3. R1, R2 and R3 are treated as domain validation rules inside the relevant use cases.
At least **two** findings. A finding names the element, the problem and the rule or story that
proves it is a problem.


| #    | Element                                          | Problem                                                                                                                   | Rule or story | Fix                                                               |
|------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| 1    | Book Study Room → Generate Booking Confirmation  | The AI modeled confirmation as a separate included use case. It is a system result, not a separate user goal.             | R4, US-01     | Removed Generate Booking Confirmation from the use-case diagram.  |
| 2    | US-01: Book Study Room                           | The use-case name includes the story ID and does not directly represent the simple user goal used in the revised diagram. | US-01         | Renamed it to Book Room.                                          |

---

## 4. Task 2 — class diagram review


### 4.1 Associations

| Association       | Direction / meaning                               | Multiplicity                                  |
|-------------------|---------------------------------------------------|-----------------------------------------------|
| Student — Booking | Student makes Booking; Booking belongs to Student | Student 1 → Booking 0..*; Booking → Student 1 |
| Room — Booking    | Room contains Booking; Booking belongs to Room    | Room 1 → Booking 0..*; Booking → Room 1       |


### 4.2 Constraints the multiplicities cannot show

- R2: Active bookings for the same room cannot overlap. This is stated in a note attached to the Booking class.
- R1: The booking start must be in the future and the duration must be greater than 0 and at most 2 hours. This is stated in a note attached to the Booking class.
- R3: A blocked room cannot accept a new booking. This is stated in a note attached to the Room class.
- R4: A successful booking produces a confirmation. This is stated in a note attached to the Booking class.


### 4.3 Assumptions

- A1: Bookings that touch at the boundary do not overlap. For example, a booking from 10:00 to 12:00 and another booking from 12:00 to 13:00 are allowed.
- A2: Existing bookings remain when a room is blocked. Blocking a room prevents new bookings but does not cancel existing bookings.


### 4.4 Findings

| #    | Element              | Problem                                                                                                                                                           | Rule or story | Fix                                                                                    |
|------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------|
| 1    | Administrator — Room | The AI added a 0..* to 0..* association, but the stories only define administrator goals to block and unblock rooms and do not require a structural relationship. | US-04, US-05  | Removed the Administrator — Room association.                                          |
| 2    | R2 constraint        | The AI explained R2 in text but did not represent it as a UML note in the diagram.                                                                                | R2            | Added an R2 note to the Booking class.                                                 |
| 3    | Booking validation   | The AI placed R1 validation operations in Booking, but the class diagram alone does not show the required validation order before booking creation.               | R1            | Kept the domain operations and will show the validation order in the Sequence Diagram. |
---


## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3A sequence — it shows the interaction flow when a student tries to book a study room and makes the validation order visible.

**Design components added beyond the domain model:** 
- `BookingService` — validates the booking request, checks the booking rules, and coordinates the reservation process.
- `BookingRepository` — checks room status and existing bookings and creates a booking only after all validation checks pass.

| #    | Element                 | Problem                                                                                                                                                    | Rule or story      | Fix                                                                                |
|------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|------------------------------------------------------------------------------------|
| 1    | Room availability check | The AI combined R2 and R3 into one `existsOverlappingOrBlocked` check, so the diagram did not show clearly whether the room was blocked or already booked. | R2 and R3          | Split the check into `isRoomBlocked` for R3 and `existsOverlappingBooking` for R2. |
| 2    | Room class state        | The revised class diagram used `status: RoomStatus`, but the checker requires an explicit blocked state for R3.                                            | R3 / US-04 / US-05 | Changed the Room attribute to `blocked: Boolean`.                                  |
---

## 6. AI critique

Run the critique prompt once, on all your revised diagrams together. At least **three** rows. A
critique is another claim to evaluate, not a verdict: reject what is wrong and say why.

| #    | Issue the AI raised                                                                              | Element it cited                          | Verdict | Why                                                                                                                                                                                                                                   |
|------|--------------------------------------------------------------------------------------------------|-------------------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1    | The `bookRoom` method signature is different between the class and sequence diagrams.            | `Student.bookRoom(...)` / `bookRoom(...)` | accept  | The class diagram uses `room: Room`, while the sequence diagram uses `studentId` and `roomId`. The names and parameter representation should be consistent across the models.                                                         |
| 2    | The `RoomStatus` enum is unused after the Room class was changed to use a boolean blocked state. | `RoomStatus` / `Room.blocked`             | accept  | `RoomStatus` is declared but is not referenced by the revised Room class. It is unnecessary and should be removed to avoid an unjustified element.                                                                                    |
| 3    | The cancellation flow does not explicitly verify that the booking belongs to the student.        | `Student.cancelBooking(booking)` / US-03  | reject  | The behaviour diagram models the Book Room scenario (Task 3A), not cancellation. The assignment does not require a cancellation sequence in the behaviour diagram, so adding cancellation logic would expand the scope unnecessarily. |
---

## 7. Consistency table

One row for each of **R1–R4**, then one row for **every use case in your revised use-case
diagram**, spelled exactly as in the diagram, with the story ID it traces to.

| Requirement / story | Use case                              | Classes                             | Behaviour element                                                                                                             |
|---------------------|---------------------------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| R1                  | Book Room                             | Booking: startTime, durationMinutes | `validateBookingRules(startTime, durationMinutes)`; `R1 validation failed` / `R1 validation passed`                           |
| R2                  | Book Room                             | Room, Booking; R2 note on Booking   | `existsOverlappingBooking(roomId, startTime, durationMinutes)`; `R2 overlapping booking exists` / `R2 no overlapping booking` |
| R3                  | Book Room / Block Room / Unblock Room | Room: blocked                       | `isRoomBlocked(roomId)`; `R3 room is blocked` / `R3 room is not blocked`                                                      |
| R4                  | Book Room                             | Booking                             | `BookingConfirmation (bookingId, details)` after `createBooking(...)`                                                         |
| US-01               | Book Room                             | Student, Booking, Room              | `bookRoom(studentId, roomId, startTime, durationMinutes)`                                                                     |
| US-02               | View Room Availability                | Room, Booking                       | Use-case association; no behaviour message in the Book Room sequence                                                          |
| US-03               | Cancel Own Booking                    | Student, Booking                    | `Student.cancelBooking(booking)`; no cancellation flow is shown in the selected Book Room sequence                            |
| US-04               | Block Room                            | Administrator, Room                 | `Administrator.blockRoom(room)`; no admin behaviour flow is shown in the selected Book Room sequence                          |
| US-05               | Unblock Room                          | Administrator, Room                 | `Administrator.unblockRoom(room)`; no admin behaviour flow is shown in the selected Book Room sequence                        |
| US-06               | Review Room Usage                     | Administrator, Booking, Room        | `Administrator.reviewUsage()`; no usage-review flow is shown in the selected Book Room sequence                               |
---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your
behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.

| Change                                                                                                 | Diagram          | Reason                                                                                                           |
|--------------------------------------------------------------------------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------|
| Removed Generate Booking Confirmation as an included use case and renamed Book Study Room to Book Room | Use case diagram | Confirmation is an outcome, not a separate student goal; the use-case name should describe the goal              |
| Removed Administrator–Room association, added R2 note, and changed Room state to blocked Boolean       | Class diagram    | The association was not justified by the requirements; R2 is a constraint and R3 requires explicit blocked state |
| Split combined availability check into separate blocked-room and overlapping-booking checks            | Sequence diagram | R3 and R2 are different validation rules and should be shown separately                                          |
---

## 9. Checker output

```text
UC1  PASS  Student and Administrator declared
UC2  PASS  named system boundary: "Smart Campus Study Room Booking System"
UC3  PASS  all actors declared outside the boundary
UC4  PASS  all scenario goals present (6 use cases)
UC5  PASS  no actor is associated with a confirmation use case
UC6  PASS  actor responsibilities match the scenario
UC7  PASS  use cases are goals, not screens or components
UC8  PASS  every include / extend / generalization carries a ' why: comment (or there are none)
UC9  PASS  revised diagram differs from the AI's original
CL1  PASS  Student, Room and Booking present
CL2  PASS  Booking is associated with Student and with Room
CL3  PASS  every association has multiplicities at both ends
CL4  PASS  1 student / 1 room per booking, 0..* bookings per student and per room
CL5  PASS  every inheritance / composition / aggregation carries a ' why: comment (or there are none)
CL6  PASS  only domain concepts in the class diagram
CL7  PASS  attributes needed by R1-R3 are present
CL8  PASS  a note states R2 (no overlapping active bookings)
SQ1  PASS  Student, BookingService and BookingRepository lifelines present
SQ2  PASS  alt block with a guard on every branch (6 branches)
SQ3  PASS  validation happens before creation
SQ4  FAIL  a failure branch still creates/saves: createBooking(studentId, roomId, startTime, durationMinutes)
SQ5  PASS  every message is labelled
SQ6  PASS  R1 (time range) is visible - checked or stated as a precondition
SQ7  PASS  R3 (blocked room) is visible
FI1  PASS  the AI's original output is kept for every diagram
FI2  PASS  a rendered image for every diagram
LR1  PASS  §1 setup filled (tool and model recorded)
LR2  PASS  5 prompts pasted in §2
LR3  PASS  2 use-case findings in §3
LR4  PASS  §4 relationships read both ways, 2 assumption(s) declared
LR5  PASS  2 behaviour-diagram findings in §5
LR6  PASS  3 critique issues with a verdict
LR7  PASS  3 change-log rows covering all three diagrams
CS1  PASS  6 approved stories
CS2  PASS  §7 traces R1-R4 into the diagrams
CS3  PASS  every use case traces to an approved story
CS4  PASS  every lifeline is a domain class or an explained design component

SUMMARY pass=36 fail=1 error=0
```

**FAILs I am keeping, and why:**

- SQ4 — The checker reports `createBooking(...)` as being inside a failure branch, but in the sequence diagram it is inside the successful `else R2 no overlapping booking` branch, after R1, R3, and R2 validation. No booking is created on the R1, R3, or R2 failure branches. I keep this FAIL because it is a limitation of the shape-only checker parser, not a failure of the modeled booking flow.

---

## 10. Conclusion (120–180 words)

<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have
reached the code if nobody had reviewed it? What did the critique find that you missed — and what
did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;
"the AI put 1..* on the Booking end, which says every room must already have a booking" is worth
everything.>
