import { useEffect, useRef, useState } from "react"

const features = [
  {
    title: "Transferable Account Ownership",
    titleClass: "max-w-[229px]",
    description:
      "Own and freely transfer your trading account as an on-chain NFT.",
    tags: [
      "Transferable Ownership",
      "On-chain Identity",
      "Asset Tokenization",
    ],
    image: "/assets/experience/ownership.png",
    video: "/assets/experience/ownership.mp4",
    imageAlt: "NFT transferable account illustration",
    blendLighten: false,
  },
  {
    title: "Yield-Generating Margin Capital",
    titleClass: "max-w-[300px]",
    description:
      "Idle collateral generates passive income while ready for trading.",
    tags: ["Idle Yield", "Capital Appreciation", "Margin Earnings"],
    image: "/assets/experience/yield.png",
    video: "/assets/experience/yield.mp4",
    imageAlt: "Yield-generating margin capital illustration",
    blendLighten: false,
  },
  {
    title: "Event Futures",
    titleClass: "max-w-[300px]",
    description:
      "Trade every event on-chain. Sport matches, CEX market share, political and economic events etc..",
    tags: ["Trade Everything"],
    image: "/assets/experience/futures.png",
    video: "/assets/experience/futures.mp4",
    imageAlt: "Event futures trading illustration",
    blendLighten: true,
  },
  {
    title: "Profit Sharing for KFC Holders",
    titleClass: "max-w-[263px]",
    description:
      "Get proportional platform revenue dividends via KFC token holdings.",
    tags: [
      "Pro-rata Dividends",
      "Holder Rewards",
      "DAO Governance",
      "Revenue Sharing",
    ],
    image: "/assets/experience/profit.png",
    video: "/assets/experience/profit.mp4",
    imageAlt: "KFC profit sharing illustration",
    blendLighten: false,
  },
] as const

function FeatureTag({ label }: { label: string }) {
  return (
    <span className="experience-tag inline-flex h-[34px] shrink-0 items-center rounded-[18px] border border-[#3d7aff] bg-[rgba(61,122,255,0.06)] px-3.5 text-sm leading-[14px] text-secondary">
      {label}
    </span>
  )
}

function FeatureCopy({
  description,
  tags,
}: {
  description: string
  tags: readonly string[]
}) {
  return (
    <>
      <p className="text-base leading-6 text-muted-foreground">{description}</p>
      <div className="flex flex-wrap content-start gap-4 p-px">
        {tags.map((tag) => (
          <FeatureTag key={tag} label={tag} />
        ))}
      </div>
    </>
  )
}

const MID_ZONE_TOP = 0.4
const MID_ZONE_BOTTOM = 0.6

export function ExclusiveExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const itemRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    let frame = 0
    let lastScrollY = window.scrollY

    const updateActiveFromViewport = () => {
      frame = 0
      const scrollY = window.scrollY
      const goingDown = scrollY >= lastScrollY
      lastScrollY = scrollY

      const zoneTop = window.innerHeight * MID_ZONE_TOP
      const zoneBottom = window.innerHeight * MID_ZONE_BOTTOM
      const nodes = itemRefs.current
      const prev = activeIndexRef.current
      let next = prev

      if (goingDown) {
        next = 0
        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i]
          if (!el) continue
          if (el.getBoundingClientRect().top <= zoneBottom) next = i
        }
      } else {
        next = Math.max(nodes.length - 1, 0)
        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i]
          if (!el) continue
          if (el.getBoundingClientRect().bottom >= zoneTop) {
            next = i
            break
          }
        }
      }

      if (next === prev) return
      activeIndexRef.current = next
      setActiveIndex(next)
    }

    const onScrollOrResize = () => {
      if (frame) return
      frame = requestAnimationFrame(updateActiveFromViewport)
    }

    updateActiveFromViewport()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)
    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const resetTimers: number[] = []

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === activeIndex) {
        void video.play().catch(() => {})
        return
      }
      video.pause()
      resetTimers.push(
        window.setTimeout(() => {
          try {
            video.currentTime = 0
          } catch {
            /* ignore seek errors before metadata */
          }
        }, 320),
      )
    })

    return () => {
      resetTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [activeIndex])

  return (
    <section className="bg-section-alt flex flex-col items-center gap-[72px] px-6 pb-20 pt-14 sm:gap-[100px] sm:px-10 sm:pb-[120px] sm:pt-[100px] lg:gap-[120px] lg:px-20">
      <div className="w-full max-w-[1280px] px-0 text-center sm:px-10">
        <h2 className="font-display text-[28px] font-bold leading-9 text-foreground sm:text-[40px] sm:leading-10">
          The Koo Exclusive Experience
        </h2>
      </div>

      <div className="flex w-full max-w-[1280px] flex-col gap-10 sm:gap-16 lg:gap-[140px]">
        {features.map((feature, index) => {
          const isActive = index === activeIndex

          return (
            <article
              key={feature.title}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className={`experience-item${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <div className="experience-left">
                <div className="experience-title">
                  <h3
                    className={`font-display text-[26px] font-semibold leading-9 text-foreground sm:text-[32px] sm:leading-10 ${feature.titleClass}`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <div className="experience-under" aria-hidden="true">
                  <div className="experience-under-inner">
                    <FeatureCopy
                      description={feature.description}
                      tags={feature.tags}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`experience-media ${
                  feature.blendLighten ? "mix-blend-lighten" : ""
                }`}
              >
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node
                  }}
                  className="experience-media-video"
                  src={feature.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <img
                  className="experience-media-image"
                  src={feature.image}
                  alt={feature.imageAlt}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_16px_rgba(0,0,0,0.4)]"
                />
              </div>

              <div className="experience-side">
                <div className="experience-side-inner">
                  <FeatureCopy
                    description={feature.description}
                    tags={feature.tags}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
