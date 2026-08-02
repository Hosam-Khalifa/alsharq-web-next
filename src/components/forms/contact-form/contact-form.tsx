"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { routes } from "@/config/routes";

export function ContactForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiryType: "general",
      privacyConsent: false,
      honeypot: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7"
      noValidate
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("contact.formTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("contact.formSubtitle")}</p>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("honeypot")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">{t("forms.name")}</Label>
          <Input
            id="name"
            autoComplete="name"
            className="mt-1.5"
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? (
            <p className="mt-1 text-sm text-destructive">
              {t(errors.name.message as "validation.required")}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="email">{t("forms.email")}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-1.5"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-destructive">
              {t(errors.email.message as "validation.required")}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="mobile">{t("forms.mobile")}</Label>
          <Input
            id="mobile"
            type="tel"
            autoComplete="tel"
            className="mt-1.5"
            {...register("mobile")}
            aria-invalid={Boolean(errors.mobile)}
          />
          {errors.mobile ? (
            <p className="mt-1 text-sm text-destructive">
              {t(errors.mobile.message as "validation.required")}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="inquiryType">{t("forms.inquiryType")}</Label>
          <Select id="inquiryType" className="mt-1.5" {...register("inquiryType")}>
            <option value="general">{t("forms.inquiryTypes.general")}</option>
            <option value="product">{t("forms.inquiryTypes.product")}</option>
            <option value="quote">{t("forms.inquiryTypes.quote")}</option>
            <option value="support">{t("forms.inquiryTypes.support")}</option>
          </Select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">{t("forms.message")}</Label>
          <Textarea
            id="message"
            rows={5}
            className="mt-1.5"
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <p className="mt-1 text-sm text-destructive">
              {t(errors.message.message as "validation.required")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <Checkbox id="privacyConsent" className="mt-0.5" {...register("privacyConsent")} />
        <Label htmlFor="privacyConsent" className="text-sm leading-relaxed font-normal">
          {t.rich("contact.privacyConsentRich", {
            link: (chunks) => (
              <Link href={routes.privacyPolicy()} className="font-medium text-primary underline-offset-2 hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </Label>
      </div>
      {errors.privacyConsent ? (
        <p className="mt-1 text-sm text-destructive">
          {t(errors.privacyConsent.message as "validation.required")}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? t("forms.submitting") : t("forms.submit")}
      </Button>

      {status === "success" ? (
        <p className="mt-4 text-sm text-green-700 dark:text-green-400" role="status">
          {t("forms.successContact")}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {t("forms.errorContact")}
        </p>
      ) : null}
    </form>
  );
}
