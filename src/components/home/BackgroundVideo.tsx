import { useEffect, useRef } from "react"
import { reportMediaFailure } from "../../lib/report"

type BackgroundVideoProps = {
  src: string
  poster: string
  className?: string
}

export function BackgroundVideo({
  src,
  poster,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motion.matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch((error) => {
            reportMediaFailure(src, error)
          })
          return
        }
        video.pause()
      },
      { threshold: 0.2 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <>
      <img src={poster} alt="" aria-hidden className={className} />
      <video
        ref={videoRef}
        className={`banner-video absolute inset-0 ${className}`}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    </>
  )
}
