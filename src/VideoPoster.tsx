import { useCallback, useRef, useState, type SyntheticEvent } from "react";

export function useFirstVideoFrame() {
  const frameRequested = useRef(false);
  const framePresented = useRef(false);
  const [hasPresentedFrame, setHasPresentedFrame] = useState(false);

  const revealAfterFirstFrame = useCallback((event: SyntheticEvent<HTMLVideoElement>) => {
    if (frameRequested.current || framePresented.current) return;
    frameRequested.current = true;
    const video = event.currentTarget;
    const reveal = () => {
      framePresented.current = true;
      setHasPresentedFrame(true);
    };

    if (typeof video.requestVideoFrameCallback === "function") {
      video.requestVideoFrameCallback(reveal);
    } else {
      window.requestAnimationFrame(reveal);
    }
  }, []);

  return { hasPresentedFrame, revealAfterFirstFrame };
}

export function VideoPoster({ src, hidden }: { src: string; hidden: boolean }) {
  return <img
    className={`video-poster-frame${hidden ? " is-hidden" : ""}`}
    src={src}
    alt=""
    aria-hidden="true"
    draggable="false"
  />;
}
