# User stories — Smart Campus study room booking

6 to 8 stories. Keep the shape exactly: ID, the As/I want/so that sentence, a priority, one
assumption. Roles are **Student** or **Administrator** only.

---

### US-01
**Story:** As a Student, I want to view which study rooms are available, so that I can choose a free room for studying.

**Priority:** High

**Assumption:** Availability is based on existing bookings and the room's blocked status.


### US-02
**Story:** As a Student, I want to book an available study room for a time slot, so that I can reserve it for studying.

**Priority:** High

**Assumption:** A booking may last exactly two hours, because R2 allows a duration of at most two hours.

### US-03
**Story:** As a Student, I want to cancel a booking I made, so that the reservation is released. 

**Priority:** Medium

**Assumption:** A student can cancel only a booking that the student made.

### US-04
**Story:** As an Administrator, I want to block or unblock a study room, so that I can control whether the room can be booked.

**Priority:** High

**Assumption:** A blocked room cannot be booked, and an unblocked room can be booked if the other booking rules are satisfied.


### US-05
**Story:** As an Administrator, I want to review how study rooms are being used over a period, so that I can understand room usage.

**Priority:** Medium

**Assumption:** Usage is based only on recorded room bookings. 


### US-06
**Story:** As a Student, I want to receive confirmation when my booking or cancellation is completed, so that I know that my action was recorded.

**Priority:** Medium

**Assumption:** The confirmation method is not specified by the scenario.