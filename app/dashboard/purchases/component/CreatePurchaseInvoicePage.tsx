"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Plus, FileText, Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// --- Mock Data ---
const indianStates = ["Andhra Pradesh", "Gujarat", "Karnataka", "Maharashtra", "Tamil Nadu"];
const unitTypes = ["NONE", "BOTTLES", "BAGS", "BOXES", "CANS", "CARTONS"];
const mockParties = [
    { id: 1, name: "adarsh", balance: 112.00, verified: true },
    { id: 2, name: "manish", phone: "1234567890", balance: 165.00, verified: true },
    { id: 3, name: "vishal", phone: "1234567890", balance: 0.00, verified: false },
];
type Party = typeof mockParties[0];
type Item = { id: number; };

export default function CreatePurchaseInvoicePage({ onCancel }: { onCancel: () => void }) {
    const [billDate, setBillDate] = useState<Date | undefined>(new Date());
    const [items, setItems] = useState<Item[]>([{ id: 1 }, { id: 2 }]);
    const [selectedParty, setSelectedParty] = useState<Party | null>(null);

    const addRow = () => setItems([...items, { id: items.length + 1 }]);
    
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 space-y-8">
                {/* --- ऊपरी सेक्शन --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* पार्टी का विवरण */}
                    <div className="space-y-2">
                        <div className="flex items-start gap-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedParty ? selectedParty.name : "Select Party *"} <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                    <div className="p-2 border-b">
                                        <Button variant="link" className="w-full justify-start p-2 h-auto"><Plus className="h-4 w-4 mr-2" />Add Party</Button>
                                    </div>
                                    <div className="space-y-1 p-2">
                                        {mockParties.map(party => (
                                            <div key={party.id} onClick={() => setSelectedParty(party)} className="p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{party.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={cn("text-sm", party.balance > 0 ? "text-red-600" : "text-green-600")}>{party.balance.toFixed(2)}</span>
                                                        {party.verified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                                    </div>
                                                </div>
                                                {party.phone && <p className="text-xs text-gray-500">{party.phone}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Input placeholder="Phone No." className="w-1/2" />
                        </div>
                        {selectedParty && <p className="text-xs text-gray-500 pl-1">Party Balance: <span className="font-medium">{selectedParty.balance.toFixed(2)}</span></p>}
                    </div>
                    {/* बिल का विवरण */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-32">Bill Number</label><Input className="w-48" /></div>
                        <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-32">Bill Date</label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-48 justify-start text-left font-normal", !billDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{billDate ? format(billDate, "dd/MM/yyyy") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={billDate} onSelect={setBillDate} initialFocus /></PopoverContent></Popover></div>
                        <div className="flex items-center justify-end"><label className="text-sm text-gray-500 w-32">State of supply</label><Select><SelectTrigger className="w-48"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{indianStates.map(state => (<SelectItem key={state} value={state}>{state}</SelectItem>))}</SelectContent></Select></div>
                    </div>
                </div>

                {/* --- आइटम की टेबल --- */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow><TableHead className="w-12">#</TableHead><TableHead className="w-1/3">ITEM</TableHead><TableHead>QTY</TableHead><TableHead>UNIT</TableHead><TableHead>PRICE/UNIT</TableHead><TableHead>DISCOUNT</TableHead><TableHead>TAX</TableHead><TableHead className="text-right">AMOUNT</TableHead><TableHead><Button size="icon" variant="ghost"><Plus className="h-5 w-5 text-blue-600" /></Button></TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.id}><TableCell>{index + 1}</TableCell><TableCell><Input /></TableCell><TableCell><Input type="number" className="w-20" /></TableCell><TableCell><Select defaultValue="NONE"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{unitTypes.map(unit => (<SelectItem key={unit} value={unit}>{unit}</SelectItem>))}</SelectContent></Select></TableCell><TableCell><Input type="number" className="w-24" /></TableCell><TableCell className="flex gap-1"><Input type="number" placeholder="%" className="w-16"/><Input type="number" placeholder="Amt" className="w-20"/></TableCell><TableCell><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="NONE">NONE</SelectItem></SelectContent></Select></TableCell><TableCell className="text-right font-medium">0</TableCell><TableCell></TableCell></TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow><TableCell colSpan={2}><Button variant="outline" onClick={addRow}>ADD ROW</Button></TableCell><TableCell className="text-right font-bold">TOTAL</TableCell><TableCell className="font-bold">0</TableCell><TableCell colSpan={4}></TableCell><TableCell className="text-right font-bold">0.00</TableCell><TableCell></TableCell></TableRow>
                        </TableFooter>
                    </Table>
                </div>
                
                {/* --- निचला सेक्शन --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-4 border-t">
                    <div className="space-y-4">
                        <div><label className="text-xs text-gray-500">Payment Type</label><Select defaultValue="Cash"><SelectTrigger className="w-full md:w-1/2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Cash">Cash</SelectItem></SelectContent></Select></div>
                        <Button variant="link" className="p-0 h-auto"><Plus className="h-4 w-4 mr-1" />Add Payment type</Button>
                        <div><Button variant="outline" className="text-gray-600"><FileText className="h-4 w-4 mr-2" />ADD DESCRIPTION</Button></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-end gap-4"><div className="flex items-center gap-2"><Checkbox id="roundOff" /><label htmlFor="roundOff" className="text-sm font-medium">Round Off</label></div><Input type="number" placeholder="0" className="w-24" /></div>
                        <div className="flex items-center justify-end gap-4"><label className="text-sm font-bold">Total</label><Input placeholder="0" className="w-48 font-bold text-lg h-11" disabled /></div>
                    </div>
                </div>
            </div>

            {/* --- फुटर --- */}
            <div className="flex justify-between items-center gap-4 p-4 bg-gray-50 border-t rounded-b-lg">
                <Button variant="outline" className="text-blue-600 border-blue-300"><Upload className="h-4 w-4 mr-2" />Upload Bill</Button>
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Share <ChevronDown className="h-4 w-4 ml-2" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Share</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                </div>
            </div>
        </div>
    );
}