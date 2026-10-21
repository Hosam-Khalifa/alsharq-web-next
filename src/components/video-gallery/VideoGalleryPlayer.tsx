"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import type { GalleryVideo } from "@/data/video-gallery";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { cn } from "@/lib/utils/cn";

interface VideoGalleryPlayerProps {
  videos: GalleryVideo[];
}

export function VideoGalleryPlayer({ videos }: VideoGalleryPlayerProps) {
  const t = useTranslations("videos");
  const reducedMotion = useReducedMotion();
  const ordered = useMemo(
    () => videos.slice().sort((a, b) => a.order - b.order),
    [videos],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);

  const active = ordered[activeIndex] ?? ordered[0];
  const title = active ? t("videoTitle", { number: active.number }) : "";

  const selectVideo = useCallback(
    (index: number, autoplay: boolean) => {
      if (index < 0 || index >= ordered.length) return;

      if (index === activeIndex) {
        if (autoplay) {
          void videoRef.current?.play().catch(() => undefined);
        }
        return;
      }

      setShouldAutoplay(autoplay);
      setActiveIndex(index);
    },
    [activeIndex, ordered.length],
  );

  const goPrevious = useCallback(() => {
    selectVideo((activeIndex - 1 + ordered.length) % ordered.length, true);
  }, [activeIndex, ordered.length, selectVideo]);

  const goNext = useCallback(() => {
    selectVideo((activeIndex + 1) % ordered.length, true);
  }, [activeIndex, ordered.length, selectVideo]);

  // Attempt playback after a user-driven selection (never on first paint).
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldAutoplay || reducedMotion) return;

    let cancelled = false;

    const attempt = async () => {
      try {
        el.currentTime = 0;
        await el.play();
      } catch {
        // Browser may block autoplay — native controls remain available.
      }
    };

    const onReady = () => {
      if (!cancelled) void attempt();
    };

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void attempt();
    } else {
      el.addEventListener("loadeddata", onReady, { once: true });
    }

    return () => {
      cancelled = true;
      el.removeEventListener("loadeddata", onReady);
    };
  }, [active?.id, reducedMotion, shouldAutoplay]);

  useEffect(() => {
    const root = playlistRef.current;
    if (!root) return;
    const item = root.querySelector<HTMLElement>(`[data-video-index="${activeIndex}"]`);
    item?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const el = videoRef.current;
    return () => {
      if (!el) return;
      el.pause();
      el.removeAttribute("src");
      el.load();
    };
  }, []);

  const onPlaylistKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  };

  if (!active) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:items-start lg:gap-8">
      <div className="min-w-0 space-y-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-[rgb(10_12_16)] shadow-[var(--shadow-elevated)]">
          <div className="relative aspect-video w-full bg-black">
            <video
              key={active.id}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
              poster={active.poster}
              src={active.src}
              controlsList="nodownload"
              aria-label={title}
            >
              {t("videoUnsupported")}
            </video>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("nowPlaying")}
            </p>
            <h2 className="mt-1 truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("videoOf", { current: activeIndex + 1, total: ordered.length })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevious}
              className="brand-interactive-card inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("previousVideo")}
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="brand-interactive-card inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("nextVideo")}
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t("playlistTitle")}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("countLabel", { count: ordered.length })}
          </p>
        </div>

        <div
          ref={playlistRef}
          role="listbox"
          aria-label={t("playlistAriaLabel")}
          aria-activedescendant={active.id}
          tabIndex={0}
          onKeyDown={onPlaylistKeyDown}
          className="flex max-h-[min(28rem,55vh)] flex-row gap-3 overflow-x-auto overflow-y-hidden pb-1 lg:max-h-[min(36rem,70vh)] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0"
        >
          {ordered.map((video, index) => {
            const isActive = index === activeIndex;
            const itemTitle = t("videoTitle", { number: video.number });

            return (
              <button
                key={video.id}
                id={video.id}
                type="button"
                role="option"
                aria-selected={isActive}
                data-video-index={index}
                onClick={() => selectVideo(index, true)}
                className={cn(
                  "group relative flex w-[13.5rem] shrink-0 flex-col overflow-hidden rounded-xl border text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-auto",
                  isActive
                    ? "border-primary bg-accent-soft shadow-[0_0_0_1px_rgb(230_126_34/0.35)]"
                    : "border-border bg-surface hover:border-primary/45 hover:bg-surface-muted",
                )}
              >
                <span className="relative aspect-video w-full overflow-hidden bg-brand-charcoal">
                  <Image
                    src={video.poster}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 216px, 280px"
                    className="object-cover object-center opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Play className="h-4 w-4 translate-x-px" fill="currentColor" aria-hidden="true" />
                    </span>
                  </span>
                  {isActive ? (
                    <span className="absolute start-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                      {t("active")}
                    </span>
                  ) : null}
                </span>
                <span className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <span className="truncate text-sm font-medium text-foreground">{itemTitle}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{video.number}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
