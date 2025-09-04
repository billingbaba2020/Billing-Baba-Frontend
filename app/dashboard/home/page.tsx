"use client"

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus, Building, FileText, ArrowRight } from 'lucide-react';

// --- Mock Data for the Chart ---
const salesData = [
  { name: '1 Sep', sale: 0 },
  { name: '4 Sep', sale: 1000 },
  { name: '7 Sep', sale: 450 },
  { name: '10 Sep', sale: 600 },
  { name: '13 Sep', sale: 400 },
  { name: '16 Sep', sale: 700 },
  { name: '19 Sep', sale: 550 },
  { name: '22 Sep', sale: 800 },
  { name: '25 Sep', sale: 750 },
  { name: '28 Sep', sale: 650 },
];

// --- Data for Report Links ---
const reportLinks = [
    { title: "Sale Report", icon: FileText },
    { title: "All Transactions", icon: FileText },
    { title: "Daybook Report", icon: FileText },
    { title: "Party Statement", icon: FileText },
]

// --- Main Dashboard Component ---
export default function Dashboard() {
  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Receivable Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Receivable</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">₹ 112</p>
                  <p className="text-xs text-gray-400 mt-1">From 1 Party</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <ArrowDown className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            {/* Total Payable Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Payable</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">₹ 0</p>
                  <p className="text-xs text-gray-400 mt-1">You don't have any payables as of now.</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <ArrowUp className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <div>
                    <p className="text-sm text-gray-500">Total Sale</p>
                    <p className="text-3xl font-bold text-gray-800">₹ 1,000</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                    This Month <ChevronDown className="h-4 w-4" />
                </button>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                        borderRadius: '12px', 
                        borderColor: '#e2e8f0',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }}
                    />
                  <Area type="monotone" dataKey="sale" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorSale)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Most Used Reports Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Most Used Reports</h3>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All</a>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {reportLinks.map(report => (
                    <a href="#" key={report.title} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center hover:bg-slate-100 hover:shadow-sm transition-all group">
                       <span className="font-semibold text-sm text-gray-700">{report.title}</span>
                       <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </a>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center h-full">
                <div className="bg-blue-100 p-6 rounded-full">
                    <div className="bg-blue-200 p-4 rounded-full">
                        <Building className="h-10 w-10 text-blue-600" />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-6">It Looks So Empty in Here!</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                    Add one of our widgets to get started and view your business operations
                </p>
            </div>
            <a href="#" className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md flex justify-between items-center group">
                <span className="font-semibold text-gray-700">Add Widget of Your Choice</span>
                <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <Plus className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
            </a>
        </div>

      </main>
    </div>
  );
}