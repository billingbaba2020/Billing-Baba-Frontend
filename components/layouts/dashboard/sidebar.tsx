"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"
import { useWindowSize } from "@uidotdev/usehooks"
import {
  Home, Users, Package, ReceiptText, ShoppingCart, TrendingUp, Landmark, BarChart3,
  Settings, Award, ChevronDown, Plus, Send, ArrowRight, CirclePlus, Activity, ChevronUp, LucideIcon,
  RotateCcw
} from "lucide-react"

interface SubItem {
  name: string;
  type: 'link' | 'action';
  path: string;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  type: 'link' | 'action' | 'dropdown';
  path?: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  { name: "Home", icon: Home, type: "link", path: "/dashboard/home" },
  {
    name: "Parties", icon: Users, type: "dropdown", path: "/dashboard/parties", subItems: [
      { name: "Party Details", type: "action", path: "/dashboard/parties?view=details" },
      { name: "Whatsapp Connect", type: "link", path: "/dashboard/parties?view=whatsapp-connect" },
      { name: "Billing Baba Network", type: "link", path: "/dashboard/parties?view=network" },
    ]
  },
  { name: "Items", icon: Package, type: "action", path: "/dashboard/items" },
  {
    name: "Sale", icon: ReceiptText, type: "dropdown", path: "/dashboard/sales", subItems: [
      { name: "Sale Invoices", type: "action", path: "/dashboard/sales?view=invoices" },
      { name: "Estimate/ Quotation", type: "action", path: "/dashboard/sales?view=quotation" },
      { name: "Proforma Invoice", type: "link", path: "/dashboard/sales?view=proforma" },
      { name: "Payment-In", type: "action", path: "/dashboard/sales?view=payment-in" },
      { name: "Sale Order", type: "link", path: "/dashboard/sales?view=order" },
      { name: "Delivery Challan", type: "link", path: "/dashboard/sales?view=challan" },
      { name: "Sale Return/ Credit Note", type: "action", path: "/dashboard/sales?view=return" },
      { name: "Billing Baba POS", type: "link", path: "/dashboard/sales?view=pos" },
    ]
  },
  {
    name: "Purchase & Expense", icon: ShoppingCart, type: "dropdown", path: "/dashboard/purchases", subItems: [
      { name: "Purchase Bills", type: "action", path: "/dashboard/purchases?view=bills" },
      { name: "Payment-Out", type: "action", path: "/dashboard/purchases?view=payment-out" },
      { name: "Expenses", type: "action", path: "/dashboard/purchases?view=expenses" },
      { name: "Purchase Order", type: "link", path: "/dashboard/purchases?view=order" },
      { name: "Purchase Return/ Dr. Note", type: "action", path: "/dashboard/purchases?view=return" },
    ]
  },
  {
    name: "Grow Your Business", icon: TrendingUp, type: "dropdown", path: "/dashboard/business", subItems: [
      { name: "Marketing Tools", type: "link", path: "/dashboard/business/marketing-tools" },
      { name: "WhatsApp Marketing", type: "link", path: "/dashboard/business/whatsapp-marketing" },
      { name: "Online Store", type: "link", path: "/dashboard/business/online-store" },
      { name: "Ads Manager", type: "link", path: "/dashboard/business/ads-manager" },
      { name: "Business Horoscope", type: "link", path: "/dashboard/business/business-horoscope" },
      { name: "Google Profile Manager", type: "link", path: "/dashboard/business/google-profile" },
    ]
  },
  {
    name: "Cash & Bank", icon: Landmark, type: "dropdown", path: "/dashboard/cash-bank", subItems: [
      { name: "Bank Accounts", type: "link", path: "/dashboard/cash-bank/bank-accounts" },
      { name: "Cash In Hand", type: "link", path: "/dashboard/cash-bank/cash-inhand" },
      { name: "Cheques", type: "link", path: "/dashboard/cash-bank/cheques" },
      { name: "Loan Accounts", type: "link", path: "/dashboard/cash-bank/loan-account" },
    ]
  },
  { name: "Reports", icon: BarChart3, type: "link", path: "/dashboard/reports" },
  {
    name: "Sync, Share & Backup", icon: RotateCcw, type: "dropdown", path: "/dashboard/sync-share-backup", subItems: [
      { name: "Sync & Share", type: "action", path: "/dashboard/sync-share-backup?view=sync-share" },
      { name: "Auto Backup", type: "action", path: "/dashboard/sync-share-backup?view=auto-backup" },
      { name: "Backup To Computer", type: "action", path: "/dashboard/sync-share-backup?view=backup-computer" },
      { name: "Backup To Drive", type: "action", path: "/dashboard/sync-share-backup?view=backup-drive" },
      { name: "Restore Backup", type: "action", path: "/dashboard/sync-share-backup?view=restore-backup" },
    ]
  },
  { name: "Settings", icon: Settings, type: "link", path: "/dashboard/setting" },
  { name: "Plans & Pricing", icon: Award, type: "link", path: "/dashboard/plan-and-pricing" },
]

interface SidebarProps {
  isMobileMenuOpen: boolean;
}

