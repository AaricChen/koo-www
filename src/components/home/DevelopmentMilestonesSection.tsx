import { useEffect, useRef, useState } from "react"

type PhaseId = "phase-1" | "phase-2" | "phase-3" | "phase-4"

type Phase = {
  id: PhaseId
  label: string
  icon: string
  title: string
  description: string | null
  tags: readonly string[]
  features?: readonly string[]
  tagMaxWidth: string
  gapClass: string
}

const phases: readonly Phase[] = [
  {
    id: "phase-1",
    label: "Phase 1",
    icon: "/assets/milestones/phase1-check.svg",
    title: "Q3 2026",
    description:
      "Core protocol launch & basic trading infrastructure go live.",
    tags: ["Transferable NFT", "Margin Yield", "$KFC"],
    features: [
      "Transferable On-Chain NFT Accounts",
      "On-Chain Settlement Data Recording",
      "Yield-Generating Idle Margin",
      "Contract-Based Offline Withdrawal",
      "Governance Token & Shared Insurance Fund",
    ],
    tagMaxWidth: "w-[510px]",
    gapClass: "gap-8",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    icon: "/assets/milestones/time-lapse.svg",
    title: "Q4 2026",
    description: "Ecosystem expansion for higher capital flexibility.",
    tags: ["Multi-Chain", "Multi-Yeld Sources", "Unified Margin"],
    tagMaxWidth: "w-[431px]",
    gapClass: "gap-8",
  },
  {
    id: "phase-3",
    label: "Phase 3",
    icon: "/assets/milestones/time-lapse.svg",
    title: "Q1 2027",
    description:
      "Deep infrastructure construction & full decentralized iteration.",
    tags: ["Custom Block Chain", "Pro trading tools", "DAO Governance"],
    tagMaxWidth: "w-[381px]",
    gapClass: "gap-8",
  },
  {
    id: "phase-4",
    label: "Long-Term",
    icon: "/assets/milestones/calendar.svg",
    title: "Strategic Goals",
    description: null,
    tags: [
      "Fast Execution",
      "Capital Yield",
      "Full Market",
      "DAO Decentralization",
    ],
    tagMaxWidth: "w-[327px]",
    gapClass: "gap-9",
  },
]

const DESIGN_WIDTH = 1440
const DESIGN_HEIGHT = 1228

