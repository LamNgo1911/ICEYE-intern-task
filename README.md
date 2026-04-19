# ICEYE On-Call Handover Notes

A simple tool for submitting and viewing on-call handover notes. Replaces the Slack thread workflow where information gets lost.

## 🎥 Video demmo

- https://github.com/user-attachments/assets/89bec24e-a242-4b05-b4a3-a930751bc895

## 🤖 AI "Vibe Coding" Log

*I used Claude Code CLI to rapidly prototype this application.*

* **What Worked:** Claude seamlessly generated the Next.js App Router boilerplate, integrated shadcn/ui components and lucide-react icons, and set up SQLite via better-sqlite3 perfectly.
* **Time Spent:** ~60 minutes total (10m setup, 30m AI generation, 20m debugging/styling/documenting).

## Features

- Submit handover notes with on-call person, shift date, summary, and notes for the next person
- View all handovers in a clean list view
- Click any handover to see full details
- Dark space-themed UI with ICEYE branding
- Data persists in local SQLite database

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **lucide-react** icons
- **SQLite** via better-sqlite3

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/LamNgo1911/ICEYE-intern-task.git
cd ICEYE-intern-task

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Usage

1. **View handovers**: The home page (`/`) shows all logged handovers
2. **Create handover**: Click "New Handover" button, fill in the form, submit
3. **View details**: Click any handover card to see the full report

## Project Structure

```
app/
├── page.tsx                    # Home - list of handovers
├── layout.tsx                  # Root layout with header
├── globals.css                 # Theme and styles
└── handovers/
    ├── actions.ts              # Server Actions
    ├── new/page.tsx            # Create form
    └── [id]/page.tsx           # Detail view

components/
├── ui/                         # shadcn/ui components
└── handovers/                  # Feature components

lib/
├── db.ts                       # SQLite database
└── utils.ts                    # Utilities

types/
└── index.ts                    # TypeScript types
```

See [architecture.md](./architecture.md) for detailed documentation.

## License

MIT
