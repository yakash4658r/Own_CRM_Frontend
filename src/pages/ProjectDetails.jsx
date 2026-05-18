import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Shield, Server, Globe, Clock, DollarSign, Activity, ArrowLeft, Trash2, Copy, Check, Lock, Pencil, Layers, FolderOpen,
} from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { formatPrice, getCopyableCredential } from '../utils/projectHelpers';
import { DO_PLANS } from '../utils/projectFormConfig';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import { cn } from '../components/ui/cn';

function InfoTile({ label, value, mono, icon: Icon }) {
  return (
    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
      {Icon && <Icon className="w-4 h-4 text-accent mb-2" />}
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">{label}</p>
      <p className={cn('text-white font-semibold mt-2', mono && 'font-mono text-sm break-all')}>{value || '—'}</p>
    </div>
  );
}

function domainProviderLabel(project) {
  const d = project.domain || {};
  if (d.provider === 'Other') return d.providerOther || 'Other';
  return d.provider || '—';
}

function hostingProviderLabel(project) {
  const h = project.hosting || {};
  if (h.provider === 'Other') return h.providerOther || 'Other';
  return h.provider || '—';
}

function doPlanDisplay(h) {
  if (!h) return '—';
  if (h.dropletPlanId === 'do-other') {
    return `${h.dropletPlanCustomLabel || 'Custom'} — $${h.dropletPlanCustomMonthly || 0}/mo`;
  }
  return h.dropletPlanLabel || DO_PLANS.find((p) => p.id === h.dropletPlanId)?.label || '—';
}

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Overview');
  const [copiedField, setCopiedField] = useState('');

  const tabs = ['Overview', 'Domain', 'Hosting', 'Credentials', 'Notes', 'Activity Log'];

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(({ data }) => setProject(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const copy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await api.delete(`/projects/${id}`);
      navigate('/projects');
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <LoadingState message="Decrypting vault entry..." />;
  if (error || !project) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error || 'Not found'}</p>
        <Link to="/"><Button variant="secondary">Dashboard</Button></Link>
      </div>
    );
  }

  const h = project.hosting || {};
  const c = project.credentials || {};
  const logs = project.activityLog?.length
    ? project.activityLog
    : [{ action: 'Project vault initialized', user: 'System', date: project.createdAt }];

  const credRows = [
    { label: 'Database username', value: c.decryptedDbUsername, field: 'dbU' },
    { label: 'Database password', value: c.decryptedDbPassword, field: 'dbP' },
    { label: 'API key', value: c.decryptedApiKey || c.decryptedApiKeys, field: 'api' },
    { label: 'Droplet password', value: h.decryptedPassword, field: 'doP' },
    { label: 'GitHub password', value: h.decryptedGhPassword, field: 'ghP' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      <Card className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Link to="/projects" className="btn-ghost shrink-0"><ArrowLeft className="w-5 h-5" /></Link>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gradient">{project.name}</h1>
                <Badge status={project.status} />
              </div>
              <p className="text-zinc-500 mt-2">Client · {project.clientName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link to={`/project/${id}/edit`}>
                <Button variant="secondary"><Pencil className="w-4 h-4" /> Edit</Button>
              </Link>
            )}
            {isAdmin && (
              <button type="button" onClick={handleDelete} className="p-2.5 rounded-xl text-red-400 border border-red-500/20 hover:bg-red-500/10">
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-52 p-3 shrink-0 h-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all',
                activeTab === tab ? 'bg-accent/20 text-white border border-accent/30' : 'text-zinc-400 hover:bg-white/[0.04]'
              )}
            >
              {tab}
            </button>
          ))}
        </Card>

        <Card className="flex-1 p-6 sm:p-8 min-h-[400px]">
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoTile icon={Globe} label="Domain" value={project.domain?.name} />
              <InfoTile icon={Layers} label="Stack" value={project.stack} />
              <InfoTile icon={Server} label="Hosting" value={hostingProviderLabel(project)} />
              <InfoTile icon={FolderOpen} label="Files" value={project.fileLocation} mono />
            </div>
          )}

          {activeTab === 'Domain' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoTile label="Domain name" value={project.domain?.name} />
              <InfoTile label="Provider" value={domainProviderLabel(project)} />
              <InfoTile label="Email / account" value={project.domain?.accountEmail || project.domain?.registeredGmail} />
              <InfoTile label="Expiry" value={project.domain?.expiryDate ? new Date(project.domain.expiryDate).toLocaleDateString() : null} />
            </div>
          )}

          {activeTab === 'Hosting' && (
            <div className="space-y-4">
              <InfoTile label="Provider" value={hostingProviderLabel(project)} />
              {h.provider === 'Digital Ocean' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoTile label="Droplet ID" value={h.dropletId} mono />
                  <InfoTile label="Account owner" value={h.dropletOwnerName} />
                  <InfoTile label="Plan" value={doPlanDisplay(h)} />
                  <InfoTile label="Plan specs" value={h.dropletPlanSpecs || h.dropletPlanCustomSpecs} mono />
                </div>
              )}
              {h.provider === 'Github' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoTile label="Username" value={h.ghUsername || h.accountName} />
                  <InfoTile label="Access" value={h.ghAccessType === 'google' ? 'Google' : 'Email & password'} />
                  <InfoTile label="Email" value={h.ghEmail || h.accountEmail} />
                  <InfoTile label="Repository" value={h.ghRepoName || h.repoLink} mono />
                  <InfoTile label="Account owner" value={h.ghAccountOwner} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'Credentials' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20 text-sm text-zinc-300">
                <Shield className="w-4 h-4 text-accent-light" /> Decrypted for this session only
              </div>
              {credRows.map((row) => {
                const text = getCopyableCredential(row.value);
                if (!text) return null;
                return (
                  <div key={row.field} className="flex justify-between gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div>
                      <p className="text-[10px] uppercase text-zinc-500 font-semibold">{row.label}</p>
                      <p className="font-mono text-sm text-white mt-1 break-all">{text}</p>
                    </div>
                    <Button variant="secondary" type="button" onClick={() => copy(text, row.field)}>
                      {copiedField === row.field ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                );
              })}
              <div className="p-4 rounded-xl border border-white/[0.06]">
                <p className="text-[10px] uppercase text-zinc-500 font-semibold mb-2">Database notes (read-only)</p>
                <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap">{c.decryptedDatabaseNotes || '—'}</pre>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.06]">
                <p className="text-[10px] uppercase text-zinc-500 font-semibold mb-2">API notes (read-only)</p>
                <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap">{c.decryptedApiNotes || '—'}</pre>
              </div>
            </div>
          )}

          {activeTab === 'Notes' && (
            <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{project.notes || 'No final notes.'}</pre>
          )}

          {activeTab === 'Activity Log' && (
            <div className="space-y-3">
              {logs.map((log, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <p className="text-white text-sm font-medium">{log.action}</p>
                  <p className="text-zinc-500 text-xs mt-1">{log.user} · {new Date(log.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
