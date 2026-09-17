marks = [85, 23, 45, 90, 92]
# marks = [88, 47, -5, 101, "abc", 73, 50, "", 100]
# marks = [10, 20, 30]
# marks = ["abc", "", "xyz"]


valid_marks = []

for mark in marks:
    try:
        mark = float(mark)

        if mark >= 0 and mark <= 100:
            valid_marks.append(mark)

    except(ValueError, TypeError):
        continue


if len(valid_marks) == 0:
    print("Not found valid marks")

else:
    print("Number of valid marks:", len(valid_marks))

    average = sum(valid_marks) / len(valid_marks)
    print("Average:", format(average, ".2f"))

    highest = max(valid_marks)
    lowest = min(valid_marks)

    print("Highest:", highest)
    print("Lowest:", lowest)

    passed = 0

    for mark in valid_marks:
        if mark >= 50:
            passed += 1

    pass_rate = (passed / len(valid_marks)) * 100

    print("Pass rate:", format(pass_rate, ".1f") + "%")