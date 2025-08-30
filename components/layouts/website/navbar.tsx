"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Smartphone,
  ChevronDown,
  Receipt,
  Warehouse,
  FileText,
  Scan,
  Store,
  Computer,
  HeartPulse,
  ShoppingBasket,
  UtensilsCrossed,
  Gem,
  Shirt,
} from "lucide-react"

const colorClasses = {
  red: "bg-red-50 text-red-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  cyan: "bg-cyan-50 text-cyan-600",
  orange: "bg-orange-50 text-orange-600",
  blue: "bg-blue-50 text-blue-600",
}

type IconColor = keyof typeof colorClasses

interface SolutionIconProps {
  icon: ReactNode
  color: IconColor
}

const SolutionIcon = ({ icon, color }: SolutionIconProps) => {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${colorClasses[color]}`}
    >
      {icon}
    </div>
  )
}

const solutionItems = {
  business: [
    { icon: <Receipt size={16} />, name: "Accounting", href: "/solutions/bms/accounting", color: "red" as IconColor },
    { icon: <Warehouse size={16} />, name: "Inventory", href: "/solutions/bms/inventory", color: "green" as IconColor },
    { icon: <FileText size={16} />, name: "Invoicing", href: "/invoicing", color: "purple" as IconColor },
    { icon: <Scan size={16} />, name: "E-Invoice", href: "/e-invoice", color: "cyan" as IconColor },
    { icon: <Store size={16} />, name: "POS", href: "/pos", color: "orange" as IconColor },
    { icon: <Computer size={16} />, name: "OCR", href: "/ocr", color: "blue" as IconColor },
  ],
  industry: [
    { icon: <Store size={16} />, name: "Retail", href: "/retail", color: "red" as IconColor },
    { icon: <HeartPulse size={16} />, name: "Pharmacy", href: "/pharmacy", color: "green" as IconColor },
    { icon: <ShoppingBasket size={16} />, name: "Grocery", href: "/grocery", color: "blue" as IconColor },
    { icon: <UtensilsCrossed size={16} />, name: "Restaurant", href: "/restaurant", color: "purple" as IconColor },
    { icon: <Gem size={16} />, name: "Jewellery", href: "/jewellery", color: "orange" as IconColor },
    { icon: <Shirt size={16} />, name: "Clothing/Apparel", href: "/clothing", color: "cyan" as IconColor },
  ],
}

const baseNavLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/desktop", label: "Desktop" },
  { href: "/careers", label: "Careers" },
  { href: "/partner", label: "Partner with us" },
  { href: "/login", label: "Login" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolutionOpen, setIsSolutionOpen] = useState(false)
  const pathname = usePathname()
  const solutionRef = useRef<HTMLDivElement | null>(null)

  const isHomePage = pathname === "/"

  const navLinks = isHomePage
    ? baseNavLinks
    : [{ href: "/", label: "Home" }, ...baseNavLinks]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionRef.current && !solutionRef.current.contains(event.target as Node)) {
        setIsSolutionOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const linkClasses = "text-[var(--foreground)] transition-colors hover:text-gray-900 font-medium text-[15px]"

  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setIsSolutionOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" onClick={closeAllMenus}>
          <Image
            src="/Logo2.svg"
            alt="Vyapar Logo"
            width={160}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#mobile-app" className={`flex items-center gap-1.5 ${linkClasses}`}>
            <Smartphone className="h-4 w-4" />
            <span>Try mobile app</span>
          </a>

          <div className="relative" ref={solutionRef}>
            <button
              onClick={() => setIsSolutionOpen(!isSolutionOpen)}
              className={`flex items-center gap-1.5 ${linkClasses}`}
            >
              <span>Solution</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isSolutionOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isSolutionOpen && (
              <div className="absolute top-full left-1/2 mt-4 w-max -translate-x-1/2 rounded-xl bg-white p-6 shadow-xl ring-1 ring-black ring-opacity-5 animate-in fade-in-0 zoom-in-95">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setIsSolutionOpen(false)}
                >
                  <X size={18} />
                </button>
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <h3 className="mb-3 font-semibold text-gray-900">Business Management Solutions</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {solutionItems.business.map((item) => (
                        <Link
                          href={item.href}
                          key={item.name}
                          onClick={closeAllMenus}
                          className="flex items-center gap-3 rounded-md p-1 -m-1 transition-colors hover:bg-gray-50"
                        >
                          <SolutionIcon icon={item.icon} color={item.color} />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="w-px bg-gray-200"></div>

                  <div className="flex flex-col">
                    <h3 className="mb-3 font-semibold text-gray-900">Industry Solution</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {solutionItems.industry.map((item) => (
                        <Link
                          href={item.href}
                          key={item.name}
                          onClick={closeAllMenus}
                          className="flex items-center gap-3 rounded-md p-1 -m-1 transition-colors hover:bg-gray-50"
                        >
                          <SolutionIcon icon={item.icon} color={item.color} />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="container flex flex-col gap-4 py-5 border-t">
            <a href="#mobile-app" onClick={closeAllMenus} className={`flex items-center gap-2 ${linkClasses}`}>
              <Smartphone className="h-4 w-4" />
              <span>Try mobile app</span>
            </a>
            <Link href="/solutions" onClick={closeAllMenus} className={linkClasses}>Solution</Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeAllMenus} className={linkClasses}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}