# AI Usage Disclosure — Week 05

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool   | Exact model / plan | Used for                       | Which files it touched                           |
|--------|--------------------|--------------------------------|--------------------------------------------------|
| Gemini | Gemini 3.6 Flash   | the plan (Task 1)              | `lab-report.md`                                  |
| Gemini | Gemini 3.6 Flash   | the first version, v1 (Task 2) | `code/booking.py`, `code/original/booking_v1.py` |
| Gemini | Gemini 3.6 Flash   | review/critique (Task 5)       | `lab-report.md`                                  |

**The assistant wrote, or helped write, my tests in `code/`:** yes

The assistant helped write the initial test cases in `code/test_booking.py`. I checked the
EXPECTED values against AC1–AC5 and the task requirements, rather than using the generated
implementation as the source of truth. I also added and reviewed additional boundary and
overlap tests based on the contract.

**`code/original/` holds the assistant's first answer exactly as returned:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition:** yes

**Anything I accepted from the AI without fully understanding it:**

None. I reviewed the implementation and the overlap condition
`max(start, e_start) < min(end, e_end)` and checked that it allows touching endpoints
while rejecting actual overlaps.

Signed: Khalenov Birzhan

Date: 2026-10-06