export default function Sidebar({ isMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view');
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const size = useWindowSize();
  const isMobile = size.width ? size.width < 768 : false;

  useEffect(() => {
    const activeParent = menuItems.find(item => 
      item.path && pathname.startsWith(item.path) && item.subItems
    );
    if (activeParent) {
      setOpenDropdown(activeParent.name);
    } else {
      setOpenDropdown(null);
    }
  }, [pathname]);

  const sidebarVariants = {
    mobileClosed: { x: "-100%" },
    mobileOpen: { x: 0 },
    desktopCollapsed: { width: "5rem" },
    desktopExpanded: { width: "16rem" },
  };

  const currentVariant = isMobile 
    ? (isMobileMenuOpen ? "mobileOpen" : "mobileClosed") 
    : (isExpanded ? "desktopExpanded" : "desktopCollapsed");

  const showText = isMobile || isExpanded;

  const handleDropdownClick = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={currentVariant}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed left-0 top-0 z-40 h-screen bg-white text-gray-500 w-80 md:relative md:w-auto border-r border-gray-200"
      onMouseEnter={isMobile ? undefined : () => setIsExpanded(true)}
      onMouseLeave={isMobile ? undefined : () => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={`flex items-center ${showText ? 'px-4' : 'justify-center'} h-16 flex-shrink-0`}>
          <Activity className="h-7 w-7 text-blue-600 flex-shrink-0" />
          <AnimatePresence>
            {showText && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="ml-3 text-lg font-bold text-gray-800 whitespace-nowrap"
              >
                Billing Baba
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-3 overflow-y-auto thin-scrollbar">
          <ul>
            {menuItems.map((item) => {
              const isAnySubItemActive = item.subItems
                ? item.subItems.some(sub => {
                    const [path, query] = sub.path.split('?');
                    const viewParam = new URLSearchParams(query || '').get('view');
                    return pathname === path && currentView === viewParam;
                  })
                : false;
              
              const isActive = (item.path && pathname.startsWith(item.path) && !item.subItems) || isAnySubItemActive;

              return (
                <React.Fragment key={item.name}>
                  <li className="group relative mb-1">
                    <Link 
                      href={item.path || '#'}
                      onClick={(e) => {
                        if (item.type === 'dropdown') {
                          e.preventDefault();
                          handleDropdownClick(item.name);
                        }
                      }}
                      className={`flex items-center rounded-lg py-3 transition-colors duration-200 ${
                        isActive ? "text-blue-600" : "hover:text-gray-900"
                      } ${showText ? "px-4" : "justify-center"}`}
                    >
                      <item.icon className="z-10 h-5 w-5 flex-shrink-0" />
                      <AnimatePresence>
                        {showText && (
                          <>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0, transition: { duration: 0.1 } }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                              className="z-10 ml-4 flex-1 whitespace-nowrap text-sm font-medium"
                            >
                              {item.name}
                            </motion.span>
                            {item.type === 'dropdown' && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                                className="z-10"
                              >
                                {openDropdown === item.name 
                                  ? <ChevronUp className="h-4 w-4" /> 
                                  : <ChevronDown className="h-4 w-4" />}
                              </motion.span>
                            )}
                            {item.type === 'action' && (
                              <Plus className="h-4 w-4 z-10" />
                            )}
                          </>
                        )}
                      </AnimatePresence>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {!showText && (
                      <div className="absolute left-full ml-3 hidden items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white opacity-0 group-hover:flex group-hover:opacity-100 transition-opacity duration-200">
                        {item.name}
                      </div>
                    )}

                    {/* Active highlight */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute inset-0 rounded-lg bg-blue-50 -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </li>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {showText && item.type === 'dropdown' && openDropdown === item.name && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-8"
                      >
                        {item.subItems?.map(subItem => {
                          const [path, query] = subItem.path.split('?');
                          const viewParam = new URLSearchParams(query || '').get('view');
                          const isSubActive = pathname === path && currentView === viewParam;
                          return (
                            <li key={subItem.name} className="relative py-2">
                              <Link
                                href={subItem.path}
                                className={`flex items-center text-sm hover:text-gray-900 transition-colors ${
                                  isSubActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                                }`}
                              >
                                <span>{subItem.name}</span>
                              </Link>
                              {isSubActive && (
                                <motion.div
                                  className="absolute left-[-24px] top-0 h-full w-[3px] bg-blue-500 rounded-r-full"
                                  layoutId="active-subitem-indicator"
                                />
                              )}
                            </li>
                          )
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              )
            })}
          </ul>
        </nav>
        
        {/* Footer actions */}
        <div className="flex-shrink-0 p-3 overflow-hidden">
          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto', transition: { type: "tween", duration: 0.2, delay: 0.15 } }}
                exit={{ opacity: 0, height: 0, transition: { type: "tween", duration: 0.15 } }}
                className="space-y-3"
              >
                <div className="rounded-lg bg-blue-50 p-4 text-blue-900">
                  <p className="text-sm font-bold">6 days Free Trial left</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-blue-200">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: "25%" }}></div>
                  </div>
                </div>
                <button className="flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
                  <div className="flex items-center">
                    <Send className="-rotate-45 h-5 w-5" />
                    <span className="ml-3 text-sm font-semibold">Get Billing Baba Premium</span>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-800 hover:bg-gray-200">
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
