"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitHandover, type FormState } from "@/app/handovers/actions";

const initialState: FormState = {};

export function HandoverForm() {
  const [state, formAction, pending] = useActionState(
    submitHandover,
    initialState
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>New Handover Note</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="onCallPerson">On-Call Person</Label>
            <Input
              id="onCallPerson"
              name="onCallPerson"
              placeholder="Who was on call?"
              disabled={pending}
            />
            {state.errors?.onCallPerson && (
              <p className="text-sm text-destructive">
                {state.errors.onCallPerson[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shiftDate">Shift Date</Label>
            <Input
              id="shiftDate"
              name="shiftDate"
              type="date"
              disabled={pending}
            />
            {state.errors?.shiftDate && (
              <p className="text-sm text-destructive">
                {state.errors.shiftDate[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="What happened during the shift?"
              rows={4}
              disabled={pending}
            />
            {state.errors?.summary && (
              <p className="text-sm text-destructive">
                {state.errors.summary[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notesForNext">Notes for Next Person</Label>
            <Textarea
              id="notesForNext"
              name="notesForNext"
              placeholder="What should the next person know?"
              rows={4}
              disabled={pending}
            />
            {state.errors?.notesForNext && (
              <p className="text-sm text-destructive">
                {state.errors.notesForNext[0]}
              </p>
            )}
          </div>

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Submitting..." : "Submit Handover"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
