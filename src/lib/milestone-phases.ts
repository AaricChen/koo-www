export type PhaseId = "phase-1" | "phase-2" | "phase-3" | "phase-4"
export type PhaseAccent = "green" | "blue" | "cyan" | "orange"

export type PhaseGoal = {
  title: string
  body: string
}

export type Phase = {
  id: PhaseId
  label: string
  icon: string
  title: string
  description: string | null
  tags: readonly string[]
  features?: readonly string[]
  detailsTitle?: string
  upgrades?: readonly string[]
  goals?: readonly PhaseGoal[]
  accent: PhaseAccent
  tagMaxWidth: string
  gapClass: string
}

export const phases: readonly Phase[] = [
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
    detailsTitle: "Core Features",
    accent: "green",
    tagMaxWidth: "w-[510px]",
    gapClass: "gap-8",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    icon: "/assets/milestones/time-lapse.svg",
    title: "Q4 2026",
    description: "Ecosystem expansion for higher capital flexibility.",
    tags: ["Multi-Chain", "Multi-Yield Sources", "Unified Margin"],
    detailsTitle: "Upgrades",
    upgrades: [
      "Multi-chain deployment on Optimism, Base, etc.",
      "Extra yield strategies for idle margin.",
      "Diversified yield-bearing collateral assets",
      "Cross-asset unified margin account",
    ],
    accent: "blue",
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
    tags: ["Custom Blockchain", "Pro trading tools", "DAO Governance"],
    detailsTitle: "Upgrades",
    upgrades: [
      "Custom Blockchain for settlement & execution",
      "Professional-grade trading tools & order types",
      "Multi-asset markets: spot, predictions, etc.",
      "Full DAO control of protocol parameters",
    ],
    accent: "cyan",
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
    goals: [
      {
        title: "1. Superior Execution",
        body: "Low-latency institutional trading tools",
      },
      {
        title: "2. Maximized Capital Efficiency",
        body: "Diversified collateral & multi-stream yields",
      },
      {
        title: "3. Comprehensive Market Coverage",
        body: "All asset classes on a single platform",
      },
      {
        title: "4. Full Decentralization",
        body: "On-chain rules & community DAO governance",
      },
    ],
    accent: "orange",
    tagMaxWidth: "w-[327px]",
    gapClass: "gap-9",
  },
]
