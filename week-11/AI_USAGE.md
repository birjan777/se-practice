# AI Usage Disclosure — Week 11

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Codex | not displayed | Implement the feature | app/src/booking.ts, roomAvailability.ts, explain.ts, App.tsx, index.css |
| Codex | not displayed | Compare three instructions in separate fresh conversations | None during sampling |
| Codex | not displayed | Read-only review of the supplied source and diff excerpts | None during review |
| Codex | not displayed | Verify findings, repair V1 and V2 and add regression tests | app/src/explain.ts, app/src/explain.test.ts |
| Codex | not displayed | Prepare the contract, tests E1–E9, comparison, evidence, report, declaration and PR draft | app/src/explain.test.ts, lab-report.md, AI_USAGE.md, submission.yml |

**Every changed file personally reviewed by the student:** no, awaiting student review.

**No API key, token or provider call in app/src/:** yes, checked with the course checker.

**Review was read-only:** yes. The reviewer provided text and was unable to access the execution environment. The full raw diff was unavailable in its session. The relevant source and UI changes were supplied in the conversation.

**Each finding personally labelled by the student:** no. Codex verified the evidence in §7.3 and performed the regression runs.

**Additional AI assistance:** yes, Codex prepared the evidence and documentation in §§1–9. The student reflection remains open.

**Terminal output pasted from real runs:** yes. The Vitest output blocks in §§2.2, 6.2 and 8.3 are from the recorded runs.

**Student can explain timeout and contradiction independently:** awaiting student confirmation.

**Anything accepted without full understanding:** awaiting student review.

Student signature pending. Prepared 27 November 2026.
