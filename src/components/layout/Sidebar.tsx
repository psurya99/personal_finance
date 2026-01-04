import React from 'react';
import { LayoutDashboard, Receipt, LineChart, TrendingUp, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

export type View = 'dashboard' | 'expenses' | 'advisor' | 'settings';

interface SidebarProps {
    currentView: View;
    onViewChange: (view: View) => void;
    className?: string;
}

export function Sidebar({ currentView, onViewChange, className }: SidebarProps) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'advisor', label: 'Financial Advisor', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings }, // Added for Import/Export
    ] as const;

    return (
        <div className={cn("flex h-full w-64 flex-col border-r border-slate-200 bg-white", className)}>
            <div className="flex h-16 items-center border-b border-slate-200 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 mr-3 shadow-sm">
                    <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                    <span className="block text-lg font-bold leading-none text-slate-900 tracking-tight">FinWise</span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Plan & Grow</span>
                </div>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={cn(
                                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <Icon className={cn("mr-3 h-4 w-4", isActive ? "text-blue-600" : "text-slate-500")} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <div className="border-t border-slate-200 p-4">
                <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-900">Pro Tip</p>
                    <p className="text-xs text-slate-500">Track every penny to save more!</p>
                </div>
            </div>
        </div>
    );
}
