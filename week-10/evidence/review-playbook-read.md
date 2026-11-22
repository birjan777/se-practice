I have the root `AGENTS.md` content available from your earlier message. I have not independently accessed the project filesystem, so I cannot claim to have opened the file myself or that it was automatically loaded.

## Project constraints

Based on the supplied `AGENTS.md` and checkpoint:

- Framework: React + TypeScript + Vite.
- Scope: One fictional room.
- No login or database.
- No secrets or external deployment.
- Preserve acceptance criteria AC1–AC6:
  - AC1: Reject start times greater than or equal to end times and past requests.
  - AC2: Enforce a maximum duration of 120 minutes.
  - AC3: Reject blocked rooms.
  - AC4: Reject overlapping bookings, including requests touching either endpoint.
  - AC5: Return Available / Unavailable without modifying booking data.
  - AC6: Preserve the existing checkpoint requirements and fixtures.
- Preserve the existing 19 Vitest tests and unchanged fixtures.
- No app README.
- Test and build successfully before acceptance.

Important instruction conflict: The supplied `AGENTS.md` suggests real KBTU rooms, Supabase, login, and Netlify deployment. These conflict with your explicit project contract. I will follow your explicit constraints instead.

## Exact commands found

| Purpose | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Start development server | `npm run dev` |
| Tests (listed in AGENTS.md) | `npm run test:unit` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |

Testing discrepancy: The package scripts do not include `test:unit`, `test`, `lint`, or a formatter script.

The existing tests use Vitest, so the available direct test command is:

bash

```bash
npx vitest run
```

No files have been edited. I am waiting for your authorization before making changes.
