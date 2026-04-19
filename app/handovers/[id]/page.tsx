import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getHandoverById } from "@/lib/db";
import { ArrowLeft, ClipboardList, User, Calendar, Clock, FileText, MessageSquare } from "lucide-react";

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
          <Button variant="ghost" size="sm" className="font-mono text-muted-foreground hover:text-foreground -ml-2 gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList className="w-3.5 h-3.5 text-primary" />
          <p className="text-xs font-mono text-primary tracking-widest uppercase">
            Handover Report
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{handover.onCallPerson}</h1>
        </div>
        <div className="flex items-center gap-4 mt-3 pl-13">
          <div className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
          <span className="text-muted-foreground/40">·</span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Clock className="w-3 h-3" />
            Logged {createdAt}
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-primary/40 via-border to-transparent mb-8" />

      {/* Content sections */}
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-mono text-primary tracking-widest uppercase">
              Shift Summary
            </p>
          </div>
          <div className="bg-card/80 border border-border/60 rounded-lg p-5 glow-border">
            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm">
              {handover.summary}
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-mono text-primary tracking-widest uppercase">
              Notes for Next Person
            </p>
          </div>
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
