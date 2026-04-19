import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              &larr; Back to Handovers
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{handover.onCallPerson}</CardTitle>
              <span className="text-muted-foreground">{formattedDate}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Submitted: {createdAt}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {handover.summary}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Notes for Next Person</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {handover.notesForNext}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
