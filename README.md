# Hazel Nailbook Studio

A responsive nail-studio website with an interactive, four-step booking demonstration.

[Try the live demo](https://hazel-nailbook-studio.lovable.app/randevu) · [Yusuf Şenkaya — portfolio](https://github.com/canvaswebdesigner)

## What you can try

- Browse six services and their detail pages.
- Choose a service, a sample date and a time that fits its example duration.
- Move backward to revise a selection and review the summary.
- Complete the flow using fixed fictional visitor details, then restart.
- Explore the gallery layout, FAQs and supporting pages on mobile or desktop.

## Demo boundaries

This is an independent portfolio concept, not a live booking service or a claimed paid client delivery. All availability, durations, hours and business details are examples. The booking flow uses component state only: no appointment API, database write, payment, email, WhatsApp message or persistent visitor record. It does not collect real contact information. Reloading clears the session. Gallery artwork is placeholder content.

## Development

React 19, TypeScript, TanStack Start, Tailwind CSS and Radix UI. Install Bun, then run:

```sh
bun install --frozen-lockfile
bun run dev
bun run build
bun test tests/demo-booking.test.ts
```

The schedule tests cover Istanbul date boundaries, closed Sundays, blocked example periods and closing-time limits. The repository is connected to Lovable; preserve published Git history when updating it.
