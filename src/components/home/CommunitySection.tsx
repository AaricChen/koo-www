import {
  DISCORD_URL,
  TELEGRAM_URL,
  X_URL,
} from "../../lib/links"

const communityChannels = [
  {
    title: "Telegram",
    description: "Group Chat & Announcements",
    href: TELEGRAM_URL,
    icon: "/assets/community/icon-tg.svg",
    qrIcon: "/assets/community/qr-tg.svg",
    qrImage: "/assets/community/qr-tg.png",
  },
  {
    title: "Discord",
    description: "Chat & Community Discussions",
    href: DISCORD_URL,
    icon: "/assets/community/icon-discord.svg",
    qrIcon: "/assets/community/qr-discord.svg",
    qrImage: "/assets/community/qr-discord.png",
  },
  {
    title: "X (Twitter)",
    description: "News & Real‑time Updates",
    href: X_URL,
    icon: "/assets/community/icon-x.svg",
    qrIcon: "/assets/community/qr-x.svg",
    qrImage: "/assets/community/qr-x.png",
  },
] as const

function CommunityHeroVisual() {
  return (
    <div className="relative inline-grid h-[287px] w-[480px] shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
      <div className="relative col-start-1 row-start-1 mt-[27.6px] h-[247.402px] w-[480px]">
        <div className="absolute inset-[-40.42%_-20.83%]">
          <img
            src="/assets/community/glow.svg"
            alt=""
            aria-hidden
            className="block size-full max-w-none"
            width={480}
            height={247}
          />
        </div>
      </div>
      <div className="relative col-start-1 row-start-1 ml-[89.77px] h-[259.661px] w-[301.393px] overflow-hidden">
        <img
          src="/assets/community/hero-logo.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute max-w-none"
          style={{
            height: "155.94%",
            width: "124.1%",
            left: "-12.05%",
            top: "-31.29%",
          }}
        />
      </div>
    </div>
  )
}

function CommunityCardQr({ src, label }: { src: string; label: string }) {
  return (
    <div className="community-card-qr" aria-hidden>
      <div className="community-card-qr-frame">
        <img src={src} alt="" className="community-card-qr-image" />
      </div>
      <span className="sr-only">{label} QR code</span>
    </div>
  )
}

function CommunityChannelCard({
  title,
  description,
  href,
  icon,
  qrIcon,
  qrImage,
}: (typeof communityChannels)[number]) {
  return (
    <div className="group/card relative overflow-visible">
      <CommunityCardQr src={qrImage} label={title} />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${title}: ${description}`}
        className="community-card-face relative flex h-full min-h-[168px] w-full cursor-pointer items-end justify-between bg-[rgba(43,48,72,0.2)] px-5 py-10 group-hover/card:bg-gradient-to-r group-hover/card:from-[rgba(61,122,255,0.6)] group-hover/card:via-[rgba(61,155,243,0.6)] group-hover/card:via-[56.25%] group-hover/card:to-[rgba(47,203,238,0.6)] focus-visible:bg-gradient-to-r focus-visible:from-[rgba(61,122,255,0.6)] focus-visible:via-[rgba(61,155,243,0.6)] focus-visible:via-[56.25%] focus-visible:to-[rgba(47,203,238,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <img
          src={qrIcon}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 size-7"
          width={28}
          height={28}
        />
        <div className="flex items-start gap-5">
          <img
            src={icon}
            alt=""
            aria-hidden
            className="size-12 shrink-0"
            width={48}
            height={48}
          />
          <div className="flex w-[208px] flex-col gap-4">
            <p className="text-xl font-semibold leading-5 text-foreground">
              {title}
            </p>
            <p className="text-base leading-[22px] text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground/80">
              {description}
            </p>
          </div>
        </div>
        <span className="inline-flex size-7 shrink-0 -rotate-90 opacity-80 transition-opacity duration-300 group-hover/card:opacity-100">
          <img
            src="/assets/community/arrow.svg"
            alt=""
            aria-hidden
            className="size-full"
            width={28}
            height={28}
          />
        </span>
      </a>
    </div>
  )
}

/**
 * Figma `Community` (5395:55827) — desktop layout; mobile follows in a later pass.
 */
export function CommunitySection() {
  return (
    <section
      aria-labelledby="community-heading"
      className="relative hidden overflow-x-clip bg-background lg:block"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        <img
          src="/assets/community/bg.png"
          alt=""
          className="size-full object-cover opacity-[0.04]"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-20 pb-[120px] pt-[100px]">
        <div className="flex w-full flex-col items-center gap-[50px]">
          <div className="flex w-full flex-col items-center gap-8 px-4 text-center">
            <h2
              id="community-heading"
              className="font-display text-[40px] font-bold leading-10 text-foreground"
            >
              Community
            </h2>
            <p className="w-full max-w-[952px] text-xl leading-5 text-muted-foreground">
              Join our channels & connect with the community
            </p>
          </div>
          <CommunityHeroVisual />
        </div>

        <div className="relative z-10 -mt-[128px] grid w-full max-w-[1280px] grid-cols-3 gap-6 overflow-visible pt-[128px]">
          {communityChannels.map((channel) => (
            <CommunityChannelCard key={channel.title} {...channel} />
          ))}
        </div>
      </div>
    </section>
  )
}
