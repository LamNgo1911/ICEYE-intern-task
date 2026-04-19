import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Calendar, ChevronRight } from "lucide-react";
import type { HandoverNote } from "@/types";

interface HandoverCardProps {
  handover: HandoverNote;
}

export function HandoverCard({ handover }: HandoverCardProps) {
  const formattedDate = new Date(handover.shiftDate).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Link href={`/handovers/${handover.id}`} className="block group">
      <Card className="glow-border bg-card/80 backdrop-blur-sm border-border/60 transition-all duration-200 group-hover:border-primary/40 group-hover:bg-card">
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-semibold text-foreground truncate">
                {handover.onCallPerson}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2 pl-10">
            {handover.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
