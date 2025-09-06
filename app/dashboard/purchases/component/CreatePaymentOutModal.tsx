"use client";

import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogOverlay, DialogTitle, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar as CalendarIcon, ChevronDown, Plus, FileText, Camera, Calculator, Settings, X, Share2, Printer, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function CreatePaymentOutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPrimitive.Portal>
                <DialogOverlay />
                <DialogPrimitive.Content
                  className={cn(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
                    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                    "data-[state=close]:animate-out data-[state=close]:fade-out-0 data-[state=close]:zoom-out-95"
                  )}
                >
                    <DialogHeader className="flex flex-row justify-between items-center">
                        <DialogTitle>Payment-Out</DialogTitle>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon"><Calculator className="h-5 w-5 text-gray-500" /></Button>
                            <Button variant="ghost" size="icon"><Settings className="h-5 w-5 text-gray-500" /></Button>
                            {/* --- हमारा एकमात्र क्लोज बटन --- */}
                            <DialogPrimitive.Close asChild>
                                <Button variant="ghost" size="icon"><X className="h-5 w-5 text-gray-500" /></Button>
                            </DialogPrimitive.Close>
                        </div>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500">Party *</label>
                                <Select><SelectTrigger><SelectValue placeholder="Select Party" /></SelectTrigger><SelectContent><SelectItem value="party1">Party 1</SelectItem></SelectContent></Select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Payment Type</label>
                                <Select defaultValue="Cash"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Cash">Cash</SelectItem></SelectContent></Select>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-blue-600"><Plus className="h-4 w-4 mr-1" />Add Payment type</Button>
                            <div className="flex flex-wrap gap-2 pt-4">
                                <Button variant="outline" className="text-gray-600"><FileText className="h-4 w-4 mr-2" />ADD DESCRIPTION</Button>
                                <Button variant="outline" className="text-gray-600"><Camera className="h-4 w-4 mr-2" />ADD IMAGE</Button>
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-24">Receipt No</label><Input className="w-48" /></div>
                                <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-24">Date</label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-48 justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent></Popover></div>
                            </div>
                            <div className="flex items-center justify-end mt-8"><label className="text-sm font-medium text-gray-500 w-24">Paid</label><Input className="w-48" /></div>
                        </div>
                    </div>
                    <DialogFooter className="justify-end">
                         <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Share <ChevronDown className="h-4 w-4 ml-2" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem><DropdownMenuItem><Printer className="mr-2 h-4 w-4" />Print</DropdownMenuItem><DropdownMenuItem><Save className="mr-2 h-4 w-4" />Save & New</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                    </DialogFooter>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </Dialog>
    );
}