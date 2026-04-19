import Database from "better-sqlite3";
import path from "path";
import type { HandoverNote } from "@/types";

const dbPath = path.join(process.cwd(), "handovers.db");
const db = new Database(dbPath);

// Initialize the database table
db.exec(`
  CREATE TABLE IF NOT EXISTS handovers (
    id TEXT PRIMARY KEY,
    onCallPerson TEXT NOT NULL,
    shiftDate TEXT NOT NULL,
    summary TEXT NOT NULL,
    notesForNext TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`);

export function createHandover(
  handover: Omit<HandoverNote, "id" | "createdAt">
): HandoverNote {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO handovers (id, onCallPerson, shiftDate, summary, notesForNext, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    handover.onCallPerson,
    handover.shiftDate,
    handover.summary,
    handover.notesForNext,
    createdAt
  );

  return {
    id,
    ...handover,
    createdAt,
  };
}

export function getHandovers(): HandoverNote[] {
  const stmt = db.prepare(`
    SELECT * FROM handovers ORDER BY shiftDate DESC, createdAt DESC
  `);
  return stmt.all() as HandoverNote[];
}

export function getHandoverById(id: string): HandoverNote | undefined {
  const stmt = db.prepare(`
    SELECT * FROM handovers WHERE id = ?
  `);
  return stmt.get(id) as HandoverNote | undefined;
}
