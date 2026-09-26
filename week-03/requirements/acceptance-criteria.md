# Acceptance criteria — selected stories

## Assumptions

- **Overlap:** A booking that ends exactly when another booking begins is allowed under R3, because the two bookings do not overlap in time.
- **Duration:** A booking of exactly two hours is allowed under R2, because "at most two hours" includes two hours.

---

## US-02 — Book a room

### AC-01
- **Given** a room is available and unblocked
- **When** a student books it for a future time with a duration of two hours or less
- **Then** the booking is created successfully

### AC-02
- **Given** a student tries to create a booking
- **When** the booking starts in the past
- **Then** the system rejects the booking

### AC-03
- **Given** a student tries to book a room
- **When** the booking duration is more than two hours
- **Then** the system rejects the booking

### AC-04
- **Given** a room already has a booking from 14:00 to 15:00
- **When** a student tries to book the same room from 14:30 to 15:30
- **Then** the system rejects the new booking because the bookings overlap

### AC-05
- **Given** a room already has a booking from 14:00 to 15:00
- **When** a student tries to book the same room from 15:00 to 16:00
- **Then** the new booking is allowed if all other booking rules are satisfied

---

## US-03 — Cancel a booking

### AC-06
- **Given** a student has a booking
- **When** the student cancels the booking
- **Then** the booking is cancelled

### AC-07
- **Given** a student has cancelled their booking
- **When** another student checks the room
- **Then** the cancelled time slot can be available for a new booking if no other booking or block prevents it

### AC-08
- **Given** a student does not have another student's booking
- **When** the student tries to cancel that booking
- **Then** the other student's booking is not cancelled

---

## US-04 — Block or unblock a room

### AC-09
- **Given** a room is available for booking
- **When** an administrator blocks the room
- **Then** the room cannot be booked

### AC-10
- **Given** a room is blocked
- **When** an administrator unblocks the room
- **Then** the room can be booked again if it satisfies the other booking rules

### AC-11
- **Given** a room is blocked
- **When** a student tries to book it
- **Then** the booking is rejected