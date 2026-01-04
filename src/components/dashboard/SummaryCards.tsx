import React from 'react';
import { ArrowUp, ArrowDown, DollarSign, Wallet, PiggyBank, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCurrency } from '../../context/CurrencyContext';

interface SummaryCardsProps {
    totalExpenses: number;
    highestCategory: { name: string; value: number } | null;
    income: number;
}

export function SummaryCards({ totalExpenses, highestCategory, income }: SummaryCardsProps) {
    const { format } = useCurrency();
    const savings = income - totalExpenses;
    const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : '0';

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {/* Total Expenses Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-brand-50 blur-2xl"></div>
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Monthly Expenses</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-900">{format(totalExpenses)}</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                            <TrendingDown className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-slate-500">
                        <span>Current month spending</span>
                    </div>
                </div>
            </div>

            {/* Highest Category Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-accent-50 blur-2xl"></div>
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Top Spending</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-900 truncate max-w-[150px]" title={highestCategory?.name}>
                                {highestCategory ? highestCategory.name : 'N/A'}
                            </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                            <ArrowUp className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-accent-600">
                        {highestCategory ? format(highestCategory.value) : format(0)}
                    </div>
                </div>
            </div>

            {/* Savings Card */}
            <div className={cn(
                "relative overflow-hidden rounded-2xl p-6 shadow-lg text-white transition-all hover:shadow-xl",
                savings >= 0
                    ? "bg-gradient-to-br from-brand-600 to-accent-600"
                    : "bg-gradient-to-br from-red-500 to-orange-500"
            )}>
                <div className="absolute right-0 top-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white/80">Est. Savings</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">{format(savings)}</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                            <PiggyBank className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-white/80">
                        <span>{savingsRate}% of income saved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
