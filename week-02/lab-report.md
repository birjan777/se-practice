## 1. The frozen experiment

|                         |                   |
|-------------------------|-------------------|
| AI assistant            | Gemini            |
| Exact model name        | Flash 3.6         |
| Implementation language | Python            |
| Date of the runs        | 17 September 2026 |

 
 
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
No — it is called analyze_student_marks.

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

**Prompt sent:**  
You are a Python developer. Implement analyze_marks(marks, pass_mark=50).
Return average, highest, lowest, and pass_rate in a dictionary. Accept marks
from 0 to 100; raise ValueError for an empty list, non-numeric values, or
out-of-range values. Use no external libraries. Return code plus a short
explanation.
Example: analyze_marks([40, 60, 80], 50) -> average 60, highest 80, lowest 40, pass_rate 66.67. 
Include tests for: one mark, decimals, custom pass_mark, empty list, text value, and marks below 0 or above 100. 
State any remaining assumptions before the code.

### What C improved compared with B

1. It gave a clear example with expected results.
2. It specified rounding to 2 decimal places.
3. It added tests for different cases.
4. It asked the AI to state its assumptions before the code.

### AI's own tests

The AI's tests pass against its own code.

However, this does not prove that the code is correct. The tests were written by the same AI
that wrote the code, so they can follow the same assumptions and may not catch missing requirements.

### What C still leaves open

1. The AI assumed that `pass_mark` must be between 0 and 100, but the prompt did not explicitly require this.
2. The AI assumed that Boolean values such as `True` and `False` should be rejected.
3. The AI's tests do not include the exact 6 test cases that we will use later in the experiment.



## 5. Prompt D — final

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

### What D changed

1. It clearly defined the input as a non-empty list.
2. It clearly defined the required function signature and return keys.
3. It stated that a mark passes when `mark >= pass_mark`.
4. It clearly stated that average and pass_rate must be rounded to 2 decimal places.
5. It included the worked example and all 6 required test cases.
6. It told the AI not to add extra functionality.
7. It asked the AI to state remaining assumptions before the code. 

### Remaining assumptions

The AI still assumed that Boolean values should be rejected as non-numeric.
It also assumed that Python's standard `round(..., 2)` is sufficient for rounding.


