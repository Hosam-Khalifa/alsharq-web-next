import { buildWhatsAppUrl } from "@/lib/i18n/locale-utils";
import type { BoardItemValues, DoorItemValues } from "@/lib/validation/quote-wizard-schema";
import type { Locale, QuoteCategory } from "@/types";
import { getFactoryWhatsAppNumber } from "./factory-number";

export interface QuoteWhatsAppLabels {
  greeting: string;
  intro: string;
  requestReference: string;
  name: string;
  customerType: string;
  city: string;
  projectType: string;
  requestType: string;
  preferredContact: string;
  doorsHeading: string;
  boardsHeading: string;
  quantity: string;
  size: string;
  frameSize: string;
  finish: string;
  includeFrame: string;
  accessories: string;
  sizeUnitCm: string;
  density: string;
  classification: string;
  application: string;
  fabricationService: string;
  attachmentsCount: (count: number) => string;
  boardItemTitle: (thickness: string) => string;
  closing: string;
  thankYou: string;
  unspecifiedHelp: string;
  finishUnspecified: string;
  requestTypeDoors: string;
  requestTypeBoards: string;
  requestTypeBoth: string;
  customerTypeLabels: Record<string, string>;
  projectTypeLabels: Record<string, string>;
  preferredContactLabels: Record<string, string>;
  includeFrameLabels: Record<string, string>;
  accessoriesLabels: Record<string, string>;
  quantityTypeLabels: Record<string, string>;
  applicationLabels: Record<string, string>;
  fabricationLabels: Record<string, string>;
  classificationLabels: Record<string, string>;
}

export interface QuoteWhatsAppSummary {
  locale: Locale;
  requestReference: string;
  customerName: string;
  customerType: string;
  city: string;
  projectType: string;
  preferredContact: string;
  selectedCategories: QuoteCategory[];
  doors: DoorItemValues[];
  boards: BoardItemValues[];
  attachmentCount: number;
}

function line(label: string, value?: string | number | null) {
  if (value === undefined || value === null || value === "") return null;
  return `${label}: ${value}`;
}

function resolveRequestTypeLabel(
  categories: QuoteCategory[],
  labels: QuoteWhatsAppLabels,
) {
  const hasDoors = categories.includes("doors");
  const hasBoards = categories.includes("boards");
  if (hasDoors && hasBoards) return labels.requestTypeBoth;
  if (hasBoards) return labels.requestTypeBoards;
  return labels.requestTypeDoors;
}

function formatDoorWidth(door: DoorItemValues) {
  if (door.measurementType === "custom" && door.customWidthCm) {
    return String(door.customWidthCm);
  }
  return door.standardWidth ?? "";
}

function buildDoorSummary(doors: DoorItemValues[], labels: QuoteWhatsAppLabels) {
  if (!doors.length) return "";

  const blocks = doors.map((door, index) => {
    const code =
      door.productCode === "unspecified" ? labels.unspecifiedHelp : door.productCode;
    const finish =
      door.finish === "unspecified" ? labels.finishUnspecified : door.finish;
    const width = formatDoorWidth(door);
    const size =
      width && door.heightCm
        ? `${width} × ${door.heightCm} ${labels.sizeUnitCm}`
        : "";

    return [
      `${index + 1}. ${code}`,
      line(`- ${labels.quantity}`, door.quantity),
      line(`- ${labels.size}`, size || null),
      line(
        `- ${labels.frameSize}`,
        door.frameSize ? `${door.frameSize} ${labels.sizeUnitCm}` : null,
      ),
      line(`- ${labels.finish}`, finish),
      line(`- ${labels.includeFrame}`, labels.includeFrameLabels[door.includeFrame]),
      line(`- ${labels.accessories}`, labels.accessoriesLabels[door.accessories]),
    ]
      .filter(Boolean)
      .join("\n");
  });

  return `${labels.doorsHeading}\n\n${blocks.join("\n\n")}`;
}

function buildBoardSummary(boards: BoardItemValues[], labels: QuoteWhatsAppLabels) {
  if (!boards.length) return "";

  const blocks = boards.map((board, index) => {
    const quantityUnit = labels.quantityTypeLabels[board.quantityType] ?? "";

    return [
      `${index + 1}. ${labels.boardItemTitle(board.thicknessMm)}`,
      line(`- ${labels.size}`, board.sizeMm),
      line(`- ${labels.density}`, board.density),
      line(
        `- ${labels.classification}`,
        labels.classificationLabels[board.classification],
      ),
      line(
        `- ${labels.quantity}`,
        `${board.quantity}${quantityUnit ? ` ${quantityUnit}` : ""}`,
      ),
      line(`- ${labels.application}`, labels.applicationLabels[board.application]),
      line(
        `- ${labels.fabricationService}`,
        labels.fabricationLabels[board.fabricationService],
      ),
    ]
      .filter(Boolean)
      .join("\n");
  });

  return `${labels.boardsHeading}\n\n${blocks.join("\n\n")}`;
}

export function buildQuoteWhatsAppMessage(
  summary: QuoteWhatsAppSummary,
  labels: QuoteWhatsAppLabels,
): string {
  const hasDoors = summary.selectedCategories.includes("doors");
  const hasBoards = summary.selectedCategories.includes("boards");

  const sections: string[] = [
    labels.greeting,
    labels.intro,
    "",
    line(labels.requestReference, summary.requestReference) ?? "",
    line(labels.name, summary.customerName) ?? "",
    line(labels.customerType, labels.customerTypeLabels[summary.customerType]) ?? "",
    line(labels.city, summary.city) ?? "",
    line(labels.projectType, labels.projectTypeLabels[summary.projectType]) ?? "",
    line(
      labels.requestType,
      resolveRequestTypeLabel(summary.selectedCategories, labels),
    ) ?? "",
  ].filter((item, index, arr) => !(item === "" && arr[index - 1] === ""));

  if (hasDoors) {
    const doorBlock = buildDoorSummary(summary.doors, labels);
    if (doorBlock) sections.push("", doorBlock);
  }

  if (hasBoards) {
    const boardBlock = buildBoardSummary(summary.boards, labels);
    if (boardBlock) sections.push("", boardBlock);
  }

  sections.push(
    "",
    line(
      labels.preferredContact,
      labels.preferredContactLabels[summary.preferredContact],
    ) ?? "",
  );

  if (summary.attachmentCount > 0) {
    sections.push(labels.attachmentsCount(summary.attachmentCount));
  }

  sections.push("", labels.closing, labels.thankYou);

  return sections.filter((item, index, arr) => item !== "" || arr[index - 1] !== "").join("\n");
}

export function buildWhatsAppQuoteUrl(message: string): string | null {
  const phoneNumber = getFactoryWhatsAppNumber();
  if (!phoneNumber) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[WhatsApp] Factory WhatsApp number is not configured.");
    }
    return null;
  }

  return buildWhatsAppUrl(phoneNumber, message);
}
