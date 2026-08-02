import { z } from "zod";
import { isValidPhone } from "./phone";

export const quoteCategorySchema = z.enum(["doors", "boards"]);

export const customerTypeSchema = z.enum([
  "individual",
  "company",
  "contractor",
  "engineering_office",
  "developer",
  "government",
  "other",
]);

export const projectTypeSchema = z.enum([
  "villa",
  "apartment",
  "residential_complex",
  "hotel",
  "hospital",
  "office",
  "store",
  "government_project",
  "other",
]);

export const preferredContactSchema = z.enum(["whatsapp", "phone", "email"]);

export const doorItemSchema = z
  .object({
    productCode: z.string().min(1, "validation.required"),
    quantity: z.coerce.number().min(1, "validation.minQuantity"),
    measurementType: z.enum(["standard", "custom"]),
    standardWidth: z.enum(["85", "90", "100"]).optional(),
    customWidthCm: z.preprocess(
      (value) =>
        value === "" || value === null || value === undefined || Number.isNaN(value)
          ? undefined
          : value,
      z.coerce.number().positive().optional(),
    ),
    heightCm: z.coerce.number().positive({ message: "validation.required" }),
    frameSize: z.enum(["17", "22"]),
    finish: z.string().min(1, "validation.required"),
    includeFrame: z.enum(["yes", "no", "unspecified"]),
    accessories: z.enum(["required", "not_required", "need_help"]),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.measurementType === "standard" && !data.standardWidth) {
      ctx.addIssue({ code: "custom", message: "validation.required", path: ["standardWidth"] });
    }
    if (
      data.measurementType === "custom" &&
      (data.customWidthCm == null || Number.isNaN(data.customWidthCm))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "validation.customWidthRequired",
        path: ["customWidthCm"],
      });
    }
  });

export const boardItemSchema = z
  .object({
    thicknessMm: z.enum(["5", "8", "12", "18"]),
    sizeMm: z.string().min(1, "validation.required"),
    density: z.enum(["0.55", "0.70"]),
    classification: z.enum(["standard", "low", "high"]),
    quantityType: z.enum(["sheets", "pallets", "unspecified"]),
    quantity: z.coerce.number().min(1, "validation.minQuantity"),
    application: z.enum([
      "kitchens",
      "bathrooms",
      "cabinets",
      "stores",
      "interior_decor",
      "furniture",
      "fitouts",
      "other",
    ]),
    fabricationService: z.enum(["supply_only", "cutting", "fabrication", "consultation"]),
    fabricationNotes: z.string().optional(),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.fabricationService === "cutting" ||
        data.fabricationService === "fabrication" ||
        data.fabricationService === "consultation") &&
      !data.fabricationNotes?.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        message: "validation.required",
        path: ["fabricationNotes"],
      });
    }
  });

export const attachmentMetaSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

function pushSchemaIssues(
  ctx: z.RefinementCtx,
  issues: z.ZodIssue[],
  prefix: Array<string | number>,
) {
  for (const issue of issues) {
    ctx.addIssue({
      code: "custom",
      message: issue.message,
      path: [...prefix, ...issue.path],
    });
  }
}

