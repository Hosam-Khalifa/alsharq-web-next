export type ProductClaimStatus =
  | "verified"
  | "needs-document"
  | "needs-test-report"
  | "needs-confirmation";

export interface ProductClaim {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  status: ProductClaimStatus;
  supportingDocument?: string;
}

export const productClaims: ProductClaim[] = [
  {
    id: "moisture-resistance",
    titleAr: "مقاوم للرطوبة",
    titleEn: "Moisture resistant",
    descriptionAr: "مناسب للبيئات الرطبة ويحد من التآكل.",
    descriptionEn: "Suitable for humid environments and helps reduce deterioration.",
    status: "verified",
  },
  {
    id: "water-resistance",
    titleAr: "مقاوم للماء",
    titleEn: "Water resistant",
    descriptionAr: "تصميم مناسب للاستخدام في بيئات قد تتعرض للرطوبة.",
    descriptionEn: "Designed for environments that may be exposed to moisture.",
    status: "verified",
  },
  {
    id: "termite-resistance",
    titleAr: "مقاوم للنمل والحشرات",
    titleEn: "Termite and insect resistant",
    descriptionAr: "حل عملي يقلل من مشاكل الحشرات مقارنة بالخشب التقليدي.",
    descriptionEn: "A practical alternative that reduces insect-related issues compared to traditional wood.",
    status: "verified",
  },
  {
    id: "ease-of-machining",
    titleAr: "سهولة التشغيل",
    titleEn: "Ease of machining",
    status: "verified",
  },
  {
    id: "multiple-finishes",
    titleAr: "تشطيبات متعددة",
    titleEn: "Multiple finishes",
    status: "verified",
  },
  {
    id: "multiple-applications",
    titleAr: "تطبيقات متعددة",
    titleEn: "Multiple applications",
    status: "verified",
  },
  {
    id: "saudi-market",
    titleAr: "مصمم للسوق السعودي",
    titleEn: "Designed for the Saudi market",
    status: "verified",
  },
  {
    id: "fire-resistant",
    titleAr: "مقاوم للحرائق",
    titleEn: "Fire resistant",
    descriptionAr: "يتطلب تأكيداً رسمياً وتقارير اختبار.",
    descriptionEn: "Requires official confirmation and test reports.",
    status: "needs-test-report",
  },
  {
    id: "warranty-15-years",
    titleAr: "ضمان 15 سنة",
    titleEn: "15-year warranty",
    descriptionAr: "يجب تأكيد نطاق الضمان لكل منتج على حدة.",
    descriptionEn: "Warranty scope must be confirmed per product.",
    status: "needs-confirmation",
  },
  {
    id: "100-percent-waterproof",
    titleAr: "100% مقاوم للماء",
    titleEn: "100% waterproof",
    status: "needs-test-report",
  },
  {
    id: "antibacterial",
    titleAr: "مضاد للبكتيريا",
    titleEn: "Antibacterial",
    status: "needs-document",
  },
  {
    id: "uv-resistant",
    titleAr: "مقاوم للأشعة فوق البنفسجية",
    titleEn: "UV resistant",
    status: "needs-test-report",
  },
  {
    id: "outdoor-use",
    titleAr: "مناسب للاستخدام الخارجي",
    titleEn: "Suitable for outdoor use",
    status: "needs-confirmation",
  },
  {
    id: "zero-maintenance",
    titleAr: "بدون صيانة",
    titleEn: "Zero maintenance",
    status: "needs-confirmation",
  },
  {
    id: "fully-recyclable",
    titleAr: "قابل لإعادة التدوير بالكامل",
    titleEn: "Fully recyclable",
    status: "needs-document",
  },
];

export const verifiedClaims = productClaims.filter((claim) => claim.status === "verified");
