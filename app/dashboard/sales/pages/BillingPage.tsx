"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, X, FileText, ChevronRight, Settings, Minimize, Square, X as CloseIcon } from 'lucide-react';

import { ChangeQuantityModal } from '../component/pos/ChangeQuantityModal';
import { ItemDiscountModal } from '../component/pos/ItemDiscountModal';
import { InfoModal } from '../component/pos/InfoModal';
import { RemarksModal } from '../component/pos/RemarksModal';
import { FullBreakupModal } from '../component/pos/FullBreakupModal';
import { MultiPayModal } from '../component/pos/MultiPayModal';


const mockItems = [{ id: 1, code: 6675, name: 'mask', qty: 1.00, unit: '-', price: 200.00, discount: 40.00, tax: 4.80 }];
const mockCustomers = [{ id: 1, name: 'manish', phone: '+91 1234567890' }];


interface ActionButtonProps {
    children: React.ReactNode;
    shortcut: string;
    onClick?: () => void; 
}

const ActionButton = ({ children, shortcut, onClick }: ActionButtonProps) => (
    <Button 
        variant="outline" 
        className="flex-col h-auto bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100"
        onClick={onClick}
    >
        <span>{children}</span>
        <span className="text-xs text-gray-500">{shortcut}</span>
    </Button>
);


