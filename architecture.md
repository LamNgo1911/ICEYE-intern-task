# On-Call Handover Notes - Architecture

## Overview

A simple, functional tool for submitting and viewing on-call handover notes. Built with a monolithic architecture using Next.js App Router with Server Actions and SQLite for persistence.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Database**: SQLite via better-sqlite3 (file-based, no external DB needed)

## Folder Structure

```
iceye-intern-task/
├── app/                                  # Next.js App Router pages
│   ├── layout.tsx                        # Root layout with fonts and metadata
│   ├── page.tsx                          # Home page - list of handovers
│   ├── globals.css                       # Global styles and Tailwind config
│   └── handovers/
│       ├── actions.ts                    # Server Actions for form handling
│       ├── new/
│       │   └── page.tsx                  # Create new handover form page
│       └── [id]/
│           └── page.tsx                  # View single handover detail page
│
├── components/                           # React components
│   ├── ui/                               # shadcn/ui base components (unmodified)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   └── handovers/                        # Handover feature components
│       ├── handover-form.tsx             # Form for creating new handovers
│       └── handover-card.tsx             # Card displaying handover summary
│
├── lib/                                  # Shared utilities
│   ├── db.ts                             # SQLite database setup and queries
│   └── utils.ts                          # shadcn/ui cn() helper
│
├── types/
│   └── index.ts                          # Shared TypeScript types
│
├── public/                               # Static assets
│
├── handovers.db                          # SQLite database file (auto-created, gitignored)
├── package.json
├── tsconfig.json
├── next.config.ts
└── components.json                       # shadcn/ui configuration
```

## Data Model

```typescript
interface HandoverNote {
  id: string;              // UUID
  onCallPerson: string;    // Who was on call
  shiftDate: string;       // Date of the shift (YYYY-MM-DD)
  summary: string;         // What happened during the shift
  notesForNext: string;    // What the next person should know
  createdAt: string;       // ISO timestamp
}
```

## Key Files

### Shared Types (`types/index.ts`)

Single source of truth for the `HandoverNote` interface, imported across `lib/db.ts` and components.

### Database Layer (`lib/db.ts`)

Handles all SQLite operations:
- `createHandover()` - Insert a new handover note
- `getHandovers()` - Get all handovers, ordered by shift date descending
- `getHandoverById()` - Get a single handover by ID

The database file (`handovers.db`) is auto-created on first run and gitignored.

### Server Actions (`app/handovers/actions.ts`)

Colocated with the handovers route segment:
- `submitHandover()` - Validates form data and creates a new handover
  - Returns validation errors if fields are missing
  - Redirects to home page on success

### Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Lists all handover notes with "New Handover" button |
| `/handovers/new` | `app/handovers/new/page.tsx` | Form to create a new handover note |
| `/handovers/[id]` | `app/handovers/[id]/page.tsx` | View full details of a single handover |

### Components

- **HandoverForm** (`components/handovers/`) - Client component with form fields. Uses `useActionState` for pending states and validation errors.
- **HandoverCard** (`components/handovers/`) - Server component displaying handover summary in a clickable card.

## Data Flow

```
[User fills form at /handovers/new]
    ↓
[Submit button clicked]
    ↓
[Server Action (app/handovers/actions.ts) validates data]
    ↓ (if valid)
[lib/db.ts creates record in SQLite]
    ↓
[Redirect to /]
    ↓
[Home page fetches all handovers from SQLite]
    ↓
[HandoverCards rendered]
```

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app runs on `http://localhost:3000` by default.
