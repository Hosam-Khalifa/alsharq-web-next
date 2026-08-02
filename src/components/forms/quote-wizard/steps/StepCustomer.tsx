"use client";

import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { QuoteWizardValues } from "@/lib/validation/quote-wizard-schema";
import { FieldError } from "../FieldError";

const CUSTOMER_TYPES = [
  "individual",
  "company",
  "contractor",
  "engineering_office",
  "developer",
  "government",
  "other",
] as const;

const PROJECT_TYPES = [
  "villa",
  "apartment",
  "residential_complex",
  "hotel",
  "hospital",
  "office",
  "store",
  "government_project",
  "other",
] as const;

interface StepCustomerProps {
  register: UseFormRegister<QuoteWizardValues>;
  watch: UseFormWatch<QuoteWizardValues>;
  errors: FieldErrors<QuoteWizardValues>;
}

export function StepCustomer({ register, watch, errors }: StepCustomerProps) {
  const t = useTranslations("quote");
  const tForms = useTranslations("forms");
  const customerType = watch("customer.customerType");
  const showCompany = customerType !== "individual";

  return (
    <fieldset>
      <legend className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t("stepCustomerTitle")}
      </legend>
      <p className="mt-2 text-sm text-muted-foreground">{t("stepCustomerSubtitle")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="fullName">{tForms("fullName")} *</Label>
          <Input id="fullName" className="mt-1.5" {...register("customer.fullName")} aria-invalid={!!errors.customer?.fullName} />
          <FieldError message={errors.customer?.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="primaryPhone">{tForms("mobile")} *</Label>
          <Input id="primaryPhone" className="mt-1.5" inputMode="tel" {...register("customer.primaryPhone")} aria-invalid={!!errors.customer?.primaryPhone} />
          <FieldError message={errors.customer?.primaryPhone?.message} />
        </div>

        <div>
          <Label htmlFor="secondaryPhone">{t("secondaryPhone")}</Label>
          <Input id="secondaryPhone" className="mt-1.5" inputMode="tel" {...register("customer.secondaryPhone")} />
          <FieldError message={errors.customer?.secondaryPhone?.message} />
        </div>

        <div>
          <Label htmlFor="email">{tForms("email")} *</Label>
          <Input id="email" type="email" className="mt-1.5" {...register("customer.email")} aria-invalid={!!errors.customer?.email} />
          <FieldError message={errors.customer?.email?.message} />
        </div>

        <div>
          <Label htmlFor="city">{tForms("city")} *</Label>
          <Input id="city" className="mt-1.5" {...register("customer.city")} aria-invalid={!!errors.customer?.city} />
          <FieldError message={errors.customer?.city?.message} />
        </div>

        <div>
          <Label htmlFor="customerType">{tForms("customerType")} *</Label>
          <Select id="customerType" className="mt-1.5" {...register("customer.customerType")}>
            {CUSTOMER_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`customerTypes.${type}`)}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="projectType">{tForms("projectType")} *</Label>
          <Select id="projectType" className="mt-1.5" {...register("customer.projectType")}>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`projectTypes.${type}`)}
              </option>
            ))}
          </Select>
        </div>

        {showCompany ? (
          <div className="md:col-span-2">
            <Label htmlFor="companyName">{t("companyOrOrg")} *</Label>
            <Input id="companyName" className="mt-1.5" {...register("customer.companyName")} aria-invalid={!!errors.customer?.companyName} />
            <FieldError message={errors.customer?.companyName?.message} />
          </div>
        ) : null}

        <div>
          <Label htmlFor="expectedDate">{tForms("expectedProjectDate")}</Label>
          <Input id="expectedDate" type="date" className="mt-1.5" {...register("customer.expectedDate")} />
        </div>

        <div>
          <Label htmlFor="preferredContact">{tForms("preferredContactMethod")} *</Label>
          <Select id="preferredContact" className="mt-1.5" {...register("customer.preferredContact")}>
            <option value="whatsapp">{tForms("whatsapp")}</option>
            <option value="phone">{t("contactPhone")}</option>
            <option value="email">{tForms("email")}</option>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="projectNotes">{t("projectNotes")}</Label>
          <Textarea id="projectNotes" className="mt-1.5" rows={4} {...register("customer.projectNotes")} />
        </div>
      </div>
    </fieldset>
  );
}
