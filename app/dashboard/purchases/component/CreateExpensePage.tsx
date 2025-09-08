"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch"; // Switch कंपोनेंट इम्पोर्ट करें
import { Calendar as CalendarIcon, ChevronDown, Plus, FileText, Share2, Printer, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// --- Mock Data ---
const expenseCategories = ["Petrol", "Rent", "Salary", "Tea", "Transport"];
const paymentTypes = ["Cash", "Cheque"];
type Item = { id: number; };

export default function CreateExpensePage({ onCancel }: { onCancel: () => void }) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [items, setItems] = useState<Item[]>([{ id: 1 }, { id: 2 }]);
    const [isGst, setIsGst] = useState(false);

    const addRow = () => setItems([...items, { id: items.length + 1 }]);
    
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
                {/* --- हेडर --- */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Expense</h1>
                        <div className="flex items-center space-x-2">
                           <Switch id="gst-toggle" checked={isGst} onCheckedChange={setIsGst} />
                           <label htmlFor="gst-toggle" className="text-sm font-medium">GST</label>
                        </div>
                    </div>
                </div>

                {/* --- मुख्य फॉर्म --- */}
                <div className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-xs text-gray-500">Expense Category *</label>
                            <Select><SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                <SelectContent>
                                    <div className="p-2 border-b"><Button variant="link" className="w-full justify-start p-1 h-auto text-blue-600"><Plus className="h-4 w-4 mr-2" />Add Expense Category</Button></div>
                                    {expenseCategories.map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3 text-right">
                            <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-24">Expense No</label><Input disabled className="w-48 bg-gray-50" /></div>
                            <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-24">Date</label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-48 justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "dd/MM/yyyy") : "Pick a date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent></Popover></div>
                        </div>
                    </div>

                    {/* --- आइटम की टेबल --- */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50"><TableRow><TableHead className="w-12">#</TableHead><TableHead className="w-2/3">ITEM</TableHead><TableHead>QTY</TableHead><TableHead>PRICE/UNIT</TableHead><TableHead className="text-right">AMOUNT</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {items.map((item, index) => (<TableRow key={item.id}><TableCell>{index + 1}</TableCell><TableCell><Input /></TableCell><TableCell><Input type="number" className="w-24" /></TableCell><TableCell><Input type="number" className="w-32" /></TableCell><TableCell className="text-right font-medium">0</TableCell></TableRow>))}
                            </TableBody>
                            <TableFooter>
                                <TableRow><TableCell><Button variant="outline" onClick={addRow}>ADD ROW</Button></TableCell><TableCell className="text-right font-bold" colSpan={2}>TOTAL</TableCell><TableCell className="font-bold">0</TableCell><TableCell className="text-right font-bold">0</TableCell></TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    
                    {/* --- निचला सेक्शन --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-4 border-t">
                        <div className="space-y-4">
                            <div><label className="text-xs text-gray-500">Payment Type</label>
                                <Select defaultValue="Cash"><SelectTrigger className="w-full md:w-1/2"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <div className="p-2 border-b"><Button variant="link" className="w-full justify-start p-1 h-auto text-blue-600"><Plus className="h-4 w-4 mr-2" />Add Bank A/C</Button></div>
                                        {paymentTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-blue-600"><Plus className="h-4 w-4 mr-1" />Add Payment type</Button>
                            <div><Button variant="outline" className="text-gray-600"><FileText className="h-4 w-4 mr-2" />ADD DESCRIPTION</Button></div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-end gap-4"><div className="flex items-center gap-2"><Checkbox id="roundOff" /><label htmlFor="roundOff" className="text-sm font-medium">Round Off</label></div><Input type="number" placeholder="0" className="w-24" /></div>
                            <div className="flex items-center justify-end gap-4"><label className="text-sm font-bold">Total</label><Input placeholder="0" className="w-48 font-bold text-lg h-11" disabled /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- फुटर --- */}
            <div className="flex justify-end items-center gap-4 p-4 bg-gray-50 border-t rounded-b-lg">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Share <ChevronDown className="h-4 w-4 ml-2" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                        <DropdownMenuItem><Printer className="mr-2 h-4 w-4" />Print</DropdownMenuItem>
                        <DropdownMenuItem><Save className="mr-2 h-4 w-4" />Save & New</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
            </div>
        </div>
    );
}