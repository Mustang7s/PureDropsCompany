import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Droplet, ShieldCheck, Truck, Filter, Home, Building2, Store, ArrowRight, Star, Check, Waves } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.jpg";
import bottle1L from "@/assets/bottle-1l.jpg";
import bottle5L from "@/assets/bottle-5l.jpg";
import bottle10L from "@/assets/bottle-10l.jpg";
import bottle20L from "@/assets/bottle-20l.jpg";
import { useParallax, useReveal, useParallaxEnabled } from "@/hooks/use-parallax";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Drops Water Station — Pure in Every Drop" },
      { name: "description", content: "Clean, safe & refreshing purified water with free doorstep delivery across Kenya. Order via WhatsApp or call 0141 409 800." },
      { property: "og:title", content: "Pure Drops Water Station" },
      { property: "og:description", content: "Clinical-grade purified water delivered to homes, offices and shops." },
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
  const heroImgRef = useParallax<HTMLDivElement>(0.35);
  const heroPatternRef = useParallax<HTMLDivElement>(-0.2);
  const productsBgRef = useParallax<HTMLDivElement>(-0.15);
  const ctaBgRef = useParallax<HTMLDivElement>(0.25);
  const servicesRevealRef = useReveal<HTMLDivElement>();
  const productsRevealRef = useReveal<HTMLDivElement>();
  const audienceRevealRef = useReveal<HTMLDivElement>();
  const reviewsRevealRef = useReveal<HTMLDivElement>();

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
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-brand/5 bg-white/90 px-6 py-4 backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2">
          <PureLogo />
          <span className="text-lg font-extrabold uppercase tracking-tight">Pure Drops</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#services" className="transition-colors hover:text-accent-green">Services</a>
          <a href="#products" className="transition-colors hover:text-accent-green">Products</a>
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

      {/* Hero */}
      <section id="top" className="grid min-h-[85vh] border-b border-brand/5 md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-20">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-green">
            <span className="size-1.5 animate-pulse rounded-full bg-accent-green" />
            Free Doorstep Delivery Across Kenya
          </div>
          <h1 className="mb-8 text-5xl font-extrabold leading-[0.9] tracking-tighter md:text-7xl">
            PURE WATER<br />
            <span className="text-accent-green">PURE LIFE.</span>
          </h1>
          <p className="mb-10 max-w-md text-pretty text-lg text-brand/70">
            Clinical-grade filtration delivered to your home, office, or shop. Experience the clarity of certified purity in every drop.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={WA_URL} target="_blank" rel="noopener" className="group flex items-center gap-3 rounded-xl bg-brand px-8 py-4 font-bold text-white transition-all hover:shadow-xl hover:shadow-brand/20">
              <MessageCircle className="size-5" />
              WhatsApp Order
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl border border-brand/20 px-8 py-4 font-bold transition-colors hover:bg-brand/5">
              <Phone className="size-5" />
              {PHONE}
            </a>
          </div>
        </div>
        <div className="relative grid place-items-center overflow-hidden bg-surface p-8 md:p-12">
          <div
            ref={heroPatternRef}
            className="parallax absolute -inset-10 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, var(--brand) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div ref={heroImgRef} className="parallax relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-brand/5 bg-white shadow-2xl shadow-brand/10">
            <img src={heroBottle} alt="Pure Drops 20L water dispenser" width={896} height={1120} className="h-auto w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="overflow-hidden bg-brand px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 md:gap-x-24">
          <span>Verified Filtration</span>
          <span>Kenya Certified</span>
          <span>BPA-Free Plastic</span>
          <span>pH Neutral</span>
          <span>24/7 Support</span>
        </div>
      </div>

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
            <div key={s.title} className="group rounded-3xl border border-brand/5 bg-surface p-8 transition-all hover:border-accent-green/30 hover:bg-white">
              <div className="mb-8 grid size-12 place-items-center rounded-xl bg-brand/5 text-brand transition-colors group-hover:bg-accent-green/10 group-hover:text-accent-green">
                <s.icon className="size-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-brand/60">{s.desc}</p>
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
      <section className="relative overflow-hidden px-6 py-24">
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
        className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full bg-accent-green px-6 py-4 font-bold text-white shadow-2xl shadow-accent-green/40 transition-all hover:scale-105 active:scale-95"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-white" />
        </span>
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">Order via WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="bg-brand px-6 pb-12 pt-24 text-white">
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
            <div>
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
