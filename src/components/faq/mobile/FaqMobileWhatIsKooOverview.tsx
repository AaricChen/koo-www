import type { ReactNode } from "react"
import {
  WHAT_IS_KOO_ACCORDION,
  WHAT_IS_KOO_OVERVIEW,
} from "../../../lib/faq/content/what-is-koo"
import { FaqMobileAccordion } from "./FaqMobileAccordion"
import { FaqMobileTopicFooter } from "./FaqMobileTopicFooter"

function FaqBulletList({
  title,
  items,
}: {
  title: string
  items: Array<{ text: ReactNode }>
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h3 className="text-xs font-semibold leading-3 text-foreground">{title}</h3>
      <ul className="list-disc space-y-1.5 pl-[18px] text-xs leading-4 text-muted-foreground">
        {items.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

export function FaqMobileWhatIsKooOverview() {
  return (
    <article className="flex w-full flex-col items-center gap-6 bg-surface-soft p-4">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-sm font-semibold leading-[18px] text-foreground">
          {WHAT_IS_KOO_OVERVIEW.title}
        </h2>
        <div className="flex w-full flex-col gap-4 text-xs leading-4 text-muted-foreground">
          <p>{WHAT_IS_KOO_OVERVIEW.intro}</p>
          <FaqBulletList
            title="Key information"
            items={[
              {
                text: (
                  <>
                    Network: <span className="text-foreground">Arbitrum One</span>
                  </>
                ),
              },
              {
                text: (
                  <>
                    Collateral: <span className="text-foreground">Native USDC</span>
                  </>
                ),
              },
              {
                text: (
                  <>
                    Architecture:{" "}
                    <span className="text-foreground">
                      on-chain custody and final settlement; off-chain matching,
                      pricing and real-time risk
                    </span>
                  </>
                ),
              },
            ]}
          />
          <FaqBulletList
            title="Core products"
            items={[
              {
                text: (
                  <>
                    <span className="text-foreground">NFT Accounts</span> - One
                    transferable account object containing its own trading state.
                  </>
                ),
              },
              {
                text: (
                  <>
                    <span className="text-foreground">Yield-bearing Margin</span>{" "}
                    - Eligible USDC margin may earn variable yield while supporting
                    trading.
                  </>
                ),
              },
              {
                text: (
                  <>
                    <span className="text-foreground">Event Contracts</span> -
                    Delivery and perpetual products tied to defined event metrics.
                  </>
                ),
              },
              {
                text: (
                  <>
                    <span className="text-foreground">Vault</span> - Koo&apos;s USDC
                    insurance-fund vault, with liquidity and loss risk.
                  </>
                ),
              },
            ]}
          />
          <FaqBulletList
            title="Markets"
            items={[
              { text: "Crypto Perpetuals." },
              {
                text: "TradFi Perpetuals covering selected stocks, ETFs, precious metals and oil.",
              },
              { text: "Event Contracts tied to defined event metrics." },
            ]}
          />
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-xs font-semibold leading-3 text-foreground">
              How Koo works
            </h3>
            <div className="space-y-1.5 text-xs leading-4 text-muted-foreground">
              <p>A wallet controls one or more NFT Accounts.</p>
              <p>
                Assets and final settlement are on Arbitrum; matching and real-time
                risk calculations run offchain.
              </p>
              <p>
                Users should verify the exact market rules, fees, funding status and
                risk parameters before trading.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-xs font-semibold leading-3 text-foreground">
              Trust and risk
            </h3>
            <div className="space-y-1.5 text-xs leading-4 text-muted-foreground">
              <p>
                Derivatives can cause a partial or total loss of margin.
                Yield-bearing Margin and Vault participation also involve protocol,
                liquidity and principal-loss risks. Yield is variable and principal
                remains at risk.
              </p>
              <p>
                Product availability is subject to applicable laws and Koo&apos;s
                Terms of Service. Access may be restricted in certain jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FaqMobileAccordion items={WHAT_IS_KOO_ACCORDION} />
      <FaqMobileTopicFooter />
    </article>
  )
}
