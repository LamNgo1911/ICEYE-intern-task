import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HandoverCard } from "@/components/handovers/handover-card";
import { getHandovers } from "@/lib/db";
import { Plus, FileText, Inbox } from "lucide-react";

export default function Home() {
  const handovers = getHandovers();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      {/* Page header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-mono text-primary tracking-widest uppercase">
              Mission Control
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            On-Call Handovers
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {handovers.length === 0
              ? "No handovers logged yet."
              : `${handovers.length} handover${handovers.length === 1 ? "" : "s"} on record`}
          </p>
        </div>
        <Link href="/handovers/new">
          <Button className="gap-2 font-mono">
            <Plus className="w-4 h-4" />
            New Handover
          </Button>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-primary/40 via-border to-transparent mb-8" />

      {/* List */}
      {handovers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7 text-primary/60" />
          </div>
          <p className="text-muted-foreground mb-1">No handovers logged yet.</p>
          <p className="text-xs text-muted-foreground/60 mb-6">
            Start by logging the first shift handover.
          </p>
          <Link href="/handovers/new">
            <Button variant="outline" className="font-mono text-sm gap-2">
              <Plus className="w-4 h-4" />
              Log first handover
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {handovers.map((handover) => (
            <HandoverCard key={handover.id} handover={handover} />
          ))}
        </div>
      )}
    </div>
  );
}
