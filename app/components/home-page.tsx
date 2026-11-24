"use client";

import { SiteHeader, Wordmark } from "./site-header";
import { useI18n } from "./i18n-provider";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Asterisk,
  BatteryFull,
  BellRing,
  CalendarPlus,
  CalendarClock,
  CalendarDays,
  Check,
  CircleCheck,
  CircleUserRound,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Clock3,
  Download,
  DoorOpen,
  Ellipsis,
  Heart,
  House,
  Languages,
  LockKeyhole,
  MessageCircle,
  Mic,
  Camera,
  Navigation,
  PhoneOff,
  Search,
  ShieldCheck,
  Signal,
  Sparkles,
  Video,
  WalletCards,
  Wifi,
  type LucideIcon,
} from "lucide-react";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{children}</p>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a className={`button ${light ? "button-light" : "button-dark"}`} href={href}>
      {children} <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

function AppTabs({ role = "patient", active = "home" }: { role?: "patient" | "nurse"; active?: string }) {
  const { messages, t } = useI18n();
  const patientTabs = [[CalendarDays, "appointments"], [House, "home"], [Heart, "book"], [MessageCircle, "chat"], [CircleUserRound, "profile"]] as const;
  const nurseTabs = [[House, "home"], [ClipboardCheck, "requests"], [CalendarDays, "schedule"], [MessageCircle, "chat"], [CircleUserRound, "profile"]] as const;
  const tabs = role === "nurse" ? nurseTabs : patientTabs;
  return (
    <div className="screen-tab" dir={messages.direction}>
      {tabs.map(([Icon, label]) => <span className={active === label ? "active-tab" : ""} key={label}><Icon size={12} /><small>{t(`phone.${role === "nurse" ? "nurseTabs" : "tabs"}.${label}`)}</small></span>)}
    </div>
  );
}

function StatusBar() {
  const { t } = useI18n();
  return (
    <div className="status-row">
      <span>{t("phone.statusTime")}</span>
      <span className="status-icons"><Signal size={9} /><Wifi size={9} /><BatteryFull size={12} /></span>
    </div>
  );
}

