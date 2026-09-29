def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("The marks list cannot be empty.")

    for mark in marks:
        # Check for numeric types, explicitly filtering out booleans
        if not isinstance(mark, (int, float)) or isinstance(mark, bool):
            raise ValueError(f"Non-numeric value detected: {mark}")
        if not (0 <= mark <= 100):
            raise ValueError(f"Mark {mark} is out of the valid range [0, 100].")

    total_students = len(marks)
    passed_students = sum(1 for mark in marks if mark >= pass_mark)

    return {
        "average": sum(marks) / total_students,
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": (passed_students / total_students) * 100,
    }


### Explanation

#Validation: Checks if marks is empty or if any element is non-numeric or outside the [0,100] range. isinstance(mark, bool) explicitly excludes booleans, as bool is a subclass of int in Python.
#Calculations: Uses built-in sum(), max(), and min() functions for standard statistical metrics.
#Pass Rate: Calculates the percentage of scores meeting or exceeding pass_mark using a generator expression.

### Example Usage

results = analyze_marks([85, 42, 76, 90, 33], pass_mark=50)
print(results)
# Output: {'average': 65.2, 'highest': 90, 'lowest': 33, 'pass_rate': 60.0}

