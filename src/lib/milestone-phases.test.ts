import { describe, expect, it } from "vitest"
import { phases } from "./milestone-phases"

describe("milestone phases", () => {
  it("keeps four phases with corrected yield and blockchain copy", () => {
    expect(phases.map((phase) => phase.id)).toEqual([
      "phase-1",
      "phase-2",
      "phase-3",
      "phase-4",
    ])
    expect(phases[1]?.tags).toContain("Multi-Yield Sources")
    expect(phases[2]?.tags).toContain("Custom Blockchain")
    expect(JSON.stringify(phases)).not.toContain("Yeld")
    expect(JSON.stringify(phases)).not.toContain("Block Chain")
  })
})
