import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Insight } from '../../types';

interface InsightCardProps {
    insight: Insight;
}

export function InsightCard({ insight }: InsightCardProps) {
    const icons = {
        warning: AlertCircle,
        success: CheckCircle,
        info: Info,
    };
    const Icon = icons[insight.type];

    const colors = {
        warning: 'border-l-4 border-l-yellow-500 bg-yellow-50 text-yellow-900',
        success: 'border-l-4 border-l-green-500 bg-green-50 text-green-900',
        info: 'border-l-4 border-l-blue-500 bg-blue-50 text-blue-900',
    };

    return (
        <div className={cn("flex items-start rounded-r-md p-4 shadow-sm", colors[insight.type])}>
            <Icon className="mr-3 h-5 w-5 mt-0.5 shrink-0" />
            <span className="text-sm font-medium">{insight.message}</span>
        </div>
    );
}
