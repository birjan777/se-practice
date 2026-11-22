# AI Usage Disclosure — SIS #04

Course AI-use level D.

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| ChatGPT (web) | not displayed | 22 November 2026 | Reviewed the baseline from a pasted repository map and code references. Discussed blocked rooms, stale results and test cases. | None. The web chat had no repository write access. |
| Codex (desktop) | not displayed | 22 November 2026 | Prepared the baseline and analysis commits, built the catalog and filters, refactored the code, wrote and ran tests, checked the browser, and wrote the report evidence. | `app/`, `report.md` except the student reflection, `diagrams/`, `evidence/`, `AI_USAGE.md`, `submission.yml`. |

**The assistant wrote, or helped write, tests in `app/`:** Yes. Codex added the tests in `filter.test.ts` and the room-specific tests in `booking.test.ts`. The expected results were checked against README §5 and §9. B5 means exact capacity and B6 means one seat short. The original 19 checks kept their assertions.

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** Yes. Codex ran Vitest in the local macOS checkout and copied the terminal output.

**Every number in report.md section 7 was measured the way its row says:** Yes. The measurements came from the full test runs, the source comparison and the tracked file lists.

**I shared no credentials, keys or private data with any tool:** The separate web review received a repository map, source references and fictional scenario data. It received no credentials or keys.

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and why each module exists:** Pending student review.

**Anything I accepted from the AI without fully understanding it:** Pending student review.

Signed:
Date:
