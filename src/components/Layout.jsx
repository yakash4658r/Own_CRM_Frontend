import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  LogOut,
  Bell,
  Shield,
  Lock,
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { cn } from './ui/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: PlusCircle, label: 'Add Project', path: '/add-project', adminOnly: true },
];

function NavLink({ item, isActive }) {
  return (
    <Link
      to={item.path}
      className={cn(
        'group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-gradient-to-r from-accent/20 to-cyan-500/10 text-white border border-accent/30 shadow-glow-sm'
          : 'text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
      )}
    >
      <item.icon
        className={cn('w-5 h-5 transition-colors', isActive ? 'text-accent-light' : 'text-zinc-500 group-hover:text-zinc-300')}
      />
      <span>{item.label}</span>
      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />}
    </Link>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useContext(AuthContext);

  if (location.pathname === '/login') {
    return (
      <div className="min-h-screen bg-vault-950 bg-mesh text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        {children}
      </div>
    );
  }

  const isNavActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/projects') {
      return (
        location.pathname === '/projects' ||
        (location.pathname.startsWith('/project/') && !location.pathname.endsWith('/edit'))
      );
    }
    return location.pathname === path;
  };

  const pageTitles = {
    '/': 'Dashboard',
    '/projects': 'Projects',
    '/add-project': 'New Project',
  };
  const pageTitle =
    pageTitles[location.pathname] ||
    (location.pathname.includes('/edit') ? 'Edit Project' : location.pathname.startsWith('/project/') ? 'Project Vault' : 'Vault CRM');

  return (
    <div className="flex h-screen bg-vault-950 text-white overflow-hidden">
      <aside className="hidden lg:flex w-[280px] flex-shrink-0 flex-col border-r border-white/[0.06] bg-gradient-sidebar">
        <div className="h-[72px] flex items-center px-6 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-accent/30 blur-md group-hover:blur-lg transition-all" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center shadow-glow-sm">
                <Shield className="w-5 h-5 text-vault-950" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">Vault CRM</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">Secure Agency Hub</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-[0.15em] px-3 mb-3">Menu</p>
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => (
              <NavLink key={item.path} item={item} isActive={isNavActive(item.path)} />
            ))}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <div className="glass-panel rounded-xl p-3 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Encryption</p>
              <p className="text-xs font-mono text-accent-light truncate">AES-256-CBC Active</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/90 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-mesh">
        <header className="h-[72px] flex-shrink-0 border-b border-white/[0.06] bg-vault-900/60 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8">
          <div>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Workspace</p>
            <h2 className="text-lg font-semibold text-white mt-0.5">{pageTitle}</h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              <span className="text-xs font-mono text-accent-light">Vault Secure</span>
            </div>

            <button type="button" className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-vault-900" />
            </button>

            <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/80 to-violet-500/80 flex items-center justify-center text-sm font-bold text-white shadow-lg ring-2 ring-white/10">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">{user?.name || 'User'}</p>
                <p className="text-[10px] uppercase tracking-wider text-accent-light font-semibold mt-0.5">
                  {user?.role || 'viewer'}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="lg:hidden flex gap-1 p-2 border-b border-white/[0.06] bg-vault-900/40 overflow-x-auto">
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap',
                  isNavActive(item.path) ? 'bg-accent/20 text-accent-light' : 'text-zinc-400'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
