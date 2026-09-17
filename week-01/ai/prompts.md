Rocket Prompt

First prompt:

Build a small program that processes a list of student marks and prints:
average, highest, lowest, and pass rate.
Screenshot #1

Rocket detected prompt score: 79%

Rocket Questions:

How will the student marks be entered into the app?

-Type marks directly on screen 

-Paste a list of marks 

-Upload a CSV file 

-Other

Second prompt:
Chose -Paste a list of marks 

Rocket Enhanced Prompt

A web-based student marks processor where users paste a list of
marks and instantly see computed statistics — average score, highest mark,
lowest mark, and pass rate — displayed in a clean, readable dashboard layout.

Building with Next.js and TypeScript.

What Rocket Added:

1) web-based application
2) dashboard layout
3) Next.js
4) TypeScript
5) Invalid entry detection
6) KPI cards
7) Grade distribution  
8) Parsed marks grid
9) Pass/fail badges
10) Export options


Part 2 Testing

Test A: PASS

Input: 85, 23, 45, 90, 92

Rocket output: 

- Average: 67.0
- Highest: 92
- Lowest: 23
- Pass rate: 60.0%
- Valid marks: 5
- Fail Count: 2


Test B: PASS

Input: 88, 47, -5, 101, abc, 73, 50, , 100

Rocket output: 

- Average: 71.6
- Highest: 100
- Lowest: 47
- Pass rate: 80.0%
- Valid marks: 5
- Fail Count: 1


Test C: PASS

Input: 10, 20, 30

Rocket output: 

- Average: 20.0
- Highest: 30
- Lowest: 10
- Pass rate: 0.0%
- Valid marks: 3
- Fail Count: 3

Test D: PASS

Input: abc, , xyz

Rocket output: 

! No valid numeric marks found. Please check your input.


Defect Check

No functional defect was found during testing.

I tested the application with all 4 test cases and invalid inputs such as:

- abc, 50, xyz
- 101, 50
- -5, 50
- 101, -5, abc

The application correctly ignored invalid marks and calculated statistics 
using only valid marks.

Because no defect was found during testing, no defect-fix prompt was needed.


Defect or Scope mismatch

Rocket added a "FAIL COUNT" feature, 
which was not included in the original requirements.

The original task required only:
- number of valid marks
- average
- highest mark
- lowest mark
- pass rate


Follow-up Prompt:

Remove the "FAIL COUNT" feature because it was not part of the original requirements.

Result:

Rocket removed the "FAIL COUNT" feature. 
The required statistics remained available and worked correctly.

Did the fix work?

Yes.

Did it break anything else?

No problems were found after the change.

