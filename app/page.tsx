import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HandoverCard } from "@/components/handovers/handover-card";
import { getHandovers } from "@/lib/db";

export default function Home() {
  const handovers = getHandovers();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">On-Call Handovers</h1>
          <Link href="/handovers/new">
            <Button>New Handover</Button>
          </Link>
        </div>

        {handovers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No handover notes yet.
            </p>
            <Link href="/handovers/new">
              <Button variant="outline">Create your first handover</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {handovers.map((handover) => (
              <HandoverCard key={handover.id} handover={handover} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
