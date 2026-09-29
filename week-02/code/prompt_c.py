# Assumptions:
# pass_mark must also be a numeric value between 0 and 100.
# Numerical outputs (average and pass_rate) are rounded to 2 decimal places.
# Boolean inputs (e.g., True, False) are rejected as non-numeric despite being a subclass of int in Python.

def analyze_marks(marks, pass_mark=50):
    if not isinstance(marks, (list, tuple)) or len(marks) == 0:
        raise ValueError("The 'marks' argument must be a non-empty sequence.")

    if not isinstance(pass_mark, (int, float)) or isinstance(pass_mark, bool) or not (0 <= pass_mark <= 100):
        raise ValueError("pass_mark must be a numeric value between 0 and 100.")

    clean_marks = []
    for mark in marks:
        if not isinstance(mark, (int, float)) or isinstance(mark, bool):
            raise ValueError(f"Non-numeric value detected: {mark}")
        if not (0 <= mark <= 100):
            raise ValueError(f"Mark out of valid range [0, 100]: {mark}")
        clean_marks.append(mark)

    total_count = len(clean_marks)
    average = round(sum(clean_marks) / total_count, 2)
    highest = max(clean_marks)
    lowest = min(clean_marks)
    passed_count = sum(1 for mark in clean_marks if mark >= pass_mark)
    pass_rate = round((passed_count / total_count) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate
    }


def run_tests():
    # 1. One mark
    assert analyze_marks([75]) == {
        "average": 75.0,
        "highest": 75,
        "lowest": 75,
        "pass_rate": 100.0,
    }

    # 2. Decimals
    assert analyze_marks([55.5, 62.25, 88.8]) == {
        "average": 68.85,
        "highest": 88.8,
        "lowest": 55.5,
        "pass_rate": 100.0,
    }

    # 3. Custom pass_mark
    assert analyze_marks([40, 60, 80], pass_mark=70) == {
        "average": 60.0,
        "highest": 80,
        "lowest": 40,
        "pass_rate": 33.33,
    }

    # 4. Empty list (ValueError)
    try:
        analyze_marks([])
        assert False, "Failed to raise ValueError for empty list"
    except ValueError as e:
        assert str(e) == "The 'marks' argument must be a non-empty sequence."

    # 5. Text value (ValueError)
    try:
        analyze_marks([50, "eighty", 90])
        assert False, "Failed to raise ValueError for text value"
    except ValueError as e:
        assert "Non-numeric value detected" in str(e)

    # 6. Marks below 0 or above 100 (ValueError)
    try:
        analyze_marks([-10, 50, 80])
        assert False, "Failed to raise ValueError for negative mark"
    except ValueError as e:
        assert "out of valid range" in str(e)

    try:
        analyze_marks([50, 80, 105])
        assert False, "Failed to raise ValueError for mark > 100"
    except ValueError as e:
        assert "out of valid range" in str(e)

    print("All unit tests completed successfully.")

if __name__ == "__main__":
    run_tests()
#
# Explanation
# Validation: Iterates through marks to check both data type (int or float, explicitly excluding bool) and boundaries (0≤mark≤100). An empty collection or invalid item triggers an explicit ValueError.
# Aggregation: Uses built-in standard functions (sum(), max(), min(), len()) to perform calculations without standard library imports or third-party packages.
# Pass Rate: Employs a generator expression (sum(1 for mark in clean_marks if mark >= pass_mark)) to calculate passing scores before computing the percentage ratio.

