"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  RiDashboardFill,
  RiTeamFill,
  RiShoppingBag3Fill,
  RiBarChart2Fill,
  RiSettings3Fill,
  RiCalendarEventFill,
  RiStore3Fill,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiSearchLine,
  RiArrowUpLine,
  RiArrowDownSFill,
  RiCheckLine,
  RiFlashlightFill,
  RiSparkling2Line
} from "react-icons/ri";
import styles from "./page.module.css";

type NavigationItem = {
  label: string;
  icon: IconType;
  section: string;
  badge?: string;
};

const navigationItems: NavigationItem[] = [
  { label: "Overview", icon: RiDashboardFill, section: "overview" },
  { label: "Sales & POS", icon: RiStore3Fill, section: "pos", badge: "Live" },
  { label: "Supply Chain", icon: RiShoppingBag3Fill, section: "supply" },
  { label: "Teams", icon: RiTeamFill, section: "teams" },
  { label: "Analytics", icon: RiBarChart2Fill, section: "analytics" },
  { label: "Scheduling", icon: RiCalendarEventFill, section: "schedule" },
  { label: "Admin & Controls", icon: RiSettings3Fill, section: "admin" }
];

const kpis = [
  {
    title: "Revenue Run Rate",
    value: "$2.4M",
    subtitle: "Projected Q4",
    trend: "+12.4%",
    trendDirection: "up" as const,
    progress: 72
  },
  {
    title: "Net Payment Volume",
    value: "$187.2K",
    subtitle: "Last 7 days",
    trend: "+4.1%",
    trendDirection: "up" as const,
    progress: 54
  },
  {
    title: "Inventory Health Score",
    value: "94%",
    subtitle: "Across 3 regions",
    trend: "-1.8%",
    trendDirection: "down" as const,
    progress: 94
  },
  {
    title: "POS Conversion",
    value: "68%",
    subtitle: "Omnichannel impact",
    trend: "+6.7%",
    trendDirection: "up" as const,
    progress: 68
  }
];

const timelineEvents = [
  {
    title: "Digital invoice approved",
    meta: "Amelia Loft • 3 mins ago",
    detail: "PO-8842 consolidated and routed to supplier network."
  },
  {
    title: "Realtime POS sync",
    meta: "5 flagship stores • 47 mins ago",
    detail: "Inventory snapshots reconciled across retail touchpoints."
  },
  {
    title: "Gemini forecast exported",
    meta: "AI Copilot • 2 hours ago",
    detail: "Revenue forecast scenario v3 pushed to analytics workspace."
  }
];

const teamMembers = [
  { name: "Priya Shah", role: "Head of Operations", status: "In Strategy" },
  { name: "Diego Ramirez", role: "Retail Technology", status: "Reviewing POS" },
  { name: "Harper Quinn", role: "Finance Lead", status: "Reconciling" },
  { name: "Felix Nguyen", role: "Inventory Systems", status: "Sync in progress" }
];

const posProducts = [
  { name: "Aurora Headphones", sku: "AUR-512", price: 249, category: "Audio" },
  { name: "Nimbus VR Pack", sku: "NMB-904", price: 699, category: "Immersive" },
  { name: "Helio Watch 4", sku: "HEL-410", price: 329, category: "Wearables" },
  { name: "Prism Tablet", sku: "PRS-642", price: 489, category: "Productivity" },
  { name: "Vanta Studio Mic", sku: "VNT-220", price: 189, category: "Audio" },
  { name: "Flux Drone", sku: "FLX-740", price: 1299, category: "Autonomy" }
];

const posCart = [
  { name: "Aurora Headphones", qty: 2, price: 249 },
  { name: "Helio Watch 4", qty: 1, price: 329 },
  { name: "Flux Drone", qty: 1, price: 1299 }
];

