"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// --- 1. Define the props interface ---
// Yeh TypeScript ko batata hai ki FilterBar component kaun se props lega.
interface FilterBarProps {
    onFilterChange: (filters: any) => void;
}

// --- 2. Apply the props interface to the component ---
export default function FilterBar({ onFilterChange }: FilterBarProps) {
    // Options for the dropdowns
    const dateRangeOptions = ['All Time', 'Today', 'This Week', 'This Month', 'This Year', 'Custom'];
    const firmOptions = ['All Firms', 'heloo'];

    // State for selected options and custom date
    const [selectedDateRange, setSelectedDateRange] = useState('Custom');
    const [selectedFirm, setSelectedFirm] = useState('heloo');
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2025, 8, 1),
        to: new Date(2025, 8, 30),
    });
    
    // In a real app, you would use useEffect here to call onFilterChange
    // when any filter value changes. For now, it's ready to be used.

    return (
        <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-gray-500">Filter by :</span>
            
            {/* Date Range Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="w-[150px] justify-between font-normal"
                    >
                        {selectedDateRange} <ChevronDown size={16} className="text-gray-500" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[150px]">
                    <DropdownMenuRadioGroup value={selectedDateRange} onValueChange={setSelectedDateRange}>
                        {dateRangeOptions.map((option) => (
                            <DropdownMenuRadioItem key={option} value={option}>
                                {option}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Custom Date Range Picker */}
            {selectedDateRange === 'Custom' && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[220px] justify-start text-left font-normal text-gray-700">
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "dd/MM/yy")} - {format(date.to, "dd/MM/yy")}
                                    </>
                                ) : (
                                    format(date.from, "dd/MM/yy")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            )}
            
            {/* Firm Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-between font-normal">
                        {selectedFirm} <ChevronDown size={16} className="text-gray-500" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[150px]">
                    <DropdownMenuRadioGroup value={selectedFirm} onValueChange={setSelectedFirm}>
                        {firmOptions.map((option) => (
                            <DropdownMenuRadioItem key={option} value={option}>
                                {option}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}