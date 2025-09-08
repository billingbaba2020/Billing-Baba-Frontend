"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Building2, Printer, CreditCard, QrCode } from 'lucide-react'
import AddBankAccountModal from '@/components/dashboard/AddBankAccountModal'

const BankAccountsPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Banks</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
        </Button>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Main Content */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Manage Multiple Bank Accounts
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          With Billing Baba you can manage multiple banks and payment types like UPI, Net Banking and Credit Card
        </p>

        {/* Bank Illustration */}
        <div className="mb-12">
          <div className="mx-auto w-64 h-40 relative">
            <img 
              src="/dashboard/bank/bank.png" 
              alt="Bank Building with Coins" 
              className="w-full h-400px object-contain"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background-section-gray)' }}>
                <Printer className="h-6 w-6" style={{ color: 'var(--secondary-blue)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Print Bank Details on Invoices</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Print account details on invoices and get payments via NEFT/RTGS/IMPS.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background-section-gray)' }}>
                <Building2 className="h-6 w-6" style={{ color: 'var(--secondary-blue)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Unlimited Payment Types</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Record transactions by methods like Banks, UPI, Net Banking and Cards.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background-section-gray)' }}>
                <QrCode className="h-6 w-6" style={{ color: 'var(--secondary-blue)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Print UPI QR Code on Invoices</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Print QR code on your invoices or send payment links to your customers.</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Bank Account Button */}
        <AddBankAccountModal>
          <Button size="lg" className="text-white" style={{ backgroundColor: 'var(--primary-red)' }}>
            <Building2 className="h-5 w-5 mr-2" />
            + Add Bank Account
          </Button>
        </AddBankAccountModal>
      </div>
    </div>
  )
}

export default BankAccountsPage