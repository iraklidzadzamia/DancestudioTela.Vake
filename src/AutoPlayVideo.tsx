import { useEffect, useRef, useState } from "react";
import { useFirstVideoFrame, VideoPoster } from "./VideoPoster";
import { attemptVideoPlayback } from "./videoPlayback";

export type AutoPlayVideoProps = {
  base: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
  loop?: boolean;
  caption?: { title: string; note: string };
};

export function AutoPlayVideo({
  base,
  playLabel,
  pauseLabel,
  className = "",
  loop = true,
  caption,
}: AutoPlayVideoProps) {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const { hasPresentedFrame, revealAfterFirstFrame } = useFirstVideoFrame();
  const posterSrc = `/media/sections/${base}-poster.webp`;

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShouldLoad(true);
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
  }, []);

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
    if (!shouldLoad || !inView || !pageVisible || manuallyPaused.current) {
      video.pause();
      return;
    }
    attemptVideoPlayback(video, setAutoplayBlocked);
  }, [inView, pageVisible, shouldLoad]);

  useEffect(() => {
    const retry = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".cinematic-video-frame")) return;
      const video = videoRef.current;
      if (video && shouldLoad && inView && pageVisible && !manuallyPaused.current) {
        attemptVideoPlayback(video, setAutoplayBlocked);
      }
    };
    window.addEventListener("pointerdown", retry, { capture: true, passive: true });
    window.addEventListener("touchstart", retry, { capture: true, passive: true });
    window.addEventListener("online", retry);
    window.addEventListener("pageshow", retry);
    return () => {
      window.removeEventListener("pointerdown", retry, true);
      window.removeEventListener("touchstart", retry, true);
      window.removeEventListener("online", retry);
      window.removeEventListener("pageshow", retry);
    };
  }, [inView, pageVisible, shouldLoad]);

  const retryPlayback = () => {
    const video = videoRef.current;
    if (video && shouldLoad && inView && pageVisible && !manuallyPaused.current) {
      attemptVideoPlayback(video, setAutoplayBlocked);
    }
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      manuallyPaused.current = true;
      setIsManuallyPaused(true);
      video.pause();
      return;
    }
    manuallyPaused.current = false;
    setIsManuallyPaused(false);
    setAutoplayBlocked(false);
    setShouldLoad(true);
    attemptVideoPlayback(video, setAutoplayBlocked);
  };

  return <figure ref={figureRef} className={`cinematic-video ${className}`.trim()}>
    {caption && <figcaption><span>{caption.title}</span><small>{caption.note}</small></figcaption>}
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
        autoPlay={shouldLoad && inView && !isManuallyPaused}
        preload="none"
        poster={posterSrc}
        aria-hidden="true"
        onPlay={() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
          window.dispatchEvent(new CustomEvent("tela:film-play", { detail: base }));
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onPlaying={revealAfterFirstFrame}
        onLoadedData={retryPlayback}
        onCanPlay={retryPlayback}
      >
        {shouldLoad && <>
          <source src={`/media/sections/${base}.webm`} type="video/webm" />
          <source src={`/media/sections/${base}.mp4`} type="video/mp4" />
        </>}
      </video>
      <VideoPoster src={posterSrc} hidden={hasPresentedFrame} />
      {(isManuallyPaused || autoplayBlocked) && <span className="media-play-affordance" aria-hidden="true"><span className="media-icon media-icon-play" /></span>}
    </button>
  </figure>;
}