function Phone({ kind }: { kind: "discover" | "tracking" | "nurse" }) {
  const { t, messages } = useI18n();
  const tabs = <AppTabs role={kind === "nurse" ? "nurse" : "patient"} active={kind === "discover" ? "home" : kind === "tracking" ? "appointments" : kind === "nurse" ? "requests" : "book"} />;
  if (kind === "discover") {
    return <div className="phone phone-back" aria-hidden="true"><div className="phone-frame"><div className="phone-screen brochure-dashboard">
      <StatusBar /><div className="screen-top"><span className="screen-greeting">{t("phone.dashboard.greeting")},</span><span className="screen-avatar">{t("phone.dashboard.locale")}</span></div>
      <div className="dashboard-name">{t("phone.dashboard.name")}</div>
      <div className="dashboard-card"><span>{t("phone.dashboard.active")}</span><b>{t("phone.dashboard.name")}</b><div className="dashboard-metrics"><span>{t("phone.dashboard.ongoing")}<b>{t("phone.dashboard.ongoingCount")}</b></span><span>{t("phone.dashboard.upcoming")}<b>{t("phone.dashboard.upcomingCount")}</b></span><span>{t("phone.dashboard.wallet")}<b dir="ltr">{t("phone.dashboard.walletTotal")}</b></span></div></div>
      <div className="screen-section"><b>{t("phone.dashboard.upcoming")}</b></div>
      <div className="mini-visit-card"><span className="mini-status">{t("phone.dashboard.booked")}</span><b>{t("phone.dashboard.wound")}</b><small>{t("phone.dashboard.nora")} {t("phone.dashboard.woundDate")}</small><small dir="ltr">{t("phone.dashboard.bookingCode")}</small><strong dir="ltr">{t("phone.dashboard.visitPrice")}</strong></div>
      <div className="mini-visit-card mini-visit-muted"><span className="mini-status mini-status-teal">{t("phone.dashboard.onWay")}</span><b>{t("phone.dashboard.elderly")}</b><small>{t("phone.dashboard.amal")}</small></div>
      <div className="quick-menu"><b>{t("phone.dashboard.menu")}</b><div><span>{t("phone.dashboard.book")}</span><span>{t("phone.dashboard.walletAction")}</span><span>{t("phone.dashboard.chats")}</span><span>{t("phone.dashboard.alerts")}</span></div></div>{tabs}
    </div></div></div>;
  }
  if (kind === "tracking") {
    const tracking = messages.phone.tracking;
    const events = [[tracking.requested, tracking.requestSent],[tracking.accepted, tracking.slotHeld],[tracking.paid, tracking.wallet],[tracking.left, tracking.leftAt],[tracking.visitStarts, tracking.door],[tracking.completed, tracking.codeHelp]];
    return <div className="phone phone-front" aria-hidden="true"><div className="phone-frame"><div className="phone-screen brochure-tracking">
      <StatusBar /><div className="screen-nav"><ArrowLeft size={14} /><b>{t("phone.tracking.title")}</b><Ellipsis size={15} /></div>
      <div className="tracking-booking"><span className="mini-status mini-status-teal">{t("phone.tracking.onWay")}</span><b>{t("phone.tracking.wound")}</b><small>{t("phone.tracking.nora")}</small><small dir="ltr">{t("phone.tracking.bookingRef")}</small></div>
      <div className="tracking-timeline">{events.map(([title, text], index) => <div className={"tracking-event" + (index === 3 ? " tracking-current" : "")} key={title}><i /><span><b>{title}</b><small>{text}</small></span></div>)}</div>
      <div className="completion-code"><small>{t("phone.tracking.codeTitle")}</small><b dir="ltr">{t("phone.tracking.code")}</b></div><div className="screen-message">{t("phone.tracking.message")}</div>{tabs}
    </div></div></div>;
  }
  if (kind === "nurse") {
    return <div className="phone nurse-phone nurse-phone-front" aria-hidden="true"><div className="phone-frame"><div className="phone-screen compact-screen brochure-nurse">
      <StatusBar /><div className="screen-nav"><Ellipsis size={15} /><b>{t("phone.nurse.title")}</b><Search size={13} /></div><div className="screen-greeting nurse-subtitle">{t("phone.nurse.subtitle")}</div>
      {[1, 2].map((i) => <article className="nurse-request-card" key={i}><div className="request-person"><span className={"nurse-avatar " + (i === 2 ? "avatar-b" : "avatar-a")}>{t("phone.nurse.initial" + i)}</span><span><b>{t("phone.nurse.patient" + i)}</b><small>{t("phone.nurse.service" + i)}</small></span><strong dir="ltr">{t("phone.nurse.rate" + i)}</strong></div><small className="request-time">{t("phone.nurse.time" + i)}</small><span className="request-deadline">{t("phone.nurse.deadline" + i)}</span><div className="request-actions"><span>{t("phone.nurse.accept")}</span><span>{t("phone.nurse.decline")}</span></div></article>)}
      <div className="nurse-week-card"><span>{t("phone.nurse.week")}<small>{t("phone.nurse.wallet")}</small></span><b>{t("phone.nurse.visits")}<strong dir="ltr">{t("phone.nurse.earnings")}</strong></b></div>{tabs}
    </div></div></div>;
  }
  return null;
}

const trustIcons: Record<string, LucideIcon> = {
  verified: ShieldCheck,
  check: ClipboardCheck,
  chat: MessageCircle,
  bell: BellRing,
  language: Languages,
  lock: LockKeyhole,
};

function LineIcon({ name }: { name: string }) {
  const Icon = trustIcons[name] ?? ShieldCheck;
  return <span className="trust-icon"><Icon size={18} strokeWidth={1.7} aria-hidden="true" /></span>;
}

