"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { PartnersSliderLabels, ResolvedPartner } from "./partners.types";
import "./partners-slider.css";

interface PartnersSliderClientProps extends PartnersSliderLabels {
  partners: ResolvedPartner[];
  isRtl: boolean;
}

function PartnerThemeImage({
  partner,
  decorative,
}: {
  partner: ResolvedPartner;
  decorative?: boolean;
}) {
  const imageClassName =
    "max-h-full max-w-full object-contain opacity-[0.88] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100";

  return (
    <>
      <Image
        src={partner.imageLight}
        alt=""
        width={partner.width}
        height={partner.height}
        sizes="(max-width: 640px) 150px, (max-width: 1024px) 195px, 215px"
        className={`${imageClassName} dark:hidden`}
        draggable={false}
        aria-hidden={decorative ? true : undefined}
      />
      <Image
        src={partner.imageDark}
        alt=""
        width={partner.width}
        height={partner.height}
        sizes="(max-width: 640px) 150px, (max-width: 1024px) 195px, 215px"
        className={`${imageClassName} hidden dark:block`}
        draggable={false}
        aria-hidden={decorative ? true : undefined}
      />
    </>
  );
}

function PartnerLogoCard({ partner, decorative = false }: { partner: ResolvedPartner; decorative?: boolean }) {
  const card = (
    <div className="partner-logo-card brand-interactive-card group flex h-[88px] w-[150px] shrink-0 items-center justify-center rounded-xl bg-surface p-4 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow,opacity] duration-200 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--brand-copper)_35%,var(--border))] hover:opacity-100 focus-within:-translate-y-1 focus-within:border-[color-mix(in_srgb,var(--brand-copper)_35%,var(--border))] focus-within:opacity-100 sm:h-[96px] sm:w-[165px] md:h-[110px] md:w-[195px] lg:h-[118px] lg:w-[215px]">
      <PartnerThemeImage partner={partner} decorative={decorative} />
    </div>
  );

  if (partner.website) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl outline-none"
        aria-label={partner.alt}
      >
        {card}
      </a>
    );
  }

  if (decorative) {
    return card;
  }

  return (
    <div
      tabIndex={0}
      role="img"
      aria-label={partner.alt}
      className="rounded-xl outline-none"
    >
      {card}
    </div>
  );
}

function PartnerLogoSet({
  partners,
  duplicate = false,
}: {
  partners: ResolvedPartner[];
  duplicate?: boolean;
}) {
  return (
    <ul
      className="partners-marquee__set"
      aria-hidden={duplicate ? true : undefined}
    >
      {partners.map((partner) => (
        <li key={`${duplicate ? "dup-" : ""}${partner.id}`}>
          <PartnerLogoCard partner={partner} decorative={duplicate} />
        </li>
      ))}
    </ul>
  );
}

export function PartnersSliderClient({
  partners,
  sliderLabel,
  isRtl,
}: PartnersSliderClientProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startOffset: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const setDragOffset = useCallback((offset: number) => {
    trackRef.current?.style.setProperty("--partners-drag-x", `${offset}px`);
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      dragState.current = {
        startX: event.clientX,
        startOffset: Number.parseFloat(
          trackRef.current?.style.getPropertyValue("--partners-drag-x") || "0",
        ),
      };
      setIsDragging(true);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) {
        return;
      }

      const delta = event.clientX - dragState.current.startX;
      setDragOffset(dragState.current.startOffset + delta);
    },
    [isDragging, setDragOffset],
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      setIsDragging(false);
      setDragOffset(0);
    },
    [isDragging, setDragOffset],
  );

  return (
    <>
      <div
        className={`partners-marquee partners-marquee--animated motion-reduce:hidden ${isDragging ? "is-dragging" : ""}`}
        data-direction={isRtl ? "rtl" : "ltr"}
        aria-label={sliderLabel}
        role="region"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="partners-marquee__viewport">
          <div ref={trackRef} className="partners-marquee__track">
            <div className="partners-marquee__inner">
              <PartnerLogoSet partners={partners} />
              <PartnerLogoSet partners={partners} duplicate />
            </div>
          </div>
        </div>
      </div>

      <ul
        className="partners-marquee--static hidden flex-wrap items-center justify-center gap-4 motion-reduce:flex sm:gap-5 md:gap-6"
        aria-label={sliderLabel}
      >
        {partners.map((partner) => (
          <li key={partner.id}>
            <PartnerLogoCard partner={partner} />
          </li>
        ))}
      </ul>
    </>
  );
}
