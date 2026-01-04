import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ArrowUp, ArrowDown, DollarSign, Wallet, PiggyBank } from 'lucide-react';
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
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                        Total Monthly Expenses
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{format(totalExpenses)}</div>
                    <p className="text-xs text-slate-500">
                        For current month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                        Highest Spending
                    </CardTitle>
                    <ArrowUp className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {highestCategory ? highestCategory.name : 'N/A'}
                    </div>
                    <p className="text-xs text-slate-500">
                        {highestCategory ? format(highestCategory.value) : format(0)}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                        Est. Savings
                    </CardTitle>
                    <PiggyBank className={cn("h-4 w-4", savings >= 0 ? "text-green-500" : "text-red-500")} />
                </CardHeader>
                <CardContent>
                    <div className={cn("text-2xl font-bold", savings >= 0 ? "text-green-600" : "text-red-600")}>
                        {format(savings)}
                    </div>
                    <p className="text-xs text-slate-500">
                        {savingsRate}% of income saved
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
