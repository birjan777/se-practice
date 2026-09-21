## 1. The frozen experiment

|                         |                   |
|-------------------------|-------------------|
| AI assistant            | Gemini            |
| Exact model name        | Flash 3.6         |
| Implementation language | Python            |
| Date of the runs        | 17 September 2026 |

Confirmations:

Each prompt was sent in a fresh chat: yes

No follow-up questions were asked before Part 7: yes

Every output was saved before any editing: yes
 

## 2. Prompt A — minimal
**Prompt sent:**  
Write Python code to analyze student marks.

1. It assumed that marks would be provided as a dictionary mapping student names to numerical marks.
2. It assumed the default pass_mark was 60.0 instead of 50.
3. It assumed that I wanted median, top and bottom performers, pass and fail counts, and letter grade distribution.
4. It assumed that a formatted command-line summary and sample student dataset were required.

### Questions it should have asked and did not

1. What input format should marks use?
2. What should the default pass_mark be?


### Is the function named `analyze_marks` with the required signature?


No — it is called `analyze_student_marks`.

### First impression before testing

The response looks detailed and functional, but it does not match the
required function name, input format, default pass mark, return structure, or required scope.


## 3. Prompt B - structured context

**Prompt sent:**  
You are a Python developer. Implement analyze_marks(marks, pass_mark=50).
Return average, highest, lowest, and pass_rate in a dictionary. Accept marks
from 0 to 100; raise ValueError for an empty list, non-numeric values, or
out-of-range values. Use no external libraries. Return code plus a short
explanation.

### What B fixed compared with A

1. It specified the required function name and signature: `analyze_marks(marks, pass_mark=50)`.
2. It specified the required dictionary keys: `average`, `highest`, `lowest`, `pass_rate`.
3. It required a deliberate `ValueError` for every required invalid-input case: an empty list, non-numeric values, and values outside 0–100.
4. It fixed the default `pass_mark` at 50 and prohibited external libraries.
5. It limited the requested output to code plus a short explanation instead of the extra class-analysis features produced by A.

### What B still leaves open

1. It does not say how to round the pass rate. For example, it does not explain that 66.666...% should be written as 66.67%.
2. It does not give an example or tests. So, we cannot see exactly how the function should work with different inputs.
3. It does not ask to list assumptions.


## 4. Prompt C — examples + tests

### What I appended to Prompt B

Example: analyze_marks([40, 60, 80], 50) -> average 60, highest 80, lowest 40, pass_rate 66.67.
Include tests for: one mark, decimals, custom pass_mark, empty list, text value, and marks below 0 or above 100.
State any remaining assumptions before the code.



| Situation            | Covered by the AI's tests? | 
|----------------------|---------------------------|
| one mark	            | yes                       |
| decimals	            | yes                       |
| custom pass_mark	    | yes                       |
| empty list	          | yes                       |
| text value	          | yes                       |
| below 0 / above 100	 | yes                       |


 
### Do the AI's own tests pass against the AI's own code?

yes

However, this does not prove that the code is correct. The tests were written by the same AI
that wrote the code, so they can follow the same assumptions and may not catch missing requirements.


### Do they agree with the harness in section 6?

yes

### Assumptions C stated explicitly before the code

1. `pass_mark` must also be numeric and between 0 and 100.
2. Boolean values such as `True` and `False` are rejected as non-numeric.
3. Numerical outputs are rounded to 2 decimal places.

## 5. Prompt D — final

### The complete prompt I wrote (one message, sent to a fresh chat): 
yes


**Prompt sent:**  
You are a Python developer. Implement a function with exactly this signature:

analyze_marks(marks, pass_mark=50)

Requirements:
- `marks` must be a non-empty list of numeric values.
- Every mark must be between 0 and 100 inclusive.
- If `marks` is empty, contains a non-numeric value, or contains a value below 0 or above 100, raise `ValueError`.
- A mark is passing when `mark >= pass_mark`.
- Return a dictionary with exactly these keys: `average`, `highest`, `lowest`, `pass_rate`.
- `average` is the arithmetic mean of all marks.
- `highest` is the highest mark.
- `lowest` is the lowest mark.
- `pass_rate` is the percentage of marks that are greater than or equal to `pass_mark`.
- Round `average` and `pass_rate` to exactly 2 decimal places.
- Do not use external libraries.
- Do not add extra keys or unrelated functionality.

Worked example:
analyze_marks([40, 60, 80], 50)

must return:
{
 "average": 60,
 "highest": 80,
 "lowest": 40,
 "pass_rate": 66.67
}

Required tests:
1. analyze_marks([40, 60, 80], 50) -> average 60, highest 80, lowest 40, pass_rate 66.67
2. analyze_marks([100], 50) -> average 100, highest 100, lowest 100, pass_rate 100
3. analyze_marks([49.5, 50], 50) -> average 49.75, highest 50, lowest 49.5, pass_rate 50
4. analyze_marks([], 50) -> ValueError
5. analyze_marks([40, "60"], 50) -> ValueError
6. analyze_marks([-1, 50, 101], 50) -> ValueError

Before the code, briefly state any remaining assumptions.
Do not add assumptions that change the required behavior.
Return the Python code, the tests, and a short explanation.

### What I deliberately added that A, B and C did not have:

1. It clearly defined the input as a non-empty list.
2. It clearly defined the required function signature and return keys.
3. It stated that a mark passes when `mark >= pass_mark`.
4. It clearly stated that average and pass_rate must be rounded to 2 decimal places.
5. It included the worked example and all 6 required test cases.
6. It told the AI not to add extra functionality.
7. It asked the AI to state remaining assumptions before the code.

