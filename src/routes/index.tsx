import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Droplet, ShieldCheck, Truck, Filter, Home, Building2, Store, ArrowRight, Star, Check, Waves, Settings2, X, Award, FlaskConical, Leaf, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import heroBottle from "@/assets/hero-bottle.jpg";
import bottle1L from "@/assets/bottle-1l.jpg";
import bottle5L from "@/assets/bottle-5l.jpg";
import bottle10L from "@/assets/bottle-10l.jpg";
import bottle20L from "@/assets/bottle-20l.jpg";
import { useParallax, useReveal, useParallaxEnabled, useParallaxSections, setSectionParallaxEnabled } from "@/hooks/use-parallax";
import { useHideNear, useCountUp } from "@/hooks/use-hide-near";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Drops Water Station — Pure in Every Drop" },
      { name: "description", content: "Clean, safe & refreshing purified water with free doorstep delivery across Kenya. Order via WhatsApp or call 0141 409 800." },
      { property: "og:title", content: "Pure Drops Water Station" },
      { property: "og:description", content: "Clinical-grade purified water delivered to homes, offices and shops." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "purified water Kenya, water delivery Nairobi, water refill, Embakasi water delivery, Westlands water, 20L bottled water, drinking water station, KEBS certified water" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Pure Drops Water Station" },
      { name: "geo.region", content: "KE" },
      { name: "geo.placename", content: "Nairobi" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Pure Drops Water Station",
          image: "/favicon.ico",
          telephone: "+254141409800",
          priceRange: "KES 50 – KES 500",
          description:
            "Advanced multi-stage filtration and free doorstep delivery of purified drinking water across Nairobi and Kenya.",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KE",
            addressRegion: "Nairobi",
          },
          areaServed: [
            "Nairobi CBD", "Westlands", "Karen", "Kilimani", "Embakasi",
            "Kiambu", "Thika", "Ruaka", "Rongai",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "2400",
          },
          openingHours: "Mo-Su 07:00-21:00",
        }),
      },
    ],
  }),
  component: Index,
});

const WA_URL = "https://wa.me/254141409800?text=Hi%20Pure%20Drops%2C%20I%27d%20like%20to%20order%20water.";
const PHONE = "0141 409 800";

const PureLogo = ({ className = "" }: { className?: string }) => (
  <div className={`grid size-9 place-items-center rounded-full bg-brand ${className}`}>
    <Droplet className="size-4 fill-white text-white" />
  </div>
);

