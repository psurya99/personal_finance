import React, { useState } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { getCurrentMonthExpenses, calculateTotal, getCategoryTotals, getHighestCategory, getMonthlyTrends } from '../../utils/calculations';
import { SummaryCards } from './SummaryCards';
import { ExpenseCharts } from './ExpenseCharts';
import { RecentTransactions } from './RecentTransactions';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Edit2, Check, X } from 'lucide-react';
import { usePersistence } from '../../hooks/usePersistence';
import { useCurrency } from '../../context/CurrencyContext';
import { useUser } from '../../context/UserContext';

export function DashboardView() {
    const { format, currency } = useCurrency();
    const { userName } = useUser();
    const { expenses } = useExpenses();
    const currentMonthExpenses = getCurrentMonthExpenses(expenses);
    const totalMonthly = calculateTotal(currentMonthExpenses);
    const highestCategory = getHighestCategory(currentMonthExpenses);
    const categoryTotals = getCategoryTotals(currentMonthExpenses);
    const monthlyTrends = getMonthlyTrends(expenses);

    // Manage income state here or in a separate hook
    const { data: income, updateData: setIncome } = usePersistence<number>('user_income', 5000); // Default 5000
    const [isEditingIncome, setIsEditingIncome] = useState(false);
    const [tempIncome, setTempIncome] = useState((income * currency.rate).toString());

    // Update temp income when opening edit mode or currency changes (only if not editing)
    React.useEffect(() => {
        if (!isEditingIncome) {
            setTempIncome((income * currency.rate).toFixed(0)); // Simplify to integer for income
        }
    }, [income, currency.rate, isEditingIncome]);

    const handleSaveIncome = () => {
        const val = parseFloat(tempIncome);
        if (!isNaN(val) && val >= 0) {
            // Convert back to Base Currency (USD)
            setIncome(val / currency.rate);
            setIsEditingIncome(false);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        {getGreeting()}, <span className="text-brand-600">{userName || 'Friend'}</span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Here's your financial overview for this month.</p>
                </div>
                <div className="flex items-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
                    <span className="ml-3 text-sm font-medium text-slate-500">Monthly Budget:</span>
                    {isEditingIncome ? (
                        <div className="ml-3 flex items-center gap-2">
                            <Input
                                type="number"
                                value={tempIncome}
                                onChange={(e) => setTempIncome(e.target.value)}
                                className="h-9 w-28 text-right bg-slate-50"
                                autoFocus
                            />
                            <Button size="sm" variant="ghost" onClick={handleSaveIncome} className="h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50">
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsEditingIncome(false)} className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditingIncome(true)}
                            className="ml-2 flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                            {format(income)}
                            <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                        </button>
                    )}
                </div>
            </div>

            <SummaryCards
                totalExpenses={totalMonthly}
                highestCategory={highestCategory}
                income={income}
            />

            <ExpenseCharts
                categoryData={categoryTotals}
                monthlyData={monthlyTrends}
            />

            <RecentTransactions expenses={expenses} />
        </div>
    );
}
