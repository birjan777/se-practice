# Part 1 Testing

- Test A: PASS
- Test B: PASS
- Test C: PASS
- Test D: PASS


- First version ran: 25 minutes
- All four tests passed: 30 minutes
- First failing test: None


# Week 01 — Manual vs AI: Comparison

Name: Khalenov Birzhan 

Date: Monday 16:00-19:00

## 1. Facts

Manual (Part 1)	| Rocket (Part 2)

Language/stack used: Python | Next.js and TypeScript

Time to first version that ran:  25 minutes | 3 minutes

Time to all 4 test cases passing: 30 minutes | 4 minutes

Number of attempts / prompts needed: 1 manual realization |  1 prompt, 1 answer to Rocket's question, and 1 follow-up prompt	

Lines of code you actually wrote: 40 |  generated code

Did it handle invalid marks (case B)?  Yes | Yes

Did it handle an empty list (case D)?  Yes | Yes

Did it use the ≥ 50 pass threshold?   Yes | Yes

Output format matches the spec?  Yes | Yes, but Rocket added extra features

Can you explain every line of it?  Yes | No, generated code

## 2. Test results
 
| Case | Input | Manual output | Rocket output | Spec says | Match? |
| --- | --- | --- | --- | --- | --- |
| A | `85, 23, 45, 90, 92` | avg 67.00, high 92, low 23, pass 60.0% | avg 67.0, high 92, low 23, pass 60.0% | avg 67.00 · high 92 · low 23 · pass 60.0% | Yes |
| B | `88, 47, -5, 101, abc, 73, 50, , 100` | avg 71.60, high 100, low 47, pass 80.0% | avg 71.6, high 100, low 47, pass 80.0% | avg 71.60 · high 100 · low 47 · pass 80.0% | Yes |
| C | `10, 20, 30` | avg 20.00, high 30, low 10, pass 0.0% | avg 20.0, high 30, low 10, pass 0.0% | avg 20.00 · high 30 · low 10 · pass 0.0% | Yes |
| D | `abc, , xyz` | Clear message, no crash | No valid numeric marks found. Please check your input. | clear message, no crash | Yes |


## 3. What the AI added that I never asked for

- A web-based application
- Dashboard layout
- Next.js
- TypeScript
- Invalid entry detection
- KPI cards
- Grade distribution
- Parsed marks grid
- Pass/fail badges
- Export options
- FAIL COUNT


## 4. What the AI got wrong or silently skipped

No functional errors were found during the four required test cases.

But, Rocket added features that were not requested in the original prompt, FAIL COUNT, grade distribution, export options, and additional dashboard elements.

## 5. The defect I asked Rocket to fix

The application had no functional defect during the required tests.

But, Rocket added a "FAIL COUNT" feature.

Prompt I used:

Remove the "FAIL COUNT" feature because it was not part of the original requirements.

Result:

On it — removing the Fail Count feature now.


What this tells me:

This showed me that AI can add extra features even when they were not requested.
The generated application worked correctly, but included features that were outside the original task.
I realized that a software engineer needs to verify every step of the work 
and make the final application follows requirements.

## 6. Reflection (200–300 words)

1. Which parts of the work did the AI genuinely speed up?

In this practice, I created the same program in two different ways. First, I wrote the program manually using Python. Then, I used Rocket AI to create a similar application. AI genuinely saved time when creating the web application. Rocket quickly generated a user interface and the main functionality without me writing all the code myself. It also chose a technology stack and created a complete application.

2. Where did the AI cost you time, or give you something that looked right but was not?

AI also gave me some things that I did not ask for. Rocket added extra features such as FAIL COUNT, a grade distribution, export options, and other interface elements. These features looked useful, but they were not part of the original requirements. I also needed time to test the application with all four test cases and check if it worked correctly. This showed me that AI can create a working application, but sometimes it can also add unnecessary things.

3. Which of these two artefacts would you be willing to put your name on, and why?

I would be more confident putting my name on the manual Python solution because I wrote the code myself and understand how it works. I know how the program validates marks, ignores invalid values, calculates the average, and calculates the pass rate. The Rocket version also worked correctly, but I did not write most of the generated code myself.

4. What must a human engineer still be responsible for after this experiment?

After this experiment, I think a human software engineer is still responsible for checking every steps and testing the final result. AI can help save time, but the engineer must make sure that the application works correctly and does not include unnecessary features.



