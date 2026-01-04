import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCurrency } from '../../context/CurrencyContext';

interface InvestmentSuggestionsProps {
    savings: number;
}

type RiskLevel = 'Low' | 'Medium' | 'High';

export function InvestmentSuggestions({ savings }: InvestmentSuggestionsProps) {
    const { format } = useCurrency();
    const [selectedRisk, setSelectedRisk] = useState<RiskLevel>('Medium');

    const suggestions = {
        Low: {
            type: 'Debt Funds / Fixed Deposits',
            description: 'Prioritize capital protection with stable, lower returns.',
            allocation: [
                { name: 'Liquid Funds', percent: 40 },
                { name: 'Short Duration Debt Funds', percent: 40 },
                { name: 'Gold / Sovereign Bonds', percent: 20 },
            ],
            expectedReturn: '6-8%',
        },
        Medium: {
            type: 'Balanced Advantage / Hybrid Funds',
            description: 'Balance between growth and stability.',
            allocation: [
                { name: 'Flexi Cap Equity', percent: 40 },
                { name: 'Hybrid Aggressive', percent: 30 },
                { name: 'Corporate Bond Funds', percent: 30 },
            ],
            expectedReturn: '9-12%',
        },
        High: {
            type: 'Equity Index / Small Cap Funds',
            description: 'Focus on maximum growth over long term (7+ years).',
            allocation: [
                { name: 'Nifty 50 Index Fund', percent: 50 },
                { name: 'Mid/Small Cap Funds', percent: 30 },
                { name: 'International Equity', percent: 20 },
            ],
            expectedReturn: '12-15%+',
        },
    };

    const currentSuggestion = suggestions[selectedRisk];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Investment Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-blue-800 mb-2">Based on your estimated monthly savings of <strong>{format(savings)}</strong></p>
                    <p className="text-xs text-blue-600">
                        *Disclaimer: This is educational logic, not professional financial advice. Market investments are subject to risk.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Select Risk Appetite</label>
                    <div className="flex gap-2">
                        {(['Low', 'Medium', 'High'] as RiskLevel[]).map((level) => (
                            <Button
                                key={level}
                                variant={selectedRisk === level ? 'primary' : 'outline'}
                                onClick={() => setSelectedRisk(level)}
                                className="flex-1"
                            >
                                {level} Risk
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4">
                        <h4 className="text-lg font-bold text-slate-900">{currentSuggestion.type}</h4>
                        <p className="text-sm text-slate-500">{currentSuggestion.description}</p>
                        <div className="mt-2 inline-block rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            Exp. Returns: {currentSuggestion.expectedReturn}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h5 className="font-semibold text-sm text-slate-900">Suggested Allocation:</h5>
                        {currentSuggestion.allocation.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <span className="text-slate-700">{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 rounded-full bg-slate-100 overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${item.percent}%` }} />
                                    </div>
                                    <span className="w-8 text-right font-medium text-slate-900">{item.percent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-sm font-medium text-slate-900">
                            <span>Potential Investment</span>
                            <span>{format(savings)} / month</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
