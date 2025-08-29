"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Smartphone, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const solutionsRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: "#mobile-app", label: "Try mobile app", icon: <Smartphone className="h-4 w-4" /> },
    { href: "#pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
    { href: "#desktop", label: "Desktop" },
    { href: "#careers", label: "Careers" },
    { href: "#partner", label: "Partner with us" },
    { href: "#login", label: "Login" },
  ]

  const solutionLinks = [
    { href: "/solutions", label: "All Solutions" },
    { href: "/solutions/bms/accounting", label: "Accounting" },
    { href: "/solutions/bms/inventory", label: "Inventory" },
    { href: "/solutions/is/pharmacy", label: "Pharmacy" },
    { href: "/solutions/is/retail", label: "Retail" },
  ]

  const linkClasses = "text-muted-foreground transition-colors hover:text-foreground"

  // Close solutions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img className="h-16 w-auto" src="/Logo1.png" alt="Billing Baba Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Solutions Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              className={`flex items-center gap-2 ${linkClasses} hover:text-foreground`}
            >
              Solutions
              <ChevronDown className={`h-4 w-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSolutionsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {solutionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsSolutionsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.href} href={link.href} className={`flex items-center gap-2 ${linkClasses}`}>
                {link.icon && link.icon}
                <span>{link.label}</span>
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={`flex items-center gap-2 ${linkClasses}`}>
                {link.icon && link.icon}
                <span>{link.label}</span>
              </a>
            )
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="container flex flex-col gap-5 py-5 border-t">
            {/* Solutions in Mobile Menu */}
            <div className="space-y-2">
              <div className="font-medium text-gray-900">Solutions</div>
              {solutionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block pl-4 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 ${linkClasses}`}
                >
                  {link.icon && link.icon}
                  <span>{link.label}</span>
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 ${linkClasses}`}
                >
                  {link.icon && link.icon}
                  <span>{link.label}</span>
                </a>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}