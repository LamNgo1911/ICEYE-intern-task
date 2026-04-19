import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getHandoverById } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HandoverDetailPage({ params }: PageProps) {
  const { id } = await params;
  const handover = getHandoverById(id);

  if (!handover) {
    notFound();
  }

  const formattedDate = new Date(handover.shiftDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const createdAt = new Date(handover.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="font-mono text-muted-foreground hover:text-foreground -ml-2">
            &larr; Back
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-1">
          Handover Report
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{handover.onCallPerson}</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm font-mono text-muted-foreground">{formattedDate}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-xs text-muted-foreground/60">Logged {createdAt}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-primary/40 via-border to-transparent mb-8" />

      {/* Content sections */}
      <div className="space-y-8">
        <section>
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
            Shift Summary
          </p>
          <div className="bg-card/80 border border-border/60 rounded-lg p-5 glow-border">
            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm">
              {handover.summary}
            </p>
          </div>
        </section>

        <section>
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
            Notes for Next Person
          </p>
          <div className="bg-card/80 border border-border/60 rounded-lg p-5 glow-border">
            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm">
              {handover.notesForNext}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