function PatientShowcase() {
  const { t, messages } = useI18n();
  const profiles = messages.phone.patient.profiles;
  return (
    <div className="patient-showcase" aria-label={t("patients.preview")}>
      <div className="showcase-circle" />
      <div className="showcase-note"><span className="note-asterisk"><Sparkles size={17} /></span><span><b>{t("patients.preview")}</b><small>{t("patients.sample")}</small></span></div>
      <div className="phone showcase-phone showcase-phone-one" aria-hidden="true"><div className="phone-frame"><div className="phone-screen compact-screen brochure-patient">
        <StatusBar /><div className="screen-nav"><ArrowLeft size={14} /><b>{t("phone.patient.title")}</b><Search size={12} /></div><div className="patient-service-line">{t("phone.patient.service")}</div>
        {profiles.map((profile, index) => <article className="nurse-card brochure-nurse-card" key={profile.name}><div className={"nurse-avatar " + (index % 2 ? "avatar-b" : "avatar-a")}>{profile.initial}</div><div className="nurse-card-main"><b dir="auto">{profile.name}</b><small dir="auto">{profile.experience}</small><span className="card-rate" dir="ltr">{profile.rate}</span></div><ChevronRight className="tiny-arrow" size={12} /><span className="licensed-badge">{t("phone.patient.licensed")}</span><small className="nurse-services" dir="auto">{profile.services}</small></article>)}
        <AppTabs active="book" />
      </div></div></div>
      <div className="phone showcase-phone showcase-phone-two" aria-hidden="true"><div className="phone-frame"><div className="phone-screen compact-screen brochure-visits">
        <StatusBar /><div className="screen-nav"><ArrowLeft size={14} /><b>{t("phone.patient.allVisitsTitle")}</b><Ellipsis size={15} /></div>
        <div className="visit-tabs">{messages.phone.patient.visitTabs.map((label) => <span key={label}>{label}</span>)}</div>
        <div className="overview-date"><span className="date-square">{t("phone.patient.visitDate")}<br /><small>{t("phone.patient.visitMonth")}</small></span><span><b>{t("phone.patient.visitTitle")}</b><small>{t("phone.patient.visitState")}</small></span></div>
        <div className="overview-block"><span className="overview-label">{t("phone.dashboard.booked")}</span><div className="overview-line"><span>{t("phone.dashboard.wound")}</span><b dir="ltr">{t("phone.patient.visitPrice")}</b></div><div className="overview-line"><span>{t("phone.dashboard.nora")}</span><b>{t("phone.dashboard.woundDate")}</b></div></div>
        <div className="overview-chat">{t("phone.patient.visitChat")} <b><MessageCircle size={12} /></b></div><AppTabs active="appointments" />
      </div></div></div>
      <div className="showcase-doodle" aria-hidden="true"><Sparkles size={25} /></div>
    </div>
  );
}

function NurseShowcase() {
  const { t } = useI18n();
  return (
    <div className="nurse-visual" aria-label={t("nurses.preview")}>
      <div className="nurse-visual-glow" /><div className="nurse-prompt"><span className="prompt-star"><Sparkles size={18} /></span><span><b>{t("nurses.preview")}</b><small>{t("nurses.sample")}</small></span></div>
      <Phone kind="nurse" />
      <div className="nurse-orbit-label"><span>{t("nurses.orbit")}</span></div>
    </div>
  );
}

