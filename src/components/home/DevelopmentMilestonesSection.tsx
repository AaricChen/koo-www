import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react"
import {
  MILESTONE_CENTER_GLOW,
  MILESTONE_DESIGN_HEIGHT,
  MILESTONE_DESIGN_WIDTH,
  MILESTONE_LINES,
  MILESTONE_PHASE_FRAMES,
  asPhaseId,
  milestonePhaseFromPoint,
  milestoneWrapperHeight,
} from "../../lib/milestone-layout"
import {
  phases,
  type Phase,
  type PhaseAccent,
  type PhaseId,
} from "../../lib/milestone-phases"
import { useMatchMedia } from "../../lib/use-match-media"
import { LG_MIN_WIDTH_QUERY } from "../../lib/viewport"

function useScaleToWidth(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
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

  return { ref, canvasRef, scale }
}

function MilestoneTag({
  label,
  active,
  accent,
}: {
  label: string
  active: boolean
  accent: PhaseAccent
}) {
  return (
    <span
      data-accent={accent}
      data-active={active ? "true" : "false"}
      className="milestone-d-tag"
    >
      {label}
    </span>
  )
}

const accentText: Record<PhaseAccent, string> = {
  green: "text-[#1aaf7d]",
  blue: "text-[#3d9bf3]",
  cyan: "text-[#38bdf8]",
  orange: "text-[#f28d21]",
}

