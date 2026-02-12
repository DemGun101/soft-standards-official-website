"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import gsap from "gsap";

const ORIGINAL_TITLE_LINE1 = "Your marketing isn\u2019t broken.";
const ORIGINAL_TITLE_LINE2 = "You just don\u2019t have a system.";

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function Hero() {
  const [mode, setMode] = useState<"default" | "chat">("default");
  const [isHovered, setIsHovered] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const sparkleRef = useRef<SVGSVGElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  // GSAP sparkle vectors around button right edge
  const initSparkles = useCallback(() => {
    if (!sparkleRef.current || gsapCtxRef.current) return;
    gsapCtxRef.current = gsap.context(() => {
      const svg = sparkleRef.current!;

      // Dot 1 — traces top-right arc
      const dot1 = svg.querySelector(".spark-dot-1");
      // Dot 2 — traces bottom-right arc
      const dot2 = svg.querySelector(".spark-dot-2");
      // Small cross/star vector at top-right
      const star1 = svg.querySelector(".spark-star-1");
      // Small cross/star vector at bottom-right
      const star2 = svg.querySelector(".spark-star-2");
      // Arc path strokes
      const arc1 = svg.querySelector(".spark-arc-1");
      const arc2 = svg.querySelector(".spark-arc-2");

      // Arc stroke-dashoffset animation (drawing in)
      if (arc1) {
        gsap.set(arc1, { strokeDasharray: 40, strokeDashoffset: 40 });
        gsap.to(arc1, {
          strokeDashoffset: 0,
          duration: 1.2,
          repeat: -1,
          repeatDelay: 2.5,
          ease: "power2.inOut",
          yoyo: true,
        });
      }
      if (arc2) {
        gsap.set(arc2, { strokeDasharray: 40, strokeDashoffset: 40 });
        gsap.to(arc2, {
          strokeDashoffset: 0,
          duration: 1.2,
          delay: 0.6,
          repeat: -1,
          repeatDelay: 2.5,
          ease: "power2.inOut",
          yoyo: true,
        });
      }

      // Dots pulse + subtle float
      [dot1, dot2].forEach((dot, i) => {
        if (!dot) return;
        gsap.to(dot, {
          scale: 1.8,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          delay: i * 0.7,
          ease: "power1.out",
          transformOrigin: "center center",
        });
      });

      // Stars rotate + fade
      [star1, star2].forEach((star, i) => {
        if (!star) return;
        gsap.fromTo(
          star,
          { opacity: 0, scale: 0.3, rotation: 0 },
          {
            opacity: 1,
            scale: 1,
            rotation: 90,
            duration: 1,
            repeat: -1,
            repeatDelay: 2.8,
            delay: i * 1.2 + 0.5,
            yoyo: true,
            ease: "power2.inOut",
            transformOrigin: "center center",
          },
        );
      });
    }, sparkleRef);
  }, []);

  // Start / kill GSAP based on hover & mode
  useEffect(() => {
    if (!isHovered && mode === "default") {
      initSparkles();
    } else if (gsapCtxRef.current) {
      gsapCtxRef.current.revert();
      gsapCtxRef.current = null;
    }
    return () => {
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
    };
  }, [isHovered, mode, initSparkles]);

  const { messages, sendMessage, setMessages, status } = useChat({
    onError: () => {
      // Prevent unhandled errors from crashing the component
    },
  });

  const isStreaming = status === "streaming" || status === "submitted";

  const lastAssistantMessage = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  const assistantText = lastAssistantMessage
    ? lastAssistantMessage.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("")
    : "";

  // Split AI response into headline (line 1) and subtitle (line 3+)
  const aiLines = assistantText.split("\n").filter(Boolean);
  const aiHeadline = aiLines[0] || "";
  const aiSubtitle = aiLines.slice(1).join(" ").trim();

  const showAiResponse = mode === "chat" && (assistantText || isStreaming);

  useEffect(() => {
    if (mode === "chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (mode === "default") setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (mode === "default") setIsHovered(false);
    }, 200);
  };

  const enterChatMode = () => {
    setMode("chat");
    setIsHovered(false);
  };

  const exitChatMode = () => {
    setMode("default");
    setMessages([]);
    setInput("");
    setIsHovered(false);
  };

  const submitMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    try {
      sendMessage({ text: trimmed });
    } catch {
      // silently handle — onError callback will fire
    }
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitMessage();
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pt-28 pb-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-[800px] text-center">
          {/* Headline with glow anchored directly to it */}
          <div className="relative inline-block w-full">
            {/* Core glow -- circular, centered on headline */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 700,
                height: 700,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(123,97,255,0.22) 0%, rgba(123,97,255,0.08) 40%, rgba(123,97,255,0.02) 65%, transparent 80%)",
              }}
            />

            {/* Animated title area */}
            <div
              className="relative mb-8"
              style={{ minHeight: "clamp(120px, 15vw, 180px)" }}
            >
              <AnimatePresence mode="wait">
                {showAiResponse ? (
                  <motion.div
                    key="ai-response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                      {aiHeadline}
                      {isStreaming && !aiSubtitle && (
                        <span className="ml-2 inline-flex items-center gap-1 align-middle">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="inline-block h-2 w-2 rounded-full bg-accent"
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.8, 1.1, 0.8],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </span>
                      )}
                    </h1>
                  </motion.div>
                ) : (
                  <motion.h1
                    key="original-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease }}
                    className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.03em]"
                  >
                    {ORIGINAL_TITLE_LINE1}
                    <br />
                    <span className="font-serif italic font-normal text-muted">
                      {ORIGINAL_TITLE_LINE2}
                    </span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Animated subtitle area */}
          <div style={{ minHeight: 60 }}>
            <AnimatePresence mode="wait">
              {showAiResponse ? (
                <motion.p
                  key="ai-subtitle"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: 0.1, ease }}
                  className="mx-auto mb-12 max-w-[540px] text-[17px] leading-[1.7] text-muted"
                >
                  {aiSubtitle}
                  {isStreaming && aiSubtitle && (
                    <span className="ml-1.5 inline-flex items-center gap-1 align-middle">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.1, 0.8],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </span>
                  )}
                </motion.p>
              ) : (
                <motion.p
                  key="original-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{
                    duration: 0.7,
                    delay:
                      mode === "default" && messages.length === 0 ? 0.3 : 0,
                  }}
                  className="mx-auto mb-12 max-w-[480px] text-[17px] leading-[1.7] text-muted"
                >
                  Brand. Website. Ads. Automation.
                  <br />
                  Built in 30 days. You only pay if it works.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Area -- Cell Division Button + Chat Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {mode === "chat" ? (
                /* Chat Input Mode */
                <motion.div
                  key="chat-input"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative mx-auto w-full max-w-[560px]"
                >
                  {/* Close button */}
                  <button
                    onClick={exitChatMode}
                    className="absolute -top-10 right-0 flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-card hover:text-foreground"
                    aria-label="Close chat"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="relative">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Ask us anything..."
                      className="w-full rounded-[50px] border-2 border-accent bg-background px-7 py-4 pr-14 text-[15px] text-foreground shadow-[0_0_30px_rgba(123,97,255,0.15)] outline-none transition-shadow duration-300 placeholder:text-muted/60 focus:shadow-[0_0_40px_rgba(123,97,255,0.25)]"
                    />
                    <button
                      type="button"
                      onClick={submitMessage}
                      disabled={isStreaming || !input.trim()}
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white transition-all duration-200 hover:bg-accent-hover disabled:opacity-40"
                      aria-label="Send message"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Cell Division Button */
                <motion.div
                  key="cta-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ padding: 12 }}
                >
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{ gap: isHovered ? 6 : 0 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {/* Left half -- Book button + GSAP sparkle vectors */}
                    <div className="relative">
                      <motion.a
                        href="#booking"
                        className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap bg-accent text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-accent-hover"
                        animate={{
                          borderRadius: isHovered
                            ? "50px 6px 6px 50px"
                            : "50px",
                          paddingLeft: isHovered ? 32 : 40,
                          paddingRight: isHovered ? 20 : 24,
                          paddingTop: 16,
                          paddingBottom: 16,
                        }}
                        transition={{ duration: 0.4, ease }}
                        style={{ boxShadow: "0 0 0 0 transparent" }}
                        whileHover={{
                          boxShadow: "0 0 40px rgba(123,97,255,0.3)",
                        }}
                      >
                        Book Your Free Audit
                        <motion.svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          animate={{
                            opacity: isHovered ? 0 : 1,
                            width: isHovered ? 0 : 16,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </motion.svg>
                      </motion.a>

                      {/* GSAP sparkle vectors — overlaid on the full button area */}
                      <motion.svg
                        ref={sparkleRef}
                        className="pointer-events-none absolute inset-0 z-20"
                        style={{
                          top: -14,
                          bottom: -14,
                          left: 0,
                          right: -16,
                          width: "calc(100% + 16px)",
                          height: "calc(100% + 28px)",
                        }}
                        viewBox="0 0 280 80"
                        fill="none"
                        preserveAspectRatio="none"
                        animate={{ opacity: isHovered ? 0 : 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Arc sweeping around top-right corner */}
                        <path
                          className="spark-arc-1"
                          d="M220 6 Q 258 2, 272 20"
                          stroke="rgba(123,97,255,0.7)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* Arc sweeping around bottom-right corner */}
                        <path
                          className="spark-arc-2"
                          d="M220 74 Q 258 78, 272 60"
                          stroke="rgba(123,97,255,0.7)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* Pulsing dot — top-right */}
                        <circle
                          className="spark-dot-1"
                          cx="268"
                          cy="16"
                          r="2.5"
                          fill="rgba(123,97,255,0.9)"
                        />
                        {/* Pulsing dot — bottom-right */}
                        <circle
                          className="spark-dot-2"
                          cx="268"
                          cy="64"
                          r="2.5"
                          fill="rgba(123,97,255,0.9)"
                        />
                        {/* 4-point star — top-right */}
                        <g className="spark-star-1">
                          <path
                            d="M274 4 L275.5 8.5 L280 10 L275.5 11.5 L274 16 L272.5 11.5 L268 10 L272.5 8.5 Z"
                            fill="rgba(180,160,255,0.85)"
                          />
                        </g>
                        {/* 4-point star — bottom-right */}
                        <g className="spark-star-2">
                          <path
                            d="M274 64 L275.5 68.5 L280 70 L275.5 71.5 L274 76 L272.5 71.5 L268 70 L272.5 68.5 Z"
                            fill="rgba(180,160,255,0.85)"
                          />
                        </g>
                      </motion.svg>
                    </div>

                    {/* Divider -- the "pinch" line during cell division */}
                    <motion.div
                      className="h-8 w-px bg-white/30"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        scaleY: isHovered ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isHovered ? 0.15 : 0,
                      }}
                    />

                    {/* Right half -- Ask AI button */}
                    <motion.button
                      onClick={enterChatMode}
                      className="relative z-10 inline-flex items-center gap-2 overflow-hidden whitespace-nowrap bg-accent font-semibold text-white transition-colors duration-300 hover:bg-accent-hover"
                      animate={{
                        width: isHovered ? "auto" : 0,
                        paddingLeft: isHovered ? 20 : 0,
                        paddingRight: isHovered ? 32 : 0,
                        paddingTop: 16,
                        paddingBottom: 16,
                        opacity: isHovered ? 1 : 0,
                        borderRadius: isHovered
                          ? "6px 50px 50px 6px"
                          : "50px",
                      }}
                      transition={{ duration: 0.4, ease }}
                      whileHover={{
                        boxShadow: "8px 0 40px rgba(123,97,255,0.4)",
                      }}
                      style={{ fontSize: 15 }}
                    >
                      {/* Sparkle icon */}
                      <svg
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
                      </svg>
                      Ask AI
                    </motion.button>

                    {/* Right-side glow overlay during hover */}
                    <motion.div
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: 120,
                        height: 80,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle at 70% 50%, rgba(123,97,255,0.35) 0%, transparent 70%)",
                        filter: "blur(8px)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stats bar -- same max-w as parent container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 border-t border-border-subtle pt-8 transition-colors duration-300"
        >
          {[
            { value: "150+", label: "Systems Built" },
            { value: "$47M+", label: "Client Revenue" },
            { value: "97%", label: "Retention" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[26px] font-bold tracking-tight md:text-[32px]">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] tracking-[0.12em] text-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
