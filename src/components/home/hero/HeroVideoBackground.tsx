"use client";

import { useEffect, useRef } from "react";
import { HERO_VIDEOS } from "./hero-assets";

const CROSSFADE_MS = 500;
const PREPARE_BEFORE_END_S = 1.25;

function nextIndex(index: number) {
  return (index + 1) % HERO_VIDEOS.length;
}

/**
 * Double-buffered muted video sequence for the homepage hero.
 * Keeps React out of the hot path — playback state lives in refs + DOM.
 */
export function HeroVideoBackground() {
  const slotARef = useRef<HTMLVideoElement>(null);
  const slotBRef = useRef<HTMLVideoElement>(null);
  const activeSlotRef = useRef<0 | 1>(0);
  const clipIndexRef = useRef(0);
  const preparedRef = useRef(false);
  const transitioningRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const slotA = slotARef.current;
    const slotB = slotBRef.current;
    if (!slotA || !slotB) return;
    const slots: [HTMLVideoElement, HTMLVideoElement] = [slotA, slotB];

    const getActive = () => slots[activeSlotRef.current];
    const getIdle = () => slots[activeSlotRef.current === 0 ? 1 : 0];

    const unload = (video: HTMLVideoElement) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.classList.remove("is-visible");
    };

    const assignSource = (video: HTMLVideoElement, index: number, preload: "auto" | "metadata") => {
      const src = HERO_VIDEOS[index];
      if (video.dataset.clipSrc === src) return;
      video.dataset.clipSrc = src;
      video.preload = preload;
      video.src = src;
      video.load();
    };

    const tryPlay = async (video: HTMLVideoElement) => {
      try {
        video.muted = true;
        await video.play();
        return true;
      } catch {
        return false;
      }
    };

    const prepareNext = () => {
      if (cancelled || preparedRef.current || transitioningRef.current) return;
      const idle = getIdle();
      const upcoming = nextIndex(clipIndexRef.current);
      preparedRef.current = true;
      idle.muted = true;
      idle.playsInline = true;
      idle.currentTime = 0;
      assignSource(idle, upcoming, "auto");
    };

    const beginCrossfade = async () => {
      if (cancelled || transitioningRef.current) return;

      const active = getActive();
      const idle = getIdle();
      const upcoming = nextIndex(clipIndexRef.current);

      if (!preparedRef.current || idle.dataset.clipSrc !== HERO_VIDEOS[upcoming]) {
        prepareNext();
      }

      const startSwap = async () => {
        if (cancelled || transitioningRef.current) return;
        transitioningRef.current = true;

        idle.currentTime = 0;
        const played = await tryPlay(idle);
        if (!played || cancelled) {
          transitioningRef.current = false;
          // Keep current frame; retry preparing the next clip shortly.
          preparedRef.current = false;
          retryTimer = setTimeout(() => {
            if (!cancelled) void advanceOnFailure();
          }, 800);
          return;
        }

        idle.classList.add("is-visible");
        active.classList.remove("is-visible");

        fadeTimer = setTimeout(() => {
          if (cancelled) return;
          unload(active);
          activeSlotRef.current = activeSlotRef.current === 0 ? 1 : 0;
          clipIndexRef.current = upcoming;
          preparedRef.current = false;
          transitioningRef.current = false;
        }, CROSSFADE_MS);
      };

      if (idle.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        void startSwap();
        return;
      }

      const onReady = () => {
        idle.removeEventListener("canplay", onReady);
        idle.removeEventListener("loadeddata", onReady);
        void startSwap();
      };
      idle.addEventListener("canplay", onReady);
      idle.addEventListener("loadeddata", onReady);

      // If the next clip never becomes ready, hold the last frame of the active clip.
      retryTimer = setTimeout(() => {
        idle.removeEventListener("canplay", onReady);
        idle.removeEventListener("loadeddata", onReady);
        if (!transitioningRef.current && !cancelled) {
          preparedRef.current = false;
        }
      }, 4000);
    };

    const advanceOnFailure = async () => {
      if (cancelled) return;
      clipIndexRef.current = nextIndex(clipIndexRef.current);
      preparedRef.current = false;
      transitioningRef.current = false;
      const active = getActive();
      assignSource(active, clipIndexRef.current, "auto");
      const ok = await tryPlay(active);
      if (ok) {
        active.classList.add("is-visible");
      } else {
        active.classList.remove("is-visible");
        retryTimer = setTimeout(() => {
          if (!cancelled) void advanceOnFailure();
        }, 1200);
      }
    };

    const onTimeUpdate = (event: Event) => {
      if (cancelled || transitioningRef.current) return;
      const active = getActive();
      if (event.currentTarget !== active) return;
      if (!Number.isFinite(active.duration) || active.duration <= 0) return;
      const remaining = active.duration - active.currentTime;
      if (remaining <= PREPARE_BEFORE_END_S) {
        prepareNext();
      }
      if (remaining <= CROSSFADE_MS / 1000 + 0.05) {
        void beginCrossfade();
      }
    };

    const onEnded = (event: Event) => {
      if (cancelled || transitioningRef.current) return;
      if (event.currentTarget !== getActive()) return;
      void beginCrossfade();
    };

    const onError = (event: Event) => {
      if (cancelled) return;
      const video = event.currentTarget as HTMLVideoElement;
      // Prep-buffer failures should not tear down the active clip.
      if (video !== getActive()) {
        preparedRef.current = false;
        return;
      }
      void advanceOnFailure();
    };

    const bind = (video: HTMLVideoElement) => {
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onEnded);
      video.addEventListener("error", onError);
    };

    const unbind = (video: HTMLVideoElement) => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };

    slots.forEach(bind);

    const start = async () => {
      if (cancelled || startedRef.current) return;
      startedRef.current = true;
      const active = getActive();
      assignSource(active, 0, "auto");
      const played = await tryPlay(active);
      if (cancelled) return;
      if (played) {
        active.classList.add("is-visible");
      } else {
        // Autoplay blocked or failed — leave poster visible; retry once on gesture-free timeout.
        retryTimer = setTimeout(() => {
          if (cancelled) return;
          void tryPlay(active).then((ok) => {
            if (ok) active.classList.add("is-visible");
          });
        }, 600);
      }
    };

    void start();

    return () => {
      cancelled = true;
      if (fadeTimer) clearTimeout(fadeTimer);
      if (retryTimer) clearTimeout(retryTimer);
      slots.forEach((video) => {
        if (!video) return;
        unbind(video);
        unload(video);
        delete video.dataset.clipSrc;
      });
      startedRef.current = false;
      preparedRef.current = false;
      transitioningRef.current = false;
      activeSlotRef.current = 0;
      clipIndexRef.current = 0;
    };
  }, []);

  return (
    <div className="factory-hero__video-stack" aria-hidden="true">
      <video
        ref={slotARef}
        className="factory-hero__video"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
      />
      <video
        ref={slotBRef}
        className="factory-hero__video"
        muted
        playsInline
        preload="none"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
      />
    </div>
  );
}