const abbreviate = (value: string) =>
  value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Page() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [posActive, setPosActive] = useState(false);

  const cartSummary = useMemo(() => {
    const subtotal = posCart.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;
    return {
      subtotal,
      tax,
      total
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}>
          <div className={styles.sidebarHeader}>
            {!sidebarCollapsed && (
              <div className={styles.brand}>
                <span>OrionOS</span>
                <span className={styles.brandBadge}>ERP + POS</span>
              </div>
            )}
            <button
              className={styles.collapseButton}
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? <RiMenuUnfoldLine size={22} /> : <RiMenuFoldLine size={22} />}
            </button>
          </div>

          <div className={styles.navGroup}>
            {!sidebarCollapsed && <span className={styles.navSectionLabel}>Navigation</span>}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.section;
              return (
                <motion.button
                  key={item.section}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveSection(item.section);
                    if (item.section === "pos") {
                      setPosActive(true);
                    }
                  }}
                >
                  <span className={styles.navItemContent}>
                    <Icon className={styles.navIcon} />
                    {!sidebarCollapsed && <span className={styles.navLabel}>{item.label}</span>}
                    {!sidebarCollapsed && item.badge && (
                      <span className={styles.navBadge}>{item.badge}</span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </aside>

        <main className={styles.mainArea}>
          <div className={styles.topBar}>
            <div className={styles.searchBar}>
              <RiSearchLine size={20} color="rgba(100,116,139,0.65)" />
              <input className={styles.searchInput} placeholder="Search intelligence, teams, or workflows" />
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.pulseButton}
                onClick={() => setPosActive(true)}
                aria-label="Launch POS"
              >
                Launch POS
              </button>
              <div className={styles.avatar}>PS</div>
            </div>
          </div>

          <section className={styles.dashboardContent}>
            <div style={{ gridColumn: "span 12" }}>
              <motion.div
                className={styles.card}
                transition={{ duration: 0.4, ease: "easeOut" }}
                layout
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Enterprise Command Center</h2>
                    <p className={styles.cardSubtitle}>
                      Unified oversight for finance, operations, inventory, and empowered POS.
                    </p>
                  </div>
                  <div className={styles.floatingChip}>
                    <RiSparkling2Line size={18} />
                    Gemini Insights Active
                  </div>
                </div>
                <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}>
                  {kpis.map((kpi) => (
                    <motion.div key={kpi.title} layout className={styles.card} style={{ padding: "20px" }}>
                      <div className={styles.cardHeader}>
                        <div>
                          <div className={styles.cardTitle}>{kpi.title}</div>
                          <div className={styles.cardSubtitle}>{kpi.subtitle}</div>
                        </div>
                        <span
                          className={`${styles.kpiTrend} ${
                            kpi.trendDirection === "up" ? styles.kpiTrendUp : styles.kpiTrendDown
                          }`}
                        >
                          {kpi.trendDirection === "up" ? (
                            <RiArrowUpLine size={18} />
                          ) : (
                            <RiArrowDownSFill size={18} />
                          )}
                          {kpi.trend}
                        </span>
                      </div>
                      <div className={styles.kpiValue}>{kpi.value}</div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${kpi.progress}%` }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: "24px" }}>
              <motion.div className={styles.card} layout>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>Operational Pulse</h3>
                    <p className={styles.cardSubtitle}>Real-time telemetry across regions</p>
                  </div>
                  <span className={styles.statusPill}>
                    <RiFlashlightFill size={16} />
                    Hyper-sync
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "16px" }}>
                  {[
                    { label: "Live stores", value: "128", delta: "+6 open" },
                    { label: "Digital SKUs", value: "34.2K", delta: "Updated 12m ago" },
                    { label: "Fulfillment SLA", value: "96%", delta: "AI assist engaged" }
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div className={styles.cardSubtitle}>{item.label}</div>
                      <div className={styles.kpiValue} style={{ fontSize: "1.6rem" }}>
                        {item.value}
                      </div>
                      <span style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>{item.delta}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className={styles.card} layout>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>Intelligence Timeline</h3>
                    <p className={styles.cardSubtitle}>Curated actions from AI copilots</p>
                  </div>
                </div>
                <div className={styles.timeline}>
                  {timelineEvents.map((event) => (
                    <div key={event.title} className={styles.timelineItem}>
                      <div className={styles.timelineBar}>
                        <div className={styles.timelineDot} />
                      </div>
                      <div className={styles.timelineContent}>
                        <strong>{event.title}</strong>
                        <span className={styles.timelineMeta}>{event.meta}</span>
                        <span style={{ color: "var(--color-muted)" }}>{event.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: "24px" }}>
              <motion.div className={styles.card} layout>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>Workflow Signals</h3>
                    <p className={styles.cardSubtitle}>Prioritized by Gemini and Grok</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {[
                    { label: "Cross-channel promotion uplift", state: "Ready", urgency: "High" },
                    { label: "Auto-replenish threshold recalibration", state: "In Review", urgency: "Medium" },
                    { label: "POS layout optimization", state: "Scheduled", urgency: "Low" }
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 18px",
                        background: "rgba(37,99,235,0.08)",
                        borderRadius: "16px",
                        border: "1px solid rgba(37, 99, 235, 0.12)"
                      }}
                    >
                      <RiCheckLine size={18} color="var(--color-primary)" />
                      <span style={{ flex: 1, fontWeight: 600 }}>{item.label}</span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(30, 41, 59, 0.7)"
                        }}
                      >
                        {item.state}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className={styles.card} layout>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>Leadership Pods</h3>
                    <p className={styles.cardSubtitle}>Adaptive teams with live status</p>
                  </div>
                </div>
                <div className={styles.teamGrid}>
                  {teamMembers.map((member) => (
                    <div key={member.name} className={styles.teamCard}>
                      <div className={styles.teamAvatar}>{abbreviate(member.name)}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <strong>{member.name}</strong>
                        <span style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
                          {member.role}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--color-primary)" }}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className={styles.footerStats}>
            {[
              { label: "AI recommendations executed", value: "482", detail: "Past 30 days" },
              { label: "Omnichannel NPS", value: "72", detail: "Customer feedback" },
              { label: "POS uptime", value: "99.98%", detail: "Global infrastructure" }
            ].map((item) => (
              <div key={item.label} className={styles.footerCard}>
                <span className={styles.footerLabel}>{item.label}</span>
                <span className={styles.footerValue}>{item.value}</span>
                <span style={{ color: "var(--color-muted)" }}>{item.detail}</span>
              </div>
            ))}
          </section>
        </main>
      </div>

      <AnimatePresence>
        {posActive && (
          <motion.div
            className={styles.posOverlay}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <button className={styles.posClose} onClick={() => setPosActive(false)}>
              ×
            </button>
            <div className={styles.posShell}>
              <aside className={styles.posSidebar}>
                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "8px" }}>POS Matrix</div>
                  <div style={{ color: "rgba(241,245,249,0.8)" }}>
                    Smart lanes synchronized with ERP, loyalty, and real-time inventory insights.
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { label: "Quick serve", value: "4 terminals" },
                    { label: "Line busting", value: "Gemini assist" },
                    { label: "Returns intelligence", value: "AI risk review" }
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "rgba(15, 23, 42, 0.45)",
                        borderRadius: "18px",
                        padding: "18px",
                        border: "1px solid rgba(255,255,255,0.08)"
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "rgba(203,213,225,0.9)" }}>{item.label}</div>
                      <div style={{ fontWeight: 600, fontSize: "1.1rem", marginTop: "6px" }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </aside>

              <div className={styles.posMain}>
                <div className={styles.posHeader}>
                  <div>
                    <h2 style={{ margin: 0, fontWeight: 700 }}>Integrated POS Stage</h2>
                    <span style={{ fontSize: "0.9rem", color: "rgba(241,245,249,0.7)" }}>
                      Unified checkout flows with loyalty, financing, and omnichannel inventory.
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className={styles.statusPill}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#22c55e" }} />
                      Live Sync
                    </span>
                  </div>
                </div>

                <div className={styles.posItems}>
                  {posProducts.map((product) => (
                    <motion.div key={product.sku} className={styles.posItemCard} whileHover={{ scale: 1.02 }}>
                      <div style={{ fontSize: "0.8rem", color: "rgba(226,232,240,0.7)", letterSpacing: "0.04em" }}>
                        {product.category}
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{product.name}</div>
                      <div style={{ fontSize: "0.9rem", color: "rgba(148,163,184,0.9)" }}>{product.sku}</div>
                      <div style={{ marginTop: "auto", fontWeight: 700, fontSize: "1.1rem" }}>
                        ${product.price}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.posCart}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "1.1rem" }}>Cart Overview</strong>
                    <span style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.72)" }}>
                      Session 1048 • Gemini assisted
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {posCart.map((item) => (
                      <div
                        key={item.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          paddingBottom: "12px",
                          borderBottom: "1px solid rgba(148,163,184,0.18)"
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "14px",
                            background: "rgba(37,99,235,0.28)",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 600
                          }}
                        >
                          {item.qty}×
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.8)" }}>
                            Smart discount auto-applied
                          </div>
                        </div>
                        <div style={{ fontWeight: 600 }}>${item.price * item.qty}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(226,232,240,0.7)" }}>
                      <span>Subtotal</span>
                      <span>${cartSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(226,232,240,0.7)" }}>
                      <span>Tax</span>
                      <span>${cartSummary.tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem" }}>
                      <span>Total</span>
                      <span>${cartSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: "12px",
                      padding: "16px 20px",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, #38bdf8, #6366f1)",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 20px 65px rgba(59,130,246,0.35)"
                    }}
                  >
                    Complete Transaction
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
