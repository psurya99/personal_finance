import React from 'react';
import { LayoutDashboard, Receipt, LineChart, TrendingUp, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUser } from '../../context/UserContext';

export type View = 'dashboard' | 'expenses' | 'advisor' | 'settings';

interface SidebarProps {
    currentView: View;
    onViewChange: (view: View) => void;
    className?: string;
}

export function Sidebar({ currentView, onViewChange, className }: SidebarProps) {
    const { userName } = useUser();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'advisor', label: 'Financial Advisor', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings },
    ] as const;

    return (
        <div className={cn("flex h-full w-64 flex-col border-r border-slate-200 bg-white shadow-sm", className)}>
            <div className="flex h-20 items-center border-b border-slate-100 px-6 bg-gradient-to-r from-brand-50 to-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 mr-3 shadow-lg shadow-brand-200">
                    <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                    <span className="block text-xl font-bold leading-none text-slate-900 tracking-tight">FinWise</span>
                    <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600 uppercase tracking-wider">
                        Plan & Grow {userName ? `by ${userName}` : ''}
                    </span>
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
                                "flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-brand-600" : "text-slate-400")} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <div className="p-4">
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-lg text-white">
                    <p className="text-sm font-semibold mb-1">Pro Tip</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Track every penny to save more! Your financial freedom starts here.</p>
                </div>
            </div>
        </div>
    );
}