export default function BillingPage() {
    const [modalState, setModalState] = useState({
        changeQuantity: false,
        itemDiscount: false,
        remarks: false,
        fullBreakup: false,
        multiPay: false,
        info: { isOpen: false, title: '', message: '', note: '' }
    });
    
    const [selectedItem, setSelectedItem] = useState<any>(mockItems[0]);

    const openModal = (modalName: string, data?: any) => {
        if (modalName === 'info') {
            setModalState(prev => ({ ...prev, info: { ...data, isOpen: true } }));
        } else {
            setModalState(prev => ({ ...prev, [modalName]: true }));
        }
    };
    const closeModal = (modalName: string) => {
         if (modalName === 'info') {
            setModalState(prev => ({ ...prev, info: { isOpen: false, title: '', message: '', note: '' } }));
        } else {
            setModalState(prev => ({ ...prev, [modalName]: false }));
        }
    };

    return (
        <>
            <div className="h-screen w-full bg-slate-100 flex flex-col text-sm">
                

                <div className="flex-grow flex p-2 gap-2 overflow-hidden">
                    <div className="flex-grow flex flex-col bg-white rounded-md border">
                        <div className="p-2 border-b">
                            <div className="relative">
                                <Input placeholder="Scan or search by item code, model no or item name" className="pl-4 pr-10" />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex-grow overflow-auto">
                            <Table>
                                <TableHeader className="sticky top-0 bg-slate-100 z-10">
                                    <TableRow>
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>ITEM CODE</TableHead>
                                        <TableHead>ITEM NAME</TableHead>
                                        <TableHead>QTY</TableHead>
                                        <TableHead>UNIT</TableHead>
                                        <TableHead>PRICE/UNIT(₹)</TableHead>
                                        <TableHead>DISCOUNT(₹)</TableHead>
                                        <TableHead>TAX APPLIED(₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockItems.map((item, index) => (
                                        <TableRow key={item.id} className="bg-blue-50 hover:bg-blue-100 cursor-pointer" onClick={() => setSelectedItem(item)}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.code}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.qty.toFixed(2)}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>{item.price.toFixed(2)}</TableCell>
                                            <TableCell>{item.discount.toFixed(2)}</TableCell>
                                            <TableCell>{item.tax.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="grid grid-cols-4 gap-2 p-2 border-t bg-slate-50">
                            <ActionButton shortcut="[F2]" onClick={() => openModal('changeQuantity')}>Change Quantity</ActionButton>
                            <ActionButton shortcut="[F3]" onClick={() => openModal('itemDiscount')}>Item Discount</ActionButton>
                            <ActionButton shortcut="[F4]">Remove Item</ActionButton>
                            <ActionButton shortcut="[F6]" onClick={() => openModal('info', { title: 'No Unit Added', message: 'The selected item does not have any defined unit(s).'})}>Change Unit</ActionButton>
                            <ActionButton shortcut="[F8]" onClick={() => openModal('info', { title: 'Additional Charges Disabled', message: 'Additional charges are not setup. Please enable additional charges from main settings.', note: 'Only admins can perform this action.'})}>Additional Charges</ActionButton>
                            <ActionButton shortcut="[F9]" onClick={() => openModal('info', { title: 'Bill Discount Disabled', message: 'Bill discount is not enabled. Please enable bill discount from PoS settings.', note: 'Only admins can perform this action.'})}>Bill Discount</ActionButton>
                            <ActionButton shortcut="[F10]" onClick={() => openModal('info', { title: 'Loyalty Points Not Available', message: 'Please enable loyalty points from settings. If you have already enabled go to party tab and complete the set-up. Once you’re done, you can start using loyalty points here.', note: 'Only admins can perform this action.'})}>Loyalty Points</ActionButton>
                            <ActionButton shortcut="[F12]" onClick={() => openModal('remarks')}>Remarks</ActionButton>
                        </div>
                    </div>

                    <div className="w-80 flex-shrink-0 bg-white rounded-md border flex flex-col">
                        <div className="p-3 space-y-3 border-b">
                            <div><label className="text-xs">Invoice Date: <strong>05/09/2025</strong></label></div>
                            <Select><SelectTrigger><SelectValue placeholder="Search for a customer by name, phone number [F11]" /></SelectTrigger><SelectContent><SelectItem value={mockCustomers[0].id.toString()}>{mockCustomers[0].name} <span className="text-gray-500">{mockCustomers[0].phone}</span></SelectItem></SelectContent></Select>
                        </div>
                        <div className="p-3 my-2 bg-blue-50 border-y">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FileText size={24} className="text-blue-600" />
                                    <div>
                                        <p className="font-bold">Total ₹ 165.00</p>
                                        <p className="text-xs text-gray-500">Items: 1, Quantity: 1</p>
                                    </div>
                                </div>
                                <Button variant="link" className="p-0 h-auto text-blue-600 text-right leading-tight" onClick={() => openModal('fullBreakup')}>Full Breakup<br />[Ctrl+F]<ChevronRight className="inline-block" /></Button>
                            </div>
                        </div>
                        <div className="p-3 grid grid-cols-2 gap-3 border-b">
                            <div><label className="font-medium">Payment Mode</label><Select defaultValue="Cash"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Cash">Cash</SelectItem></SelectContent></Select></div>
                            <div><label className="font-medium">Amount Received</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span><Input className="pl-7" defaultValue="165.00" /></div></div>
                        </div>
                        <div className="flex-grow"></div>
                        <div className="p-3 text-right border-t">
                            <p className="text-gray-500">Change to Return:</p>
                            <p className="font-bold text-lg">₹ 0.00</p>
                        </div>
                        <div className="p-2 grid gap-2 border-t bg-slate-50">
                            <Button className="w-full h-12 bg-green-200 text-green-800 hover:bg-green-300 font-bold">Save & Print Bill [Ctrl+P]</Button>
                            <Button variant="outline" className="w-full" onClick={() => openModal('multiPay')}>Other/Credit Payments [Ctrl+M]</Button>
                        </div>
                    </div>
                </div>
            </div>

            <ChangeQuantityModal isOpen={modalState.changeQuantity} onClose={() => closeModal('changeQuantity')} item={selectedItem} />
            <ItemDiscountModal isOpen={modalState.itemDiscount} onClose={() => closeModal('itemDiscount')} item={selectedItem} />
            <RemarksModal isOpen={modalState.remarks} onClose={() => closeModal('remarks')} />
            <FullBreakupModal isOpen={modalState.fullBreakup} onClose={() => closeModal('fullBreakup')} />
            <MultiPayModal isOpen={modalState.multiPay} onClose={() => closeModal('multiPay')} />
            <InfoModal isOpen={modalState.info.isOpen} onClose={() => closeModal('info')} title={modalState.info.title} message={modalState.info.message} note={modalState.info.note} />
        </>
    );
}