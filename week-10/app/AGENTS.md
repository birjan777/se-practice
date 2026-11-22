# AGENTS.md — Smart Campus Room Availability Checker

Instructions for any coding agent working in this project. Read this file before you change
anything, and follow it over any general habit of yours.

## Project

A React + TypeScript page (Vite) that tells a student whether a campus room is free for a
requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
the tests are in `src/booking.test.ts`.


Use one fictional room with synthetic bookings only. Do not use real room names or timetables.

## Acceptance contract

- AC1 Reject start ≥ end and requests in the past.
- AC2 Enforce the maximum allowed duration (120 minutes).
- AC3 Reject a blocked room.
- AC4 Reject overlapping bookings and allow requests that only touch at an endpoint.
- AC5 Return Available / Unavailable without changing booking data.
- AC6 Show clear availability and validation feedback on desktop and mobile.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Tests: `npx vitest run`
- Build: `npm run build`

## You may

- Edit any file in the project.
- Add packages when a task needs them.
- Do not add login, authentication or a database.
- Do not store credentials or commit secrets.

## Before you finish

- Make sure the page still loads.
- Run the tests (`npx vitest run`) and build (`npm run build`). Both must pass before proposing acceptance.
- Do not deploy or publish the app externally.


