"use client"

import React, { useState, useEffect } from "react"
import CardsWidget from "@/components/layouts/dashboard/components/CardsWidget"
import TransactionHistory from "@/components/layouts/dashboard/components/TransactionHistory"
import RightColumnWidgets from "@/components/layouts/dashboard/components/RightColumnWidgets"
import DashboardPageSkeleton from "@/components/layouts/dashboard/components/DashboardPageSkeleton"

function DashboardContent() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold text-foreground">Weekly sumup</h1>
        <p className="mt-1 text-muted-foreground">
          Get summary of your weekly online transactions here.
        </p>
      </header>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardsWidget />
          <TransactionHistory />
        </div>
        <div className="lg:col-span-1">
          <RightColumnWidgets />
        </div>
      </div>
    </>
  )
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6 md:p-8">
      {isLoading ? <DashboardPageSkeleton /> : <DashboardContent />}
    </div>
  )
}