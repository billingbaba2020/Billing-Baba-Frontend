"use client"
import React from "react"
import { Search, Bell, Menu, LogOut } from "lucide-react"

interface HeaderProps {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ setIsMobileMenuOpen }: HeaderProps) {
  function handleLogout() {
    document.cookie = `admin_auth=; Path=/; Max-Age=0; SameSite=Lax`;
    window.location.href = '/login';
  }
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full flex-shrink-0 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 -ml-2 rounded-full hover:bg-muted"
        >
          <Menu className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground hidden sm:block">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-10 w-full rounded-md border bg-input pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="relative rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
        </button>
        <button onClick={handleLogout} className="flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-muted">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}