function MilestoneLines({ activeId }: { activeId: PhaseId }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0"
      viewBox={`0 0 ${MILESTONE_DESIGN_WIDTH} ${MILESTONE_DESIGN_HEIGHT}`}
      width={MILESTONE_DESIGN_WIDTH}
      height={MILESTONE_DESIGN_HEIGHT}
      fill="none"
      aria-hidden
    >
      {phases.map((phase) => {
        const line = MILESTONE_LINES[phase.id]
        const active = activeId === phase.id
        return (
          <g
            key={phase.id}
            data-phase={phase.id}
            data-line-state={active ? "on" : "off"}
            className={`milestone-line ${accentText[phase.accent]} ${
              active ? "is-active" : ""
            }`}
          >
            <path className="milestone-line-off" d={line.d} />
            <path className="milestone-line-on" d={line.d} pathLength="1" />
            <circle
              className="milestone-line-end-glow"
              cx={line.hub.x}
              cy={line.hub.y}
              r="18"
            />
            <circle
              className="milestone-line-end-glow"
              cx={line.dot.x}
              cy={line.dot.y}
              r="18"
            />
            <circle
              className="milestone-line-dot"
              cx={line.dot.x}
              cy={line.dot.y}
              r="4"
            />
          </g>
        )
      })}
    </svg>
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
  const details = phase.features ?? phase.upgrades
  const showGoals = Boolean(phase.goals && selected)
  const showTags = !showGoals
  const showDetails = Boolean(details && selected)

  return (
    <button
      type="button"
      data-phase-id={phase.id}
      aria-pressed={selected}
      onClick={() => onSelect(phase.id)}
      onFocus={() => onSelect(phase.id)}
      onMouseEnter={() => onSelect(phase.id)}
      className="relative flex cursor-pointer flex-col items-start justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aaf7d] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        className={`milestone-ease pointer-events-none absolute left-[-32px] top-[-10px] h-[366px] w-[392px] duration-500 ${
          selected ? "opacity-100" : "opacity-0"
        } ${accentText[phase.accent]}`}
      >
        <div className="absolute inset-[-27.32%_-25.51%]">
          <span
            aria-hidden
            className="milestone-path-on size-full"
            style={
              {
                "--milestone-mask": 'url("/assets/milestones/ellipse-glow.svg")',
              } as CSSProperties
            }
          />
        </div>
      </div>

      <div
        className={`milestone-ease relative z-10 flex flex-col duration-500 ${
          selected ? "opacity-100" : "opacity-40"
        } ${phase.gapClass}`}
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`milestone-ease ${
                selected ? accentText[phase.accent] : "text-foreground"
              }`}
            >
              <TintedIcon src={phase.icon} className="size-8" />
            </span>
            <p
              className={`milestone-ease text-2xl leading-6 duration-500 ${
                selected ? accentText[phase.accent] : "text-foreground"
              }`}
            >
              {phase.label}
            </p>
          </div>
          <h3 className="font-display text-[36px] font-semibold leading-9 text-foreground">
            {phase.title}
          </h3>
        </div>

        <div className={`flex w-full flex-col ${phase.gapClass}`}>
          {showGoals ? (
            <div className="flex flex-col gap-4">
              {phase.goals?.map((goal) => (
                <div key={goal.title} className="flex flex-col gap-1.5">
                  <p className="font-display text-base font-semibold leading-6 text-foreground">
                    {goal.title}
                  </p>
                  <p className="text-sm leading-5 text-muted-foreground">
                    {goal.body}
                  </p>
                </div>
              ))}
            </div>
          ) : (
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

              {showTags ? (
                <div
                  className={`flex flex-wrap content-start gap-4 ${phase.tagMaxWidth}`}
                >
                  {phase.tags.map((tag) => (
                    <MilestoneTag
                      key={tag}
                      label={tag}
                      active={selected}
                      accent={phase.accent}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {showDetails ? (
            <div className="flex flex-col gap-4">
              <p className="font-display text-xl font-semibold leading-6 text-foreground">
                {phase.detailsTitle}
              </p>
              <ol className="list-decimal pl-6 text-base leading-7 text-muted-foreground">
                {details?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </div>
    </button>
  )
}

function MilestonesHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header
      className={`flex w-full flex-col items-center justify-center px-4 text-center ${
        compact ? "gap-5" : "gap-8"
      }`}
    >
      <h2
        className={`font-display font-bold text-foreground ${
          compact
            ? "text-2xl leading-8"
            : "text-[28px] leading-9 sm:text-[40px] sm:leading-10"
        }`}
      >
        Koo Development Milestones
      </h2>
      <p
        className={
          compact
            ? "text-xs leading-4 text-muted-foreground"
            : "max-w-[952px] text-base leading-6 text-muted-foreground"
        }
      >
        Koo rolls out upgrades in progressive phases to boost market reach,
        capital efficiency and decentralization.
      </p>
    </header>
  )
}

function TintedIcon({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${className ?? "size-4"}`}
      style={{
        backgroundColor: "currentColor",
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`milestone-ease size-5 shrink-0 text-foreground duration-500 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobilePhaseCard({
  phase,
  selected,
  onSelect,
}: {
  phase: Phase
  selected: boolean
  onSelect: (id: PhaseId) => void
}) {
  const details = phase.features ?? phase.upgrades

  return (
    <button
      type="button"
      aria-expanded={selected}
      onClick={() => onSelect(phase.id)}
      data-accent={phase.accent}
      className={`milestone-m-card w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${selected ? "is-open" : ""}`}
    >
      <div className="milestone-m-glow" aria-hidden>
        <div className="milestone-m-glow-blob" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={`milestone-ease ${
                  selected ? accentText[phase.accent] : "text-foreground/80"
                }`}
              >
                <TintedIcon src={phase.icon} />
              </span>
              <p
                className={`milestone-ease text-sm leading-[14px] ${
                  selected ? accentText[phase.accent] : "text-foreground/80"
                }`}
              >
                {phase.label}
              </p>
            </div>
            <h3
              className={`font-display text-xl font-semibold leading-5 ${
                selected ? "text-foreground" : "text-foreground/80"
              }`}
            >
              {phase.title}
            </h3>
          </div>
          <ChevronIcon open={selected} />
        </div>

        {phase.goals ? (
          selected ? (
            <div className="flex flex-col gap-4">
              {phase.goals.map((goal) => (
                <div key={goal.title} className="flex flex-col gap-1.5">
                  <p className="font-display text-sm font-semibold leading-[14px] text-foreground">
                    {goal.title}
                  </p>
                  <p className="text-xs leading-4 text-muted-foreground">
                    {goal.body}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full shrink-0 flex-wrap content-start gap-3">
              {phase.tags.map((tag) => (
                <span key={tag} className="milestone-m-tag">
                  {tag}
                </span>
              ))}
            </div>
          )
        ) : (
          <div>
            <div className="flex flex-col gap-3">
              {phase.description ? (
                <p
                  className={`text-xs leading-4 ${
                    selected ? "text-muted-foreground" : "text-faint"
                  }`}
                >
                  {phase.description}
                </p>
              ) : null}
              <div className="flex w-full shrink-0 flex-wrap content-start gap-3">
                {phase.tags.map((tag) => (
                  <span key={tag} className="milestone-m-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {details ? (
              <div
                className="milestone-features milestone-m-extra"
                data-open={selected ? "true" : "false"}
              >
                <div className="milestone-features-inner">
                  <div className="flex flex-col gap-3">
                    <p className="font-display text-sm font-semibold leading-[14px] text-foreground">
                      {phase.detailsTitle}
                    </p>
                    <ol className="list-decimal pl-[18px] text-xs leading-4 text-muted-foreground">
                      {details.map((item) => (
                        <li
                          key={item}
                          className={`mb-1 last:mb-0 ${
                            selected ? "milestone-feature-item" : ""
                          }`}
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
        )}
      </div>
    </button>
  )
}

function MobileComposition({
  selectedId,
  onSelect,
}: {
  selectedId: PhaseId
  onSelect: (id: PhaseId) => void
}) {
  return (
    <div className="relative flex flex-col items-center px-4 pb-6 pt-10 lg:hidden">
      <MilestonesHeader compact />
      <div
        className="pointer-events-none relative mx-auto mt-[34px] mb-2 aspect-[310/177] w-[82.67vw] max-w-full shrink-0 overflow-visible"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-[10%] h-[90%] w-full">
          <div className="absolute inset-[-62.68%_-32.26%]">
            <img
              src="/assets/milestones/center-glow-mobile.svg"
              alt=""
              className="block size-full max-w-none"
            />
          </div>
        </div>
        <div className="absolute left-1/2 top-0 aspect-[194.5/167.57] h-[94.5%] -translate-x-1/2 overflow-hidden">
          <img
            src="/assets/milestones/center-logo.png"
            alt=""
            className="absolute left-[-12.05%] top-[-31.29%] h-[155.94%] w-[124.1%] max-w-none"
            width={1480}
            height={1600}
          />
        </div>
      </div>
      <div
        className="relative z-10 flex w-full flex-col gap-4"
        role="group"
        aria-label="Development milestone phases"
      >
        {phases.map((phase) => (
          <MobilePhaseCard
            key={phase.id}
            phase={phase}
            selected={selectedId === phase.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

function MilestoneCenterGlow({ phaseId }: { phaseId: PhaseId }) {
  return (
    <div
      className="pointer-events-none absolute left-[461px] top-[512px] z-[1] h-[285px] w-[518px]"
      data-floor-glow={phaseId}
    >
      {phases.map((phase) => (
        <div
          key={phase.id}
          className={`milestone-ease absolute inset-[-35.09%_-19.31%] duration-500 ${
            phase.id === phaseId ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={MILESTONE_CENTER_GLOW[phase.id]}
            alt=""
            aria-hidden
            width={718}
            height={485}
            className="block size-full max-w-none"
          />
        </div>
      ))}
    </div>
  )
}

