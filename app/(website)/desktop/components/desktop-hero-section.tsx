"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const heroData = {
  breadcrumbs: {
    home: "Home",
    current: "Billing Software For PC",
  },
  title: "Billing Software for PC",
  description:
    "Create professional invoices in seconds, track income & expenses easily, and stay organized! Download Vyapar Now & Experience Faster Billing on PC with a Free Trial!",
  button: {
    text: "Download Vyapar Now!",
    icon: <Download className="h-5 w-5 ml-2" />,
  },
  images: {
    background: "/desktop/hero-bg.webp",
    splatter: "/desktop/splatter.svg",
    screenLeft: "/desktop/screen-left.webp",
    screenRight: "/desktop/screen-right.webp",
  },
}

export default function DesktopHeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${heroData.images.background}')` }}
    >
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${heroData.images.splatter}'), radial-gradient(ellipse at center, hsla(350, 100%, 96%, 0.8), hsla(350, 100%, 97%, 0.6) 50%, transparent 70%)`,
        }}
      />

      <img
        src={heroData.images.screenLeft}
        alt="Billing Software on Laptop"
        className="absolute bottom-0 left-0 w-1/2 max-w-lg -translate-x-1/4 translate-y-1/4 lg:translate-x-0 lg:translate-y-0 opacity-50 lg:opacity-100 pointer-events-none z-10"
      />
      <img
        src={heroData.images.screenRight}
        alt="Billing Software on Desktop"
        className="absolute bottom-0 right-0 w-1/2 max-w-lg translate-x-1/4 translate-y-1/4 lg:translate-x-0 lg:translate-y-0 opacity-50 lg:opacity-100 pointer-events-none z-10"
      />

      <div className="container relative z-20 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <nav className="text-sm text-[var(--text-secondary)]">
            <span>{heroData.breadcrumbs.home}</span>
            <span className="mx-2">›</span>
            <span>{heroData.breadcrumbs.current}</span>
          </nav>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[var(--text-primary)] text-balance leading-tight">
              {heroData.title}
            </h1>
            <p className="text-lg text-[var(--text-primary)] max-w-2xl mx-auto">
              {heroData.description}
            </p>
          </div>

          <div>
            <Button
              size="lg"
              className="bg-[var(--primary-red)] text-white hover:bg-[var(--primary-dark-red)] text-lg font-semibold px-10 py-4 h-auto rounded-full shadow-lg transition-transform hover:scale-105"
            >
              {heroData.button.text}
              {heroData.button.icon}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}