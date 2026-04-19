"use server";

import { createHandover } from "@/lib/db";
import { redirect } from "next/navigation";

export interface FormState {
  errors?: {
    onCallPerson?: string[];
    shiftDate?: string[];
    summary?: string[];
    notesForNext?: string[];
  };
  message?: string;
}

export async function submitHandover(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const onCallPerson = formData.get("onCallPerson") as string;
  const shiftDate = formData.get("shiftDate") as string;
  const summary = formData.get("summary") as string;
  const notesForNext = formData.get("notesForNext") as string;

  const errors: FormState["errors"] = {};

  if (!onCallPerson || onCallPerson.trim() === "") {
    errors.onCallPerson = ["On-call person is required"];
  }

  if (!shiftDate || shiftDate.trim() === "") {
    errors.shiftDate = ["Shift date is required"];
  }

  if (!summary || summary.trim() === "") {
    errors.summary = ["Summary is required"];
  }

  if (!notesForNext || notesForNext.trim() === "") {
    errors.notesForNext = ["Notes for next person is required"];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  createHandover({
    onCallPerson: onCallPerson.trim(),
    shiftDate: shiftDate.trim(),
    summary: summary.trim(),
    notesForNext: notesForNext.trim(),
  });

  redirect("/");
}
