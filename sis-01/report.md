# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.6

<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** How can fundamental software engineering principles help us develop a reliable student assignment management system under time and budget constraints?

**Users:** Students who need to track assignments and deadlines, and teachers who publish assignment information.

**Problem:** Students may forget deadlines or lose assignment information because it is stored in different places.

**Constraints:** The fictional project must be developed within four weeks and a budget of 100,000 KZT.

**Risk:** Incorrectly stored or displayed deadlines could cause students to miss assignments.

**Assumptions:** All project details are fictional. StudentTask is a hypothetical university application. The four-week deadline and 100,000 KZT budget are fictional constraints. The first version will support assignment lists and deadline notifications.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

Fundamental software engineering principles help developers build reliable software while managing time, budget, and quality. StudentTask aims to provide assignment lists and deadline notifications within four weeks and a budget of 100,000 KZT. The project must deliver essential features quickly while preventing errors that could cause students to miss deadlines.

The first decision is to develop a minimum viable product (MVP). Version 1 should allow teachers to publish assignments, students to view them, and the system to send deadline notifications. File attachments, calendar synchronization, and advanced analytics should be postponed. This reduces unnecessary work and keeps the team focused. However, an MVP does not guarantee on-time delivery. Sommerville (2016, Chapter 1, Section 1.1, p. 23) explains that software engineering involves balancing quality, schedule, and budget. The team should reserve the final week for testing, fixing defects, and deployment instead of adding features.

The second decision is to use a modular monolith rather than separate microservices. StudentTask can have three logical modules: users, assignments, and notifications, all within one application. This separates responsibilities and makes the code easier to maintain. Although the modules require initial organization, a modular monolith avoids the extra deployment and communication complexity of microservices. It is more practical for a small project with limited time and money.

The third decision concerns data integrity and deadline accuracy. The system should validate teacher input, reject missing required deadlines, and prevent deadlines from being earlier than assignment creation dates. Database constraints can enforce important rules if application-level validation fails. Dates and times should be handled consistently, including time-zone conversion where necessary. These measures reduce the risk of incorrect deadlines but cannot eliminate every error.

Testing is also essential. Developers should test normal operations and edge cases, including expired deadlines, invalid input, missing values, and notification failures. Automated tests can be repeated after code changes. However, successful testing does not prove that software is free of defects. The ISTQB Foundation Level Syllabus v4.0.1 (Section 1.3, p. 17) explains that testing can reveal defects but cannot prove their absence.

Finally, maintainability and reuse can reduce development effort. The team should use suitable libraries and open-source tools while checking licensing, security, and hosting costs. Free hosting should not be assumed to remain free without limits. Overall, a small modular application with validated data, focused testing, and limited features is suitable for StudentTask.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

 
Prompt B identified several weaknesses in the initial analysis. It recommended stating the project name, StudentTask, and the Version 1 scope explicitly. It also suggested explaining reliability through input validation and database constraints, checking hosting assumptions, and avoiding over-engineering. Finally, it warned that an MVP does not guarantee on-time delivery.

I accepted these criticisms because they made the analysis more specific. I clarified that StudentTask is a hypothetical university application whose first version supports assignment lists and deadline notifications. I chose a modular monolith instead of separate microservices because the four-week deadline and limited budget make additional distributed-system complexity difficult to justify.

I checked two sources to support important claims. Sommerville (2016, Chapter 1, Section 1.1, p. 23) discusses balancing software quality, schedule, and budget. This supports treating feature prioritization as a trade-off rather than a guarantee of delivery. The ISTQB Foundation Level Syllabus v4.0.1 (Section 1.3, PDF p. 17) explains that testing can reveal defects but cannot prove their absence. This supports testing normal operations and edge cases while acknowledging that some defects may remain. The relevant verification is documented in Section 9, verification row 2.

Two substantive revisions improved the analysis. First, I replaced the general recommendation to divide the system into modules with a modular-monolith design that better fits the project's constraints. Second, I added input validation, required deadlines, and database constraints to address the risk of incorrect assignment deadlines. Both changes are recorded in Section 9, change-log rows 1 and 2.

Hosting costs, notification reliability, and user adoption remain uncertain and require further investigation.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->


