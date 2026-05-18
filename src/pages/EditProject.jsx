import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingState from '../components/ui/LoadingState';
import ProjectForm from '../components/project/ProjectForm';
import { initialProjectForm, projectToForm } from '../utils/projectFormConfig';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const [formData, setFormData] = useState(initialProjectForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    api
      .get(`/projects/${id}`)
      .then(({ data }) => setFormData(projectToForm(data)))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load project'))
      .finally(() => setLoading(false));
  }, [id, isAdmin]);

  if (!isAdmin) return <Navigate to={`/project/${id}`} replace />;
  if (loading) return <LoadingState message="Loading project for edit..." />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await api.put(`/projects/${id}`, formData);
      setSuccess(true);
      setTimeout(() => navigate(`/project/${id}`), 900);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <PageHeader
        backTo={`/project/${id}`}
        title="Edit project"
        subtitle="Update details or append new credential notes. Existing note pad entries cannot be removed."
        action={
          <Button onClick={handleSubmit} disabled={saving}>
            <Save className="w-4 h-4" />
            {saving ? 'Updating...' : 'Save changes'}
          </Button>
        }
      />
      {error && <Alert>{error}</Alert>}
      {success && <Alert type="success">Updated. Returning to project...</Alert>}
      <form onSubmit={handleSubmit}>
        <ProjectForm formData={formData} setFormData={setFormData} isEdit />
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={saving}>
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
