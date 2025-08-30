"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWindowSize } from "@uidotdev/usehooks"
import {
  Home, Users, Package, ReceiptText, ShoppingCart, TrendingUp, Landmark, BarChart3,
  RefreshCw, Wrench, Settings, Award, ChevronDown, Plus, Send, ArrowRight, CirclePlus, Activity,
} from "lucide-react"

const menuItems = [
  { name: "Home", icon: Home, type: "link" },
  { name: "Parties", icon: Users, type: "dropdown" },
  { name: "Items", icon: Package, type: "action" },
  { name: "Sale", icon: ReceiptText, type: "dropdown" },
  { name: "Purchase & Expense", icon: ShoppingCart, type: "dropdown" },
  { name: "Grow Your Business", icon: TrendingUp, type: "dropdown" },
  { name: "Cash & Bank", icon: Landmark, type: "dropdown" },
  { name: "Reports", icon: BarChart3, type: "link" },
  { name: "Sync, Share & Backup", icon: RefreshCw, type: "dropdown" },
  { name: "Utilities", icon: Wrench, type: "dropdown" },
  { name: "Settings", icon: Settings, type: "link" },
  { name: "Plans & Pricing", icon: Award, type: "link" },
]

interface SidebarProps {
  isMobileMenuOpen: boolean;
}

export default function Sidebar({ isMobileMenuOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Home")
  const [isExpanded, setIsExpanded] = useState(false)
  const size = useWindowSize()
  const isMobile = size.width ? size.width < 768 : false

  const sidebarVariants = {
    mobileClosed: { x: "-100%" },
    mobileOpen: { x: 0 },
    desktopCollapsed: { width: "5rem" },
    desktopExpanded: { width: "16rem" },
  }

  const currentVariant = isMobile
    ? isMobileMenuOpen ? "mobileOpen" : "mobileClosed"
    : isExpanded ? "desktopExpanded" : "desktopCollapsed"

  const showText = isMobile || isExpanded

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={currentVariant}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed left-0 top-0 z-40 h-screen bg-black text-gray-400 w-80 md:relative md:w-auto"
      onMouseEnter={isMobile ? undefined : () => setIsExpanded(true)}
      onMouseLeave={isMobile ? undefined : () => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden thin-scrollbar">
        <div className={`flex items-center ${showText ? 'px-4' : 'justify-center'} h-16 flex-shrink-0`}>
          <Activity className="h-7 w-7 text-white flex-shrink-0" />
          <AnimatePresence>
            {showText && (
              <motion.span
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="ml-3 text-lg font-bold text-white whitespace-nowrap"
              >
                Vyapar
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-grow px-3">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="group relative mb-1" onClick={() => setActiveItem(item.name)}>
                <a href="#" className={`flex items-center rounded-lg py-3 transition-colors duration-200 ${
                  activeItem === item.name ? "text-gray-900" : "hover:text-white"
                } ${showText ? "px-4" : "justify-center"}`}>
                  <item.icon className="z-10 h-5 w-5 flex-shrink-0" />
                  <AnimatePresence>
                    {showText && (
                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="z-10 ml-4 flex-1 whitespace-nowrap text-sm"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showText && item.type !== "link" && (
                       <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }} className="z-10"
                      >
                        {item.type === 'dropdown' ? <ChevronDown className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
                
                {!showText && (
                  <div className="absolute left-full ml-3 hidden items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 opacity-0 group-hover:flex group-hover:opacity-100 transition-opacity duration-200">
                    {item.name}
                  </div>
                )}

                {activeItem === item.name && (
                  <motion.div layoutId="active-indicator" className="absolute inset-0 rounded-lg bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}/>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto flex-shrink-0 p-3">
           <AnimatePresence>
             {showText && (
               <motion.div
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}
                 transition={{ delay: 0.2 }} className="space-y-3"
               >
                 <div className="rounded-lg bg-gray-800 p-4 text-white">
                    <p className="text-sm font-bold">6 days Free Trial left</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-600">
                      <div className="h-1.5 rounded-full bg-green-500" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <button className="flex w-full items-center justify-between rounded-lg bg-[--accent-orange] px-4 py-3 text-white">
                    <div className="flex items-center">
                      <Send className="-rotate-45 h-5 w-5" />
                      <span className="ml-3 text-sm font-semibold">Get Vyapar Premium</span>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg bg-sidebar-primary px-4 py-3 text-sidebar-primary-foreground">
                    <div className="flex items-center">
                      <CirclePlus className="h-5 w-5" />
                      <span className="ml-3 text-sm font-semibold">My Company</span>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}