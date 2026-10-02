import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// ─── Site-wide tokens ─────────────────────────────────────────────────────────
const OR     = "#8B5CF6";
const OR_RGB = "139,92,246";
const BG     = "#0a0a0a";
const CREAM  = "#EAE4D5";
const E      = [0.16, 1, 0.3, 1];

// ─── Education (chronological) ────────────────────────────────────────────────
const EDUCATION = [
  {
    id: "bcom",
    title: "Bachelor of Commerce",
    short: "B.Com",
    institution: "Undergraduate Degree",
    status: "Completed",
    current: false,
  },
  {
    id: "nxtwave",
    title: "Frontend Development Program",
    short: "NxtWave",
    institution: "NxtWave · Online Learning Platform",
    status: "Completed",
    current: false,
  },
  {
    id: "mca",
    title: "Master of Computer Applications",
    short: "MCA",
    institution: "Online / Distance Education",
    status: "Currently Pursuing",
    current: true,
  },
];

// ─── Entry ────────────────────────────────────────────────────────────────────
function EducationItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const accent = item.current ? OR : `rgba(${OR_RGB},0.55)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: E, delay: index * 0.08 }}
      className="relative grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 pb-16 last:pb-0"
    >
      {/* Node */}
      <div className="relative flex justify-center" style={{ width: 20 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: E, delay: 0.15 + index * 0.08 }}
          style={{
            width: 11, height: 11, marginTop: 10, borderRadius: "50%",
            background: item.current ? OR : BG,
            border: `1px solid ${accent}`,
            boxShadow: item.current ? `0 0 14px 3px rgba(${OR_RGB},0.45)` : "none",
            animation: item.current ? "edu-pulse 1.8s ease-in-out infinite" : "none",
            position: "relative", zIndex: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    700,
            fontSize:      11,
            letterSpacing: "0.22em",
            color:         `rgba(${OR_RGB},0.45)`,
          }}>0{index + 1}</span>
          <span style={{
            fontFamily:    "'Barlow', sans-serif",
            fontWeight:    400,
            fontSize:      9,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color:         item.current ? OR : "rgba(234,228,213,0.45)",
            border:        `1px solid ${item.current ? `rgba(${OR_RGB},0.45)` : "rgba(255,255,255,0.10)"}`,
            background:    item.current ? `rgba(${OR_RGB},0.08)` : "transparent",
            borderRadius:  999,
            padding:       "5px 12px",
          }}>{item.status}</span>
        </div>

        <h3 style={{
          fontFamily:    "'Barlow Condensed', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(2.2rem, 5.5vw, 4.6rem)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          lineHeight:    0.9,
          color:         item.current ? CREAM : "rgba(234,228,213,0.85)",
          margin:        0,
        }}>
          {item.short}
        </h3>

        <p style={{
          fontFamily:    "'Barlow', sans-serif",
          fontWeight:    400,
          fontSize:      "clamp(0.9rem, 1.4vw, 1.05rem)",
          letterSpacing: "0.02em",
          color:         "rgba(234,228,213,0.70)",
          margin:        0,
        }}>
          {item.title}
        </p>

        <p style={{
          fontFamily:    "'Barlow', sans-serif",
          fontWeight:    300,
          fontSize:      11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         "rgba(234,228,213,0.38)",
          margin:        0,
        }}>
          {item.institution}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EducationSection() {
  const ref = useRef(null);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const sp = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const lineH = useTransform(sp, [0, 1], ["0%", "100%"]);
  const ghostY = useTransform(sp, [0, 1], [40, -40]);

  const hPad = "clamp(24px, 8vw, 120px)";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: BG, paddingLeft: hPad, paddingRight: hPad, paddingTop: "18vh", paddingBottom: "22vh" }}
    >
      <style>{`@keyframes edu-pulse{0%,100%{box-shadow:0 0 14px 3px rgba(${OR_RGB},0.45)}50%{box-shadow:0 0 4px 1px rgba(${OR_RGB},0.15)}}`}</style>

      {/* Ghost word */}
      <motion.div
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          right: "-2vw", top: "12%", y: ghostY,
          fontFamily:       "'Barlow Condensed', sans-serif",
          fontWeight:       900,
          fontSize:         "clamp(8rem, 16vw, 16rem)",
          lineHeight:       0.85,
          letterSpacing:    "-0.04em",
          color:            "transparent",
          WebkitTextStroke: `1px rgba(${OR_RGB},0.16)`,
        }}
      >
        LEARN
      </motion.div>

      {/* Header */}
      <div ref={headRef} className="relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
          className="flex items-center gap-4 mb-6"
        >
          <div style={{ width: 24, height: 1, background: OR, opacity: 0.6 }} />
          <span style={{
            fontFamily:    "'Barlow', sans-serif",
            fontWeight:    400,
            fontSize:      10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color:         `rgba(${OR_RGB},0.60)`,
          }}>04 / Education</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: E, delay: 0.1 }}
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            lineHeight:    0.88,
            color:         "rgba(234,228,213,0.95)",
            margin:        0,
          }}
        >
          Always <span style={{ color: OR }}>learning.</span>
        </motion.h2>
      </div>

      {/* Timeline */}
      <div ref={ref} className="relative z-10" style={{ maxWidth: 860 }}>
        {/* Track + animated fill, centred on the 20px node column */}
        <div
          className="absolute pointer-events-none"
          style={{ left: 9.5, top: 14, bottom: 0, width: 1, background: "rgba(255,255,255,0.06)" }}
        >
          <motion.div style={{
            width: "100%", height: lineH,
            background: `linear-gradient(to bottom, rgba(${OR_RGB},0.15), rgba(${OR_RGB},0.65))`,
          }} />
        </div>

        {EDUCATION.map((item, i) => (
          <EducationItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
