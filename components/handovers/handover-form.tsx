"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitHandover, type FormState } from "@/app/handovers/actions";

const initialState: FormState = {};

export function HandoverForm() {
  const [state, formAction, pending] = useActionState(
    submitHandover,
    initialState
  );

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-1">
          New Entry
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Handover Note</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Log what happened and what the next person needs to know.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-primary/40 via-border to-transparent mb-6" />

      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="onCallPerson" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              On-Call Person
            </Label>
            <Input
              id="onCallPerson"
              name="onCallPerson"
              placeholder="e.g. Alex Johnson"
              disabled={pending}
              className="bg-input/50 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20"
            />
            {state.errors?.onCallPerson && (
              <p className="text-xs text-destructive">{state.errors.onCallPerson[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shiftDate" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Shift Date
            </Label>
            <Input
              id="shiftDate"
              name="shiftDate"
              type="date"
              disabled={pending}
              className="bg-input/50 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 font-mono"
            />
            {state.errors?.shiftDate && (
              <p className="text-xs text-destructive">{state.errors.shiftDate[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="summary" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Shift Summary
          </Label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="What happened during the shift? Incidents, alerts, actions taken..."
            rows={5}
            disabled={pending}
            className="bg-input/50 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 resize-none"
          />
          {state.errors?.summary && (
            <p className="text-xs text-destructive">{state.errors.summary[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notesForNext" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Notes for Next Person
          </Label>
          <Textarea
            id="notesForNext"
            name="notesForNext"
            placeholder="What should the next person watch out for? Ongoing issues, pending tasks..."
            rows={4}
            disabled={pending}
            className="bg-input/50 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 resize-none"
          />
          {state.errors?.notesForNext && (
            <p className="text-xs text-destructive">{state.errors.notesForNext[0]}</p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={pending}
            className="w-full font-mono tracking-wide"
          >
            {pending ? "Transmitting..." : "Submit Handover"}
          </Button>
        </div>
      </form>
    </div>
  );
}
