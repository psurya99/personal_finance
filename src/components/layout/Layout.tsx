import React, { useState } from 'react';
import { Sidebar, View } from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '../ui/Button';

interface LayoutProps {
    children: React.ReactNode;
    currentView: View;
    onViewChange: (view: View) => void;
}

export function Layout({ children, currentView, onViewChange }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar currentView={currentView} onViewChange={onViewChange} />
            </div>

            {/* Mobile Sidebar (Drawer-like) */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
                    <div className="relative w-64 bg-white">
                        <Sidebar
                            currentView={currentView}
                            onViewChange={(view) => {
                                onViewChange(view);
                                setIsSidebarOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="flex h-14 items-center border-b border-slate-200 bg-white px-4 md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="mr-2">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <span className="font-semibold text-slate-900">FinanceAdvisor</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