The recommended solution for StudentTask is a small modular monolith with three logical modules: users, assignments, and notifications. The first version should focus on assignment lists and deadline notifications instead of adding advanced features. This approach fits the fictional four-week deadline and 100,000 KZT budget better than a complex microservices architecture. Input validation, database constraints, and automated testing should help reduce the risk of incorrect deadlines. The team should also reserve time for testing, fixing defects, and deployment. However, this approach does not guarantee that the project will be completed on time or that all defects will be found. Hosting costs, notification reliability, and user adoption still need investigation. Therefore, the team should verify these assumptions before implementation and prioritize reliable core functionality over additional features.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

Working on this assignment helped me understand how fundamental software engineering principles apply to a practical problem. I learned that developers must consider not only features but also time, budget, reliability, and maintainability.

AI helped me organize ideas and identify weaknesses in the initial analysis. The review showed me that recommendations need clear explanations and supporting evidence. For example, an MVP helps a team focus on essential features, but it does not guarantee on-time delivery. I also learned why a modular monolith may be more practical than microservices for a small project with limited resources.

I improved the analysis by adding input validation, database constraints, and tests for edge cases. These measures are important because incorrect deadlines could cause students to miss assignments. I also learned that successful testing cannot prove that software is completely free of defects.

Overall, this assignment taught me to evaluate technical decisions rather than accept recommendations without question. In future projects, I will verify important claims, consider alternative solutions, and explain my engineering decisions.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- Sommerville, I. (2016). *Software Engineering* (10th ed., Global Edition). Pearson. Chapter 1, Section 1.1, p. 23. https://dn790001.ca.archive.org/0/items/bme-vik-konyvek/Software%20Engineering%20-%20Ian%20Sommerville.pdf  .
- International Software Testing Qualifications Board (ISTQB). *Certified Tester, Foundation Level Syllabus v4.0.1*. Section 1.3, PDF p. 17. https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf  .



## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

1. Start with essential features to meet the four-week development deadline.
2. Divide the system into separate modules for users, assignments, and notifications.
3. Make sure assignment deadlines are stored and displayed correctly.
4. Test expired deadlines, missing deadlines, and incorrect user input.
5. Keep the code organized so future developers can fix bugs and add features.


## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** Gemini
- **Model:** Gemini Flash 3.6
- **Date:** 2026-10-09
- **Purpose:** initial draft of the analysis

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.6 — Fundamental engineering principles for a first-year-level university assignment.

My scenario is Students who need to track assignments and deadlines, and teachers who publish assignment information. Students may forget deadlines or lose assignment information because it is stored in different places. The fictional project must be developed within four weeks and a budget of 100,000 KZT. Incorrectly stored or displayed deadlines could cause students to miss assignments. My initial ideas are 1. Start with essential features to meet the four-week development deadline. 2. Divide the system into separate modules for users, assignments, and notifications. 3. Make sure assignment deadlines are stored and displayed correctly. 4. Test expired deadlines, missing deadlines, and incorrect user input. 5. Keep the code organized so future developers can fix bugs and add features. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
Here is a structured analysis tailored for your first-year software engineering assignment.

---

### Analysis of Topic 1.6: Fundamental Engineering Principles

In software engineering, fundamental principles guide how we balance system requirements, resource limits, and software quality. Below is the breakdown of your scenario mapped directly to core engineering principles, separating facts from assumptions and evaluating design trade-offs.

#### 1. Separation of Facts vs. Assumptions

To build a reliable system within constraints, we must distinguish between confirmed constraints and operational assumptions:

* **Facts (Given Constraints):**
* **Users & Roles:** The system serves two distinct user types—students (tracking deadlines) and teachers (publishing assignment info).
* **Project Scope & Budget:** Delivery deadline is strictly 4 weeks, with a total budget of 100,000 KZT.
* **Core Problem:** Information fragmenting across multiple sources leads to missed deadlines.
* **Critical Risk:** Displaying or storing incorrect deadline dates directly impacts academic outcomes.


* **Assumptions (To Be Validated):**
* **Notification Preference:** Assuming automated notifications (e.g., email or push) are the best way to prevent missed deadlines.
* **System Complexity:** Assuming a custom-built, multi-module system is feasible within 100,000 KZT and 4 weeks.
* **User Access:** Assuming teachers and students have continuous internet access and prefer a centralized Web/Mobile interface over existing platforms.



---

#### 2. Mapping Initial Ideas to Engineering Principles & Trade-offs

