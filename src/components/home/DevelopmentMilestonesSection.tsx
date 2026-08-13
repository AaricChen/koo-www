import { useState } from "react"

type PhaseId = "phase-1" | "phase-2" | "phase-3" | "phase-4"

type Phase = {
  id: PhaseId
  label: string
  icon: string
  title: string
  description: string | null
  tags: readonly string[]
  features?: readonly string[]
  path: string
  /** Desktop absolute position inside the 1280 composition */
  desktopClass: string
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
    path: "/assets/milestones/path-group9.svg",
    desktopClass: "left-0 top-0 w-[510px]",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    icon: "/assets/milestones/time-lapse.svg",
    title: "Q4 2026",
    description: "Ecosystem expansion for higher capital flexibility.",
    tags: ["Multi-Chain", "Multi-Yeld Sources", "Unified Margin"],
    path: "/assets/milestones/path-group14.svg",
    desktopClass: "left-0 top-[571px] w-[431px]",
  },
  {
    id: "phase-3",
    label: "Phase 3",
    icon: "/assets/milestones/time-lapse.svg",
    title: "Q1 2027",
    description:
      "Deep infrastructure construction & full decentralized iteration.",
    tags: ["Custom Block Chain", "Pro trading tools", "DAO Governance"],
    path: "/assets/milestones/path-group124.svg",
    desktopClass: "left-[896px] top-[73px] w-[381px]",
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
    path: "/assets/milestones/path-group123.svg",
    desktopClass: "left-[896px] top-[485px] w-[327px]",
  },
]

const pathStyles: Record<PhaseId, string> = {
  "phase-1": "left-[249px] top-[-95px] h-[460px] w-[388px]",
  "phase-2": "left-[291px] top-[667px] h-[385px] w-[349px]",
  "phase-3": "left-[873px] top-[89px] h-[195px] w-[223px]",
  "phase-4": "left-[873px] top-[500px] h-[165px] w-[206px]",
}

function MilestoneTag({
  label,
  active,
}: {
  label: string
  active: boolean
}) {
  if (active) {
    return (
      <span className="inline-flex h-[34px] items-center rounded-[18px] border border-[#1aaf7d] bg-[rgba(26,175,125,0.6)] px-3.5 text-sm leading-[14px] text-foreground transition-colors duration-300">
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex h-[34px] items-center rounded-[18px] border border-foreground px-3.5 text-sm leading-[14px] text-foreground transition-colors duration-300">
      {label}
    </span>
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
      className={`relative flex flex-col items-start text-left transition-[opacity,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aaf7d]/ring-offset-2 focus-visible:ring-offset-background ${
        phase.id === "phase-4" ? "gap-9" : "gap-8"
      } ${selected ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
    >
      {selected ? (
        <div className="pointer-events-none absolute left-[-32px] top-[-10px] hidden h-[366px] w-[392px] animate-fade-in lg:block">
          <img
            src="/assets/milestones/ellipse-glow.svg"
            alt=""
            aria-hidden
            className="size-full"
          />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <img
            src={
              selected && phase.id === "phase-1"
                ? "/assets/milestones/phase1-check.svg"
                : phase.icon
            }
            alt=""
            aria-hidden
            className={`size-8 transition duration-300 ${
              selected && phase.id !== "phase-1" ? "brightness-110" : ""
            }`}
            width={32}
            height={32}
          />
          <p
            className={`text-2xl leading-6 transition-colors duration-300 ${
              selected ? "text-[#1aaf7d]" : "text-foreground"
            }`}
          >
            {phase.label}
          </p>
        </div>
        <h3 className="font-display text-[32px] font-semibold leading-9 text-foreground sm:text-[36px] sm:leading-9">
          {phase.title}
        </h3>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-6">
        {phase.description ? (
          <p className="max-w-[323px] text-base leading-6 text-muted-foreground">
            {phase.description}
          </p>
        ) : null}

        <div
          className={`flex flex-wrap content-start gap-4 ${
            phase.id === "phase-1" ? "max-w-[510px]" : "max-w-[381px]"
          }`}
        >
          {phase.tags.map((tag) => (
            <MilestoneTag key={tag} label={tag} active={selected} />
          ))}
        </div>

        {phase.features && selected ? (
          <div className="animate-fade-up flex flex-col gap-4">
            <p className="font-display text-xl font-semibold leading-6 text-foreground">
              Core Features
            </p>
            <ol className="list-decimal space-y-0 pl-6 text-base leading-7 text-muted-foreground">
              {phase.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </button>
  )
}

export function DevelopmentMilestonesSection() {
  const [selectedId, setSelectedId] = useState<PhaseId>("phase-1")

  return (
    <section className="flex flex-col items-center gap-16 bg-background px-6 pb-20 pt-14 sm:gap-[100px] sm:px-10 sm:pb-[120px] sm:pt-[100px] lg:px-20">
      <header className="flex w-full max-w-[1280px] flex-col items-center gap-8 text-center">
        <h2 className="font-display text-[28px] font-bold leading-9 text-foreground sm:text-[40px] sm:leading-10">
          Koo Development Milestones
        </h2>
        <p className="max-w-[952px] text-base leading-6 text-muted-foreground">
          Koo rolls out upgrades in progressive phases to boost market reach,
          capital efficiency and decentralization.
        </p>
      </header>

      {/* Desktop: Figma absolute composition */}
      <div
        className="relative hidden h-[900px] w-full max-w-[1280px] overflow-hidden lg:block"
        role="group"
        aria-label="Development milestone phases"
      >
        {phases.map((phase) => (
          <img
            key={`path-${phase.id}`}
            src={phase.path}
            alt=""
            aria-hidden
            className={`pointer-events-none absolute transition-opacity duration-500 ease-out ${
              pathStyles[phase.id]
            } ${selectedId === phase.id ? "opacity-100" : "opacity-25"}`}
          />
        ))}

        {/* Center logo cluster — Group 7 */}
        <div className="pointer-events-none absolute left-[381px] top-[176px] h-[325px] w-[518px]">
          <img
            src="/assets/milestones/center-glow.png"
            alt=""
            aria-hidden
            className="absolute left-1/2 top-10 h-[285px] w-[718px] max-w-none -translate-x-1/2"
          />
          <div className="absolute left-1/2 top-0 h-[280px] w-[325px] -translate-x-1/2 overflow-hidden">
            <img
              src="/assets/milestones/center-logo.png"
              alt=""
              aria-hidden
              className="absolute left-[-12%] top-[-31%] h-[156%] w-[124%] max-w-none object-cover"
            />
          </div>
        </div>

        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`absolute ${phase.desktopClass}`}
          >
            <MilestonePhase
              phase={phase}
              selected={selectedId === phase.id}
              onSelect={setSelectedId}
            />
          </div>
        ))}
      </div>

      {/* Mobile / tablet stack */}
      <div
        className="flex w-full max-w-[560px] flex-col gap-10 lg:hidden"
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
    </section>
  )
}
