"use client";

import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronDown,
    Plus,
    FileText,
    Image as ImageIcon, // Image के लिए नया आइकन
    Share2,
    Printer,
    Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ड्रॉपडाउन के लिए डेटा
const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand"
];
const unitTypes = ["NONE", "BOTTLES", "BAGS", "BOXES", "CANS", "CARTONS"];

type Item = { id: number; };

export default function CreateDeliveryChallanPage({ onCancel }: { onCancel: () => void }) {
    const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
    const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
    const [items, setItems] = useState<Item[]>([{ id: 1 }, { id: 2 }]);

    const addRow = () => {
        setItems([...items, { id: items.length + 1 }]);
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 space-y-8">
                {/* --- ऊपरी सेक्शन --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* पार्टी का विवरण */}
                    <div>
                        <label className="text-xs text-gray-500">Party *</label>
                        <Select>
                            <SelectTrigger className="w-full md:w-2/3">
                                <SelectValue placeholder="Select Party" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="adarsh">Adarsh</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* चालान का विवरण */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-end">
                            <label className="text-sm text-gray-500 w-32">Challan No.</label>
                            <Input value="1" disabled className="w-48 bg-gray-50" />
                        </div>
                        <div className="flex items-center justify-end">
                            <label className="text-sm text-gray-500 w-32">Invoice Date</label>
                            <Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-48 justify-start text-left font-normal", !invoiceDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{invoiceDate ? format(invoiceDate, "dd/MM/yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={invoiceDate} onSelect={setInvoiceDate} initialFocus /></PopoverContent></Popover>
                        </div>
                        <div className="flex items-center justify-end">
                            <label className="text-sm text-gray-500 w-32">Due Date</label>
                            <Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-48 justify-start text-left font-normal", !dueDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dueDate ? format(dueDate, "dd/MM/yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus /></PopoverContent></Popover>
                        </div>
                        <div className="flex items-center justify-end">
                            <label className="text-sm text-gray-500 w-32">State of supply</label>
                            <Select><SelectTrigger className="w-48"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{indianStates.map(state => (<SelectItem key={state} value={state}>{state}</SelectItem>))}</SelectContent></Select>
                        </div>
                    </div>
                </div>

                {/* --- आइटम की टेबल --- */}
                <div className="overflow-x-auto">
                    <Table>
                         <TableHeader className="bg-gray-50">
                            <TableRow><TableHead className="w-12">#</TableHead><TableHead className="w-1/3">ITEM</TableHead><TableHead>QTY</TableHead><TableHead>UNIT</TableHead><TableHead>PRICE/UNIT</TableHead><TableHead>DISCOUNT</TableHead><TableHead>TAX</TableHead><TableHead className="text-right">AMOUNT</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.id}><TableCell>{index + 1}</TableCell><TableCell><Input placeholder="Item Name" /></TableCell><TableCell><Input type="number" placeholder="0" className="w-20" /></TableCell><TableCell><Select defaultValue="NONE"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{unitTypes.map(unit => (<SelectItem key={unit} value={unit}>{unit}</SelectItem>))}</SelectContent></Select></TableCell><TableCell><Input type="number" placeholder="0" className="w-24" /></TableCell><TableCell className="flex gap-1"><Input type="number" placeholder="%" className="w-16"/><Input type="number" placeholder="Amt" className="w-20"/></TableCell><TableCell><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="NONE">NONE</SelectItem></SelectContent></Select></TableCell><TableCell className="text-right font-medium">0</TableCell></TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow><TableCell colSpan={2}><Button variant="outline" onClick={addRow}>ADD ROW</Button></TableCell><TableCell className="text-right font-bold">TOTAL</TableCell><TableCell className="font-bold">0</TableCell><TableCell colSpan={3}></TableCell><TableCell className="text-right font-bold">0.00</TableCell></TableRow>
                        </TableFooter>
                    </Table>
                </div>
                
                {/* --- निचला सेक्शन --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="text-gray-600"><FileText className="h-4 w-4 mr-2" />ADD DESCRIPTION</Button>
                        <Button variant="outline" className="text-gray-600"><ImageIcon className="h-4 w-4 mr-2" />ADD IMAGE</Button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-end gap-4"><div className="flex items-center gap-2"><Checkbox id="roundOff" /><label htmlFor="roundOff" className="text-sm font-medium">Round Off</label></div><Input type="number" placeholder="0" className="w-24" /></div>
                        <div className="flex items-center justify-end gap-4"><label className="text-sm font-bold">Total</label><Input placeholder="0" className="w-48 font-bold text-lg h-11" disabled /></div>
                    </div>
                </div>
            </div>

            {/* --- फुटर --- */}
            <div className="flex justify-end items-center gap-4 p-4 bg-gray-50 border-t rounded-b-lg">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline">Share <ChevronDown className="h-4 w-4 ml-2" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end"><DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /><span>Share</span></DropdownMenuItem><DropdownMenuItem><Printer className="mr-2 h-4 w-4" /><span>Print</span></DropdownMenuItem><DropdownMenuItem><Save className="mr-2 h-4 w-4" /><span>Save and New</span></DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
            </div>
        </div>
    );
}