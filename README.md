# WalletHedge

WalletHedge is a Next.js App Router project for:
- a marketing/landing experience
- Clerk authentication (sign-in/sign-up)
- a protected investor dashboard (overview, deposit, withdrawal, transactions, profile/KYC)

This branch includes the 2026 UI refresh and dashboard shell rebuild with WalletHedge blue/white brand styling.

## Tech Stack

- Next.js `16.x`
- React `19.x`
- TypeScript
- Tailwind CSS + shadcn/ui primitives
- Clerk auth
- Appwrite (database + storage)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create and populate `.env` (required keys):

```bash
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_PROFILE_COLLECTION_ID=
NEXT_PUBLIC_KYC_COLLECTION_ID=
NEXT_PUBLIC_DEPOSITS_COLLECTION_ID=
NEXT_PUBLIC_WITHDRAWALS_COLLECTION_ID=
NEXT_PUBLIC_CRYPTO_BANNER_COLLECTION_ID=
NEXT_PUBLIC_PROFILE_BUCKET_ID=
NEXT_PUBLIC_KYC_BUCKET_ID=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

3. Run dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run eslint checks
- `npx tsc --noEmit` - run type checking
- `npm run build` - production build (run only when needed)
- `npm run start` - run production server

## Route Map

- `/` - modernized landing page
- `/about`, `/contact` - informational pages
- `/sign-in`, `/sign-up` - Clerk auth pages
- `/dashboard` - overview
- `/dashboard/deposit`
- `/dashboard/withdrawal`
- `/dashboard/transactions`
- `/dashboard/profile`

## Notes

- Dashboard route protection is handled in `proxy.ts`.
- Appwrite access helpers live in `lib/services/dashboard.ts`.
- Global brand tokens are defined in `app/globals.css`.