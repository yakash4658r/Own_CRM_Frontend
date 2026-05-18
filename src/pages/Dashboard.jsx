import React, { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, CheckCircle2, Clock, Globe, Plus, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { formatPrice, getDashboardStats } from '../utils/projectHelpers';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';

const chartTooltipStyle = {
  backgroundColor: 'rgba(15, 15, 24, 0.95)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  color: '#f4f4f5',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
};

export default function Dashboard() {
  const { user, isAdmin } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then(({ data }) => setProjects(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const stats = getDashboardStats(projects);
  const hasChartData = stats.chartData.some((d) => d.revenue > 0);
  const firstName = user?.name?.split(' ')[0] || 'there';

  if (loading) return <LoadingState message="Syncing your vault..." />;

  return (
    <div className="space-y-8 pb-8 max-w-[1400px] mx-auto">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Your encrypted project vault — metrics, revenue, and recent work in one place."
        action={
          isAdmin ? (
            <Link to="/add-project">
              <Button>
                <Plus className="w-4 h-4" /> New Project
              </Button>
            </Link>
          ) : null
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard icon={Briefcase} label="Total Projects" value={stats.totalProjects} accent="blue" delay={0} />
        <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} accent="emerald" delay={50} />
        <StatCard icon={Clock} label="Ongoing" value={stats.ongoing} accent="amber" delay={100} />
        <StatCard icon={Globe} label="Domains Expiring" value={stats.expiringDomains} accent="red" delay={150} />
        <StatCard icon={DollarSign} label="Total Revenue" value={formatPrice(stats.totalRevenue)} accent="violet" delay={200} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6 sm:p-8" hover>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
              <p className="text-zinc-500 text-xs mt-1">Last 6 months from project values</p>
            </div>
          </div>
          <div className="h-[280px]">
            {!hasChartData ? (
              <EmptyState
                icon={DollarSign}
                title="No revenue yet"
                description="Add projects with a price to visualize earnings over time."
                actionLabel={isAdmin ? 'Add Project' : undefined}
                actionTo={isAdmin ? '/add-project' : undefined}
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(v) => [`$${v}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2.5} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-6 flex flex-col" hover>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Recent</h2>
            <Link to="/projects" className="text-xs font-semibold text-accent-light hover:text-accent flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] pr-1">
            {stats.recentProjects.length === 0 ? (
              <p className="text-zinc-500 text-sm text-center py-8">No projects yet</p>
            ) : (
              stats.recentProjects.map((project) => (
                <Link
                  key={project._id}
                  to={`/project/${project._id}`}
                  className="block p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-accent/25 hover:bg-accent/[0.04] transition-all group"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-semibold text-white truncate group-hover:text-accent-light transition-colors">
                      {project.name}
                    </h3>
                    <Badge status={project.status} />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>{project.clientName}</span>
                    <span className="font-mono text-accent-light font-semibold">{formatPrice(project.price)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
