import { useEffect, useRef, useState } from "react";

export type AutoPlayVideoProps = {
  base: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
  loop?: boolean;
  caption?: { title: string; note: string };
  autoplayDelayMs?: number;
};

export function AutoPlayVideo({
  base,
  playLabel,
  pauseLabel,
  className = "",
  loop = true,
  caption,
  autoplayDelayMs = 300,
}: AutoPlayVideoProps) {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const userActivated = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [playRequest, setPlayRequest] = useState(0);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !saveData) setShouldLoad(true);
    }, { rootMargin: "600px 0px", threshold: 0.01 });
    const playbackObserver = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
    }, { threshold: [0, 0.35, 0.75] });
    loadObserver.observe(figure);
    playbackObserver.observe(figure);
    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [saveData]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const pauseForAnotherFilm = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== base) videoRef.current?.pause();
    };
    window.addEventListener("tela:film-play", pauseForAnotherFilm);
    return () => window.removeEventListener("tela:film-play", pauseForAnotherFilm);
  }, [base]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldLoad || !inView || !pageVisible || manuallyPaused.current || (reduceMotion && !userActivated.current)) {
      video.pause();
      return;
    }

    const play = () => void video.play().catch(() => undefined);
    if (userActivated.current) {
      play();
      return;
    }

    const autoplayTimer = window.setTimeout(play, autoplayDelayMs);
    return () => window.clearTimeout(autoplayTimer);
  }, [autoplayDelayMs, inView, pageVisible, playRequest, reduceMotion, shouldLoad]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      manuallyPaused.current = true;
      userActivated.current = false;
      setIsManuallyPaused(true);
      video.pause();
      return;
    }
    manuallyPaused.current = false;
    userActivated.current = true;
    setIsManuallyPaused(false);
    setShouldLoad(true);
    setPlayRequest((request) => request + 1);
  };

  return <figure ref={figureRef} className={`cinematic-video ${className}`.trim()}>
    <button
      className="cinematic-video-frame"
      type="button"
      onClick={togglePlayback}
      aria-label={isPlaying ? pauseLabel : playLabel}
      aria-pressed={isPlaying}
    >
      <video
        ref={videoRef}
        width={720}
        height={1280}
        muted
        loop={loop}
        playsInline
        preload="none"
        poster={`/media/sections/${base}-poster.webp`}
        aria-hidden="true"
        onPlay={() => {
          setIsPlaying(true);
          window.dispatchEvent(new CustomEvent("tela:film-play", { detail: base }));
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        {shouldLoad && <>
          <source src={`/media/sections/${base}.webm`} type="video/webm" />
          <source src={`/media/sections/${base}.mp4`} type="video/mp4" />
        </>}
      </video>
      {isManuallyPaused && <span className="media-play-affordance" aria-hidden="true"><span className="media-icon media-icon-play" /></span>}
    </button>
    {caption && <figcaption><span>{caption.title}</span><small>{caption.note}</small></figcaption>}
  </figure>;
}
