import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";

const flowCards = [
  {
    key: "signal",
    title: "Intent Signal",
    eyebrow: "Signal",
    icon: Zap,
    iconClass:
      "bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 group-hover:bg-blue-100",
    content: "High Activity: Security/Pricing",
    detail: "92 Intent Score",
    accent: "3x pricing visits in the last 48 hours",
    chips: ["Pricing page", "Security docs", "VP Ops browsing"],
  },
  {
    key: "context",
    title: "Account Context",
    eyebrow: "Context",
    icon: Search,
    iconClass:
      "bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-100 group-hover:bg-sky-100",
    content: "CloudOps Inc. ($50M+ ARR)",
    detail: "Likely SOC 2 Audit Cycle",
    accent: "Recent headcount growth + enterprise expansion suggest a compliance push",
    chips: ["Series C", "Security buyer", "Mid-market"],
  },
  {
    key: "play",
    title: "Suggested Play",
    eyebrow: "Action",
    icon: Play,
    iconClass:
      "bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 group-hover:bg-indigo-100",
    content: "Run 'SOC 2 Urgency' Playbook",
    detail: "Recommended next step",
    accent: "Multi-thread security, finance, and operations with urgency-led messaging",
    chips: ["87% match", "3 stakeholders", "High confidence"],
  },
  {
    key: "campaign",
    title: "Campaign Ready",
    eyebrow: "Campaign",
    icon: Mail,
    iconClass:
      "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100 group-hover:bg-emerald-100",
  },
  {
    key: "outcome",
    title: "Pipeline Created",
    eyebrow: "Outcome",
    icon: Target,
    iconClass:
      "bg-green-50 text-green-600 ring-1 ring-inset ring-green-100 group-hover:bg-green-100",
    content: "Demo Meeting Booked",
    detail: "$30k ARR Opp",
    accent: "Opportunity created and routed to the owning AE with next steps already synced",
    chips: ["Qualified", "MedDPICC started", "AE notified"],
  },
];

const comparisonColumns = [
  {
    key: "manual",
    title: "Manual Outreach",
    description:
      "Teams piece signals together manually, burn rep time on research, and lose momentum before outreach is ready.",
    theme:
      "border-rose-200 bg-gradient-to-br from-white via-rose-50/60 to-slate-100",
    badge: "Reactive",
    badgeClass: "bg-rose-100 text-rose-700",
    textClass: "text-slate-700",
    iconWrap: "bg-rose-100 text-rose-600",
    points: [
      {
        icon: Clock3,
        label: "Research Time",
        value: "45-60 min/account",
      },
      {
        icon: UserRound,
        label: "Personalization",
        value: "Often generic or stale",
      },
      {
        icon: TrendingUp,
        label: "Pipeline Velocity",
        value: "Slow, rep dependent",
      },
    ],
  },
  {
    key: "automation",
    title: "Signal-to-Action",
    description:
      "Signals, context, and execution stay connected so reps move from intent detection to booked pipeline without dead time.",
    theme:
      "border-blue-200 bg-gradient-to-br from-white via-sky-50/70 to-emerald-50/70",
    badge: "Proactive",
    badgeClass: "bg-blue-100 text-blue-700",
    textClass: "text-slate-700",
    iconWrap: "bg-emerald-100 text-emerald-600",
    points: [
      {
        icon: Sparkles,
        label: "Research Time",
        value: "Auto-enriched in seconds",
      },
      {
        icon: ShieldCheck,
        label: "Personalization",
        value: "Context-rich and account-aware",
      },
      {
        icon: TrendingUp,
        label: "Pipeline Velocity",
        value: "Faster, consistent execution",
      },
    ],
  },
];

function FlowCard({
  children,
  className = "",
  detail,
  content,
  accent,
  chips,
  eyebrow,
  title,
  icon: Icon,
  iconClass,
  showConnector,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`group relative flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_24px_65px_-30px_rgba(37,99,235,0.2)] ${className}`}
    >
      {showConnector ? (
        <div className="pointer-events-none absolute -right-3 top-10 z-20 hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm xl:flex">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      ) : null}

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
            {title}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {content ? (
        <p className="text-sm font-medium leading-6 text-slate-800">{content}</p>
      ) : null}

      {detail ? (
        <div className="mt-3 inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {detail}
        </div>
      ) : null}

      {accent ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">{accent}</p>
      ) : null}

      {chips?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              {chip}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto pt-5">{children}</div>
    </motion.div>
  );
}

