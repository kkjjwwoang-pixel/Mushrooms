import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UsageData } from '../types';
import { Activity, Zap, Cpu } from 'lucide-react';

const data: UsageData[] = [
  { name: 'Mon', tokens: 4000, requests: 24 },
  { name: 'Tue', tokens: 3000, requests: 18 },
  { name: 'Wed', tokens: 2000, requests: 12 },
  { name: 'Thu', tokens: 2780, requests: 30 },
  { name: 'Fri', tokens: 1890, requests: 20 },
  { name: 'Sat', tokens: 6390, requests: 45 },
  { name: 'Sun', tokens: 3490, requests: 28 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-card p-6 rounded-xl border border-gray-800 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg bg-opacity-20 ${color.replace('text-', 'bg-')}`}>
      <span className={color}>{icon}</span>
    </div>
  </div>
);

export const StatsView: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pr-2">
      <h2 className="text-2xl font-bold text-white mb-2">Usage Analytics</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Tokens" 
          value="23,550" 
          icon={<Zap size={24} />} 
          color="text-yellow-500" 
        />
        <StatCard 
          title="Requests" 
          value="177" 
          icon={<Activity size={24} />} 
          color="text-blue-500" 
        />
        <StatCard 
          title="Compute Time" 
          value="1.2m" 
          icon={<Cpu size={24} />} 
          color="text-purple-500" 
        />
      </div>

      {/* Main Chart */}
      <div className="flex-1 bg-card rounded-xl border border-gray-800 p-6 min-h-[400px]">
        <h3 className="text-lg font-semibold text-white mb-6">Weekly Token Consumption</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8' }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: '#334155', opacity: 0.4 }}
            />
            <Bar dataKey="tokens" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};