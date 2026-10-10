import { useEffect, useRef } from "react"
import { reportMediaFailure } from "../../lib/report"
import { useMatchMedia } from "../../lib/use-match-media"
import { LG_MIN_WIDTH_QUERY } from "../../lib/viewport"

type BackgroundVideoProps = {
  src: string
  poster?: string
  className?: string
  playOnCompact?: boolean
  /** Hero-style: start once and avoid pause/play toggles while scrolling. */
  persistent?: boolean
}

export function BackgroundVideo({
  src,
  poster,
  className = "",
  playOnCompact = false,
  persistent = false,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isLg = useMatchMedia(LG_MIN_WIDTH_QUERY, false)
  const mountVideo = isLg || playOnCompact

  useEffect(() => {
    const video = videoRef.current
    if (!video || !mountVideo) return

    video.muted = true
    video.defaultMuted = true

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motion.matches) return

    const play = () => {
      void video.play().catch((error) => {
        reportMediaFailure(src, error)
      })
    }

    if (persistent) {
      play()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
          return
        }
        video.pause()
      },
      { threshold: 0 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [src, mountVideo, persistent])

  return (
    <video
      ref={videoRef}
      className={`banner-video absolute inset-0 ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={persistent ? "auto" : "metadata"}
      aria-hidden
    />
  )
}