function useScaleToWidth(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(() =>
    typeof window === "undefined"
      ? 1
      : Math.min(1, window.innerWidth / designWidth),
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const update = () => {
      setScale(Math.min(1, node.clientWidth / designWidth))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}

function MilestoneTag({
  label,
  active,
}: {
  label: string
  active: boolean
}) {
  return (
    <span
      className={`milestone-ease inline-flex h-[34px] shrink-0 items-center rounded-[18px] border px-3.5 text-sm leading-[14px] text-foreground transition-[background-color,border-color,box-shadow] duration-500 ${
        active
          ? "border-[#1aaf7d] bg-[rgba(26,175,125,0.6)] shadow-[0_0_16px_rgba(26,175,125,0.25)]"
          : "border-foreground bg-transparent"
      }`}
    >
      {label}
    </span>
  )
}

function MilestonePath({
  onSrc,
  offSrc,
  active,
  frameClass,
  innerClass,
  transformClass,
}: {
  onSrc: string
  offSrc: string
  active: boolean
  frameClass: string
  innerClass: string
  transformClass?: string
}) {
  const images = (
    <div className={innerClass}>
      <img
        src={offSrc}
        alt=""
        aria-hidden
        className={`milestone-ease absolute inset-0 size-full max-w-none duration-500 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={onSrc}
        alt=""
        aria-hidden
        className={`milestone-ease absolute inset-0 size-full max-w-none duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )

  return (
    <div className={`pointer-events-none absolute ${frameClass}`}>
      {transformClass ? (
        <div className={transformClass}>
          <div className="relative size-full">{images}</div>
        </div>
      ) : (
        images
      )}
    </div>
  )
}

function MilestonePhase({
  phase,
  selected,
  onSelect,
}: {
  phase: Phase
  selected: boolean
  onSelect: (id: PhaseId) => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(phase.id)}
      className="relative flex flex-col items-start justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aaf7d]/ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        className={`milestone-ease pointer-events-none absolute left-[-32px] top-[-10px] h-[366px] w-[392px] duration-500 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-[-27.32%_-25.51%]">
          <img
            src="/assets/milestones/ellipse-glow.svg"
            alt=""
            aria-hidden
            className="size-full max-w-none"
          />
        </div>
      </div>

      <div
        className={`milestone-ease relative z-10 flex flex-col duration-500 ${
          selected ? "opacity-100" : "opacity-40 hover:opacity-70"
        } ${phase.gapClass}`}
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <img
              src={phase.icon}
              alt=""
              aria-hidden
              className="size-8"
              width={32}
              height={32}
            />
            <p
              className={`milestone-ease text-2xl leading-6 duration-500 ${
                selected ? "text-[#1aaf7d]" : "text-foreground"
              }`}
            >
              {phase.label}
            </p>
          </div>
          <h3 className="font-display text-[36px] font-semibold leading-9 text-foreground">
            {phase.title}
          </h3>
        </div>

        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-6">
            {phase.description ? (
              <p
                className={`text-base leading-6 text-muted-foreground ${
                  phase.id === "phase-2" ? "w-[323px]" : "w-[311px]"
                }`}
              >
                {phase.description}
              </p>
            ) : null}

            <div
              className={`flex flex-wrap content-start gap-4 ${phase.tagMaxWidth}`}
            >
              {phase.tags.map((tag) => (
                <MilestoneTag key={tag} label={tag} active={selected} />
              ))}
            </div>
          </div>

          {phase.features ? (
            <div
              className="milestone-features"
              data-open={selected ? "true" : "false"}
            >
              <div className="milestone-features-inner">
                <div className="flex flex-col gap-4">
                  <p className="font-display text-xl font-semibold leading-6 text-foreground">
                    Core Features
                  </p>
                  <ol className="list-decimal pl-6 text-base leading-7 text-muted-foreground">
                    {phase.features.map((item) => (
                      <li
                        key={item}
                        className={
                          selected ? "milestone-feature-item" : undefined
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </button>
  )
}

function MilestonesHeader() {
  return (
    <header className="flex w-full flex-col items-center justify-center gap-8 px-4 text-center">
      <h2 className="font-display text-[28px] font-bold leading-9 text-foreground sm:text-[40px] sm:leading-10">
        Koo Development Milestones
      </h2>
      <p className="max-w-[952px] text-base leading-6 text-muted-foreground">
        Koo rolls out upgrades in progressive phases to boost market reach,
        capital efficiency and decentralization.
      </p>
    </header>
  )
}

function DesktopComposition({
  selectedId,
  onSelect,
}: {
  selectedId: PhaseId
  onSelect: (id: PhaseId) => void
}) {
  const { ref, scale } = useScaleToWidth(DESIGN_WIDTH)

  return (
    <div ref={ref} className="w-full" style={{ height: DESIGN_HEIGHT * scale }}>
      <div
        className="relative origin-top-left"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
        }}
        role="group"
        aria-label="Development milestone phases"
      >
        <div className="absolute left-20 top-[100px] w-[1280px]">
          <MilestonesHeader />
        </div>

        <MilestonePath
          onSrc="/assets/milestones/path-group9-on.svg"
          offSrc="/assets/milestones/path-group9-off.svg"
          active={selectedId === "phase-1"}
          frameClass="left-[329.1px] top-[201px] h-[460.499px] w-[387.727px]"
          innerClass="absolute inset-[0_-16.43%_0_-20.3%]"
        />
        <MilestonePath
          onSrc="/assets/milestones/path-group124-on.svg"
          offSrc="/assets/milestones/path-group124-off.svg"
          active={selectedId === "phase-3"}
          frameClass="left-[730px] top-[385px] flex h-[194.5px] w-[222.526px] items-center justify-center"
          innerClass="absolute inset-[-16.8%_-10.79%_-12.34%_-14.68%]"
          transformClass="-scale-y-100 h-full w-full rotate-180"
        />
        <MilestonePath
          onSrc="/assets/milestones/path-group123-on.svg"
          offSrc="/assets/milestones/path-group123-off.svg"
          active={selectedId === "phase-4"}
          frameClass="left-[747px] top-[632px] flex h-[164.5px] w-[206px] items-center justify-center"
          innerClass="absolute inset-[-19.86%_-11.65%_-14.59%_-15.86%]"
          transformClass="h-full w-full rotate-180"
        />
        <MilestonePath
          onSrc="/assets/milestones/path-group14-on.svg"
          offSrc="/assets/milestones/path-group14-off.svg"
          active={selectedId === "phase-2"}
          frameClass="left-[371px] top-[578.46px] flex h-[385.081px] w-[348.922px] items-center justify-center"
          innerClass="absolute inset-[0_-1.68%_0_-9.27%]"
          transformClass="-scale-y-100 h-full w-full"
        />

        <div className="pointer-events-none absolute left-[461px] top-[512px] h-[285px] w-[518px]">
          <div className="absolute inset-[-35.09%_-19.31%]">
            <img
              src="/assets/milestones/center-glow.png"
              alt=""
              aria-hidden
              className="size-full max-w-none"
              width={718}
              height={485}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-[558px] top-[472px] h-[280px] w-[325px] overflow-hidden">
          <img
            src="/assets/milestones/center-logo.png"
            alt=""
            aria-hidden
            className="absolute left-[-12.05%] top-[-31.29%] h-[155.94%] w-[124.1%] max-w-none"
          />
        </div>

        <div className="absolute left-20 top-[296px] w-[510px]">
          <MilestonePhase
            phase={phases[0]}
            selected={selectedId === "phase-1"}
            onSelect={onSelect}
          />
        </div>
        <div className="absolute left-20 top-[867px] w-[431px]">
          <MilestonePhase
            phase={phases[1]}
            selected={selectedId === "phase-2"}
            onSelect={onSelect}
          />
        </div>
        <div className="absolute left-[976px] top-[369px] w-[381px]">
          <MilestonePhase
            phase={phases[2]}
            selected={selectedId === "phase-3"}
            onSelect={onSelect}
          />
        </div>
        <div className="absolute left-[976px] top-[781px] w-[327px]">
          <MilestonePhase
            phase={phases[3]}
            selected={selectedId === "phase-4"}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  )
}

export function DevelopmentMilestonesSection() {
  const [selectedId, setSelectedId] = useState<PhaseId>("phase-1")

  return (
    <section className="overflow-x-clip bg-background">
      <div className="mx-auto hidden w-full max-w-[1440px] lg:block">
        <DesktopComposition
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      <div className="flex flex-col items-center gap-16 px-6 pb-20 pt-14 sm:gap-[100px] sm:px-10 sm:pb-[120px] sm:pt-[100px] lg:hidden">
        <MilestonesHeader />
        <div
          className="flex w-full max-w-[560px] flex-col gap-10"
          role="group"
          aria-label="Development milestone phases"
        >
          <div className="relative mx-auto h-[220px] w-full max-w-[320px]">
            <img
              src="/assets/milestones/center-glow.png"
              alt=""
              aria-hidden
              className="absolute inset-x-0 top-8 mx-auto h-[160px] w-auto opacity-80"
            />
            <img
              src="/assets/milestones/center-logo.png"
              alt="Koo"
              className="relative mx-auto h-[200px] w-auto object-contain"
            />
          </div>
          {phases.map((phase) => (
            <MilestonePhase
              key={phase.id}
              phase={phase}
              selected={selectedId === phase.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
