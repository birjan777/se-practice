import importlib.util
import sys


def load_function(path):
    spec = importlib.util.spec_from_file_location("solution", path)
    module = importlib.util.module_from_spec(spec)
    sys.modules["solution"] = module
    spec.loader.exec_module(module)

    if not hasattr(module, "analyze_marks"):
        raise RuntimeError("analyze_marks function is missing")

    return module.analyze_marks


def run_test(number, description, test):
    try:
        test()
        print(f"Test {number}: PASS — {description}")
    except AssertionError as e:
        print(f"Test {number}: FAIL — {description}")
        if str(e):
            print(f"  {e}")
    except Exception as e:
        print(f"Test {number}: ERROR — {description}")
        print(f"  {type(e).__name__}: {e}")


def main():
    if len(sys.argv) != 2:
        print("Usage: python tests/test_analyze_marks.py code/prompt_a.py")
        sys.exit(1)

    try:
        analyze_marks = load_function(sys.argv[1])
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {e}")
        return

    def test_1():
        result = analyze_marks([40, 60, 80], 50)
        assert abs(result["average"] - 60) <= 0.01
        assert result["highest"] == 80
        assert result["lowest"] == 40
        assert abs(result["pass_rate"] - 66.67) <= 0.01

    def test_2():
        result = analyze_marks([100], 50)
        assert abs(result["average"] - 100) <= 0.01
        assert result["highest"] == 100
        assert result["lowest"] == 100
        assert abs(result["pass_rate"] - 100) <= 0.01

    def test_3():
        result = analyze_marks([49.5, 50], 50)
        assert abs(result["average"] - 49.75) <= 0.01
        assert result["highest"] == 50
        assert result["lowest"] == 49.5
        assert abs(result["pass_rate"] - 50) <= 0.01

    def test_4():
        try:
            analyze_marks([], 50)
        except ValueError:
            return
        raise AssertionError("Expected ValueError")

    def test_5():
        try:
            analyze_marks([40, "60"], 50)
        except ValueError:
            return
        raise AssertionError("Expected ValueError")

    def test_6():
        try:
            analyze_marks([-1, 50, 101], 50)
        except ValueError:
            return
        raise AssertionError("Expected ValueError")

    tests = [
        (1, "standard case", test_1),
        (2, "one mark", test_2),
        (3, "decimal marks and pass boundary", test_3),
        (4, "empty list", test_4),
        (5, "non-numeric value", test_5),
        (6, "out-of-range values", test_6),
    ]

    for number, description, test in tests:
        run_test(number, description, test)


if __name__ == "__main__":
    main()