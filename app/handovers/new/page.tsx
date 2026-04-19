import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HandoverForm } from "@/components/handovers/handover-form";

export default function NewHandoverPage() {
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
        <div className="flex justify-center">
          <HandoverForm />
        </div>
      </div>
    </div>
  );
}