| Initial Idea | Software Engineering Principle | Trade-Off & Risk Analysis |
| --- | --- | --- |
| **1. Focus on essential features** | **KISS / Incremental Development (MVP)** | **Trade-off:** Speed vs. Completeness.<br>

<br>Prioritizing core features (creating/viewing assignments) ensures delivery in 4 weeks, but leaves out advanced features like file attachments or calendar sync. |
| **2. Modular system design** | **Modularity & Separation of Concerns** | **Trade-off:** Initial Overhead vs. Maintainability.<br>

<br>Breaking the app into User, Assignment, and Notification modules takes more initial planning time, but prevents changes in one component from breaking others. |
| **3. Correct deadline handling** | **Data Integrity & Accuracy** | **Trade-off:** Precision vs. Flexibility.<br>

<br>Storing timestamps in a unified standard (e.g., UTC) avoids time zone issues, but requires careful frontend formatting for local display. |
| **4. Robust edge-case testing** | **Defensive Programming & Verification** | **Trade-off:** QA Time vs. Development Speed.<br>

<br>Allocating time for testing edge cases (expired dates, invalid inputs) reduces development hours but prevents high-impact failures. |
| **5. Well-organized code** | **Maintainability & Clean Code** | **Trade-off:** Short-term Velocity vs. Long-term Agility.<br>

<br>Following consistent coding standards adds slight upfront delay, but reduces technical debt for future developers. |

---

#### 3. Critical Claims & Assumptions to Verify

Before starting development, verify the following claims to avoid project failure:

1. **Budget & Feasibility Claim:** *Can a custom three-module software system be built within 100,000 KZT?*
* *Verification:* Check whether existing open-source frameworks or low-code options (or hosting free tiers) are required to stay under budget.


2. **Notification Value Claim:** *Will sending notifications actually solve missing deadline issues?*
* *Verification:* Confirm whether student deadline failure stems from lack of reminders or lack of a single consolidated calendar view.


3. **Timeline Feasibility Claim:** *Is a 4-week timeline sufficient for full module integration and testing?*
* *Verification:* Ensure scope is reduced to strict Minimal Viable Product (MVP) requirements during Week 1.

```

### B2 — Critique (Prompt B)

- **Tool:** Gemini
- **Model:** Gemini Flash 3.6
- **Date:** 2026-10-09
- **Purpose:** critique of the initial draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: How can fundamental software engineering principles help us develop a reliable student assignment management system under time and budget constraints?
Scenario: Students who need to track assignments and deadlines, and teachers who publish assignment information. Students may forget deadlines or lose assignment information because it is stored in different places. The fictional project must be developed within four weeks and a budget of 100,000 KZT. Incorrectly stored or displayed deadlines could cause students to miss assignments. All project details are fictional. StudentTask is a hypothetical university application. The first version will support assignment lists and deadline notifications.
Draft: Here is a structured analysis tailored for your first-year software engineering assignment.

### Analysis of Topic 1.6: Fundamental Engineering Principles

In software engineering, fundamental principles guide how we balance system requirements, resource limits, and software quality. Below is the breakdown of your scenario mapped directly to core engineering principles, separating facts from assumptions and evaluating design trade-offs.

#### 1. Separation of Facts vs. Assumptions

To build a reliable system within constraints, we must distinguish between confirmed constraints and operational assumptions:

- Facts (Given Constraints):
  - Users & Roles: The system serves two distinct user types—students (tracking deadlines) and teachers (publishing assignment info).
  - Project Scope & Budget: Delivery deadline is strictly 4 weeks, with a total budget of 100,000 KZT.
  - Core Problem: Information fragmenting across multiple sources leads to missed deadlines.
  - Critical Risk: Displaying or storing incorrect deadline dates directly impacts academic outcomes.

- Assumptions (To Be Validated):
  - Notification Preference: Assuming automated notifications (e.g., email or push) are the best way to prevent missed deadlines.
  - System Complexity: Assuming a custom-built, multi-module system is feasible within 100,000 KZT and 4 weeks.
  - User Access: Assuming teachers and students have continuous internet access and prefer a centralized Web/Mobile interface over existing platforms.

#### 2. Mapping Initial Ideas to Engineering Principles & Trade-offs

| Initial Idea | Software Engineering Principle | Trade-Off & Risk Analysis |
| --- | --- | --- |
| 1. Focus on essential features | KISS / Incremental Development (MVP) | Prioritizing core features (creating/viewing assignments) ensures delivery in 4 weeks, but leaves out advanced features like file attachments or calendar sync. |
| 2. Modular system design | Modularity & Separation of Concerns | Breaking the app into User, Assignment, and Notification modules takes more initial planning time, but prevents changes in one component from breaking others. |
| 3. Correct deadline handling | Data Integrity & Accuracy | Storing timestamps in a unified standard (e.g., UTC) avoids time zone issues, but requires careful frontend formatting for local display. |
| 4. Robust edge-case testing | Defensive Programming & Verification | Allocating time for testing edge cases (expired dates, invalid inputs) reduces development hours but prevents high-impact failures. |
| 5. Well-organized code | Maintainability & Clean Code | Following consistent coding standards adds slight upfront delay, but reduces technical debt for future developers. |

#### 3. Critical Claims & Assumptions to Verify

Before starting development, verify the following claims to avoid project failure:

1. Budget & Feasibility Claim: Can a custom three-module software system be built within 100,000 KZT?
   - Verification: Check whether existing open-source frameworks or low-code options (or hosting free tiers) are required to stay under budget.

2. Notification Value Claim: Will sending notifications actually solve missing deadline issues?
   - Verification: Confirm whether student deadline failure stems from lack of reminders or lack of a single consolidated calendar view.

3. Timeline Feasibility Claim: Is a 4-week timeline sufficient for full module integration and testing?
   - Verification: Ensure scope is reduced to strict Minimal Viable Product (MVP) requirements during Week 1.
```

