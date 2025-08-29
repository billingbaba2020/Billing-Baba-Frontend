"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Smartphone } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "/mobile-app", label: "Try mobile app", icon: <Smartphone className="h-4 w-4" /> },
    { href: "/solution", label: "Solution" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
    { href: "/desktop", label: "Desktop" },
    { href: "/careers", label: "Careers" },
    { href: "/partner", label: "Partner with us" },
    { href: "/login", label: "Login" },
  ]

  const linkClasses =
    "text-muted-foreground transition-colors hover:text-foreground"

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            className="h-16 w-auto"
            src="/Logo1.png"
            alt="Billing Baba Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 ${linkClasses}`}
            >
              {link.icon && link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="container flex flex-col gap-5 py-5 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 ${linkClasses}`}
              >
                {link.icon && link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
