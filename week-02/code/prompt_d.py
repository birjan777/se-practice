# Assumptions:
# Boolean values (True, False) are rejected as non-numeric, despite being a subclass of int in Python.
# Standard Python floating-point rounding via round(..., 2) is sufficient for two decimal place precision.


def analyze_marks(marks, pass_mark=50):
    # Validate non-empty list
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("`marks` must be a non-empty list.")

    # Validate each mark
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError(f"Invalid non-numeric value: {mark}")
        if not (0 <= mark <= 100):
            raise ValueError(f"Mark out of range [0, 100]: {mark}")

    total_marks = len(marks)
    pass_count = sum(1 for mark in marks if mark >= pass_mark)

    return {
        "average": round(sum(marks) / total_marks, 2),
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": round((pass_count / total_marks) * 100, 2)
    }


# --- Test Suite ---
if __name__ == "__main__":
    import unittest


    class TestAnalyzeMarks(unittest.TestCase):
        def test_1_standard_case(self):
            result = analyze_marks([40, 60, 80], 50)
            self.assertEqual(result["average"], 60)
            self.assertEqual(result["highest"], 80)
            self.assertEqual(result["lowest"], 40)
            self.assertEqual(result["pass_rate"], 66.67)

        def test_2_single_maximum_mark(self):
            result = analyze_marks([100], 50)
            self.assertEqual(result["average"], 100)
            self.assertEqual(result["highest"], 100)
            self.assertEqual(result["lowest"], 100)
            self.assertEqual(result["pass_rate"], 100)

        def test_3_floats_and_boundary(self):
            result = analyze_marks([49.5, 50], 50)
            self.assertEqual(result["average"], 49.75)
            self.assertEqual(result["highest"], 50)
            self.assertEqual(result["lowest"], 49.5)
            self.assertEqual(result["pass_rate"], 50)

        def test_4_empty_list_raises_error(self):
            with self.assertRaises(ValueError):
                analyze_marks([], 50)

        def test_5_non_numeric_value_raises_error(self):
            with self.assertRaises(ValueError):
                analyze_marks([40, "60"], 50)

        def test_6_out_of_bounds_values_raise_error(self):
            with self.assertRaises(ValueError):
                analyze_marks([-1, 50, 101], 50)


    unittest.main(exit=False)
# Explanation
# Validation: Iterates through the list to verify that every item is strictly an integer or float (excluding booleans) and falls within 0≤mark≤100. Raises ValueError if the list is empty or fails type/range validation.
# Aggregation: Computes aggregate metrics using standard built-in Python functions (sum, max, min, len).
# Pass Rate & Rounding: Filters elements ≥pass_mark to find the percentage of passing marks. average and pass_rate are formatted to two decimal places using round(..., 2).
