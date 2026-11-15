# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:** Khalenov Birzhan  
**Student ID:** 25B030042  
**GitHub:** birjan777

---

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | Gemini |
| Exact model (or "not displayed") | not displayed |
| Three fresh chats for R1, R2, R3? (yes / no) | yes |
| Python version (`python --version`) | Python 3.13.7 |
## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json
{
  "name": "check_room",
  "description": "Checks whether a room is available for the requested time interval using the current time, blocked status, and existing bookings. All times are whole minutes since midnight, from 0 to 1440 inclusive. This tool only checks availability: it does not save or create a booking and does not modify existing bookings.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested start time in minutes since midnight."
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested end time in minutes since midnight."
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Current time in minutes since midnight."
      },
      "blocked": {
        "type": "boolean",
        "description": "Whether the room is blocked."
      },
      "bookings": {
        "type": "array",
        "description": "Existing bookings. An empty array means there are none.",
        "items": {
          "type": "object",
          "properties": {
            "start": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440
            },
            "end": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440
            }
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": ["start", "end", "now", "blocked", "bookings"],
    "additionalProperties": false
  }
}
```

| Field | Constraint | What goes wrong without it |
| --- | --- | --- |
| inputSchema | `"type": "object"` | A value that is not an object could be accepted instead of named arguments. |
| inputSchema | Five named properties: start, end, now, blocked, bookings | The model would not have a defined structure for all five inputs. |
| inputSchema | All five fields in `"required"` | Calls could omit information, such as now in S04. |
| inputSchema | `"additionalProperties": false` | Invented fields such as room in S05 could be accepted. |
| start, end, now | `"type": "integer"` | Time strings or fractional minutes could be accepted, as in S03 and S10. |
| start, end, now | `"minimum": 0` | Negative minute values such as start = -30 in S06 could be accepted. |
| start, end, now | `"maximum": 1440` | Times beyond the day, such as end = 1500 in S07, could be accepted. The inclusive limit permits 1440 in S11. |
| blocked | `"type": "boolean"` | The string "false" could be accepted instead of the boolean false, as in S09. |
| bookings | `"type": "array"` | Existing bookings could be supplied in an unexpected format. No minimum length is imposed, so an empty list remains valid. |
| bookings.items | `"type": "object"` | A pair such as [660, 720] in S12 could be accepted instead of named start and end fields. |
| bookings.items | Properties start and end | Each existing booking needs a defined structure for its interval. |
| bookings.items.start, bookings.items.end | `"type": "integer"` | Existing booking times could contain strings or fractional minutes. |
| bookings.items.start, bookings.items.end | `"minimum": 0` | Existing booking times before the start of the day could be accepted. |
| bookings.items.start, bookings.items.end | `"maximum": 1440` | Existing booking times beyond the day could be accepted. |
| bookings.items | `"required": ["start", "end"]` | Incomplete bookings such as the one without end in S08 could be accepted. |
| bookings.items | `"additionalProperties": false` | Unexpected fields inside an existing booking could be accepted. |


## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

The first run used the unchanged starter definition. The final column records the corrected definition. Both real outputs are preserved in evidence/checker-baseline.txt and evidence/checker-tool-first.txt.


| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | The valid R1 call remains accepted. |
| S02 | PASS | PASS | Empty bookings remain allowed. |
| S03 | FAIL | PASS | Set end to integer, rejecting a time string. |
| S04 | FAIL | PASS | Added now to the required fields. |
| S05 | FAIL | PASS | Set additionalProperties to false to reject extra fields. |
| S06 | FAIL | PASS | Set the minimum start value to 0. |
| S07 | FAIL | PASS | Set the maximum end value to 1440. |
| S08 | FAIL | PASS | Required both start and end inside each booking. |
| S09 | FAIL | PASS | Set blocked to boolean, rejecting a string. |
| S10 | FAIL | PASS | Set start to integer, rejecting fractional minutes. |
| S11 | PASS | PASS | The inclusive maximum of 1440 keeps this valid call accepted. |
| S12 | FAIL | PASS | Required each booking to be an object, rejecting an array pair. |



## 4. Function calling — what the model wrote

### R1

```text
{"name": "check_room", "arguments": {"start": 600, "end": 660, "now": 540, "blocked": false, "bookings": [{"start": 660, "end": 720}]}}
```

The reply matches the request. The model converted 9:00 to 540, 10:00 to 600, 11:00 to 660, and 12:00 to 720. It preserved blocked = false and the existing booking. The requested interval ends exactly when the existing booking starts. AC4 permits touching endpoints, so this request should be available under the stated conditions.

### R2

```text
{"name": "check_room", "arguments": {"start": 840, "end": 990, "now": 810, "blocked": true, "bookings": []}}
```

The reply matches the request. The model converted 13:30 to 810, 14:00 to 840, and 16:30 to 990. It correctly included blocked = true and an empty bookings list. Making the call was appropriate even though the requested duration is 150 minutes and the room is blocked. The schema accepts correctly formed arguments; canBook should return Unavailable under AC2 and AC3.

### R3

```text
What time tomorrow afternoon would you like to book the room, and what are its current blocked status and existing bookings?
```

The model asked a question instead of inventing arguments. The request did not provide an exact interval, the current time, the blocked status, or existing bookings. The question asks about the requested time, blocked status, and bookings, but does not explicitly ask for now or an exact end time. It is therefore a useful first clarification, rather than a complete collection of every required argument.

The model invented no numeric values and produced no tool call. Also, tomorrow cannot be represented directly by this interface: the schema contains minutes within a day but no date field. Selecting the relevant day would require handling outside this schema.


## 5. What the schema cannot check

| Criterion | What the schema cannot enforce |
| --- | --- |
| AC1 | The schema enforces integer times within 0–1440. However, the allowed keywords cannot compare fields to check `start < end` or `start > now`. These comparisons remain in `canBook`. |
| AC2 | The schema cannot calculate `end - start` and enforce the maximum duration of 120 minutes. The function must check this. |
| AC3 | The schema checks that `blocked` is a boolean. Both `true` and `false` are valid inputs, because checking a blocked room is still a valid tool call. The function decides that the room is unavailable. |
| AC4 | The schema checks the structure of existing bookings but cannot compare their intervals with the requested interval. The function must detect overlaps while allowing touching endpoints. |
| AC5 | An input schema cannot prove that execution avoids changing or saving bookings. This requires implementation review and tests of the function. |
| AC6 | An input schema cannot verify the feedback displayed to the user. This requires checking the calling application and its interface. |

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | This is the read-only availability check the user requested. Required arguments must be provided rather than guessed. |
| A2 | read `week-08/app/src/booking.ts` | allow | Reading relevant source code helps explain behavior without changing repository contents. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | block | Requesting a three-hour booking does not authorize changing AC2. The agent should preserve the requirement and explain why the request is unavailable. |
| A4 | run `npm test` in `week-08/app` | allow | Running the known local test command can verify relevant changes. This permission applies to reviewed project tests because they execute local code. |
| A5 | run `git reset --hard` to undo its own last three edits | ask | A hard reset can discard other tracked edits and move the branch. Its exact scope must be reviewed and approved before execution. |
| A6 | `git commit` its change on the `week-09` branch | allow | Local commits preserve task progress and support the required history. The agent should stage only reviewed files belonging to this task. |
| A7 | `git push` to `main` | block | Directly pushing to main bypasses the required week-09 branch and open pull request workflow. |
| A8 | send the contents of `.env` to an MCP server it found online | block | The file may contain credentials. Sending it to an unknown external server could expose secrets without authorization. |

## 7. Checkpoint

Checkpoint commit: `83a3ace` — `Week 09: add starter files and checkpoint`.

This commit was created on `week-09` before changing the supplied tool definition.

The exact rollback command is `git reset --hard 83a3ace`. This command is documented here and has not been executed.

When run on `week-09`, it would move the branch back to the checkpoint and restore the index and tracked working files to that version. It would discard uncommitted changes to tracked files and remove tracked files introduced by later commits, including the saved model replies and evidence files.

The later commits would no longer be part of the current branch history, although their objects are not immediately erased. Ordinary untracked files generally remain, but untracked paths obstructing restoration can be removed. The saved Week 08 stash is separate from this reset.

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls/r1.json: a call to check_room
PASS  F2    calls/r1.json: arguments valid against your schema
PASS  F3    calls/r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls/r2.json: a call to check_room
PASS  F5    calls/r2.json: arguments valid against your schema
PASS  F6    calls/r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
PASS  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
PASS  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
PASS  L3    section 7 names the checkpoint commit (a SHA)
PASS  L4    section 10: a conclusion of 80-150 words
PASS  L5    AI_USAGE.md filled in (a tool row, and signed)

SUMMARY: 30 PASS · 0 FAIL · 0 ERROR  (of 30 checks)
Paste this whole output into lab-report.md section 8, and these three numbers into submission.yml.

```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. -->

None. The final checker run reported 30 PASS, 0 FAIL, and 0 ERROR.

## 10. Conclusion (80–150 words)

<!-- What did you learn about the line between the schema, the model and the function? Be specific:
     name a case, a request or an action. "Tool definitions are important" is worth nothing. -->

The main distinction in this lab is between a valid tool call and an available booking. In R2, Gemini produced the correct arguments, but the 150-minute duration and blocked room mean that canBook should return Unavailable. The schema checks types, required fields, and individual time bounds. The function checks relationships such as start before end and overlaps with existing bookings. For R3, the model asked a question instead of inventing values, although it did not explicitly request now or an exact end time. The permissions exercise separated checking availability from changing requirements: A1 is allowed, while A3 is blocked. The checkpoint provides a recovery point, but a hard reset needs approval because it can discard other tracked work.
