"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function ChangeQuantityModal({ isOpen, onClose, item }: { isOpen: boolean, onClose: () => void, item: any }) {
    if (!item) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Change Quantity</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <p><strong>Item Name:</strong> {item.name}</p>
                    <div>
                        <label htmlFor="quantity" className="text-sm font-medium">Enter New Quantity</label>
                        <Input id="quantity" defaultValue={item.qty} autoFocus />
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Connect Weighing Scale &gt;</a>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} className="bg-teal-500 hover:bg-teal-600 text-white">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}