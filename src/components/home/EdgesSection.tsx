import { CoreCard, SectionHeader } from "../ui/Cards"

const edges = [
  {
    title: "Offline Withdraw Support",
    description:
      "All balance & position data stored on-chain, asset access independent of server status.",
    emphasized: true,
  },
  {
    title: "Continuous Dynamic Risk Model",
    description:
      "Smooth leverage curve without sudden liquidation jumps for small & large positions.",
  },
  {
    title: "Hybrid Trading Architecture",
    description:
      "Fast off-chain matching + immutable on-chain settlement, balance speed & security.",
  },
]

export function EdgesSection() {
  return (
    <section className="bg-section-alt flex flex-col items-center gap-12 px-6 py-14 sm:p-20">
      <SectionHeader
        title="Exclusive Competitive Edges"
        description="Three unique innovations different from all existing exchanges."
        className="px-4 sm:px-[60px]"
      />
      <div className="grid w-full max-w-[1280px] gap-5 md:grid-cols-3">
        {edges.map((edge) => (
          <CoreCard
            key={edge.title}
            title={edge.title}
            emphasized={edge.emphasized}
            className={edge.emphasized ? undefined : "bg-transparent"}
          >
            {edge.description}
          </CoreCard>
        ))}
      </div>
    </section>
  )
}
