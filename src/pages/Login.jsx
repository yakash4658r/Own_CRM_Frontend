import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/FormFields';
import Alert from '../components/ui/Alert';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-[440px] animate-slide-up">
        <div className="text-center mb-10">
          <div className="inline-flex relative mb-6">
            <div className="absolute inset-0 rounded-2xl bg-accent/40 blur-2xl" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent via-cyan-400 to-violet-500 flex items-center justify-center shadow-glow">
              <Shield className="w-8 h-8 text-vault-950" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Vault CRM</h1>
          <p className="text-zinc-500 text-sm mt-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent" />
            Premium secure project workspace
          </p>
        </div>

        <Card className="p-8 sm:p-10">
          {error && <Alert className="mb-6">{error}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <Button type="submit" disabled={loading} className="w-full py-3 mt-2">
              {loading ? 'Authenticating...' : 'Enter Vault'}
            </Button>
          </form>

        </Card>
      </div>
    </div>
  );
}
