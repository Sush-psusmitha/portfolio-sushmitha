import { useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PRODUCTS, CREAM } from "../data/products";
import { usePageTransition } from "../components/PageTransition";

const E = [0.16, 1, 0.3, 1];

function useFade(margin = "-60px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}

function GlobalStyles() {
  useEffect(() => {
    const s = document.createElement("style");
    s.id = "global-project-detail";
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      body {
        background: #0a0a0a;
        color: ${CREAM};
        overflow-x: hidden;
        margin: 0;
        padding: 0;
      }
      ::-webkit-scrollbar { display: none; }
      scrollbar-width: none;
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  return null;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { navigateWithTransition } = usePageTransition();
  const productIndex = PRODUCTS.findIndex((p) => p.id.toLowerCase() === id?.toLowerCase());
  const product = PRODUCTS[productIndex];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { ref: contentRef, inView: contentInView } = useFade();

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const nextProduct = PRODUCTS[(productIndex + 1) % PRODUCTS.length];

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full relative">
      <GlobalStyles />

      {/* Back Button */}
      <div className="fixed top-8 left-6 sm:left-10 lg:left-20 z-50">
        <button
          onClick={() => navigateWithTransition("/")}
          className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase py-3 px-6 rounded-full transition-all duration-300"
          style={{
            fontWeight: 400,
            color: product.accent,
            border: `1px solid ${product.accent}60`,
            background: `${product.accent}08`,
          }}>
          <motion.span
            className="inline-block"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.3, ease: E }}>
            ←
          </motion.span>
          Back to Projects
        </button>
      </div>

      {/* Hero Section */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at center, ${product.accent} 0%, #0a0a0a 70%)`,
            }}
          />
          <img
            src={product.mockup.src}
            alt={product.name}
            className="w-full h-full object-cover object-center filter blur-[2px] scale-110 opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: E, delay: 0.2 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-6"
            style={{ color: `${product.accent}90`, fontWeight: 300 }}>
            Case Study · {product.type}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: E, delay: 0.3 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(4rem, 10vw, 10rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: CREAM,
            }}>
            {product.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: E, delay: 0.6 }}
            className="mt-8 text-[1.1rem] sm:text-[1.3rem] font-light max-w-2xl mx-auto"
            style={{ color: "rgba(234,228,213,0.7)" }}>
            {product.hook}
          </motion.p>
          <motion.a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E, delay: 0.8 }}
            className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase py-3 px-6 rounded-full"
            style={{
              fontWeight: 400,
              color: product.accent,
              border: `1px solid ${product.accent}60`,
              background: `${product.accent}08`,
            }}>
            Visit Live Site ↗
          </motion.a>
        </div>
        
        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll to Explore</span>
          <div className="w-1px h-12 bg-linear-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#0a0a0a] pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-24">
          
          {/* Intro & Overview */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 50 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: E }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-7">
              <h2 className="text-[11px] tracking-[0.4em] uppercase mb-8" style={{ color: `${product.accent}90` }}>
                Overview
              </h2>
              <p className="text-[1.1rem] sm:text-[1.25rem] leading-relaxed font-light text-white/70" style={{ fontFamily: "'Geist', sans-serif" }}>
                {product.desc}
              </p>
            </div>
            
            <div className="lg:col-span-5">
              <h2 className="text-[11px] tracking-[0.4em] uppercase mb-8" style={{ color: `${product.accent}90` }}>
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                    style={{
                      border: `1px solid rgba(255,255,255,0.08)`,
                      color: "rgba(255,255,255,0.6)",
                      backgroundColor: "rgba(255,255,255,0.02)"
                    }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: E }}
            className="mt-24">
            <h2 className="text-[11px] tracking-[0.4em] uppercase mb-8" style={{ color: `${product.accent}90` }}>
              Key Contributions
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {product.highlights.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-5 pt-6 text-[0.98rem] leading-relaxed font-light text-white/60"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Geist', sans-serif" }}>
                  <span
                    className="text-[10px] tracking-[0.2em] pt-1"
                    style={{ color: `${product.accent}80`, fontWeight: 400 }}>
                    0{i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Project Showcase Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: E }}
            className="mt-32 w-full rounded-md overflow-hidden relative"
            style={{
              aspectRatio: "16/9",
              border: `1px solid rgba(255,255,255,0.05)`,
              background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)",
            }}>
            <img
              src={product.mockup.src}
              alt={`${product.name} Preview`}
              className="w-full h-full object-contain p-4 lg:p-8"
            />
          </motion.div>
        </div>

        {/* Next Project Footer */}
        <div className="border-t border-white/5 mt-20" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-24 flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase mb-8 text-white/30">
            Next Project
          </span>
          <button
            onClick={() => navigateWithTransition(`/${nextProduct.id}`)}
            className="group outline-none">
            <h2
              className="transition-colors duration-500"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 7rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "rgba(234,228,213,0.3)",
              }}>
              <span className="group-hover:text-white transition-colors duration-500">{nextProduct.name}</span>
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
}
