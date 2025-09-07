"use client"

import React, { useState, Suspense } from "react" // 1. Import Suspense
import Sidebar from "@/components/layouts/dashboard/sidebar"
import Header from "@/components/layouts/dashboard/Header"
import { motion, AnimatePresence } from "framer-motion"

// A simple skeleton loader to show while the sidebar is loading
const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-80 border-r border-gray-200 bg-white md:relative md:w-[5rem]">
      <div className="flex h-16 items-center justify-center px-4">
        <div className="h-7 w-7 animate-pulse rounded-md bg-gray-200"></div>
      </div>
      <div className="px-3">
        <div className="mb-2 h-12 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="mb-2 h-12 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="mb-2 h-12 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="mb-2 h-12 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    </aside>
  );
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* 2. Wrap the Sidebar component in Suspense and provide a fallback */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
      </Suspense>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col">
        <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}