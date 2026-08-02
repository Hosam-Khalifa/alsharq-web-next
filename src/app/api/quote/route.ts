import { NextResponse } from "next/server";
import { quoteWizardSchema } from "@/lib/validation/quote-wizard-schema";
import { quoteService } from "@/services/quote-service";
import type { QuoteRequestType } from "@/types";

function resolveRequestType(categories: Array<"doors" | "boards">): QuoteRequestType {
  const hasDoors = categories.includes("doors");
  const hasBoards = categories.includes("boards");
  if (hasDoors && hasBoards) return "both";
  if (hasBoards) return "boards";
  return "doors";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteWizardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Validation failed" }, { status: 400 });
    }

    const payload = {
      ...parsed.data,
      doors: parsed.data.selectedCategories.includes("doors") ? parsed.data.doors : [],
      boards: parsed.data.selectedCategories.includes("boards") ? parsed.data.boards : [],
      requestType: resolveRequestType(parsed.data.selectedCategories),
      submittedAt: new Date().toISOString(),
    };

    const result = await quoteService.submitQuote(payload);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error ?? "Submission failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      referenceNumber: result.referenceNumber,
      requestType: payload.requestType,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
