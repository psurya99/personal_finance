import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatDate } from '../../utils/format';
import { Expense } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface RecentTransactionsProps {
    expenses: Expense[];
}

export function RecentTransactions({ expenses }: RecentTransactionsProps) {
    const { format } = useCurrency();
    const recentExpenses = expenses
        .slice() // copy
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentExpenses.length > 0 ? (
                        recentExpenses.map((expense) => (
                            <div key={expense.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-900">{expense.category}</span>
                                    <span className="text-xs text-slate-500">
                                        {expense.subCategory} • {formatDate(expense.date)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-slate-900">
                                        {format(expense.amount)}
                                    </span>
                                    {expense.note && (
                                        <span className="max-w-[150px] truncate text-xs text-slate-400">
                                            {expense.note}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">No recent transactions.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
