import React, { useState, useContext, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import ProjectForm from '../components/project/ProjectForm';
import { initialProjectForm } from '../utils/projectFormConfig';

export default function AddProject() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(initialProjectForm);

  useEffect(() => {
    if (!isAdmin) navigate('/');
  }, [isAdmin, navigate]);

  if (!isAdmin) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const { data } = await api.post('/projects', formData);
      setSuccess(true);
      setTimeout(() => navigate(`/project/${data._id}`), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <PageHeader
        backTo="/projects"
        title="Add new project"
        subtitle="Fill every section once — domain, hosting, credentials, and notes. All secrets are encrypted."
        action={
          <Button onClick={handleSubmit} disabled={loading}>
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save project'}
          </Button>
        }
      />
      {error && <Alert>{error}</Alert>}
      {success && <Alert type="success">Project saved. Opening vault...</Alert>}
      <form onSubmit={handleSubmit}>
        <ProjectForm formData={formData} setFormData={setFormData} isEdit={false} />
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save to vault'}
          </Button>
        </div>
      </form>
    </div>
  );
}
