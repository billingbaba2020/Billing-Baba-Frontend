"use client";

import { MoreVertical, Printer, Edit, Trash2 } from 'lucide-react';
import { Transaction } from '@/lib/types';
import { SharePopover } from '@/components/dashboard/SharePopover';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    TableRow,
    TableCell
} from "@/components/ui/table";

const TransactionTableRow = ({ transaction }: { transaction: Transaction }) => {
  return (
    <TableRow>
        {/* Data Cells */}
        <TableCell>{transaction.date}</TableCell>
        <TableCell>{transaction.invoiceNo}</TableCell>
        <TableCell className="font-medium text-gray-800">{transaction.partyName}</TableCell>
        <TableCell>{transaction.transactionType}</TableCell>
        <TableCell>{transaction.paymentType}</TableCell>
        <TableCell className="text-right font-semibold text-gray-800">
            ₹ {transaction.amount.toLocaleString('en-IN')}
        </TableCell>
        <TableCell className="text-right font-semibold text-gray-800">
            ₹ {transaction.balance.toLocaleString('en-IN')}
        </TableCell>

        {/* Actions Cell */}
        <TableCell>
            <div className="flex items-center justify-center gap-1">
                {/* --- Print Button --- */}
                <Button variant="ghost" size="icon">
                    <Printer className="h-5 w-5" />
                </Button>

                {/* --- Reusable Share Popover Component --- */}
                <SharePopover />

                {/* --- Actions Menu (More Options) --- */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Invoice</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 hover:!text-red-500 focus:!text-red-500 focus:!bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Invoice</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TableCell>
    </TableRow>
  );
};

export default TransactionTableRow;