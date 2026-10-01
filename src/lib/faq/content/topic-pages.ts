import type { FaqTopicSlug } from "../topics"
import type { FaqTopicContent } from "../types"
import {
  faqItems,
  faqTopic,
  highlightListSection,
  keyInfo,
  keyInfoLabeled,
  listSection,
  paraSection,
} from "./build"

/** Copy from Koo_官网页面文案_2026-09-23.pdf (P02–P12). */
export const FAQ_TOPIC_PAGES: Record<FaqTopicSlug, FaqTopicContent> = {
  "what-is-koo": faqTopic(
    "Derivatives built around your NFT account",
    "Koo is an Arbitrum-based hybrid derivatives platform built around NFT accounts. Users trade crypto, TradFi and event contracts with USDC margin while each NFT Account maintains its own balances, positions, orders and risk state.",
    [
      keyInfoLabeled([
        { label: "Network:", value: "Arbitrum One" },
        { label: "Collateral:", value: "Native USDC" },
        {
          label: "Account model:",
          value: "NFT Accounts with Cross Margin",
        },
      ]),
      highlightListSection("Core products", [
        {
          highlight: "NFT Accounts",
          rest: " - One transferable account object containing its own trading state. ",
        },
        {
          highlight: "Yield-bearing Margin",
          rest: " - Eligible USDC margin may earn variable yield while supporting trading. ",
        },
        {
          highlight: "Event Contracts",
          rest: " - Delivery and perpetual products tied to defined event metrics. ",
        },
        {
          highlight: "Vault",
          rest: " - Koo’s USDC insurance-fund vault, with liquidity and loss risk. ",
        },
      ]),
      listSection("Markets", [
        "Crypto Perpetuals.",
        "TradFi Perpetuals covering selected stocks, ETFs, precious metals and oil.",
        "Event Contracts tied to defined event metrics. ",
      ]),
      paraSection("How Koo works", [
        "A wallet controls one or more NFT Accounts. ",
        "Assets and final settlement are on Arbitrum; matching and real-time risk calculations run offchain. ",
        "Users should verify the exact market rules, fees, funding status and risk parameters before trading. ",
      ]),
      paraSection("Trust and risk", [
        "Derivatives can cause a partial or total loss of margin. Yield-bearing Margin and Vault participation also involve protocol, liquidity and principal-loss risks. Yield is variable and principal remains at risk. ",
        "Product availability is subject to applicable laws and Koo’s Terms of Service. Access may be restricted in certain jurisdictions. ",
      ]),
    ],
    faqItems([
      {
        id: "centralized-exchange",
        question: "Is Koo a centralized exchange?",
        answer:
          "No. It uses a hybrid architecture with onchain custody and final settlement plus offchain matching and real-time risk.",
        defaultOpen: true,
      },
      {
        id: "onchain",
        question: "Is everything on Koo onchain?",
        answer:
          "No. Matching, real-time pricing and risk calculations are offchain.",
      },
      {
        id: "availability",
        question: "Is Koo available everywhere?",
        answer:
          "Product availability is subject to applicable laws and Koo’s Terms of Service. Access may be restricted in certain jurisdictions.",
      },
    ]),
  ),

  "how-to-trade": faqTopic(
    "How to trade on Koo",
    "To trade on Koo, connect a compatible wallet, prepare native USDC on Arbitrum One, create or select an NFT Account, choose a live market, place an order and monitor the account-level Risk Ratio.",
    [
      keyInfo([
        "Use native USDC on Arbitrum One",
        "Keep a small amount of ETH for onchain gas",
        "Trading risk is calculated per NFT Account",
      ]),
      paraSection("Step 1 — Connect a wallet", [
        "Connect a compatible wallet, then continue to account selection and deposit when ready.",
      ]),
      paraSection("Step 2 — Prepare funds", [
        "Move native USDC to Arbitrum One and keep enough ETH for deposit or withdrawal gas.",
      ]),
      paraSection("Step 3 — Deposit and use an NFT Account", [
        "The account records its own margin, positions, orders and risk. Different NFT Accounts form separate risk boundaries.",
      ]),
      paraSection("Step 4 — Choose a market", [
        "Check the contract type, trading status, settlement asset, maximum leverage, funding status and market-specific rules in the trading app.",
      ]),
      paraSection("Step 5 — Place an order", [
        "Choose an order type, such as Market or Limit, and review Reduce-Only and Take Profit / Stop Loss options. A limit order can execute immediately as a taker.",
      ]),
      paraSection("Step 6 — Manage risk", [
        "Monitor your NFT Account's Risk Ratio. At 95%, active orders are cancelled; at 100%, forced liquidation is triggered.",
      ]),
      paraSection("Step 7 — Withdraw", [
        "Withdrawals use Request Withdraw and Finalize Withdraw, with completion shown through live account status.",
      ]),
    ],
    faqItems([
      {
        id: "eth",
        question: "Do I need ETH?",
        answer:
          "Yes, a small amount for Arbitrum onchain transactions. Offchain order placement is gas-free.",
        defaultOpen: true,
      },
      {
        id: "collateral",
        question: "Which collateral can I use?",
        answer: "Koo currently supports native USDC on Arbitrum One.",
      },
      {
        id: "boundaries",
        question: "How can I create separate risk boundaries?",
        answer:
          "Use separate NFT Accounts; each account has its own Cross Margin boundary.",
      },
    ]),
  ),

  "nft-accounts": faqTopic(
    "What is a Koo NFT Account?",
    "A Koo NFT Account is the onchain ownership object for a trading account. It contains the account's balances, margin, positions, active orders and risk state, while the connected wallet controls it.",
    [
      keyInfo([
        "One wallet can control multiple NFT Accounts",
        "Cross Margin applies inside each account",
        "Different NFT Accounts isolate risk from one another",
      ]),
      paraSection("How it works", [
        "Choose or create an NFT Account after connecting a wallet.",
        "All positions and active orders inside that account share its USDC margin.",
        "Switching accounts switches the entire trading and risk context.",
      ]),
      paraSection("Ownership and transfer", [
        "Ownership can move with the NFT, transferring control of the account's assets and positions to the new holder.",
        "Check the trading app for transfer availability and supported transfer methods.",
      ]),
      paraSection("When transfer can be restricted", [
        "A pending withdrawal, delivery lock or unsafe risk state can block transfer. Check your account's current transfer status in the trading app.",
      ]),
      paraSection("Risk", [
        "Transferring the NFT Account transfers more than an image: it transfers control of the account and its trading state.",
        "Derivatives can cause a partial or total loss of margin. Yield-bearing Margin and Vault participation also involve protocol, liquidity and principal-loss risks. Yield is variable and principal remains at risk.",
      ]),
    ],
    faqItems([
      {
        id: "wallet-relation",
        question: "How does an NFT Account relate to my wallet?",
        answer:
          "The wallet controls the NFT Account, while the account contains its own trading state.",
        defaultOpen: true,
      },
      {
        id: "multiple",
        question: "Can one wallet have more than one account?",
        answer: "Yes. Each account has a separate Cross Margin risk boundary.",
      },
      {
        id: "after-transfer",
        question: "What happens after transfer?",
        answer: "Control of the NFT Account moves to the new holder.",
      },
    ]),
  ),

  "yield-bearing-margin": faqTopic(
    "What is Yield-bearing Margin on Koo?",
    "Yield-bearing Margin lets eligible USDC in a Koo NFT Account receive variable yield while remaining part of the account's trading equity. Yield is allocated every eight hours and credited to the account balance.",
    [
      keyInfo([
        "Supported asset: USDC",
        "Allocation cycle: every 8 hours",
        "Yield is variable and not guaranteed",
      ]),
      paraSection("How it works", [
        "Koo calculates each eligible account's share of distributable yield at the scheduled allocation cycle.",
        "Credited yield becomes part of the account balance and can support trading margin.",
      ]),
      paraSection("Example", [
        "If an account qualifies for 2 USDC in an allocation cycle, the 2 USDC is credited to the account balance.",
        "This is an explanatory example, not a promised return.",
      ]),
      paraSection("Risks and limits", [
        "Yield can vary and may be zero.",
        "Strategy, smart-contract, liquidity and principal-loss risks may apply.",
        "Principal is not guaranteed.",
      ]),
    ],
    faqItems([
      {
        id: "fixed",
        question: "Is the yield fixed?",
        answer: "No. Yield is variable and not guaranteed.",
        defaultOpen: true,
      },
      {
        id: "frequency",
        question: "How often is yield allocated?",
        answer: "Every eight hours.",
      },
      {
        id: "margin",
        question: "Can credited yield support margin?",
        answer: "Yes. Once credited, it becomes part of the account balance.",
      },
    ]),
  ),

  "event-contracts": faqTopic(
    "What are Koo Event Contracts?",
    "Koo Event Contracts are derivatives whose value follows a defined event metric. Koo currently supports Goal Difference delivery contracts and exchange Market Share perpetual contracts; the two product types use different funding and settlement rules.",
    [
      keyInfo([
        "Goal Difference: delivery contract, no funding",
        "Market Share: perpetual contract, funding applies",
        "Both use USDC margin and account-level Cross Margin risk",
      ]),
      paraSection("Goal Difference delivery contracts", [
        "Settlement price = 10 + home-team goals − away-team goals.",
        "Settlement uses the official score after regular time plus stoppage time, excluding extra time and penalties.",
        "At 90:00, new orders and order modifications stop. Order cancellations remain available, and NFT Account transfers are locked until settlement.",
        "If the match has no valid official result, the contract is voided, orders are cancelled and positions are closed with no trading PnL. Treatment of prior trading fees follows the contract rules.",
      ]),
      paraSection("Exchange Market Share perpetuals", [
        "The price represents the target exchange's share within the published included venues, time window and weighting method.",
        "The contract is a linear USDC perpetual with no expiry and dynamic funding.",
        "Trading it does not represent ownership of the exchange, its equity or a token.",
      ]),
      paraSection("Before you trade", [
        "Review the contract type, index meaning, data source, trading stage, maximum leverage, funding rules and lock or settlement time. Read the full contract rules before placing an order.",
      ]),
      paraSection("Risks", [
        "Price reflects trading and defined inputs; it is not an objective probability or a guaranteed outcome.",
        "Event Contracts involve liquidity, leverage, data-source and settlement-rule risks.",
      ]),
    ],
    faqItems([
      {
        id: "funding-all",
        question: "Do all Event Contracts charge funding?",
        answer:
          "No. Market Share perpetuals use funding; Goal Difference delivery contracts do not.",
        defaultOpen: true,
      },
      {
        id: "gd-settle",
        question: "Which result settles a Goal Difference contract?",
        answer:
          "The official organizer result for regular time plus stoppage time.",
      },
      {
        id: "data-conflict",
        question: "What if live data conflicts with the official result?",
        answer: "Settlement is paused until the official result is confirmed.",
      },
    ]),
  ),

  vault: faqTopic(
    "What is the Koo Vault?",
    "The Koo Vault is a USDC pool supporting Koo's insurance-fund function. It can absorb eligible positions when liquidation execution cannot complete above bankruptcy price, while Auto-Deleveraging remains a last resort if the pool is insufficient.",
    [
      keyInfo([
        "Asset: USDC",
        "Minimum deposit: 5 USDC",
        "Withdrawal cooldown: 5 minutes, subject to available liquidity",
      ]),
      paraSection("How it is funded and used", [
        "The pool is primarily funded by liquidation surpluses and platform allocations.",
        "It may absorb positions that cannot be filled above bankruptcy price.",
        "If the fund is insufficient, Auto-Deleveraging (ADL) can be used as a last resort.",
      ]),
      paraSection("Understanding Vault performance", [
        "Historical annualized performance does not guarantee future returns. Total P&L can reflect gains or losses.",
      ]),
      paraSection("Withdrawals", [
        "A five-minute cooldown applies after deposit.",
        "Withdrawals are subject to available liquidity and the applicable withdrawal rules. Immediate redemption is not guaranteed.",
      ]),
      paraSection("Risks", ["Vault depositors can lose money and principal is not guaranteed."]),
    ],
    faqItems([
      {
        id: "principal",
        question: "Is Vault principal guaranteed?",
        answer: "No. Vault participation can lose money.",
        defaultOpen: true,
      },
      {
        id: "apr",
        question: "Is the displayed APR guaranteed?",
        answer: "No. Any APR is historical and can change.",
      },
      {
        id: "withdraw",
        question: "Can I withdraw immediately?",
        answer: "A five-minute cooldown and available-liquidity conditions apply.",
      },
    ]),
  ),

  "crypto-perpetuals": faqTopic(
    "Trade crypto perpetuals on Koo",
    "Koo offers USDC-margined crypto perpetuals through an order book. Check the trading app for available markets, maximum leverage, order limits and risk parameters.",
    [
      keyInfo([
        "Linear USDC-margined perpetuals",
        "Order book with price-time priority",
        "Funding currently settles every 8 hours",
      ]),
      paraSection("Available markets", [
        "Check the trading app for currently available crypto perpetual markets and their trading status.",
      ]),
      paraSection("Execution", [
        "Market and limit orders are matched by price priority and then time priority.",
        "Trades execute at the maker order price and can fill partially when liquidity is insufficient.",
      ]),
      paraSection("Leverage, fees and funding", [
        "Maximum leverage and order limits vary by instrument and position size.",
        "Taker fee: 0.02%. Maker fee: -0.005%, meaning a 0.005% rebate when the fill qualifies as maker.",
        "Funding settles every eight hours; the rate and cap vary by instrument and time.",
      ]),
      paraSection("Risks", [
        "Cross Margin applies within each NFT Account. Mark Price feeds the risk calculation, and Risk Ratio is the authoritative trigger.",
        "Derivatives can cause a partial or total loss of margin. Yield-bearing Margin and Vault participation also involve protocol, liquidity and principal-loss risks. Yield is variable and principal remains at risk.",
      ]),
    ],
    faqItems([
      {
        id: "leverage",
        question: "Are all crypto markets 100×?",
        answer:
          "No. Maximum and effective leverage depend on the market, position size and applicable risk limits.",
        defaultOpen: true,
      },
      {
        id: "maker",
        question: "Does every limit order earn a maker rebate?",
        answer: "No. A limit order that executes immediately can be a taker.",
      },
      {
        id: "funding-schedule",
        question: "How often does funding settle?",
        answer: "Every eight hours.",
      },
    ]),
  ),

  "tradfi-perpetuals": faqTopic(
    "Trade selected TradFi perpetuals on Koo",
    "Koo offers selected USDC-margined perpetuals linked to stocks, ETFs, precious metals and oil. Examples include AAPL, NVDA, TSLA, QQQ, XAU, XAG, CL and BZ. Check the trading app for current availability.",
    [
      keyInfo([
        "Categories: selected stocks, ETFs, precious metals and oil",
        "Collateral: USDC",
        "Market status and parameters can change",
      ]),
      listSection("Markets", [
        "Stocks: examples include AAPL, NVDA and TSLA.",
        "ETFs: examples include QQQ.",
        "Precious metals: examples include XAU and XAG.",
        "Oil: examples include CL and BZ.",
        "Availability and trading status vary by market. Check the trading app before placing an order.",
      ]),
      paraSection("Trading hours and pricing", [
        "The underlying reference market has its own trading session.",
        "Outside the reference session or when external data is unavailable, Koo can use its documented internal pricing process until the external source resumes.",
        "Check the current market stage. The index calculation method can differ during closed-market periods.",
      ]),
      paraSection("Leverage, fees and funding", [
        "Check each market's current maximum leverage and risk limits in the trading app.",
        "Taker 0.02%; Maker -0.005% when the fill qualifies as maker.",
        "Funding currently settles every eight hours; actual rates and caps vary.",
      ]),
      paraSection("Risks", [
        "TradFi reference markets can close while a Koo contract remains tradeable, creating basis and liquidity risk.",
        "Derivatives can cause a partial or total loss of margin. Yield-bearing Margin and Vault participation also involve protocol, liquidity and principal-loss risks. Yield is variable and principal remains at risk.",
      ]),
    ],
    faqItems([
      {
        id: "coverage",
        question: "Which types of TradFi markets does Koo cover?",
        answer:
          "Selected stocks, ETFs, precious metals and oil. Check the trading app for the markets currently available.",
        defaultOpen: true,
      },
      {
        id: "closed",
        question: "Can I trade when the underlying market is closed?",
        answer:
          "Check the live market stage. Pricing rules and liquidity can differ outside the reference market session.",
      },
      {
        id: "leverage-fixed",
        question: "Are maximum leverage values fixed?",
        answer:
          "No. Maximum and effective leverage depend on the market and applicable risk limits. Check the trading app for current values.",
      },
    ]),
  ),

  "trading-fees": faqTopic(
    "What are Koo's trading fees?",
    "Koo currently charges a 0.02% taker fee and applies a -0.005% maker fee, meaning qualifying maker fills receive a 0.005% rebate. A limit order is not automatically a maker order.",
    [
      keyInfo([
        "Taker: 0.02%",
        "Maker: -0.005% (0.005% rebate)",
        "Funding is a separate payment between long and short positions",
      ]),
      paraSection("Maker and taker", [
        "Taker fills remove liquidity by executing against an existing order.",
        "Maker fills add liquidity by resting on the order book before execution.",
        "A market order is a taker. A limit order that crosses the book is also a taker.",
      ]),
      paraSection("Formula", [
        "Trading fee or rebate = filled notional × applicable rate.",
        "Example: a 10,000 USDC taker fill costs 2 USDC. A qualifying 10,000 USDC maker fill earns a 0.5 USDC rebate.",
      ]),
      paraSection("What is not included", [
        "Funding is not a platform trading fee and can be paid or received.",
        "Gas may be required for onchain deposit or withdrawal actions, not for every offchain order.",
      ]),
    ],
    faqItems([
      {
        id: "limit-maker",
        question: "Does a limit order always receive the maker rebate?",
        answer: "No. If it executes immediately, it is a taker fill.",
        defaultOpen: true,
      },
      {
        id: "funding-fee",
        question: "Is funding included in the trading fee?",
        answer:
          "No. Funding is a separate payment between long and short positions.",
      },
      {
        id: "same-rates",
        question: "Are these rates the same across current markets?",
        answer:
          "Yes. Koo currently applies the same maker and taker rates across its markets.",
      },
    ]),
  ),

  funding: faqTopic(
    "How does funding work on Koo?",
    "Funding is a periodic payment between long and short perpetual positions. Koo's current open perpetual markets settle funding every eight hours at 00:00, 08:00 and 16:00 UTC, while the actual rate and cap vary by instrument and time.",
    [
      keyInfo([
        "Positive rate: longs pay shorts",
        "Negative rate: shorts pay longs",
        "Goal Difference delivery contracts have no funding",
      ]),
      paraSection("Why funding exists", [
        "Funding helps keep a perpetual contract near its index price by transferring value between long and short holders.",
        "Koo does not classify this transfer as a platform trading fee.",
      ]),
      paraSection("Schedule and applicability", [
        "Ordinary perpetuals and Market Share perpetuals use funding.",
        "Goal Difference delivery contracts do not use funding.",
      ]),
      paraSection("Formula and example", [
        "Funding payment = position notional × settlement funding rate.",
        "Illustrative example: a 10,000 USDC long position at +0.01% pays 1 USDC at settlement. This does not imply a fixed rate.",
      ]),
      paraSection("Changing funding rates", [
        "Rates can be positive, negative or near zero and can change between periods.",
        "Check your market's current funding rate, next settlement time and rate cap before holding a position through settlement.",
      ]),
    ],
    faqItems([
      {
        id: "holding-fee",
        question: "Is funding a holding fee paid to Koo?",
        answer:
          "No. It is a transfer between long and short perpetual positions.",
        defaultOpen: true,
      },
      {
        id: "fixed-rate",
        question: "Is the rate always 0.02%?",
        answer: "No. The actual rate changes by instrument and time.",
      },
      {
        id: "event-funding",
        question: "Do Event Contracts use funding?",
        answer:
          "Market Share perpetuals do; Goal Difference delivery contracts do not.",
      },
    ]),
  ),

  "liquidation-risk": faqTopic(
    "How does liquidation work on Koo?",
    "Koo uses the Risk Ratio of the entire NFT Account as the authoritative liquidation trigger. At 95%, active orders are cancelled; at 100%, forced liquidation is triggered.",
    [
      keyInfo([
        "Risk boundary: one NFT Account",
        "Risk-price basis: Mark Price / Mark Value",
        "Estimated liquidation price: reference only",
      ]),
      paraSection("Cross Margin and Risk Ratio", [
        "All positions and active orders within one NFT Account share its USDC margin.",
        "Risk Ratio includes the account's maintenance-margin and fee requirements relative to available account margin.",
      ]),
      paraSection("Trigger sequence", [
        "At 95%, all active pending orders in the account are automatically cancelled.",
        "At 100%, forced liquidation is triggered.",
        "A displayed position liquidation price is an estimate and is not the final trigger.",
      ]),
      paraSection("Pricing and dynamic risk", [
        "Mark Price / Mark Value is the price basis for maintenance margin and risk calculations; Last Price is not the direct trigger.",
        "The maintenance margin rate (MMR) increases continuously as worst-case net exposure from positions and active orders grows.",
        "The initial margin rate (IMR) is the greater of 1 / maximum leverage and 1.3 × MMR. Effective leverage can fall below the nominal maximum for larger positions.",
      ]),
      paraSection("Partial liquidation and ADL", [
        "Large positions may be partially liquidated.",
        "The insurance fund can absorb eligible positions that cannot fill above bankruptcy. ADL is a last resort if the fund is insufficient.",
      ]),
      paraSection("Risk", [
        "Derivatives can cause a partial or total loss of margin. Yield-bearing Margin and Vault participation also involve protocol, liquidity and principal-loss risks. Yield is variable and principal remains at risk.",
        "Users who need separate risk boundaries should use separate NFT Accounts; Isolated Margin is not currently available.",
      ]),
    ],
    faqItems([
      {
        id: "trigger",
        question: "What directly triggers liquidation?",
        answer: "The NFT Account Risk Ratio reaching 100%.",
        defaultOpen: true,
      },
      {
        id: "estimate",
        question: "Why can the estimate change?",
        answer:
          "Account equity, other positions, active orders, fees and dynamic MMR can change the Risk Ratio.",
      },
      {
        id: "last-price",
        question: "Does Koo use Last Price?",
        answer:
          "No. Mark Price / Mark Value is used for the risk calculation.",
      },
    ]),
  ),
}
