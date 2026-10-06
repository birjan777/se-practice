# Week 05 — Lab report

**Name:**
**Group:**
**Date:**

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

|                                               |                         |
|-----------------------------------------------|-------------------------|
| Assistant (tool)                              | Gemini                  |
| **Exact** model name                          | Gemini 3.6 Flash        |
| Language and version                          | Python 3.13.5           |
| Path                                          | A                       |
| My Week 04 declaration for touching bookings  | allowed                 |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
### Implementation Plan for `can_book`

#### 1. Explicit Assumptions

* **Time Scale & Types:** All time values (`start`, `end`, `now`) are integers representing minutes since midnight ($0$ to $1440$).
* **Data Structures:** `existing` is a sequence (list or tuple) containing valid `(e_start, e_end)` integer tuples for active bookings. `blocked` is a boolean.
* **Mutability:** The function must not modify input data structures (e.g., `existing`).

---

#### 2. Ordered Logic Checks

1. **AC3 Check (Block State):**
* If `blocked` is `True`, immediately return `False`.


2. **AC1 Check (Valid Time Range & Future Booking):**
* Check bounds: $0 \le \text{start} < \text{end} \le 1440$.
* Check start time relative to current time: $\text{start} > \text{now}$.
* If any of these fail, return `False`.


3. **AC2 Check (Duration Limit):**
* Check duration: $(\text{end} - \text{start}) \le 120$.
* If exceeded, return `False`.


4. **AC4 Check (Overlap Detection):**
* Iterate through each `(e_start, e_end)` in `existing`.
* Overlap exists if $\max(\text{start}, \text{e\_start}) < \min(\text{end}, \text{e\_end})$.
* If an overlap is found, return `False`.


5. **AC5 Check (Success):**
* If all previous checks pass without returning, return `True`.



---

#### 3. Boundary Test Cases

| Case ID | Scenario / Boundary | Inputs (`start`, `end`, `now`, `blocked`, `existing`) | Expected | Target Vulnerability |
| --- | --- | --- | --- | --- |
| **B1** | Immediate start after `now` | `start=601`, `end=660`, `now=600`, `False`, `[]` | `True` | Checks if strict inequality $\text{start} > \text{now}$ is enforced vs. $\ge$. |
| **B2** | Same-minute booking | `start=600`, `end=660`, `now=600`, `False`, `[]` | `False` | Catching invalid `start == now` attempts. |
| **B3** | Maximum allowed duration | `start=100`, `end=220`, `now=0`, `False`, `[]` | `True` | Boundary condition $(\text{end} - \text{start}) = 120$. |
| **B4** | Exceeding duration by 1 min | `start=100`, `end=221`, `now=0`, `False`, `[]` | `False` | Over-duration handling ($121$ minutes). |
| **B5** | End of day limit | `start=1320`, `end=1440`, `now=1200`, `False`, `[]` | `True` | Validating maximum possible boundary ($\text{end} = 1440$). |
| **B6** | Out of bounds end time | `start=1330`, `end=1441`, `now=1200`, `False`, `[]` | `False` | Validating boundary upper limit ($\text{end} > 1440$). |
| **B7** | Endpoint touching (Before) | New: `(500, 600)`, Existing: `[(600, 700)]` | `True` | Validating that touching endpoints ($\text{end} = \text{e\_start}$) do not count as overlap. |
| **B8** | Endpoint touching (After) | New: `(700, 800)`, Existing: `[(600, 700)]` | `True` | Validating that touching endpoints ($\text{start} = \text{e\_end}$) do not count as overlap. |
| **B9** | Partial overlap (1 min) | New: `(599, 660)`, Existing: `[(600, 700)]` | `False` | Off-by-one interval inclusion errors. |
| **B10** | Existing interval inside | New: `(500, 700)`, Existing: `[(550, 650)]` | `False` | Enclosing interval check failures. |
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | The plan said that all time values, including `now`, are integers from 0 to 1440. | The contract says `now` is valid from 0 to 1439. AC1 allows the booking `end` to be 1440. | I did not add the 0–1440 rule for `now`; I followed the contract and AC1. |
| 2 | The plan said that `existing` can be a list or tuple containing booking tuples. | The contract only specifies that `existing` contains valid `(start, end)` tuples. It does not add a list/tuple requirement for the container. | I did not add an extra container-type rule. |



**Boundary cases the assistant suggested that I kept as tests:**

- Start exactly one minute after `now` (`start > now`) — AC1.
- Start exactly at `now` — AC1.
- Exactly 120 minutes — AC2.
- 121 minutes — AC2.
- `end = 1440` — AC1.
- `end = 1441` — AC1.
- Touching at the end of an existing booking — AC4.
- Touching at the start of an existing booking — AC4.
- Partial overlap — AC4.
- An existing booking inside the requested interval — AC4.

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.<ext>`, exactly as the assistant returned it: yes / no

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

-

---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
(paste here)
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | | accept / reject | | |
| 2 | | accept / reject | | |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | | | |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
(paste here)
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
(paste here)
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

-

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->