**Response:**

```text
Here is a detailed review of your draft evaluated against the question and scenario constraints.

---

### 1. Inaccuracies & Omissions

#### **Omission of Fictional Context Details (`StudentTask`)**

* **Concern:** The prompt explicitly specifies that the project is named **StudentTask** and that Version 1 supports **assignment lists and deadline notifications**. The draft omits the name "StudentTask" entirely and treats the notification module as an unconfirmed assumption in Section 1, despite it being a given scope requirement for V1.
* **Why It Matters:** Academic rubrics penalize answers that ignore explicitly provided project context. Categorizing a primary required feature (notifications) as an "assumption" creates a logical contradiction in your essay.
* **How to Check:** Cross-reference your Section 1 assumptions against the prompt text ("The first version will support assignment lists and deadline notifications").
* **Counterexample / Alternative Interpretation:** Instead of listing notifications as an unverified user preference assumption, treat the *channel* of delivery (e.g., Push vs. Email vs. In-app badge) as the assumption, while treating the notification requirement itself as a given project scope fact.

#### **Imprecise Metric for "High Reliability" (Topic 1.6 Alignment)**

* **Concern:** Topic 1.6 focuses on how principles guarantee *reliability*. The draft states that incorrect deadlines impact academic outcomes, but it does not define what engineering measures make the deadline system technically reliable.
* **Why It Matters:** Without concrete software engineering mechanisms (e.g., database constraints, time zone standardization, input validation rules), claiming the system avoids incorrect deadlines is an unsubstantiated assertion.
* **How to Check:** Ask: *If a teacher inputs a deadline as 23:59 on Sunday from a different time zone, what specific software engineering mechanism prevents it from displaying as 04:59 on Monday for the student?*
* **Counterexample / Alternative Interpretation:** Rather than stating "storing timestamps in UTC avoids time zone issues," explicitly cite **Data Integrity constraints** (e.g., database schema rules preventing `null` dates or end-dates earlier than creation dates).

---

### 2. Missing Reasoning & Strategic Gaps

#### **Lack of Financial Context for 100,000 KZT**

* **Concern:** Section 3 asks if a custom three-module system can be built for 100,000 KZT (~200 USD), but fails to explain *why* this budget constraint fundamentally shapes technical decisions.
* **Why It Matters:** In a first-year software engineering paper, budget limits should directly dictate architectural choices (e.g., choosing free-tier serverless hosting or open-source database engines over paid infrastructure).
* **How to Check:** Estimate infrastructure costs: Free tier Cloud (0 KZT) vs. Domain + Paid DB (~15,000–30,000 KZT/mo).
* **Counterexample / Alternative Interpretation:** A small budget does not mean development fails; it means the team must use zero-cost infrastructure (e.g., SQLite/PostgreSQL on free cloud tiers) and focus budget on developer labor or domain registration.

#### **Superficial Trade-off Analysis in Section 2**

* **Concern:** The table claims that modularity "takes more initial planning time," but does not explain the trade-off in the context of a 4-week timeline. Over-engineering architecture in a 4-week project can cause team failure due to premature abstraction.
* **Why It Matters:** First-year students often confuse "good principles" with "doing everything perfectly." Demonstrating an understanding that **modularity has a time cost** in a tight 4-week sprint shows true engineering judgment.
* **How to Check:** Evaluate if designing 3 microservices or decoupled modules takes 1.5 weeks out of a 4-week timeline.
* **Counterexample / Alternative Interpretation:** For a 4-week MVP built by a small team, a clean monolithic architecture (Separation of Concerns within a single codebase) is often far more reliable than separate physical modules or services.

---

### 3. Vague Claims & Unsupported Assumptions

#### **Claim: "Prioritizing core features ensures delivery in 4 weeks"**

* **Concern:** Stating that prioritizing core features *ensures* delivery is an oversimplification. Unforeseen integration bugs, deployment issues, or scope creep can still cause missed deadlines.
* **Why It Matters:** In engineering, an MVP reduces schedule risk; it does not eliminate it.
* **How to Check:** Review software engineering data on project delays—overestimation of team velocity is the leading cause of late delivery even in MVP projects.
* **Counterexample / Alternative Interpretation:** Reframe the claim: "Applying the KISS principle and scope throttling (MVP) *mitigates schedule risk* by reserving Week 4 exclusively for testing, buffer time, and deployment."

#### **Assumption: "Information fragmenting across multiple sources leads to missed deadlines"**

* **Concern:** While given as the problem context, the draft assumes centralization automatically fixes behavior without addressing *user habit / adoption risk*.
* **Why It Matters:** Building a centralized portal does not guarantee teachers will post there or students will check it regularly.
* **How to Check:** Verify if teachers are required to double-post assignments on both existing university portals and `StudentTask`.
* **Counterexample / Alternative Interpretation:** If teachers find manually copying assignment details into `StudentTask` too tedious, the system will suffer from empty state/lack of adoption, rendering the notification feature useless.

---

### Summary Checklist for Revision

| Area to Improve | Action Plan for Next Draft |
| --- | --- |
| **Project Context** | Integrate the project name **StudentTask** and explicitly treat V1 scope (assignment lists + notifications) as facts. |
| **Technical Depth** | Link deadline correctness directly to engineering techniques (UTC epoch storage, defensive input validation). |
| **Realistic Constraints** | Explain how 100,000 KZT forces zero-cost stack selection (open-source DB, free hosting). |
| **Balanced Principles** | Highlight the risk of over-architecting modularity during a short 4-week delivery window. |
```


