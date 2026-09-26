# Traceability — use cases → stories → criteria

One row per use case. All six rows stay, even the ones with nothing behind them: an empty cell is a
finding you report, not a failure you hide. Use real IDs, comma-separated; write `none` where there is
nothing.

| Use case                    | Stories (US-nn) | Criteria (AC-nn)                  | Gap? |
|-----------------------------|-----------------|-----------------------------------|------|
| UC-01 View availability     | US-01           | none                              | Yes  |
| UC-02 Book room             | US-02           | AC-01, AC-02, AC-03, AC-04, AC-05 | No   |
| UC-03 Cancel booking        | US-03           | AC-06, AC-07, AC-08               | No   |
| UC-04 Block or unblock room | US-04           | AC-09, AC-10, AC-11               | No   |
| UC-05 Review usage          | US-05           | none                              | Yes  |
| UC-06 Send confirmation     | US-06           | none                              | Yes  |

**Stories that belong to no use case:** none

**What the gaps tell you:** Acceptance criteria were created only for the three selected stories: US-02, US-03, and US-04. Therefore, UC-01, UC-05, and UC-06 have no acceptance criteria. These are traceability gaps, not new requirements.