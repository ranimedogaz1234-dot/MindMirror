import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../providers/AuthProvider';
import { useData } from '../providers/DataProvider';
import { TRAITS } from '../constants';
import { Award, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDate } from '../lib/utils';

const AnalyticsScreen: React.FC = () => {
  const { profile } = useAuth();
  const { results, moods } = useData();

  const traitData = TRAITS.map(trait => ({
    subject: trait.name,
    A: profile?.traitsProgress[trait.id] || 0,
    fullMark: 100,
  })).filter(t => t.A > 0);

  const historyData = results.slice(0, 7).reverse().map(r => ({
    name: formatDate(r.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    score: r.percentage
  }));

  const averageScore = results.length > 0 
    ? Math.round(results.reduce((acc, curr) => acc + curr.percentage, 0) / results.length)
    : 0;

  const moodCounts = moods.reduce((acc: any, mood) => {
    acc[mood.moodType] = (acc[mood.moodType] || 0) + 1;
    return acc;
  }, {});

  const moodPieData = Object.keys(moodCounts).map(type => ({
    name: type,
    value: moodCounts[type]
  }));

  const MOOD_COLORS: Record<string, string> = {
    'Excited': '#8B5CF6',
    'Happy': '#10B981',
    'Calm': '#3B82F6',
    'Tired': '#6B7280',
    'Stressed': '#F59E0B',
    'Sad': '#EF4444'
  };

  return (
    <div className="px-6 pt-12 space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="text-gray-500">Your psychological growth over time</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-[2rem] p-8 border border-slate-50 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
            <Award size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Avg. Score</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{averageScore}%</p>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-8 border border-slate-50 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tests Taken</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{results.length}</p>
          </div>
        </div>
      </div>

      {/* Mood Analytics */}
      <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900 uppercase">Mood Distribution</h3>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Weekly Patterns</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="h-[200px] w-full max-w-[200px]">
            {moods.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodPieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {moodPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={MOOD_COLORS[entry.name] || '#CBD5E1'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-slate-50 rounded-full border-4 border-white shadow-inner">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Data</p>
              </div>
            )}
          </div>

          <div className="flex-1 grid grid-cols-2 gap-3 w-full">
            {Object.keys(MOOD_COLORS).map(mood => {
              const count = moodCounts[mood] || 0;
              const percentage = moods.length > 0 ? Math.round((count / moods.length) * 100) : 0;
              return (
                <div key={mood} className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: MOOD_COLORS[mood] }} />
                  <div>
                    <p className="text-[10px] font-black text-slate-800">{mood}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Radar Chart */}
      <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm space-y-10">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Trait Balance</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Global Profile</span>
        </div>
        
        <div className="h-[240px] w-full">
          {traitData.length > 2 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={traitData}>
                <PolarGrid stroke="#f3f4f6" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Radar
                  name="Traits"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2">
               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                 <Calendar size={24} />
               </div>
               <p className="text-sm text-gray-400">Complete at least 3 trait tests to see your balance chart.</p>
            </div>
          )}
        </div>
      </section>

      {/* Line Chart */}
      <section className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm space-y-6">
        <h3 className="font-bold text-gray-900 px-2">Performance History</h3>
        <div className="h-[200px] w-full">
          {historyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400 text-sm py-10">No recent activity data.</p>
          )}
        </div>
      </section>

      {/* Recent History Table */}
      <section className="space-y-4">
        <h3 className="font-bold text-gray-900">Recent Results</h3>
        <div className="space-y-3">
          {results.slice(0, 5).map((res) => {
            const trait = TRAITS.find(t => t.id === res.traitId);
            return (
              <div key={res.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 font-bold">
                    {res.percentage}%
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{trait?.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">{formatDate(res.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-violet-600">
                  <TrendingUp size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsScreen;
