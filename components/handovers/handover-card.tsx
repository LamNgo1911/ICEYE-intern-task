import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="font-semibold text-foreground truncate">
                {handover.onCallPerson}
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground shrink-0">
              {formattedDate}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2 pl-5">
            {handover.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
