import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HandoverForm } from "@/components/handovers/handover-form";
import { ArrowLeft } from "lucide-react";

export default function NewHandoverPage() {
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
      <HandoverForm />
    </div>
  );
}
