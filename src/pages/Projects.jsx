import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Search, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { formatPrice, sortProjectsRecent } from '../utils/projectHelpers';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';

export default function Projects() {
  const { isAdmin } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/projects').then(({ data }) => setProjects(sortProjectsRecent(data))).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [p.name, p.clientName, p.status, p.stack].some((v) => v?.toLowerCase().includes(q));
  });

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-8 pb-8 max-w-[1200px] mx-auto">
      <PageHeader
        title="Project Vault"
        subtitle={`${filtered.length} encrypted project${filtered.length === 1 ? '' : 's'} — search, open, and manage credentials.`}
        action={
          isAdmin ? (
            <Link to="/add-project">
              <Button><Plus className="w-4 h-4" /> New Project</Button>
            </Link>
          ) : null
        }
      />

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, clients, stack..."
          className="input-premium pl-12"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={search ? 'No matches' : 'Vault is empty'}
          description={search ? 'Try a different search term.' : 'Create your first project to start tracking clients and credentials.'}
          actionLabel={!search && isAdmin ? 'Create Project' : undefined}
          actionTo="/add-project"
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((project, i) => (
            <Link key={project._id} to={`/project/${project._id}`} className="block animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <Card hover className="p-6 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-violet-500/10 border border-white/[0.08] items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-accent-light" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white group-hover:text-accent-light transition-colors truncate">
                        {project.name}
                      </h3>
                      <p className="text-zinc-500 text-sm mt-0.5">Client · {project.clientName}</p>
                      {project.stack && <p className="text-zinc-600 text-xs font-mono mt-2">{project.stack}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap md:justify-end">
                    <Badge status={project.status} />
                    <span className="text-xs text-zinc-500">
                      {project.paymentStatus || 'Unpaid'}
                    </span>
                    <span className="font-mono text-lg font-bold text-gradient-accent">{formatPrice(project.price)}</span>
                    <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