function ComparisonCard({
  title,
  description,
  theme,
  badge,
  badgeClass,
  textClass,
  iconWrap,
  points,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className={`rounded-[28px] border p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.3)] ${theme}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">{title}</p>
          <p className={`mt-2 text-sm leading-6 ${textClass}`}>{description}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {badge}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {points.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-3 backdrop-blur-sm"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconWrap}`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SignalToActionDashboard() {
  const [launchState, setLaunchState] = useState("idle");

  useEffect(() => {
    if (launchState !== "loading") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setLaunchState("success");
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [launchState]);

  const launchButtonLabel =
    launchState === "loading"
      ? "Sending..."
      : launchState === "success"
        ? "Sent!"
        : "Launch Sequence";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 [background-image:radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.1),_transparent_24%)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Signal-to-Action Automation
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Turn buying signals into pipeline without losing context.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A high-fidelity B2B SaaS workflow that connects intent, account
            intelligence, AI-recommended plays, campaign launch, and revenue
            outcomes in one clean operating surface.
          </p>
        </motion.div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[72px] hidden h-px bg-gradient-to-r from-blue-100 via-slate-200 to-emerald-100 xl:block" />

          <div className="grid gap-5 xl:grid-cols-[1.05fr_1.1fr_1.05fr_1.3fr_1.05fr]">
            <FlowCard
              index={0}
              showConnector
              {...flowCards[0]}
            />

            <FlowCard
              index={1}
              showConnector
              {...flowCards[1]}
            />

            <FlowCard
              index={2}
              showConnector
              {...flowCards[2]}
            >
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800"
              >
                <Play className="h-4 w-4" />
                Execute Playbook
              </button>
            </FlowCard>

            <FlowCard
              index={3}
              showConnector
              eyebrow={flowCards[3].eyebrow}
              title={flowCards[3].title}
              icon={flowCards[3].icon}
              iconClass={flowCards[3].iconClass}
              className="overflow-hidden"
            >
              <div className="-mx-1 rounded-[24px] border border-blue-100 bg-gradient-to-br from-slate-50 to-white p-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Email Preview
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      Subject: SOC 2 for CloudOps...
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    Ready to send
                  </span>
                </div>

                <div className="space-y-3 pt-4 text-sm leading-6 text-slate-600">
                  <p>
                    Hi{" "}
                    <span className="font-semibold text-blue-600">[Name]</span>,
                    I noticed{" "}
                    <span className="font-semibold text-blue-600">
                      [Company]
                    </span>{" "}
                    has been looking at pricing and security resources.
                  </p>
                  <p>
                    Teams heading into a SOC 2 cycle usually want to tighten
                    buyer confidence before procurement slows things down.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (launchState === "idle") {
                      setLaunchState("loading");
                    }
                  }}
                  disabled={launchState !== "idle"}
                  aria-busy={launchState === "loading"}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed ${
                    launchState === "success"
                      ? "bg-emerald-500 text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.8)]"
                      : launchState === "loading"
                        ? "bg-slate-900 text-white"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_16px_30px_-18px_rgba(37,99,235,0.65)] hover:from-blue-500 hover:to-cyan-400"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={launchState}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex items-center gap-2"
                      aria-live="polite"
                    >
                      {launchState === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : launchState === "success" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                      {launchButtonLabel}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </FlowCard>

            <FlowCard
              index={4}
              {...flowCards[4]}
            >
              <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Revenue Impact
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-900">
                  $30k ARR Opp
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-800/80">
                  Opportunity sourced from an automated signal, personalized
                  sequence, and timely handoff.
                </p>
              </div>
            </FlowCard>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="mt-10 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.22)] backdrop-blur-sm sm:p-8"
        >
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Comparison
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Manual motion vs. signal-driven execution
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              The delta is not just speed. It is the quality of context, the
              consistency of follow-through, and how quickly intent becomes
              pipeline.
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {comparisonColumns.map((column) => (
              <ComparisonCard key={column.key} {...column} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
