"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import AdjustCashModal from '@/components/dashboard/AdjustCashModal'

const CashInHandPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cash In Hand</h1>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-green-500">₹0</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Main Content */}
      <div className="text-center py-12">
        {/* Cash Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-48 h-32 relative">
            <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center relative">
              <div className="w-24 h-16 relative">
                {/* Hands holding money illustration - matching the image exactly */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-12 relative">
                    {/* Hand 1 - left hand */}
                    <div className="absolute left-0 top-1 w-8 h-8 bg-amber-200 rounded-full"></div>
                    <div className="absolute left-1 top-2 w-6 h-6 bg-amber-300 rounded-full"></div>
                    
                    {/* Money notes - fanned out green banknotes */}
                    <div className="absolute left-2 top-0 w-3 h-8 bg-green-500 rounded-sm transform rotate-12">
                      <div className="w-full h-full bg-green-600 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute left-3 top-0 w-3 h-8 bg-green-500 rounded-sm transform rotate-6">
                      <div className="w-full h-full bg-green-600 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute left-4 top-0 w-3 h-8 bg-green-500 rounded-sm">
                      <div className="w-full h-full bg-green-600 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute left-5 top-0 w-3 h-8 bg-green-500 rounded-sm transform -rotate-6">
                      <div className="w-full h-full bg-green-600 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute left-6 top-0 w-3 h-8 bg-green-500 rounded-sm transform -rotate-12">
                      <div className="w-full h-full bg-green-600 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Hand 2 - right hand */}
                    <div className="absolute right-0 top-1 w-8 h-8 bg-amber-200 rounded-full"></div>
                    <div className="absolute right-1 top-2 w-6 h-6 bg-amber-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Whenever you choose payment type as cash in your invoices, that amount will be reflected in cash in hand.
        </p>

        {/* Adjust Cash Button */}
        <AdjustCashModal>
          <Button 
            size="lg" 
            className="bg-red-500 text-white hover:bg-red-600 px-6 py-3 font-semibold rounded-lg shadow-lg"
          >
            <Filter className="h-5 w-5 mr-2" />
            Adjust Cash
          </Button>
        </AdjustCashModal>
      </div>
    </div>
  )
}

export default CashInHandPage