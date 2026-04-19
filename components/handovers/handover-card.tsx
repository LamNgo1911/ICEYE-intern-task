import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Link href={`/handovers/${handover.id}`}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{handover.onCallPerson}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {handover.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
