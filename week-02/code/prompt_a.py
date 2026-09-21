#This Python script analyzes student marks by calculating key statistical metrics,
#pass/fail ratios, top performers, and a letter grade distribution using Python's built-in statistics module.
#Python
import statistics
from typing import Dict, Any


def analyze_student_marks(marks: Dict[str, float], pass_mark: float = 60.0) -> Dict[str, Any]:
    """
    Analyzes student marks and returns class summary statistics.

    :param marks: Dictionary mapping student names to numerical marks.
    :param pass_mark: The threshold score required to pass (default: 60.0).
    """
    if not marks:
        return {"error": "No student marks provided."}

    scores = list(marks.values())
    total_students = len(scores)

    # Core statistical metrics
    avg_score = statistics.mean(scores)
    median_score = statistics.median(scores)
    highest_score = max(scores)
    lowest_score = min(scores)

    # Identify top and bottom performers
    top_students = [name for name, score in marks.items() if score == highest_score]
    bottom_students = [name for name, score in marks.items() if score == lowest_score]

    # Pass / Fail analysis
    passed = [name for name, score in marks.items() if score >= pass_mark]
    failed = [name for name, score in marks.items() if score < pass_mark]

    # Grade distribution breakdown
    grades = {"A (90-100)": 0, "B (80-89)": 0, "C (70-79)": 0, "D (60-69)": 0, "F (<60)": 0}
    for score in scores:
        if score >= 90:
            grades["A (90-100)"] += 1
        elif score >= 80:
            grades["B (80-89)"] += 1
        elif score >= 70:
            grades["C (70-79)"] += 1
        elif score >= 60:
            grades["D (60-69)"] += 1
        else:
            grades["F (<60)"] += 1

    return {
        "total_students": total_students,
        "average_score": round(avg_score, 2),
        "median_score": round(median_score, 2),
        "highest_score": (highest_score, top_students),
        "lowest_score": (lowest_score, bottom_students),
        "pass_count": len(passed),
        "fail_count": len(failed),
        "pass_rate": f"{(len(passed) / total_students) * 100:.1f}%",
        "grade_distribution": grades
    }


# Sample Dataset
student_marks = {
    "Alice": 92.5,
    "Bob": 78.0,
    "Charlie": 45.0,
    "David": 88.0,
    "Eva": 60.5,
    "Frank": 92.5,
    "Grace": 54.0,
    "Hannah": 38.0
}

# Run Analysis
results = analyze_student_marks(student_marks, pass_mark=60.0)

# Display Formatted Summary Output
print("=" * 40)
print("        STUDENT MARKS ANALYSIS        ")
print("=" * 40)
print(f"Total Students   : {results['total_students']}")
print(f"Average Mark     : {results['average_score']}")
print(f"Median Mark      : {results['median_score']}")
print(f"Highest Mark     : {results['highest_score'][0]} ({', '.join(results['highest_score'][1])})")
print(f"Lowest Mark      : {results['lowest_score'][0]} ({', '.join(results['lowest_score'][1])})")
print(f"Passed / Failed  : {results['pass_count']} / {results['fail_count']} (Pass Rate: {results['pass_rate']})")
print("\nGrade Distribution:")
for grade, count in results['grade_distribution'].items():
    print(f"  {grade}: {count}")
print("=" * 40)

#Key Features

# Ties handling: Identifies all top/bottom performers if multiple students share the exact highest or lowest mark.
# Flexible pass threshold: Allows custom pass mark setting via the pass_mark parameter.
# Standard library implementation: Runs out of the box without external dependency installation.

#Where would you like to take this next?

#Convert to Pandas & read from a CSV file

#Add interactive grade visualizations with Matplotlib