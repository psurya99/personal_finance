import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CATEGORIES } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface ExpenseChartsProps {
    categoryData: { name: string; value: number }[];
    monthlyData: { name: string; amount: number }[];
}

export function ExpenseCharts({ categoryData, monthlyData }: ExpenseChartsProps) {
    const { format, currency } = useCurrency();
    // Map category names to colors
    const getCategoryColor = (name: string) => {
        const cat = CATEGORIES.find(c => c.name === name);
        return cat ? cat.color : '#cbd5e1';
    };

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Expenses by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any) => [format(value), 'Amount']}
                                        contentStyle={{ borderRadius: '8px' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                                No data available
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        {monthlyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${currency.symbol}${value}`}
                                    />
                                    <Tooltip
                                        formatter={(value: any) => [format(value), 'Expenses']}
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                                No data available
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