### B3 — Revision (Prompt C)


- **Tool:** Gemini
- **Model:** Gemini Flash 3.6
- **Date:** 2026-10-09
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

Show what you changed and why.
Use only the sources I supplied.


My decisions: Accept the criticism that StudentTask's name and Version 1 scope should be explicit. Accept the need for concrete reliability mechanisms, including input validation and database constraints. Accept that the 100,000 KZT budget should influence infrastructure choices, but treat the feasibility of free hosting as something to verify rather than a fact. Accept the criticism of over-engineering, and prefer a modular monolith over separate microservices for this small four-week project. Accept that an MVP reduces schedule risk but does not guarantee delivery. Accept the user-adoption criticism because teachers must publish accurate information and students must use the system. Qualify the claim that prioritizing core features ensures delivery: Sommerville, Software Engineering, 10th edition, Chapter 1, Section 1.1, page 23, explains that software engineering requires compromises to meet quality, schedule, and budget constraints. Reject any claim that successful testing proves the absence of defects: ISTQB, Certified Tester, Foundation Level Syllabus v4.0.1, Section 1.3, PDF page 17, states that testing can show the presence, but not the absence, of defects.

Verified evidence: Sommerville, I. (2016). Software Engineering (10th ed., Global Edition), Chapter 1, Section 1.1, p. 23. https://dn790001.ca.archive.org/0/items/bme-vik-konyvek/Software%20Engineering%20-%20Ian%20Sommerville.pdf. ISTQB. Certified Tester, Foundation Level Syllabus v4.0.1, Section 1.3, PDF p. 17. https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf.

Draft: Here is a structured analysis tailored for your first-year software engineering assignment.

---

### Analysis of Topic 1.6: Fundamental Engineering Principles

