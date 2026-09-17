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
3. It does not ask to list assumptions. Prompt C adds this requirement.



