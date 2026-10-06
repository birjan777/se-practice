# booking.py

def can_book(start: int, end: int, now: int, blocked: bool, existing: list[tuple[int, int]]) -> bool:
    """
    Checks availability for a study room booking request.

    AC1: 0 <= start < end <= 1440, and start > now
    AC2: Duration is at most 120 minutes
    AC3: The room is not blocked
    AC4: No overlap with existing bookings (touching endpoints allowed)
    AC5: Return True if AC1-AC4 hold, False otherwise without modifying inputs
    """
    # AC3: Check if the room is blocked
    if blocked:
        return False

    # AC1: Validate time bounds and future booking condition
    if not (0 <= start < end <= 1440 and start > now):
        return False

    # AC2: Check maximum duration limit (120 minutes)
    if (end - start) > 120:
        return False

    # AC4: Check for overlapping active bookings
    # Overlap formula: max(start1, start2) < min(end1, end2)
    for e_start, e_end in existing:
        if max(start, e_start) < min(end, e_end):
            return False

    # AC5: All checks passed
    return True