In software engineering, fundamental principles guide how we balance system requirements, resource limits, and software quality. Below is the breakdown of your scenario mapped directly to core engineering principles, separating facts from assumptions and evaluating design trade-offs.

#### 1. Separation of Facts vs. Assumptions

To build a reliable system within constraints, we must distinguish between confirmed constraints and operational assumptions:

* **Facts (Given Constraints):**
* **Users & Roles:** The system serves two distinct user types—students (tracking deadlines) and teachers (publishing assignment info).
* **Project Scope & Budget:** Delivery deadline is strictly 4 weeks, with a total budget of 100,000 KZT.
* **Core Problem:** Information fragmenting across multiple sources leads to missed deadlines.
* **Critical Risk:** Displaying or storing incorrect deadline dates directly impacts academic outcomes.


* **Assumptions (To Be Validated):**
* **Notification Preference:** Assuming automated notifications (e.g., email or push) are the best way to prevent missed deadlines.
* **System Complexity:** Assuming a custom-built, multi-module system is feasible within 100,000 KZT and 4 weeks.
* **User Access:** Assuming teachers and students have continuous internet access and prefer a centralized Web/Mobile interface over existing platforms.



---

#### 2. Mapping Initial Ideas to Engineering Principles & Trade-offs

| Initial Idea | Software Engineering Principle | Trade-Off & Risk Analysis |
| --- | --- | --- |
| **1. Focus on essential features** | **KISS / Incremental Development (MVP)** | **Trade-off:** Speed vs. Completeness.<br>

<br>Prioritizing core features (creating/viewing assignments) ensures delivery in 4 weeks, but leaves out advanced features like file attachments or calendar sync. |
| **2. Modular system design** | **Modularity & Separation of Concerns** | **Trade-off:** Initial Overhead vs. Maintainability.<br>

<br>Breaking the app into User, Assignment, and Notification modules takes more initial planning time, but prevents changes in one component from breaking others. |
| **3. Correct deadline handling** | **Data Integrity & Accuracy** | **Trade-off:** Precision vs. Flexibility.<br>

<br>Storing timestamps in a unified standard (e.g., UTC) avoids time zone issues, but requires careful frontend formatting for local display. |
| **4. Robust edge-case testing** | **Defensive Programming & Verification** | **Trade-off:** QA Time vs. Development Speed.<br>

<br>Allocating time for testing edge cases (expired dates, invalid inputs) reduces development hours but prevents high-impact failures. |
| **5. Well-organized code** | **Maintainability & Clean Code** | **Trade-off:** Short-term Velocity vs. Long-term Agility.<br>

<br>Following consistent coding standards adds slight upfront delay, but reduces technical debt for future developers. |

---

#### 3. Critical Claims & Assumptions to Verify

Before starting development, verify the following claims to avoid project failure:

1. **Budget & Feasibility Claim:** *Can a custom three-module software system be built within 100,000 KZT?*
* *Verification:* Check whether existing open-source frameworks or low-code options (or hosting free tiers) are required to stay under budget.


2. **Notification Value Claim:** *Will sending notifications actually solve missing deadline issues?*
* *Verification:* Confirm whether student deadline failure stems from lack of reminders or lack of a single consolidated calendar view.


3. **Timeline Feasibility Claim:** *Is a 4-week timeline sufficient for full module integration and testing?*
* *Verification:* Ensure scope is reduced to strict Minimal Viable Product (MVP) requirements during Week 1.
 

---

### Analysis of Topic 1.6: Fundamental Engineering Principles

In software engineering, fundamental principles guide how we balance system requirements, resource limits, and software quality. Below is the breakdown of your scenario mapped directly to core engineering principles, separating facts from assumptions and evaluating design trade-offs.

#### 1. Separation of Facts vs. Assumptions

To build a reliable system within constraints, we must distinguish between confirmed constraints and operational assumptions:

* **Facts (Given Constraints):**
* **Users & Roles:** The system serves two distinct user types—students (tracking deadlines) and teachers (publishing assignment info).
* **Project Scope & Budget:** Delivery deadline is strictly 4 weeks, with a total budget of 100,000 KZT.
* **Core Problem:** Information fragmenting across multiple sources leads to missed deadlines.
* **Critical Risk:** Displaying or storing incorrect deadline dates directly impacts academic outcomes.