function DesktopComposition({
  selectedId,
  onSelect,
}: {
  selectedId: PhaseId
  onSelect: (id: PhaseId) => void
}) {
  const { ref, canvasRef, scale } = useScaleToWidth(MILESTONE_DESIGN_WIDTH)

  const handleCanvasHover = (event: MouseEvent<HTMLDivElement>) => {
    const card = (event.target as HTMLElement | null)?.closest("[data-phase-id]")
    const cardPhaseId = asPhaseId(card?.getAttribute("data-phase-id"))
    const rect = event.currentTarget.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const x = ((event.clientX - rect.left) / rect.width) * MILESTONE_DESIGN_WIDTH
    const y =
      ((event.clientY - rect.top) / rect.height) * MILESTONE_DESIGN_HEIGHT
    const next = milestonePhaseFromPoint(x, y, cardPhaseId)
    if (next && next !== selectedId) onSelect(next)
  }

  return (
    <div
      ref={ref}
      className="w-full"
      style={{ height: milestoneWrapperHeight(MILESTONE_DESIGN_HEIGHT, scale) }}
    >
      <div
        ref={canvasRef}
        className="relative origin-top-left"
        style={{
          width: MILESTONE_DESIGN_WIDTH,
          height: MILESTONE_DESIGN_HEIGHT,
          transform: `scale(${scale})`,
        }}
        role="group"
        aria-label="Development milestone phases"
        onMouseMove={handleCanvasHover}
      >
        <div className="absolute left-20 top-[100px] w-[1280px]">
          <MilestonesHeader />
        </div>

        <MilestoneLines activeId={selectedId} />
        <MilestoneCenterGlow phaseId={selectedId} />
        <div
          data-milestone-logo
          className="pointer-events-none absolute left-[558px] top-[472px] z-[1] h-[280px] w-[325px] overflow-hidden"
        >
          <img
            src="/assets/milestones/center-logo.png"
            alt=""
            aria-hidden
            className="absolute left-[-12.05%] top-[-31.29%] h-[155.94%] w-[124.1%] max-w-none"
          />
        </div>

        {phases.map((phase) => {
          const frame = MILESTONE_PHASE_FRAMES[phase.id]
          return (
            <div
              key={phase.id}
              className="absolute z-10"
              style={{
                left: frame.left,
                top: frame.top,
                width: frame.width,
              }}
            >
              <MilestonePhase
                phase={phase}
                selected={selectedId === phase.id}
                onSelect={onSelect}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function DevelopmentMilestonesSection() {
  const isLg = useMatchMedia(LG_MIN_WIDTH_QUERY, false)
  const [selectedId, setSelectedId] = useState<PhaseId>("phase-1")

  return (
    <section className="overflow-x-clip bg-background">
      {isLg ? (
        <div className="mx-auto w-full max-w-[1440px]">
          <DesktopComposition
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      ) : (
        <MobileComposition selectedId={selectedId} onSelect={setSelectedId} />
      )}
    </section>
  )
}
