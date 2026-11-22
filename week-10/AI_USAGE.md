# AI Usage Disclosure — Week 10

Course AI-use level D. This is a working declaration for student review.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| ChatGPT, separate browser chat with pasted source | not displayed | Read the original playbook, performed the read-only risk review, audited the documentation and proposed two code patches. | None. It received pasted materials and returned text. |
| Codex desktop | not displayed | Set up the checkpoint, ran baseline and regression tests and builds, verified reviewer claims, drafted the risk register and the readiness audit, reviewed and applied two code diffs, and prepared the local branch and report. | Week 10 setup files, `app/src/App.tsx`, `app/src/roomAvailability.ts`, `app/src/booking.test.ts`, `evidence/review-*.md`, `lab-report.md`, `AI_USAGE.md` and `submission.yml`. |

**The review in Task 2 ran without repository write access and `git status` showed no app changes afterward:** yes. The reviewer used a separate browser chat with pasted source.

**I labelled every claim after opening the cited file myself:** no. Codex inspected the cited files and checked the labels against the source and baseline runs. Personal student verification is pending.

**Every change to `app/` was reviewed by me as a diff before I accepted it:** no. Codex reviewed the two code diffs and documented its decisions. The student's review is pending. The owner asked to make the playbook patch personally, and `app/AGENTS.md` is the original checkpoint copy.

**I used another assistant as well:** yes. Codex desktop did the local implementation, verification and report work described above.

**Every terminal output in the report was copied from a real run:** yes. The R2 red run used a command-line filter and the final suite ran in full. The build and Vitest outputs are from the local terminal.

**I can explain every score and why the decision follows without the assistant:** pending student review. The student must write the final conclusion and confirm understanding.

**Anything accepted from AI without fully understanding it:** pending student review. Review `3.2, `4 and both diffs in `8 before signing.

Signed: pending student signature
Date: 22 November 2026
