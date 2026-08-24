import { describe, expect, it, vi } from "vitest";
import { attemptVideoPlayback } from "./videoPlayback";

describe("attemptVideoPlayback", () => {
  it("clears the blocked state after a successful play request", async () => {
    const onBlocked = vi.fn();
    const video = { play: vi.fn().mockResolvedValue(undefined) } as unknown as HTMLVideoElement;

    attemptVideoPlayback(video, onBlocked);
    await Promise.resolve();

    expect(onBlocked).toHaveBeenCalledWith(false);
  });

  it("reports a real autoplay rejection", async () => {
    const onBlocked = vi.fn();
    const video = {
      play: vi.fn().mockRejectedValue(new DOMException("blocked", "NotAllowedError")),
    } as unknown as HTMLVideoElement;

    attemptVideoPlayback(video, onBlocked);
    await Promise.resolve();

    expect(onBlocked).toHaveBeenCalledWith(true);
  });

  it("ignores AbortError caused by a normal pause race", async () => {
    const onBlocked = vi.fn();
    const video = {
      play: vi.fn().mockRejectedValue(new DOMException("paused", "AbortError")),
    } as unknown as HTMLVideoElement;

    attemptVideoPlayback(video, onBlocked);
    await Promise.resolve();

    expect(onBlocked).not.toHaveBeenCalledWith(true);
  });
});
