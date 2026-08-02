export const doorShowcaseStyles = {
  root:
    "relative isolate flex min-h-[92svh] w-full flex-col items-center overflow-x-hidden border-b border-border py-10 md:py-14",
  background: "pointer-events-none absolute inset-0 z-0",
  backgroundImage: "object-cover object-center transition-opacity duration-700 ease-in-out",
  overlay:
    "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/20 via-transparent to-background/35",
  content:
    "relative z-[2] flex w-full max-w-6xl flex-col items-center justify-start px-4 pt-6 md:pt-10",
  stage:
    "relative z-10 flex w-full max-w-4xl shrink-0 items-center justify-center gap-3 sm:gap-6 md:gap-10",
  doorArea:
    "relative flex w-[min(240px,70vw)] flex-col items-center sm:w-[min(280px,34vw)] md:w-[min(320px,26vw)] lg:w-[min(340px,24vw)]",
  doorSlot:
    "relative z-[2] flex h-[min(44vh,440px)] w-full items-end justify-center sm:h-[min(48vh,480px)] md:h-[min(50vh,520px)]",
  info: "relative z-20 mt-4 flex w-full max-w-sm shrink-0 flex-col items-center gap-2 pb-4 text-center md:mt-5",
  code: "text-xl font-semibold tracking-[0.16em] text-foreground sm:text-2xl",
  name: "text-xs text-muted-foreground sm:text-sm",
} as const;

export const navigationStyles = {
  button:
    "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong bg-[rgb(255_255_255/0.08)] text-foreground shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-accent hover:bg-accent-soft hover:text-accent disabled:opacity-40 sm:h-14 sm:w-14 dark:bg-[rgb(255_255_255/0.06)]",
  icon: "h-5 w-5 sm:h-6 sm:w-6",
} as const;

export const platformStyles = {
  root: "relative z-[1] -mt-4 w-[90%] shrink-0 sm:-mt-5",
  shadow:
    "pointer-events-none absolute bottom-0 left-1/2 z-0 h-[clamp(0.85rem,2.2vw,1.35rem)] w-[62%] -translate-x-1/2 translate-y-[45%] rounded-[100%] bg-[rgb(0_0_0/0.26)] blur-[12px] dark:bg-[rgb(0_0_0/0.48)]",
  imageWrap:
    "relative z-[1] flex h-[clamp(4rem,11vw,6.25rem)] w-full items-end justify-center overflow-visible",
  image:
    "h-auto w-[175%] max-w-none origin-bottom object-contain object-bottom drop-shadow-[0_18px_36px_rgb(0_0_0/0.28)] dark:drop-shadow-[0_20px_40px_rgb(0_0_0/0.45)]",
} as const;

export const textureCardStyles = {
  root:
    "group relative h-[132px] w-[132px] overflow-hidden rounded-xl border border-border-strong bg-card shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1 sm:h-[148px] sm:w-[148px]",
  image: "object-cover",
} as const;

export const doorCardStyles = {
  root: "absolute inset-x-0 bottom-0 flex justify-center will-change-transform",
  image:
    "h-auto max-h-full w-full object-contain object-bottom drop-shadow-[0_20px_36px_rgb(0_0_0/0.22)] dark:drop-shadow-[0_22px_40px_rgb(0_0_0/0.38)]",
} as const;