### The ambiguity I found in the specification, and how I resolved it inside Prompt D:

The AI still assumed that Boolean values should be rejected as non-numeric.
It also assumed that Python's standard `round(..., 2)` is sufficient for rounding.


## 6. Test Results

| Case    | Call                             | Required                                 | Prompt A | Prompt B | Prompt C | Prompt D |
|---------|----------------------------------|------------------------------------------|----------|----------|----------|----------|
| 1       | analyze_marks([40, 60, 80], 50)  | avg 60 · high 80 · low 40 · rate 66.67   | ERROR    | PASS     | PASS     | PASS     |
| 2       | analyze_marks([100], 50)         | avg 100 · high 100 · low 100 · rate 100  | ERROR    | PASS     | PASS     | PASS     |
| 3       | analyze_marks([49.5, 50], 50)    | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR    | PASS     | PASS     | PASS     |
| 4       | analyze_marks([], 50)            | raises ValueError                        | ERROR    | PASS     | PASS     | PASS     |
| 5       | analyze_marks([40, "60"], 50)    | raises ValueError                        | ERROR    | PASS     | PASS     | PASS     |
| 6       | analyze_marks([-1, 50, 101], 50) | raises ValueError                        | ERROR    | PASS     | PASS     | PASS     |
| Totals  |                                  |                                          | 0        | 6        | 6        | 6        |


For Prompt A, all six cases are ERROR because the required `analyze_marks` function is missing.
The harness reports `RuntimeError: analyze_marks function is missing`.

### Prompt A — Terminal Output

========================================

       STUDENT MARKS ANALYSIS
========================================


- Total Students   : 8
- Average Mark     : 68.56
- Median Mark      : 69.25
- Highest Mark     : 92.5 (Alice, Frank)
- Lowest Mark      : 38.0 (Hannah)
- Passed / Failed  : 5 / 3 (Pass Rate: 62.5%)

 Grade Distribution:
- A (90-100): 2
- B (80-89): 1
- C (70-79): 1
- D (60-69): 1
- F (<60): 3

========================================

ERROR: RuntimeError: analyze_marks function is missing


### Prompt B — Terminal Output

- {'average': 65.2, 'highest': 90, 'lowest': 33, 'pass_rate': 60.0}
- Test 1: PASS — standard case
- Test 2: PASS — one mark
- Test 3: PASS — decimal marks and pass boundary
- Test 4: PASS — empty list
- Test 5: PASS — non-numeric value
- Test 6: PASS — out-of-range values

### Prompt C — Terminal Output

- Test 1: PASS — standard case
- Test 2: PASS — one mark
- Test 3: PASS — decimal marks and pass boundary
- Test 4: PASS — empty list
- Test 5: PASS — non-numeric value
- Test 6: PASS — out-of-range values

### Prompt D — Terminal Output

- Test 1: PASS — standard case
- Test 2: PASS — one mark
- Test 3: PASS — decimal marks and pass boundary
- Test 4: PASS — empty list
- Test 5: PASS — non-numeric value
- Test 6: PASS — out-of-range values



## 7. Score, revise and conclude

| Criterion            | Prompt A | Prompt B |  Prompt C |  Prompt D |
|----------------------|---------:|---------:|----------:|----------:|
| Correctness          |        0 |        2 |         2 |         2 |
| Requirement coverage |        0 |        2 |         2 |         2 |
| Verifiability        |        0 |        2 |         2 |         2 |
| Assumptions stated   |        0 |        0 |         2 |         2 |
| Noise                |        0 |        2 |         2 |         2 |
| Total                |     0/10 |     8/10 |     10/10 |     10/10 |

Prompt length, in words: A 7 , B 44 , C 84 , D 241

Words added per point gained — 

B over A:  4.63

C over B: 20 

D over C: 0 additional points gained

Words added per point gained — B over A: 4.63 · C over B: 20 · D over C: N/A (0 additional points gained).

The ratio shows that adding more prompt detail gave diminishing returns:
B produced a large score improvement with relatively few added words, while D added many words but did not increase the score beyond C.

## 8. Conclusion

Prompt C and Prompt D both produced the highest score, with 10/10. 
However, the prompt I would actually use at work is Prompt D because it defines the exact function signature,
return structure, validation rules, rounding, worked example, and all six required tests in one clear contract. 
Prompt D leaves less room for interpretation and makes the expected behavior easier to verify.
The single addition that bought the most correctness was the exact function name and signature in Prompt B. 
This changed the result from Prompt A's ERROR to passing tests in Prompt B. Prompt A created `analyze_student_marks`,
so the harness raised `RuntimeError: analyze_marks function is missing`. Prompt B explicitly required `analyze_marks(marks, pass_mark=50)`,
and Case 1 returned `{'average': 60, 'highest': 80, 'lowest': 40, 'pass_rate': 66.67}`.
Some additions in C and D were pure noise for the required tests, such as rejecting Boolean values and discussing Python's standard floating-point rounding.
The main ambiguity was rounding the repeating pass rate. For `[40, 60, 80]` with a pass mark of 50, the rate is 66.666..., while the required result is 66.67. I resolved this in Prompt D by explicitly requiring `average` and `pass_rate` to be rounded to 2 decimal places.


## 9. Two questions for the debrief

1. How much prompt detail is enough before additional requirements become unnecessary noise?

2. Can AI-generated tests be considered reliable evidence of correctness if the same AI generated both the code and the tests?