function Index() {
  const [parallaxOn, setParallaxOn] = useParallaxEnabled();
  const [motionPanelOpen, setMotionPanelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sections = useParallaxSections();
  const heroImgRef = useParallax<HTMLDivElement>(0.35, { section: { key: "hero", label: "Hero bottle" } });
  const heroPatternRef = useParallax<HTMLDivElement>(-0.2, { section: { key: "hero", label: "Hero bottle" } });
  const productsBgRef = useParallax<HTMLDivElement>(-0.15, { section: { key: "products", label: "Products background" } });
  const ctaBgRef = useParallax<HTMLDivElement>(0.25, { section: { key: "cta", label: "Call-to-action glow" } });
  const servicesRevealRef = useReveal<HTMLDivElement>();
  const productsRevealRef = useReveal<HTMLDivElement>();
  const audienceRevealRef = useReveal<HTMLDivElement>();
  const reviewsRevealRef = useReveal<HTMLDivElement>();
  const trustRevealRef = useReveal<HTMLDivElement>();
  const statsRevealRef = useReveal<HTMLDivElement>();
  const coverageRevealRef = useReveal<HTMLDivElement>();

  // Hide the floating WhatsApp CTA when it would overlap forms, footer, or
  // the primary in-page CTA — anywhere the user is already engaged.
  const hideWa = useHideNear("[data-wa-hide]");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [purity, purityRef] = useCountUp(99.9);
  const [customers, customersRef] = useCountUp(2400);
  const [liters, litersRef] = useCountUp(18000);
  const [uptime, uptimeRef] = useCountUp(24);

  const products = [
    { size: "1L", label: "Pocket Carry", tier: "01 / PERSONAL", price: "KES 50", img: bottle1L },
    { size: "5L", label: "Tabletop", tier: "02 / FAMILY", price: "KES 200", img: bottle5L },
    { size: "10L", label: "High Volume", tier: "03 / OFFICE", price: "KES 350", img: bottle10L },
    { size: "20L", label: "Best Value", tier: "04 / ENTERPRISE", price: "KES 500", img: bottle20L, highlight: true },
  ];

  const services = [
    { icon: Filter, title: "Advanced Filtration", desc: "Multi-stage reverse osmosis and UV treatment for 99.9% purity." },
    { icon: ShieldCheck, title: "Clean & Safe Drinking", desc: "Lab-tested daily. Certified safe for infants, families and seniors." },
    { icon: Truck, title: "Fast & Reliable Delivery", desc: "Same-day refills across Nairobi and surrounding metros." },
    { icon: Droplet, title: "Free Doorstep Delivery", desc: "Zero delivery fees, every order, every time. No minimums." },
  ];

  const audiences = [
    { icon: Home, label: "Homes", desc: "Subscription refills for families." },
    { icon: Building2, label: "Offices", desc: "Automated weekly office supply." },
    { icon: Store, label: "Shops", desc: "Wholesale stocking partnerships." },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-brand selection:bg-brand/10">
      {/* Glass Nav */}
      <nav className={`glass-nav ${scrolled ? "glass-nav-scrolled" : ""} sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300`}>
        <a href="#top" className="flex items-center gap-2">
          <PureLogo />
          <span className="text-lg font-extrabold uppercase tracking-tight">Pure Drops</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#services" className="transition-colors hover:text-accent-green">Services</a>
          <a href="#products" className="transition-colors hover:text-accent-green">Products</a>
          <a href="#trust" className="transition-colors hover:text-accent-green">Trust</a>
          <a href="#coverage" className="transition-colors hover:text-accent-green">Coverage</a>
          <a href="#audience" className="transition-colors hover:text-accent-green">Who We Serve</a>
          <a href="#reviews" className="transition-colors hover:text-accent-green">Reviews</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setParallaxOn(!parallaxOn)}
            aria-pressed={parallaxOn}
            title={parallaxOn ? "Disable parallax animations" : "Enable parallax animations"}
            className={`hidden size-9 place-items-center rounded-full border transition-colors sm:grid ${
              parallaxOn
                ? "border-accent-green/30 bg-accent-green/10 text-accent-green"
                : "border-brand/10 text-brand/50 hover:text-brand"
            }`}
          >
            <Waves className="size-4" aria-hidden="true" />
            <span className="sr-only">{parallaxOn ? "Disable" : "Enable"} parallax animations</span>
          </button>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hidden font-mono text-xs font-medium opacity-70 hover:text-accent-green sm:block">
            {PHONE}
          </a>
          <a href={WA_URL} target="_blank" rel="noopener" className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand/90">
            Order Now
          </a>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section id="top" className="relative isolate min-h-[92vh] overflow-hidden">
        {/* Animated aqua background layer (cinematic, video-like) */}
        <div className="hero-cinematic absolute inset-0 -z-20" aria-hidden="true" />
        <div className="hero-shimmer pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        {/* Subtle silver grid */}
        <div
          ref={heroPatternRef}
          className="parallax pointer-events-none absolute -inset-10 -z-10 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />

        <div className="relative grid min-h-[92vh] md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 text-white md:p-20">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-green">
            <span className="size-1.5 animate-pulse rounded-full bg-accent-green" />
            Free Doorstep Delivery Across Kenya
          </div>
          <h1 className="mb-8 text-6xl font-black leading-[0.9] tracking-tighter drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)] md:text-8xl">
            PURE WATER.<br />
            <span className="text-accent-green">PURE LIFE.</span>
          </h1>
          <p className="mb-10 max-w-md text-pretty text-lg text-white/80">
            Clinical-grade filtration delivered to your home, office or shop. Certified purity, in every single drop.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={WA_URL} target="_blank" rel="noopener" className="group flex items-center gap-3 rounded-xl bg-accent-green px-8 py-4 font-bold text-white shadow-lg shadow-accent-green/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-green/40">
              <MessageCircle className="size-5" />
              WhatsApp Order
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20">
              <Phone className="size-5" />
              {PHONE}
            </a>
          </div>
        </div>
        <div className="relative grid place-items-center p-8 md:p-12">
          <div ref={heroImgRef} className="parallax relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/40 backdrop-blur-md">
            <img src={heroBottle} alt="Pure Drops 20L water dispenser" width={896} height={1120} className="h-auto w-full object-cover" />
          </div>
        </div>
        </div>
        {/* Curved divider bottom */}
        <svg className="curve-divider absolute inset-x-0 bottom-0 -z-0 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0,32 C360,96 1080,0 1440,48 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Trust strip */}
      <div className="overflow-hidden bg-white px-6 py-8 text-brand">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 md:gap-x-24">
          <span>Verified Filtration</span>
          <span>Kenya Certified</span>
          <span>BPA-Free Plastic</span>
          <span>pH Neutral</span>
          <span>24/7 Support</span>
        </div>
      </div>

      {/* Story: Problem → Solution */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">The Problem</h2>
            <p className="mb-6 text-4xl font-bold tracking-tight">Clean water shouldn't be a gamble.</p>
            <p className="text-brand/60">
              Across Kenya, families & businesses lose time, money and health to unreliable, poorly-treated water. Municipal supply is inconsistent. Bottled brands are opaque. Refill stations skip steps.
            </p>
          </div>
          <div className="rounded-3xl border border-brand/5 bg-surface p-10">
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">Our Solution</h2>
            <p className="mb-6 text-4xl font-bold tracking-tight">Purify. Fill. Deliver.</p>
            <ul className="space-y-3 text-sm text-brand/70">
              {[
                "8-stage reverse osmosis + UV + ozone treatment",
                "Sealed, sanitized filling in a certified facility",
                "Free same-day doorstep delivery — no minimums",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <Check className="mt-1 size-4 text-accent-green" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={servicesRevealRef} className="reveal mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">What we do</h2>
            <p className="text-4xl font-bold tracking-tight">Purity, end-to-end.</p>
          </div>
          <p className="max-w-sm text-sm text-brand/60">
            Beyond simple filtration. We engineer a complete hydration service for your health and convenience.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group rounded-3xl border border-brand/5 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/30 hover:bg-white hover:shadow-xl hover:shadow-brand/10">
              <div className="mb-8 grid size-12 place-items-center rounded-xl bg-brand/5 text-brand transition-colors group-hover:bg-accent-green/10 group-hover:text-accent-green">
                <s.icon className="size-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-brand/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats counters */}
      <section ref={statsRevealRef} className="reveal relative overflow-hidden bg-brand px-6 py-24 text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 size-[28rem] rounded-full bg-accent-green/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { r: purityRef, v: purity, suffix: "%", label: "Water Purity", fmt: (n: number) => n.toFixed(1) },
            { r: uptimeRef, v: uptime, suffix: "/7", label: "Supply Uptime", fmt: (n: number) => Math.round(n).toString() },
            { r: litersRef, v: liters, suffix: "L", label: "Daily Filling", fmt: (n: number) => Math.round(n).toLocaleString() },
            { r: customersRef, v: customers, suffix: "+", label: "Happy Customers", fmt: (n: number) => Math.round(n).toLocaleString() },
          ].map((s) => (
            <div key={s.label} ref={s.r} className="text-center">
              <div className="text-5xl font-black tabular-nums md:text-6xl">
                {s.fmt(s.v)}
                <span className="text-accent-green">{s.suffix}</span>
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative overflow-hidden bg-surface px-6 py-24">
        <div
          ref={productsBgRef}
          className="parallax pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand/5 blur-3xl"
        />
        <div ref={productsRevealRef} className="reveal relative mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">The Collection</h2>
              <p className="text-4xl font-bold tracking-tight">Available Sizes</p>
            </div>
            <p className="max-w-xs text-sm text-brand/60">
              Standardized containers for every need, from personal hydration to bulk office supply.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.size}
                className={`group rounded-3xl border p-8 transition-all ${
                  p.highlight
                    ? "border-white/10 bg-brand text-white"
                    : "border-brand/5 bg-white hover:border-accent-green/30"
                }`}
              >
                <div className={`mb-8 font-mono text-xs ${p.highlight ? "opacity-60" : "opacity-70"}`}>{p.tier}</div>
                <div className="mb-1 text-5xl font-black">{p.size}</div>
                <div className="mb-8 text-xs font-bold uppercase text-accent-green">{p.label}</div>
                <div className={`mb-8 grid aspect-square w-full place-items-center overflow-hidden rounded-xl ${p.highlight ? "bg-white/10" : "bg-surface"}`}>
                  <img src={p.img} alt={`${p.size} bottle`} loading="lazy" width={512} height={512} className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105" />
                </div>
                <div className={`flex items-center justify-between border-t pt-6 ${p.highlight ? "border-white/10" : "border-brand/5"}`}>
                  <span className="text-lg font-bold">{p.price}</span>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener"
                    className={`grid size-10 place-items-center rounded-full transition-all ${
                      p.highlight
                        ? "bg-white text-brand hover:scale-105"
                        : "border border-brand/20 group-hover:bg-brand group-hover:text-white"
                    }`}
                    aria-label={`Order ${p.size} via WhatsApp`}
                  >
                    +
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Certifications */}
      <section id="trust" ref={trustRevealRef} className="reveal mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">Trust & Certification</h2>
          <p className="text-4xl font-bold tracking-tight">Verified quality, from source to seal.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Award, title: "KEBS Certified", desc: "Fully compliant with Kenya Bureau of Standards potable water specifications." },
            { icon: FlaskConical, title: "Independently Lab-Tested", desc: "Weekly microbiological and mineral testing by accredited third-party labs." },
            { icon: Leaf, title: "Chemical-Free Process", desc: "Ozone + UV disinfection means no chlorine aftertaste, no harmful residues." },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl border border-brand/5 bg-surface p-10 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/30 hover:bg-white hover:shadow-xl hover:shadow-brand/10">
              <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-accent-green/10 text-accent-green">
                <c.icon className="size-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
              <p className="text-sm text-brand/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery coverage map */}
      <section id="coverage" ref={coverageRevealRef} className="reveal relative overflow-hidden bg-surface px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">Delivery Coverage</h2>
            <p className="mb-6 text-4xl font-bold tracking-tight">Reaching every corner.</p>
            <p className="mb-8 text-brand/60">Same-day refills across Nairobi and the metropolitan area, with next-day service to surrounding counties.</p>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {["Nairobi CBD","Westlands","Karen","Kilimani","Kiambu","Thika","Ruaka","Rongai"].map((z) => (
                <li key={z} className="flex items-center gap-2 rounded-lg border border-brand/5 bg-white px-3 py-2">
                  <MapPin className="size-4 text-accent-green" /> {z}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-xl shadow-brand/10">
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="cov" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.72 0.16 152)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="oklch(0.72 0.16 152)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="400" height="300" fill="oklch(0.985 0.005 250)" />
              {/* fake roads */}
              <path d="M0,180 C120,120 260,240 400,150" stroke="oklch(0.32 0.14 264)" strokeOpacity="0.15" strokeWidth="2" fill="none" />
              <path d="M60,0 C120,120 220,180 300,300" stroke="oklch(0.32 0.14 264)" strokeOpacity="0.15" strokeWidth="2" fill="none" />
              <path d="M0,60 L400,60" stroke="oklch(0.32 0.14 264)" strokeOpacity="0.08" strokeWidth="1" fill="none" />
              <path d="M0,220 L400,220" stroke="oklch(0.32 0.14 264)" strokeOpacity="0.08" strokeWidth="1" fill="none" />
              {/* coverage blobs */}
              <circle cx="200" cy="150" r="120" fill="url(#cov)" />
              <circle cx="120" cy="100" r="60" fill="url(#cov)" />
              <circle cx="290" cy="200" r="70" fill="url(#cov)" />
              {/* pins */}
              {[
                { x: 200, y: 150, label: "HQ" },
                { x: 130, y: 110, label: "Westlands" },
                { x: 260, y: 180, label: "Karen" },
                { x: 320, y: 90, label: "Kiambu" },
                { x: 110, y: 220, label: "Rongai" },
              ].map((p) => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="8" fill="oklch(0.72 0.16 152)" opacity="0.35">
                    <animate attributeName="r" values="8;16;8" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={p.x} cy={p.y} r="5" fill="oklch(0.32 0.14 264)" />
                  <text x={p.x + 10} y={p.y + 4} fontSize="10" fontFamily="monospace" fill="oklch(0.32 0.14 264)">{p.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section id="audience" ref={audienceRevealRef} className="reveal mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-green">Who we serve</h2>
          <p className="text-4xl font-bold tracking-tight">Hydrating Homes, Offices & Shops.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.label} className="group flex flex-col justify-between rounded-3xl border border-brand/5 bg-surface p-10 transition-all hover:border-accent-green/30 hover:bg-white">
              <div className="mb-12 grid size-14 place-items-center rounded-2xl bg-brand text-white">
                <a.icon className="size-6" />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">{a.label}</h3>
                <p className="text-sm text-brand/60">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-surface px-6 py-24">
        <div ref={reviewsRevealRef} className="reveal mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Trusted by families & businesses.</h2>
            <p className="mb-8 text-brand/60">Join 2,000+ happy customers in Kenya who prioritize their health with Pure Drops.</p>
            <div className="rounded-2xl border border-brand/5 bg-white p-6">
              <div className="mb-1 text-3xl font-bold">4.9/5</div>
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-green">Google Reviews</div>
              <div className="flex gap-1 text-accent-green">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {[
              { name: "Angela Mutua", role: "Home Delivery", initials: "AM", quote: "The reliability is what keeps me. In Nairobi, you need a service that shows up when they say they will. Pure Drops never fails." },
              { name: "Kevin Otieno", role: "Tech Hub Office", initials: "KO", quote: "We switched our entire office supply to Pure Drops. The water quality is noticeably superior to other brands." },
              { name: "Mary Wanjiku", role: "Shop Owner", initials: "MW", quote: "My customers ask for Pure Drops by name now. Consistent stock, fair wholesale pricing — perfect partner." },
              { name: "James Kariuki", role: "Family Subscription", initials: "JK", quote: "Free delivery, clean taste, and the kids actually drink more water. Worth every shilling." },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl border border-brand/5 bg-white p-8 shadow-sm">
                <p className="mb-6 italic leading-relaxed text-brand/80">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-brand/5 font-bold">{t.initials}</div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-wa-hide className="relative overflow-hidden px-6 py-24">
        <div
          ref={ctaBgRef}
          className="parallax pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl rounded-[40px] bg-brand p-12 text-center text-white md:p-20">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Pure Water, <span className="text-accent-green">Pure Life.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-white/70">
            Your first delivery is free, like every delivery after it. Order in under 60 seconds via WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WA_URL} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-xl bg-accent-green px-8 py-4 font-bold text-white transition-transform hover:scale-105">
              <MessageCircle className="size-5" />
              Chat on WhatsApp
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl border border-white/20 px-8 py-4 font-bold text-white transition-colors hover:bg-white/5">
              <Phone className="size-5" />
              {PHONE}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-white/50">
            {["Free delivery", "Same-day refills", "No minimums"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5">
                <Check className="size-3 text-accent-green" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener"
        aria-label="Order via WhatsApp"
        className={`wa-float wa-transition group fixed right-4 z-[60] flex items-center gap-3 rounded-full bg-accent-green px-5 py-3.5 font-bold text-white shadow-2xl shadow-accent-green/40 hover:scale-105 active:scale-95 sm:right-6 sm:px-6 sm:py-4 ${hideWa ? "wa-hidden" : ""}`}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <span className="relative grid size-3 place-items-center">
          <span className="wa-pulse-ring absolute inline-flex size-3 rounded-full bg-white" />
          <span className="relative inline-flex size-2 rounded-full bg-white" />
        </span>
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">Order via WhatsApp</span>
      </a>

      {/* Motion settings panel */}
      <div className="fixed bottom-6 left-6 z-[60]">
        {motionPanelOpen ? (
          <div className="w-72 rounded-2xl border border-brand/10 bg-white p-5 shadow-2xl shadow-brand/20">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent-green">Motion</div>
                <div className="text-sm font-bold">Parallax settings</div>
              </div>
              <button
                type="button"
                onClick={() => setMotionPanelOpen(false)}
                aria-label="Close motion settings"
                className="grid size-7 place-items-center rounded-full text-brand/50 hover:bg-brand/5 hover:text-brand"
              >
                <X className="size-4" />
              </button>
            </div>
            <label className="mb-3 flex cursor-pointer items-center justify-between rounded-lg border border-brand/5 bg-surface px-3 py-2 text-sm font-semibold">
              <span>All parallax</span>
              <input
                type="checkbox"
                className="size-4 accent-accent-green"
                checked={parallaxOn}
                onChange={(e) => setParallaxOn(e.target.checked)}
              />
            </label>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand/40">Per section</div>
            <ul className="space-y-1.5">
              {sections.length === 0 && (
                <li className="text-xs text-brand/50">No sections registered yet.</li>
              )}
              {sections.map((s) => (
                <li key={s.key}>
                  <label className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${parallaxOn ? "hover:bg-surface" : "opacity-50"}`}>
                    <span>{s.label}</span>
                    <input
                      type="checkbox"
                      className="size-4 accent-accent-green"
                      disabled={!parallaxOn}
                      checked={s.enabled}
                      onChange={(e) => setSectionParallaxEnabled(s.key, e.target.checked)}
                    />
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-brand/50">
              Keep subtle motion where it helps and turn it off elsewhere. Honors <span className="font-mono">prefers-reduced-motion</span>.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setMotionPanelOpen(true)}
            aria-label="Open motion settings"
            title="Motion settings"
            className="grid size-12 place-items-center rounded-full border border-brand/10 bg-white text-brand shadow-xl shadow-brand/10 transition-all hover:scale-105 hover:text-accent-green"
          >
            <Settings2 className="size-5" />
          </button>
        )}
      </div>

      {/* Footer */}
      <footer data-wa-hide className="bg-brand px-6 pb-12 pt-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 grid gap-16 md:grid-cols-3">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <PureLogo />
                <span className="text-lg font-extrabold uppercase tracking-tight">Pure Drops</span>
              </div>
              <h3 className="mb-6 text-2xl font-bold italic">Pure in Every Drop.</h3>
              <p className="mb-8 max-w-xs text-sm opacity-60">
                Elevating hydration standards through advanced filtration and reliable logistics across Kenya.
              </p>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-3xl font-bold hover:text-accent-green">{PHONE}</a>
              <div className="mt-2 font-mono text-xs uppercase opacity-40">Call or WhatsApp · 7 days a week</div>
            </div>
            <div>
              <h4 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] opacity-40">Locations Served</h4>
              <ul className="space-y-4 font-medium">
                {["Nairobi Metropolitan", "Kiambu Central", "Mombasa Hub", "Kisumu Delivery"].map((l) => (
                  <li key={l} className="cursor-pointer hover:text-accent-green">{l}</li>
                ))}
              </ul>
            </div>
            <div data-wa-hide>
              <h4 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] opacity-40">Stay Refreshed</h4>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(WA_URL, "_blank");
                }}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-green"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand transition-colors hover:bg-accent-green hover:text-white"
                >
                  Join
                </button>
              </form>
              <p className="mt-4 text-xs opacity-50">Monthly tips on hydration & exclusive offers.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-12 md:flex-row">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">
              © {new Date().getFullYear()} Pure Drops Water Station. All Rights Reserved.
            </div>
            <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest opacity-40">
              <a href="#" className="hover:opacity-100">Privacy</a>
              <a href="#" className="hover:opacity-100">Terms</a>
              <a href="#" className="hover:opacity-100">Certifications</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
