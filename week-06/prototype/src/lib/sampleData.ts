import type { Room } from "./timeUtils";

export const SAMPLE_ROOMS: Room[] = [
  {
    id: "r1",
    name: "Room A — Engineering",
    location: "Building C · Floor 1",
    blocked: false,
    bookings: [
      { id: "b1", start: 540, end: 600, user: "Dr. Mensah" },
      { id: "b2", start: 660, end: 720, user: "Group Study 03" },
      { id: "b3", start: 780, end: 900, user: "Seminar 210" },
      { id: "b4", start: 1080, end: 1140, user: "TA Office Hours" },
    ],
  },
  {
    id: "r2",
    name: "Room B — Library",
    location: "Main Library · Floor 2",
    blocked: true,
    bookings: [
      { id: "b4", start: 600, end: 720, user: "Maintenance" },
    ],
  },
  {
    id: "r3",
    name: "Room C — Business",
    location: "Building A · Floor 3",
    blocked: false,
    bookings: [
      { id: "b5", start: 900, end: 960, user: "Prof. Cho" },
    ],
  },
  {
    id: "r4",
    name: "Room D — Arts",
    location: "Arts Wing · Floor G",
    blocked: false,
    bookings: [
      { id: "b6", start: 120, end: 180, user: "Morning Workshop" },
      { id: "b7", start: 840, end: 960, user: "Rehearsal" },
    ],
  },
];
