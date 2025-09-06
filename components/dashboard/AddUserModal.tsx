"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserPlus, X } from 'lucide-react'

interface AddUserModalProps {
  children: React.ReactNode
}

const AddUserModal = ({ children }: AddUserModalProps) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    userRole: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    setOpen(false)
    // Reset form
    setFormData({ fullName: '', contact: '', userRole: '' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md w-full rounded-lg p-0" style={{ backgroundColor: 'var(--background-section-gray)' }}>
        <div className="flex flex-col">
          <DialogHeader className="px-6 py-4" style={{ backgroundColor: 'var(--background-section-gray)' }}>
            <DialogTitle className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Add User
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6" style={{ backgroundColor: 'var(--background-light)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="modal-fullName" className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Enter Full Name <span style={{ color: 'var(--primary-red)' }}>*</span>
                </Label>
                <Input
                  id="modal-fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-1"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="modal-contact" className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Enter Phone Number or Email <span style={{ color: 'var(--primary-red)' }}>*</span>
                </Label>
                <Input
                  id="modal-contact"
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="mt-1"
                  placeholder="+91 9876543210"
                  required
                />
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  User will receive an invite on this number or email.
                </p>
              </div>
              
              <div>
                <Label htmlFor="modal-userRole" className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Choose User Role <span style={{ color: 'var(--primary-red)' }}>*</span>
                </Label>
                <Select value={formData.userRole} onValueChange={(value) => handleInputChange('userRole', value)}>
                  <SelectTrigger id="modal-userRole" className="mt-1">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secondary-admin">Secondary Admin</SelectItem>
                    <SelectItem value="salesman">Salesman</SelectItem>
                    <SelectItem value="biller">Biller</SelectItem>
                    <SelectItem value="biller-salesman">Biller and Salesman</SelectItem>
                    <SelectItem value="ca-accountant">CA/Accountant</SelectItem>
                    <SelectItem value="stock-keeper">Stock Keeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="px-6"
                  style={{ backgroundColor: 'var(--primary-red)' }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserModal
