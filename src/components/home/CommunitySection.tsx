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

/** Figma `Community-m` card order: Telegram, X, Discord. */
const mobileCommunityChannels = [
  communityChannels[0],
  communityChannels[2],
  communityChannels[1],
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

function CommunityMobileHeroVisual() {
  return (
    <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
      <div className="relative col-start-1 row-start-1 mt-[15.05px] h-[134.947px] w-[262.226px]">
        <div className="absolute inset-[-74.1%_-38.14%]">
          <img
            src="/assets/community/glow-mobile.svg"
            alt=""
            aria-hidden
            className="block size-full max-w-none"
            width={262}
            height={135}
          />
        </div>
      </div>
      <div className="relative col-start-1 row-start-1 ml-[49.1px] h-[141.744px] w-[164.524px] overflow-hidden">
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

/** Figma `qrcode` (5435:55638): 160×160 shell, bordered fill + inset QR layer. */
function CommunityCardQr({ src, label }: { src: string; label: string }) {
  return (
    <div className="community-card-qr" aria-hidden>
      <div className="community-card-qr-frame" />
      <div className="community-card-qr-image-wrap">
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
        className="community-card-face group/face relative flex h-full min-h-[168px] w-full cursor-pointer items-end justify-between bg-[rgba(43,48,72,0.2)] px-5 py-10 hover:bg-gradient-to-r hover:from-[rgba(61,122,255,0.6)] hover:via-[rgba(61,155,243,0.6)] hover:via-[56.25%] hover:to-[rgba(47,203,238,0.6)] focus-visible:bg-gradient-to-r focus-visible:from-[rgba(61,122,255,0.6)] focus-visible:via-[rgba(61,155,243,0.6)] focus-visible:via-[56.25%] focus-visible:to-[rgba(47,203,238,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="community-card-qr-icon absolute right-4 top-4 inline-flex size-7">
          <img
            src={qrIcon}
            alt=""
            aria-hidden
            className="size-full"
            width={28}
            height={28}
          />
        </span>
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
            <p className="text-base leading-[22px] text-muted-foreground transition-colors duration-300 group-hover/face:text-foreground/80">
              {description}
            </p>
          </div>
        </div>
        <span className="inline-flex size-7 shrink-0 -rotate-90 opacity-80 transition-opacity duration-300 group-hover/face:opacity-100">
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

function CommunityMobileChannelCard({
  title,
  description,
  href,
  icon,
}: (typeof communityChannels)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${title}: ${description}`}
      className="community-card-face-m flex w-full cursor-pointer items-center justify-between bg-[rgba(43,48,72,0.2)] px-4 py-6 transition-[background,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gradient-to-r hover:from-[rgba(61,122,255,0.6)] hover:via-[rgba(61,155,243,0.6)] hover:via-[56.25%] hover:to-[rgba(47,203,238,0.6)] focus-visible:bg-gradient-to-r focus-visible:from-[rgba(61,122,255,0.6)] focus-visible:via-[rgba(61,155,243,0.6)] focus-visible:via-[56.25%] focus-visible:to-[rgba(47,203,238,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99]"
    >
      <div className="flex items-start gap-4">
        <img
          src={icon}
          alt=""
          aria-hidden
          className="size-9 shrink-0"
          width={36}
          height={36}
        />
        <div className="flex w-[185px] flex-col gap-3">
          <p className="text-sm font-semibold leading-[14px] text-foreground">
            {title}
          </p>
          <p className="text-xs leading-4 text-muted-foreground">{description}</p>
        </div>
      </div>
      <span className="inline-flex size-4 shrink-0 -rotate-90 opacity-80">
        <img
          src="/assets/community/arrow-mobile.svg"
          alt=""
          aria-hidden
          className="size-full"
          width={16}
          height={16}
        />
      </span>
    </a>
  )
}

/**
 * Figma desktop `Community` (5395:55827) and mobile `Community-m` (5397:56451).
 */
export function CommunitySection() {
  return (
    <section
      aria-labelledby="community-heading"
      className="relative overflow-x-clip bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 overflow-hidden opacity-[0.04] lg:hidden">
          <img
            src="/assets/community/bg-mobile.png"
            alt=""
            className="absolute left-[-32.43%] top-[5.31%] h-[56.38%] max-w-none w-[164.86%] object-cover"
          />
        </div>
        <img
          src="/assets/community/bg.png"
          alt=""
          className="hidden size-full object-cover opacity-[0.04] lg:block"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 pb-6 pt-10 lg:gap-5 lg:px-20 lg:pb-[120px] lg:pt-[100px]">
        <div className="flex w-full flex-col items-center gap-8 lg:gap-[50px]">
          <div className="flex w-full flex-col items-center gap-4 px-4 text-center lg:gap-8">
            <h2
              id="community-heading"
              className="w-full text-2xl font-bold leading-6 text-foreground lg:font-display lg:text-[40px] lg:leading-10"
            >
              Community
            </h2>
            <p className="w-full text-xs leading-4 text-muted-foreground lg:max-w-[952px] lg:text-xl lg:leading-5">
              Join our channels & connect with the community
            </p>
          </div>
          <div className="lg:hidden">
            <CommunityMobileHeroVisual />
          </div>
          <div className="hidden lg:block">
            <CommunityHeroVisual />
          </div>
        </div>

        <div className="relative z-10 mt-3 flex w-full flex-col gap-4 lg:-mt-[128px] lg:max-w-[1280px] lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pt-[128px]">
          <div className="contents lg:hidden">
            {mobileCommunityChannels.map((channel) => (
              <CommunityMobileChannelCard key={channel.title} {...channel} />
            ))}
          </div>
          <div className="contents hidden lg:contents">
            {communityChannels.map((channel) => (
              <CommunityChannelCard key={channel.title} {...channel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
