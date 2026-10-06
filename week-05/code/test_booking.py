import unittest
from booking import can_book


class BookingTests(unittest.TestCase):

    # 1. Touching endpoint is allowed
    def test_touching_end_is_allowed(self):
        result = can_book(660, 720, 540, False, [(600, 660)])
        self.assertIs(result, True)

    # 2. Exactly 120 minutes is allowed
    def test_exactly_two_hours_is_allowed(self):
        result = can_book(720, 840, 540, False, [(600, 660)])
        self.assertIs(result, True)

    # 3. Partial overlap is rejected
    def test_partial_overlap_is_rejected(self):
        result = can_book(630, 690, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # 4. More than 120 minutes is rejected
    def test_over_two_hours_is_rejected(self):
        result = can_book(720, 841, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # 5. Blocked room is rejected
    def test_blocked_room_is_rejected(self):
        result = can_book(660, 720, 540, True, [(600, 660)])
        self.assertIs(result, False)

    # 6. Booking starting exactly at now is rejected
    def test_starting_at_now_is_rejected(self):
        result = can_book(540, 570, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # 7. Zero-length booking is rejected
    def test_zero_length_booking_is_rejected(self):
        result = can_book(600, 600, 540, False, [])
        self.assertIs(result, False)

    # 8. Reversed interval is rejected
    def test_reversed_interval_is_rejected(self):
        result = can_book(700, 600, 540, False, [])
        self.assertIs(result, False)

    # 9. End at 1440 is allowed
    def test_end_at_1440_is_allowed(self):
        result = can_book(1320, 1440, 1200, False, [])
        self.assertIs(result, True)

    # 10. End after 1440 is rejected
    def test_end_after_1440_is_rejected(self):
        result = can_book(1320, 1441, 1200, False, [])
        self.assertIs(result, False)

    # 11. Empty existing bookings allow a valid booking
    def test_empty_existing_bookings(self):
        result = can_book(600, 660, 540, False, [])
        self.assertIs(result, True)

    # 12. Existing booking completely inside requested interval is rejected
    def test_existing_booking_inside_request_is_rejected(self):
        result = can_book(600, 720, 540, False, [(630, 660)])
        self.assertIs(result, False)

    # 13. Start before the beginning of the day is rejected
    def test_start_before_day_is_rejected(self):
        result = can_book(-1, 60, 0, False, [])
        self.assertIs(result, False)

    # 14. Requested booking completely inside existing booking is rejected
    def test_request_inside_existing_booking_is_rejected(self):
        result = can_book(630, 640, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # 15. Existing bookings are not modified
    def test_existing_bookings_are_unchanged(self):
        existing = [(600, 660), (720, 780)]
        original = existing.copy()

        can_book(800, 860, 540, False, existing)

        self.assertEqual(existing, original)

    # 16. Booking ending at the same time as an existing booking is rejected
    def test_same_interval_as_existing_booking_is_rejected(self):
        result = can_book(600, 660, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # 17. Existing bookings are unchanged when there is an overlap
    def test_existing_bookings_unchanged_after_overlap_check(self):
        existing = [(600, 660), (720, 780)]
        original = existing.copy()

        can_book(630, 650, 540, False, existing)

        self.assertEqual(existing, original)

    # 18. A booking must start after now even when it ends at 1440
    def test_start_must_be_after_now_at_day_end(self):
        result = can_book(1439, 1440, 1439, False, [])
        self.assertIs(result, False)





if __name__ == "__main__":
    unittest.main()

