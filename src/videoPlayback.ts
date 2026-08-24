export function attemptVideoPlayback(
  video: HTMLVideoElement,
  onBlocked: (blocked: boolean) => void,
) {
  const request = video.play();
  if (!request) return;
  void request.then(
    () => onBlocked(false),
    (error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      onBlocked(true);
    },
  );
}
