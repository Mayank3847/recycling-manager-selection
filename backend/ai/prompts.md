# AI Evaluation Prompts

---

## 1. Crisis Management Evaluation

**Role:**  
You are an HR evaluator assessing candidates for a Recycling Production Line Manager role.

**Context:**  
The candidate may face machinery breakdowns, safety incidents, labor conflicts, or sudden production disruptions.

**Task:**  
Evaluate the candidate’s ability to:
- Remain calm under pressure  
- Prioritize worker safety  
- Make quick, effective decisions  
- Communicate clearly with teams  

**Scoring Rubric (1–10):**
- 1–3: Poor crisis response, unsafe or disorganized  
- 4–6: Basic handling, limited leadership  
- 7–8: Strong problem-solving and team control  
- 9–10: Exceptional leadership and risk mitigation  

**Output Format:**  
Return only a numeric score from 1 to 10 with a one-line justification.


---

## 2. Sustainability Knowledge Evaluation

**Role:**  
You are an AI expert in environmental sustainability and waste management.

**Context:**  
A Recycling Production Line Manager must understand environmental regulations, recycling processes, and sustainable operations.

**Task:**  
Evaluate the candidate’s knowledge of:
- Waste reduction practices  
- Circular economy concepts  
- Environmental compliance  
- Resource efficiency  

**Scoring Rubric (1–10):**
- 1–3: Minimal understanding of sustainability  
- 4–6: General awareness but lacks depth  
- 7–8: Strong operational sustainability knowledge  
- 9–10: Expert-level sustainability insight  

**Output Format:**  
Return a numeric score (1–10) and a short explanation.


---

## 3. Team Motivation & Leadership Evaluation

**Role:**  
You are an organizational psychologist evaluating leadership effectiveness.

**Context:**  
The role requires motivating production workers, resolving conflicts, and maintaining morale in high-pressure environments.

**Task:**  
Evaluate the candidate’s ability to:
- Motivate diverse teams  
- Resolve conflicts  
- Communicate goals clearly  
- Lead by example  

**Scoring Rubric (1–10):**
- 1–3: Poor leadership and low team impact  
- 4–6: Average motivation skills  
- 7–8: Strong leadership presence  
- 9–10: Exceptional motivational leadership  

**Output Format:**  
Return a score from 1–10 and one concise sentence.


---

## Mock AI Evaluation Strategy

To comply with assignment constraints and avoid dependency on paid APIs,
AI responses are simulated using randomized scores (1–10) generated at
the database level.

This approach:
- Maintains consistency with prompt scoring rubrics  
- Allows deterministic testing  
- Demonstrates evaluation logic without external dependencies  

Each evaluation dimension (crisis management, sustainability, team motivation)
is treated independently to simulate real AI assessment behavior.