export const quoteWizardSchema = z
  .object({
    selectedCategories: z.array(quoteCategorySchema).min(1, "validation.selectCategory"),
    customer: z.object({
      fullName: z.string().min(2, "validation.required"),
      primaryPhone: z
        .string()
        .min(1, "validation.required")
        .refine(isValidPhone, "validation.phone"),
      secondaryPhone: z
        .string()
        .optional()
        .refine((value) => !value || isValidPhone(value), "validation.phone"),
      email: z.string().email("validation.email"),
      city: z.string().min(1, "validation.required"),
      customerType: customerTypeSchema,
      companyName: z.string().optional(),
      projectType: projectTypeSchema,
      expectedDate: z.string().optional(),
      preferredContact: preferredContactSchema,
      projectNotes: z.string().optional(),
    }),
    doors: z.array(z.any()),
    boards: z.array(z.any()),
    attachments: z.array(attachmentMetaSchema),
    privacyAccepted: z.coerce.boolean().refine((value) => value === true, {
      message: "validation.privacyConsent",
    }),
    honeypot: z.string().max(0).optional(),
    locale: z.enum(["ar", "en"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.customer.customerType !== "individual" && !data.customer.companyName?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "validation.companyNameRequired",
        path: ["customer", "companyName"],
      });
    }

    if (data.selectedCategories.includes("doors")) {
      if (!data.doors.length) {
        ctx.addIssue({
          code: "custom",
          message: "validation.minOrderItems",
          path: ["doors"],
        });
      }
      data.doors.forEach((item, index) => {
        const parsed = doorItemSchema.safeParse(item);
        if (!parsed.success) {
          pushSchemaIssues(ctx, parsed.error.issues, ["doors", index]);
        }
      });
    }

    if (data.selectedCategories.includes("boards")) {
      if (!data.boards.length) {
        ctx.addIssue({
          code: "custom",
          message: "validation.minOrderItems",
          path: ["boards"],
        });
      }
      data.boards.forEach((item, index) => {
        const parsed = boardItemSchema.safeParse(item);
        if (!parsed.success) {
          pushSchemaIssues(ctx, parsed.error.issues, ["boards", index]);
        }
      });
    }
  });

export type QuoteWizardValues = z.infer<typeof quoteWizardSchema> & {
  doors: DoorItemValues[];
  boards: BoardItemValues[];
};
export type DoorItemValues = z.infer<typeof doorItemSchema>;
export type BoardItemValues = z.infer<typeof boardItemSchema>;
export type AttachmentMeta = z.infer<typeof attachmentMetaSchema>;

export const STEP_FIELDS: Record<number, string[]> = {
  0: ["selectedCategories"],
  1: [
    "customer.fullName",
    "customer.primaryPhone",
    "customer.secondaryPhone",
    "customer.email",
    "customer.city",
    "customer.customerType",
    "customer.companyName",
    "customer.projectType",
    "customer.expectedDate",
    "customer.preferredContact",
    "customer.projectNotes",
  ],
  2: ["doors", "boards"],
  3: ["attachments"],
  4: ["privacyAccepted"],
};

export function createEmptyDoorItem(): DoorItemValues {
  return {
    productCode: "unspecified",
    quantity: 1,
    measurementType: "standard",
    standardWidth: "90",
    customWidthCm: undefined,
    heightCm: 210,
    frameSize: "17",
    finish: "unspecified",
    includeFrame: "unspecified",
    accessories: "need_help",
    notes: "",
  };
}

export function createEmptyBoardItem(): BoardItemValues {
  return {
    thicknessMm: "12",
    sizeMm: "1220 × 2440 mm",
    density: "0.55",
    classification: "standard",
    quantityType: "sheets",
    quantity: 1,
    application: "furniture",
    fabricationService: "supply_only",
    fabricationNotes: "",
    notes: "",
  };
}

export function createDefaultQuoteWizardValues(
  locale: "ar" | "en" = "ar",
  options?: {
    productCode?: string;
    categories?: Array<"doors" | "boards">;
  },
): QuoteWizardValues {
  const productCode = options?.productCode;
  const selectedCategories = options?.categories ?? [];

  return {
    selectedCategories,
    customer: {
      fullName: "",
      primaryPhone: "",
      secondaryPhone: "",
      email: "",
      city: "",
      customerType: "individual",
      companyName: "",
      projectType: "villa",
      expectedDate: "",
      preferredContact: "whatsapp",
      projectNotes: "",
    },
    doors: [
      {
        ...createEmptyDoorItem(),
        productCode: productCode || "unspecified",
        finish: productCode || "unspecified",
      },
    ],
    boards: [createEmptyBoardItem()],
    attachments: [],
    privacyAccepted: false,
    honeypot: "",
    locale,
  };
}
