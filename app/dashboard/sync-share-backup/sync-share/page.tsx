"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AddUserModal from '@/components/dashboard/AddUserModal'
import { CheckCircle, UserPlus, MoreHorizontal, RefreshCw, Info } from 'lucide-react'

const SyncSharePage = () => {
  return (
    <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Sync & Share</h1>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Keep your data synchronized across devices and share with your team</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
            </Button>
            <Button variant="outline" className="hidden sm:flex">
              <Info className="h-4 w-4 mr-2" />
              Know More
            </Button>
            <AddUserModal>
              <Button className="text-white" style={{ backgroundColor: 'var(--primary-red)' }}>
                <UserPlus className="h-4 w-4 mr-2" />
                + Add Users
              </Button>
            </AddUserModal>
          </div>
        </div>

      {/* Logged In Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Currently logged in with the following number: <span className="font-semibold ml-1" style={{ color: 'var(--text-primary)' }}>8126252571</span>
              <CheckCircle className="h-4 w-4 inline-block ml-2" style={{ color: 'var(--accent-orange)' }} />
            </p>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <Card>
        <CardContent className="py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background-section-gray)' }}>
              <UserPlus className="h-8 w-8" style={{ color: 'var(--text-secondary)' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              You have not added any users till now.
            </h3>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              Add users, assign roles and Let your employees manage your business
            </p>
            <AddUserModal>
              <Button size="lg" className="text-white" style={{ backgroundColor: 'var(--primary-red)' }}>
                <UserPlus className="h-5 w-5 mr-2" />
                + Add Users
              </Button>
            </AddUserModal>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SyncSharePage