import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DailyImpact } from '../types';

interface ImpactChartProps {
  data: DailyImpact[];
}

export function ImpactChart({ data }: ImpactChartProps) {
  return (
    <div className="h-48 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1B5E20" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E3A2F" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#A5D6A7', fontSize: 10, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#A5D6A7', fontSize: 10, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E3A2F', borderRadius: '12px', border: '1px solid #2E7D32', fontSize: '12px' }}
            itemStyle={{ color: '#E8F5E9' }}
            cursor={{ stroke: '#2E7D32', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="co2" 
            stroke="#1B5E20" 
            fillOpacity={1} 
            fill="url(#colorCo2)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
