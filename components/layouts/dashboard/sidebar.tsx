"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"
import { useWindowSize } from "@uidotdev/usehooks"
import {
  Home, Users, Package, ReceiptText, ShoppingCart, TrendingUp, Landmark, BarChart3,
  RefreshCw, Wrench, Settings, Award, ChevronDown, Plus, Send, ArrowRight, CirclePlus, Activity, ChevronUp, LucideIcon,
} from "lucide-react"

// --- TypeScript Type Definitions with 'path' ---
interface SubItem {
  name: string;
  type: 'link' | 'action';
  path: string; // URL path for navigation
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  type: 'link' | 'action' | 'dropdown';
  path?: string; // Optional path for parent items
  subItems?: SubItem[];
}

// --- Data for Menu Items with Routing Paths ---
const menuItems: MenuItem[] = [
  { name: "Home", icon: Home, type: "link", path: "/dashboard/home" },
  {
    name: "Parties", icon: Users, type: "dropdown", subItems: [
      { name: "Party Details", type: "action", path: "/dashboard/party/details" },
      { name: "Whatsapp Connect", type: "link", path: "/dashboard/party/whatsapp-connect" },
      { name: "Billing Baba Network", type: "link", path: "/dashboard/party/network" },
    ]
  },
  { name: "Items", icon: Package, type: "action", path: "/dashboard/items" },
  {
    name: "Sale", icon: ReceiptText, type: "dropdown", subItems: [
      { name: "Sale Invoices", type: "action", path: "/dashboard/sale/invoices" },
      { name: "Estimate/ Quotation", type: "action", path: "/dashboard/sale/quotation" },
      { name: "Proforma Invoice", type: "link", path: "/dashboard/sale/proforma-invoice" },
      { name: "Payment-In", type: "action", path: "/dashboard/sale/payment-in" },
      { name: "Sale Order", type: "link", path: "/dashboard/sale/order" },
      { name: "Delivery Challan", type: "link", path: "/dashboard/sale/challan" },
      { name: "Sale Return/ Credit Note", type: "action", path: "/dashboard/sale/return" },
      { name: "Billing Baba POS", type: "link", path: "/dashboard/sale/pos" },
    ]
  },
  {
    name: "Purchase & Expense", icon: ShoppingCart, type: "dropdown", subItems: [
        { name: "Purchase Bills", type: "action", path: "/dashboard/purchase/bills" },
        { name: "Payment-Out", type: "action", path: "/dashboard/purchase/payment-out" },
        { name: "Expenses", type: "action", path: "/dashboard/purchase/expenses" },
        { name: "Purchase Order", type: "link", path: "/dashboard/purchase/order" },
        { name: "Purchase Return/ Dr. Note", type: "action", path: "/dashboard/purchase/return" },
    ]
  },
  {
    name: "Grow Your Business", icon: TrendingUp, type: "dropdown", subItems: [
        { name: "Marketing Tools", type: "link", path: "/dashboard/business/marketing" },
        { name: "WhatsApp Marketing", type: "link", path: "/dashboard/business/whatsapp" },
        { name: "Online Store", type: "link", path: "/dashboard/business/store" },
    ]
  },
  {
    name: "Cash & Bank", icon: Landmark, type: "dropdown", subItems: [
        { name: "Bank Accounts", type: "action", path: "/dashboard/bank/accounts" },
        { name: "Cash In Hand", type: "action", path: "/dashboard/bank/cash" },
        { name: "Cheques", type: "link", path: "/dashboard/bank/cheques" },
        { name: "Loan Accounts", type: "action", path: "/dashboard/bank/loans" },
    ]
  },
  { name: "Reports", icon: BarChart3, type: "link", path: "/dashboard/reports" },
  {
    name: "Sync, Share & Backup", icon: RefreshCw, type: "dropdown", subItems: [
        { name: "Sync & Share", type: "link", path: "/dashboard/sync/share" },
        { name: "Auto Backup", type: "link", path: "/dashboard/sync/backup" },
    ]
  },
  {
    name: "Utilities", icon: Wrench, type: "dropdown", subItems: [
        { name: "Import Items", type: "link", path: "/dashboard/utils/import-items" },
        { name: "Barcode Generator", type: "link", path: "/dashboard/utils/barcode" },
    ]
  },
  { name: "Settings", icon: Settings, type: "link", path: "/dashboard/settings" },
  { name: "Plans & Pricing", icon: Award, type: "link", path: "/pricing" }, // This might be outside dashboard
]

interface SidebarProps {
  isMobileMenuOpen: boolean;
}

