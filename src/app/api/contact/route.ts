import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/schemas";
import { contactService } from "@/services/contact-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Validation failed" }, { status: 400 });
    }

    const result = await contactService.submitContact(parsed.data);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error ?? "Submission failed" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
