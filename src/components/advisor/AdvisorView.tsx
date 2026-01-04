import React, { useMemo } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { usePersistence } from '../../hooks/usePersistence';
import { getCurrentMonthExpenses, calculateTotal, getCategoryTotals } from '../../utils/calculations';
import { Insight } from '../../types';
import { InsightCard } from './InsightCard';
import { InvestmentSuggestions } from './InvestmentSuggestions';
import { Card, CardContent } from '../ui/Card';

export function AdvisorView() {
    const { expenses } = useExpenses();
    const { data: income } = usePersistence<number>('user_income', 5000);

    const insights = useMemo(() => {
        const list: Insight[] = [];
        const currentExpenses = getCurrentMonthExpenses(expenses);
        const total = calculateTotal(currentExpenses);
        const catTotals = getCategoryTotals(currentExpenses);

        // Rule 1: Spending > Income
        if (total > income) {
            list.push({
                id: 'warn-1',
                type: 'warning',
                message: 'You have exceeded your monthly income! Consider cutting down non-essential expenses.',
            });
        } else if (total > income * 0.8) {
            list.push({
                id: 'warn-2',
                type: 'warning',
                message: 'You have spent over 80% of your income. Be careful not to overspend.',
            });
        } else {
            list.push({
                id: 'success-1',
                type: 'success',
                message: 'You are within a healthy spending range. Great job!',
            });
        }

        // Rule 2: Entertainment > 30%?
        const entertainment = catTotals.find(c => c.name === 'Entertainment');
        if (entertainment && entertainment.value > income * 0.3) {
            list.push({
                id: 'warn-ent',
                type: 'warning',
                message: 'Your Entertainment expenses exceed 30% of your income. Recommended limit is 10-15%.',
            });
        }

        // Rule 3: Savings
        const savings = income - total;
        if (savings > income * 0.2) {
            list.push({
                id: 'info-save',
                type: 'info',
                message: `You are saving ${(savings / income * 100).toFixed(0)}% of your income. Consider investing this surplus.`,
            });
        }

        return list;
    }, [expenses, income]);

    const currentExpenses = getCurrentMonthExpenses(expenses);
    const total = calculateTotal(currentExpenses);
    const savings = Math.max(0, income - total);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Financial Advisor</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Spending Insights</h3>
                    {insights.length > 0 ? (
                        <div className="space-y-3">
                            {insights.map(i => <InsightCard key={i.id} insight={i} />)}
                        </div>
                    ) : (
                        <p className="text-slate-500">No insights available yet.</p>
                    )}

                    <Card className="bg-slate-900 text-white">
                        <CardContent className="pt-6">
                            <p className="mb-2 text-slate-300">Financial Tip of the Day</p>
                            <p className="font-medium">"Do not save what is left after spending, but spend what is left after saving." - Warren Buffett</p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <InvestmentSuggestions savings={savings} />
                </div>
            </div>
        </div>
    );
}