export default function Sidebar({ isMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const size = useWindowSize();
  const isMobile = size.width ? size.width < 768 : false;

  // Effect to automatically open dropdown if a child route is active
  useEffect(() => {
    const activeParent = menuItems.find(item => 
      item.subItems?.some(sub => pathname.startsWith(sub.path))
    );
    if (activeParent) {
      setOpenDropdown(activeParent.name);
    }
  }, [pathname]);

  const sidebarVariants = {
    mobileClosed: { x: "-100%" },
    mobileOpen: { x: 0 },
    desktopCollapsed: { width: "5rem" },
    desktopExpanded: { width: "16rem" },
  };

  const currentVariant = isMobile ? (isMobileMenuOpen ? "mobileOpen" : "mobileClosed") : (isExpanded ? "desktopExpanded" : "desktopCollapsed");
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
        <div className={`flex items-center ${showText ? 'px-4' : 'justify-center'} h-16 flex-shrink-0`}>
          <Activity className="h-7 w-7 text-blue-600 flex-shrink-0" />
          <AnimatePresence>
            {showText && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2, delay: 0.1 }} className="ml-3 text-lg font-bold text-gray-800 whitespace-nowrap">Billing Baba</motion.span>}
          </AnimatePresence>
        </div>

        <nav className="flex-grow px-3 overflow-y-auto thin-scrollbar">
          <ul>
            {menuItems.map((item) => {
              const isAnySubItemActive = item.subItems ? item.subItems.some(sub => pathname.startsWith(sub.path)) : false;
              const isActive = (item.path && pathname.startsWith(item.path)) || isAnySubItemActive;

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
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.2, delay: 0.1 }} className="z-10 ml-4 flex-1 whitespace-nowrap text-sm font-medium">{item.name}</motion.span>
                              {item.type === 'dropdown' && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }} className="z-10">{openDropdown === item.name ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</motion.span>}
                              {item.type === 'action' && <Plus className="h-4 w-4 z-10" />}
                            </>
                        )}
                      </AnimatePresence>
                    </Link>
                    
                    {!showText && <div className="absolute left-full ml-3 hidden items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white opacity-0 group-hover:flex group-hover:opacity-100 transition-opacity duration-200">{item.name}</div>}

                    {isActive && !isAnySubItemActive && (
                      <motion.div layoutId="active-indicator" className="absolute inset-0 rounded-lg bg-blue-50 -z-10" transition={{ type: "spring", stiffness: 300, damping: 25 }}/>
                    )}
                  </li>

                  <AnimatePresence>
                    {showText && item.type === 'dropdown' && openDropdown === item.name && (
                         <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-8">
                            {item.subItems?.map(subItem => {
                              const isSubActive = pathname.startsWith(subItem.path);
                              return (
                                <li key={subItem.name} className="relative py-2">
                                    <Link href={subItem.path} className={`flex items-center justify-between text-sm hover:text-gray-900 transition-colors ${isSubActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                                        <span>{subItem.name}</span>
                                        {subItem.type === 'action' && <Plus className="h-4 w-4" />}
                                    </Link>
                                    {isSubActive && <motion.div className="absolute left-[-24px] top-0 h-full w-[3px] bg-red-500 rounded-r-full" layoutId="active-subitem-indicator" />}
                                    {isSubActive && <motion.div className="absolute inset-0 bg-blue-50 -z-10 ml-[-24px]" layoutId="active-subitem-bg" />}
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
        
        <div className="flex-shrink-0 p-3 overflow-hidden">
           <AnimatePresence>
             {showText && (
               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', transition: { type: "tween", duration: 0.2, delay: 0.15 } }} exit={{ opacity: 0, height: 0, transition: { type: "tween", duration: 0.15 } }} className="space-y-3">
                 <div className="rounded-lg bg-blue-50 p-4 text-blue-900"><p className="text-sm font-bold">6 days Free Trial left</p><div className="mt-2 h-1.5 w-full rounded-full bg-blue-200"><div className="h-1.5 rounded-full bg-green-500" style={{ width: "25%" }}></div></div></div>
                 <button className="flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"><div className="flex items-center"><Send className="-rotate-45 h-5 w-5" /><span className="ml-3 text-sm font-semibold">Get  Billing Baba Premium</span></div><ArrowRight className="h-5 w-5" /></button>
                 <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-800 hover:bg-gray-200"><div className="flex items-center"><CirclePlus className="h-5 w-5" /><span className="ml-3 text-sm font-semibold">My Company</span></div><ArrowRight className="h-5 w-5" /></button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}