export default function Home() {
  const { t, locale, messages } = useI18n();
  const challenges = [messages.difference.challenge1, messages.difference.challenge2, messages.difference.challenge3, messages.difference.challenge4];
  const approach = [messages.difference.approach1, messages.difference.approach2, messages.difference.approach3, messages.difference.approach4];
  const roadmapIcons = [Navigation, Heart, CreditCard, ClipboardCheck];
  return (
    <div className="page-root" lang={locale} dir={messages.direction}>
      <a className="skip-link" href="#main">{t("a11y.skip")}</a>
      <SiteHeader />
      <main className="min-h-screen" id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-inner wrap">
            <div className="hero-copy">
              <Eyebrow><span className="eyebrow-dot" /> {t("hero.eyebrow")}</Eyebrow>
              <h1 id="hero-title">{t("hero.title1")}<br />{t("hero.title2")} <em>{t("hero.titleAccent")}</em></h1>
              <p className="hero-lede">{t("hero.lede")}</p>
              <div className="hero-actions"><ArrowLink href="#get-app">{t("hero.cta")}</ArrowLink><a className="text-link" href="#how-it-works">{t("hero.explore")} <ArrowDown size={14} aria-hidden="true" /></a></div>
              <div className="hero-note"><span className="note-check" aria-hidden="true"><Check size={12} /></span><span>{t("hero.note")}</span></div>
            </div>
            <div className="hero-visual" aria-label={t("hero.caption")}>
              <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="hero-spark spark-one" aria-hidden="true"><Asterisk size={19} /></div><div className="hero-spark spark-two" aria-hidden="true"><Sparkles size={15} /></div>
              <div className="floating-label label-match"><span className="label-icon teal-icon"><CalendarClock size={15} /></span><span><b>{t("hero.booking")}</b><small>{t("hero.preview")}</small></span></div>
              <div className="floating-label label-chat"><span className="chat-avatar"><MessageCircle size={14} /></span><span><b>{t("hero.chat")}</b><small>{t("hero.planned")}</small></span><span className="chat-dot" /></div>
              <Phone kind="discover" /><Phone kind="tracking" />
              <div className="hero-caption"><span className="caption-line" /><span>{t("hero.caption")}</span></div>
            </div>
          </div>
          <div className="hero-bottom wrap"><span>{t("hero.bottom")}</span><span className="bottom-rule" /><span>{t("hero.bottomNote")}</span><Asterisk className="bottom-cross" size={15} aria-hidden="true" /></div>
        </section>

        <section className="difference section-pad" id="about" aria-labelledby="difference-title">
          <div className="wrap"><div className="section-heading heading-split"><div><Eyebrow>{t("difference.eyebrow")}</Eyebrow><h2 id="difference-title">{t("difference.title1")}<br />{t("difference.title2")} <em>{t("difference.titleAccent")}</em></h2></div><p className="section-intro">{t("difference.intro")}</p></div>
            <div className="compare"><div className="compare-old"><div className="compare-kicker"><span className="compare-mark">{"\u2014"}</span> {t("difference.challenge")}</div><h3>{t("difference.challengeTitle")}</h3><ul>{challenges.map((item) => <li key={item}>{item}</li>)}</ul><div className="scribble" aria-hidden="true" /></div><div className="compare-new"><div className="compare-kicker"><span className="compare-mark"><ArrowUpRight size={12} /></span> {t("difference.approach")}</div><h3>{t("difference.approachTitle")}</h3><ul>{approach.map((item) => <li key={item}>{item}</li>)}</ul><div className="compare-stamp" aria-hidden="true"><span>{messages.difference.stamp[0]}<br />{messages.difference.stamp[1]}</span></div></div></div>
          </div>
        </section>

        <section className="how section-pad" id="how-it-works" aria-labelledby="how-title">
          <div className="wrap"><div className="section-heading heading-center"><Eyebrow>{t("how.eyebrow")}</Eyebrow><h2 id="how-title">{t("how.title1")} <em>{t("how.titleAccent")}</em></h2><p className="section-intro">{t("how.intro")}</p></div>
            <ol className="steps">{messages.steps.map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><span className="step-icon"><StepIcon index={index} /></span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
            <div className="steps-foot"><span className="steps-foot-mark"><Clock3 size={16} /></span><span>{t("how.deadline")}</span></div>
          </div>
        </section>

        <section className="patients section-pad" id="patients" aria-labelledby="patients-title">
          <div className="wrap patient-layout"><div className="patient-copy"><Eyebrow>{t("patients.eyebrow")}</Eyebrow><h2 id="patients-title">{t("patients.title1")}<br />{t("patients.title2")} <em>{t("patients.titleAccent")}</em></h2><p className="section-intro">{t("patients.intro")}</p>
            <ul className="feature-list">{messages.patients.features.map((feature, i) => <li key={feature}><span>0{i + 1}</span>{feature}</li>)}</ul>
            <div className="wallet-note"><WalletCards size={18} aria-hidden="true" /><span><b>{t("patients.walletTitle")}</b> {t("patients.walletText")}</span></div>
            <a className="text-link dark-link" href="#get-app">{t("patients.link")} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div><PatientShowcase /></div>
        </section>

        <section className="nurses section-pad" id="nurses" aria-labelledby="nurses-title">
          <div className="nurse-decoration" aria-hidden="true"><span /><span /><span /></div>
          <div className="wrap nurse-layout"><div className="nurse-copy"><Eyebrow light>{t("nurses.eyebrow")}</Eyebrow><h2 id="nurses-title">{t("nurses.title1")}<br />{t("nurses.title2")}<br /><em>{t("nurses.title3")}</em></h2><p className="nurse-lede">{t("nurses.intro")}</p>
            <div className="nurse-features">{messages.nurses.features.map((feature, i) => <div key={feature.title}><span className="nurse-feature-icon">0{i + 1}</span><span><b>{feature.title}</b><small>{feature.text}</small></span></div>)}</div>
            <div className="nurse-account-note"><CircleUserRound size={19} aria-hidden="true" /><span><b>{t("nurses.accountTitle")}</b> {t("nurses.accountText")}</span></div>
            <ArrowLink href="#how-it-works" light>{t("nurses.cta")}</ArrowLink>
          </div><NurseShowcase /></div>
        </section>

        <section className="online section-pad" aria-labelledby="online-title">
          <div className="wrap online-layout"><div className="online-copy"><Eyebrow><span className="coming-dot" /> {t("online.eyebrow")}</Eyebrow><h2 id="online-title">{t("online.title1")}<br />{t("online.title2")} <em>{t("online.titleAccent")}</em></h2><p className="section-intro">{t("online.intro")}</p>
          <div className="coming-soon"><span className="coming-icon"><Video size={16} /></span><span><b>{t("online.soon")}</b><small>{t("online.future")}</small></span></div><div className="online-tags">{messages.online.services.map((service) => <span key={service}>{service}</span>)}</div><p className="online-detail">{t("online.detail")}</p>
          </div><OnlineIllustration /></div>
        </section>

        <section className="trust section-pad" aria-labelledby="trust-title">
          <div className="wrap"><div className="trust-heading"><div><Eyebrow>{t("trust.eyebrow")}</Eyebrow><h2 id="trust-title">{t("trust.title1")}<br />{t("trust.title2")} <em>{t("trust.titleAccent")}</em></h2></div><p className="section-intro">{t("trust.intro")}</p></div>
            <div className="trust-grid">{messages.trust.principles.map((principle, index) => <article className="trust-item" key={principle.title}><LineIcon name={["verified","check","chat","bell","language","lock"][index]} /><div><h3>{principle.title}</h3><p>{principle.text}</p></div></article>)}</div>
            <div className="admin-note"><span className="admin-note-icon"><ClipboardList size={19} /></span><div><Eyebrow>{t("trust.adminEyebrow")}</Eyebrow><h3>{t("trust.adminTitle")}</h3><p>{t("trust.adminText")}</p></div></div>
            <div className="roadmap-note"><div><Eyebrow>{t("trust.roadmapEyebrow")}</Eyebrow><h3>{t("trust.roadmapTitle")}</h3><p>{t("trust.roadmapText")}</p></div><ul>{messages.trust.roadmap.map((item, index) => { const Icon = roadmapIcons[index]; return <li key={item}><Icon size={15} /> {item}</li>; })}</ul></div>
          </div>
        </section>

        <section className="closing section-pad" id="get-app" aria-labelledby="closing-title"><div className="closing-pattern" aria-hidden="true"><span /><span /><span /></div><div className="wrap closing-inner"><Wordmark light /><Eyebrow light>{t("closing.eyebrow")}</Eyebrow><h2 id="closing-title">{t("closing.title1")}<br />{t("closing.title2")} <em>{t("closing.titleAccent")}</em></h2><p>{t("closing.lede")}</p>
          <div className="launch-status"><span className="launch-status-dot" /> {t("closing.status")}</div>
          <div className="store-links"><div className="store-placeholder" aria-label={t("closing.soon") + " " + t("closing.play")}><span className="store-icon"><Download size={17} /></span><span><small>{t("closing.coming")}</small><b>{t("closing.play")}</b></span><i>{t("closing.soon")}</i></div><div className="store-placeholder" aria-label={t("closing.soon") + " " + t("closing.appStore")}><span className="store-icon"><Download size={17} /></span><span><small>{t("closing.coming")}</small><b>{t("closing.appStore")}</b></span><i>{t("closing.soon")}</i></div></div><div className="closing-footnote">{t("closing.footnote")}</div>
        </div><div className="closing-mark" aria-hidden="true">{"\u0645"}</div></section>
      </main>
      <footer className="site-footer"><div className="wrap footer-main"><div className="footer-brand"><Wordmark /><p>{t("footer.about")}</p></div><div className="footer-links"><div><b>{t("footer.explore")}</b><a href="#about">{t("nav.about")}</a><a href="#how-it-works">{t("footer.how")}</a><a href="#get-app">{t("footer.get")}</a></div><div><b>{t("footer.forYou")}</b><a href="#patients">{t("footer.patients")}</a><a href="#nurses">{t("footer.nurses")}</a><a href="#top">{t("footer.top")} <ArrowUpRight size={12} /></a></div></div></div><div className="wrap footer-bottom"><span>{t("footer.copyright")}</span><span>{t("footer.tagline")}</span></div></footer>
    </div>
  );
}

const stepIcons: LucideIcon[] = [CalendarPlus, ClipboardCheck, CreditCard, Navigation, DoorOpen, CircleCheck];

function StepIcon({ index }: { index: number }) {
  const Icon = stepIcons[index] ?? CircleCheck;
  return <Icon size={20} strokeWidth={1.7} aria-hidden="true" />;
}

function OnlineIllustration() {
  const { t, messages } = useI18n();
  const controls = [Mic, Camera, MessageCircle, PhoneOff];
  return (
    <div className="online-art" aria-label={t("online.preview")}>
      <div className="online-device online-booking-screen">
        <StatusBar />
        <div className="screen-nav"><ArrowLeft size={13} /><b>{t("phone.patient.title")}</b><Ellipsis size={14} /></div>
        <div className="online-mode"><span>{t("online.home")}</span><b>{t("online.online")}</b></div>
        <b className="online-question">{t("online.question")}</b>
        <div className="online-options">{messages.online.options.map((option, index) => <div key={option}>{option}<span>{index < 2 ? <Check size={10} /> : null}</span></div>)}</div>
        <div className="online-appointment"><span>{t("online.when")}<b>{t("online.time")}</b></span><span>{t("online.length")}<b>{t("online.duration")}</b></span><span>{t("online.address")}<b>{t("online.noAddress")}</b></span></div>
        <div className="online-find">{t("online.find")}</div>
        <AppTabs active="book" />
      </div>
      <div className="online-device online-video-screen">
        <div className="video-header"><span className="video-live-dot" /><span>{t("online.call")}</span><span className="video-timer" dir="ltr">{t("online.timer")}</span></div>
        <div className="video-window"><div className="video-person"><div className="person-hair" /><div className="person-face"><span className="person-eye eye-left" /><span className="person-eye eye-right" /><span className="person-smile" /></div><div className="person-neck" /><div className="person-body" /></div>
          <div className="online-you">{t("online.you")}</div><div className="online-nurse-name"><b>{t("online.callNurse")}</b><small>{t("online.callRole")}</small></div><div className="online-chat-bubble">{t("online.callMessage")}</div>
        </div>
        <div className="online-call-controls">{controls.map((Icon, index) => <span key={index}><i className={index === 3 ? "hangup" : ""}><Icon size={13} /></i><small>{messages.online.controls[index]}</small></span>)}</div>
      </div>
      <div className="video-orbit video-orbit-a" /><div className="video-orbit video-orbit-b" />
    </div>
  );
}