* **Assumptions (To Be Validated):**
* **Notification Preference:** Assuming automated notifications (e.g., email or push) are the best way to prevent missed deadlines.
* **System Complexity:** Assuming a custom-built, multi-module system is feasible within 100,000 KZT and 4 weeks.
* **User Access:** Assuming teachers and students have continuous internet access and prefer a centralized Web/Mobile interface over existing platforms.



---

#### 2. Mapping Initial Ideas to Engineering Principles & Trade-offs

| Initial Idea | Software Engineering Principle | Trade-Off & Risk Analysis |
| --- | --- | --- |
| **1. Focus on essential features** | **KISS / Incremental Development (MVP)** | **Trade-off:** Speed vs. Completeness.<br>

<br>Prioritizing core features (creating/viewing assignments) ensures delivery in 4 weeks, but leaves out advanced features like file attachments or calendar sync. |
| **2. Modular system design** | **Modularity & Separation of Concerns** | **Trade-off:** Initial Overhead vs. Maintainability.<br>

<br>Breaking the app into User, Assignment, and Notification modules takes more initial planning time, but prevents changes in one component from breaking others. |
| **3. Correct deadline handling** | **Data Integrity & Accuracy** | **Trade-off:** Precision vs. Flexibility.<br>

<br>Storing timestamps in a unified standard (e.g., UTC) avoids time zone issues, but requires careful frontend formatting for local display. |
| **4. Robust edge-case testing** | **Defensive Programming & Verification** | **Trade-off:** QA Time vs. Development Speed.<br>

<br>Allocating time for testing edge cases (expired dates, invalid inputs) reduces development hours but prevents high-impact failures. |
| **5. Well-organized code** | **Maintainability & Clean Code** | **Trade-off:** Short-term Velocity vs. Long-term Agility.<br>

<br>Following consistent coding standards adds slight upfront delay, but reduces technical debt for future developers. |

---

#### 3. Critical Claims & Assumptions to Verify

Before starting development, verify the following claims to avoid project failure:

1. **Budget & Feasibility Claim:** *Can a custom three-module software system be built within 100,000 KZT?*
* *Verification:* Check whether existing open-source frameworks or low-code options (or hosting free tiers) are required to stay under budget.


2. **Notification Value Claim:** *Will sending notifications actually solve missing deadline issues?*
* *Verification:* Confirm whether student deadline failure stems from lack of reminders or lack of a single consolidated calendar view.


3. **Timeline Feasibility Claim:** *Is a 4-week timeline sufficient for full module integration and testing?*
* *Verification:* Ensure scope is reduced to strict Minimal Viable Product (MVP) requirements during Week 1.


```

**Response:**

```text
Here is the revised analysis incorporating your review decisions, verified source evidence, and explicit project parameters.

---

### Analysis of Topic 1.6: Fundamental Engineering Principles

Fundamental software engineering principles guide how we balance system requirements, resource limits, and software quality. Below is the breakdown of the **StudentTask** system mapped directly to core engineering principles, separating confirmed facts from operational assumptions and evaluating key design trade-offs.

#### 1. Separation of Facts vs. Assumptions

To build a reliable system within constraints, we must distinguish between confirmed context and unverified operational assumptions:

* **Facts (Given Constraints & Scope):**
* **System Context:** The fictional application is named **StudentTask**. Version 1 (V1) explicitly supports assignment lists and deadline notifications.
* **Users & Roles:** The system serves two user roles: students (tracking deadlines) and teachers (publishing assignment information).
* **Project Scope & Budget:** Delivery deadline is strictly 4 weeks, with a total budget of 100,000 KZT (~200 USD).
* **Core Problem & Risk:** Information fragmentation leads to missed deadlines. Incorrectly stored or displayed deadlines directly harm student academic performance.


* **Assumptions (To Be Validated):**
* **Infrastructure Feasibility:** Assuming zero-cost public cloud hosting free tiers (e.g., free PostgreSQL or Web Application hosting) will remain available without requiring paid credit card tiers or unexpected runtime charges that exceed 100,000 KZT.
* **Notification Delivery Channel:** Assuming that automated reminders (e.g., email or push) are the primary way students prefer to receive notifications, rather than relying solely on pull-based calendar views.
* **User Adoption & Workflow:** Assuming teachers will consistently input assignment data into StudentTask instead of sticking to fragmented existing communication channels.



---

#### 2. Engineering Principles & Technical Trade-offs

