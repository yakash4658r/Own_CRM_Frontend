export function parsePrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export function formatPrice(value) {
  const n = parsePrice(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function sortProjectsRecent(projects) {
  return [...projects].sort(
    (a, b) => new Date(b.createdAt || b.startDate || 0) - new Date(a.createdAt || a.startDate || 0)
  );
}

export function buildRevenueChartData(projects) {
  const now = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      name: d.toLocaleString('en-US', { month: 'short' }),
      revenue: 0,
    });
  }

  projects.forEach((p) => {
    const date = new Date(p.createdAt || p.startDate);
    if (Number.isNaN(date.getTime())) return;
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.revenue += parsePrice(p.price);
  });

  return months.map(({ name, revenue }) => ({ name, revenue }));
}

export function getDashboardStats(projects) {
  const sorted = sortProjectsRecent(projects);
  return {
    totalProjects: projects.length,
    completed: projects.filter((p) => p.status === 'Completed').length,
    ongoing: projects.filter((p) => p.status === 'Ongoing').length,
    expiringDomains: projects.filter((p) => {
      if (!p.domain?.expiryDate) return false;
      const diff = new Date(p.domain.expiryDate) - new Date();
      return diff < 30 * 24 * 60 * 60 * 1000 && diff > 0;
    }).length,
    totalRevenue: projects.reduce((sum, p) => sum + parsePrice(p.price), 0),
    recentProjects: sorted.slice(0, 5),
    chartData: buildRevenueChartData(projects),
  };
}

export function statusBadgeClass(status) {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30';
    case 'On Hold':
      return 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30';
    case 'Cancelled':
      return 'bg-red-500/15 text-red-300 border-red-400/30';
    default:
      return 'bg-amber-500/15 text-amber-300 border-amber-400/30';
  }
}

export function getCopyableCredential(value) {
  if (!value || value === 'N/A') return null;
  if (typeof value === 'string') return value;
  return null;
}