| Initial Design Idea | Engineering Principle | Trade-Off & Risk Analysis |
| --- | --- | --- |
| **1. Focus on essential V1 features** | **KISS / Incremental Development (MVP)** | **Trade-off:** Scope Reduction vs. Delivery Risk.<br>

<br>Prioritizing core features (lists, deadline notices) *mitigates schedule risk* for a 4-week deadline. However, as noted by Sommerville (2016, p. 23), software engineering requires compromise across quality, schedule, and budget constraints; an MVP reduces schedule risk but cannot guarantee on-time delivery. |
| **2. Modular system architecture** | **Modular Monolith Architecture** | **Trade-off:** Architectural Overhead vs. Velocity.<br>

<br>Splitting StudentTask into separate microservices would cause massive integration overhead during a 4-week sprint. Implementing a *modular monolith* (logically separated User, Assignment, and Notification modules within a single codebase) preserves code organization while avoiding deployment complexity. |
| **3. Correct deadline handling** | **Data Integrity & Defensive Design** | **Trade-off:** Developer Effort vs. System Reliability.<br>

<br>Storing timestamps in UTC and enforcing database constraints (e.g., `CHECK (deadline > created_at)` and non-nullable fields) prevents incorrect date displays, though it increases backend implementation time. |
| **4. Edge-case testing** | **Verification & Defensive Validation** | **Trade-off:** Testing Depth vs. Unfound Risk.<br>

<br>Rigorous testing of expired dates and invalid input reduces failure rates. However, per ISTQB (2024, p. 17), testing shows the *presence* of defects, not their *absence*. Successful testing does not prove StudentTask is entirely bug-free. |
| **5. Well-organized code** | **Maintainability & Clean Code** | **Trade-off:** Short-term Velocity vs. Technical Debt.<br>

<br>Enforcing consistent style rules and structured folder architecture adds minor upfront overhead but lowers future bug-fix costs for subsequent developers. |

---

#### 3. Critical Claims & Assumptions to Verify

Before starting development, verify the following claims:

1. **Budget & Infrastructure Feasibility Claim:** *Can StudentTask stay under 100,000 KZT by leveraging free hosting tiers?*
* *Verification:* Audit serverless/container free tiers (e.g., free PostgreSQL databases, free static site hosting) to ensure limits will not force unexpected operational costs during testing or initial rollout.


2. **User Adoption & Habit Claim:** *Will teachers publish accurate information on StudentTask?*
* *Verification:* Conduct user testing with teachers to verify if manual assignment posting is fast enough to ensure consistent adoption. If teachers fail to input deadlines accurately, notifications become useless regardless of technical reliability.


3. **Timeline & Scope Claim:** *Is 4 weeks sufficient for V1 integration?*
* *Verification:* Reserve Week 4 strictly for deployment, input validation testing, and bug fixing rather than adding late features.



---

#### References

* ISTQB. (2024). *Certified Tester, Foundation Level Syllabus v4.0.1*, Section 1.3, p. 17. International Software Testing Qualifications Board.
* Sommerville, I. (2016). *Software Engineering* (10th ed., Global Edition), Chapter 1, Section 1.1, p. 23. Pearson.

---
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim                                                           | Source and locator                                                                              | Evidence found                                                                                                                                                                                                  | Decision   |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| Prioritizing core features ensures delivery in four weeks.         | Sommerville, Software Engineering, 10th ed., Chapter 1, Section 1.1, p. 23. PDF                 | The text explains that software engineering must balance quality, schedule and budget, and that project delivery requires compromises. It does not establish that an MVP guarantees delivery within four weeks. | qualify    |
| Testing can establish that software is completely free of defects. | ISTQB, Certified Tester, Foundation Level Syllabus v4.0.1, Section 1.3, PDF p. 17. Official PDF | ISTQB states that testing can demonstrate the presence of defects but cannot prove their absence. Testing reduces the probability of undiscovered defects but cannot guarantee correctness.                     | reject     |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion                                      | Your final version                                                                      | Reason for change                                                                                                  |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Divide the system into separate modules.                     | Use a modular monolith with logical modules for users, assignments, and notifications.  | The four-week deadline and limited budget make a simpler architecture more practical than separate microservices.  |
| Ensure correct deadlines through general testing.            | Add input validation, database constraints, and edge-case tests for deadlines.          | The scenario identifies incorrect deadlines as a major risk, so the system needs specific reliability measures.    |

