'use client';

import React, { useEffect, useState } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import PictureProjectForm from '@/components/admin/projects/PictureProjectForm';
import ProjectTypeModal from '@/components/admin/projects/ProjectTypeModal';
import ProjectTable from '@/components/admin/ProjectTable';
import ReorderableList from '@/components/admin/ReorderableList';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Plus, ListOrdered, Table as TableIcon } from 'lucide-react';

export default function AdminProjectsPage() {
const [projects, setProjects] = useState([]);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
const [isFormModalOpen, setIsFormModalOpen] = useState(false);
const [selectedType, setSelectedType] = useState(null);
const [editingProject, setEditingProject] = useState(null);
const [viewMode, setViewMode] = useState('reorder');

const fetchProjects = async () => {
try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw Error('Failed to fetch projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : (data?.projects || []));
} catch (err) {
    console.error('Projects Fetch Error:', err);
    setProjects([]);
} finally {
    setLoading(false);
}
};

const fetchCategories = async () => {
try {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    const catList = Array.isArray(data) ? data : (data?.categories || data?.data || []);
    setCategories(catList);
} catch (err) {
    console.error('Categories Fetch Error:', err);
    setCategories([]);
}
};

useEffect(() => {
const loadInitialData = async () => {
    await Promise.all([fetchProjects(), fetchCategories()]);
};
loadInitialData();
}, []);

// "Add Project" always starts at the type-choice step
const handleAddProjectClick = () => {
setEditingProject(null);
setSelectedType(null);
setIsTypeModalOpen(true);
};

const handleTypeSelect = (type) => {
setSelectedType(type);
setIsTypeModalOpen(false);
fetchCategories();
setIsFormModalOpen(true);
};

// Editing skips the type-choice step — the project already has a type
const handleEditProject = (proj) => {
setEditingProject(proj);
setSelectedType(proj.projectType || 'video');
fetchCategories();
setIsFormModalOpen(true);
};

const handleDelete = async (id) => {
if (!confirm('Are you sure you want to delete this project?')) return;
try {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
} catch (err) {
    console.error(err);
}
};

const handleToggleFeatured = async (id, isFeatured) => {
try {
    await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isFeatured }),
    });
    fetchProjects();
} catch (err) {
    console.error(err);
}
};

const handleReorder = async (reorderedArray) => {
try {
    await fetch('/api/projects/reorder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: reorderedArray }),
    });
} catch (err) {
    console.error(err);
}
};

const FormComponent = selectedType === 'picture' ? PictureProjectForm : ProjectForm;

return (
<div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
        <h1 className="text-2xl font-serif font-bold transition-colors" style={{ color: 'var(--text-primary, #1a1918)' }}>
        Projects Manager
        </h1>
        <p className="text-sm mt-1 transition-colors" style={{ color: 'var(--text-secondary, #666059)' }}>
        Add new video or picture projects, set featured work, and reorder grid layout.
        </p>
    </div>

    <div className="flex items-center gap-3">
        <div
        className="flex items-center rounded-xl p-1 border transition-colors"
        style={{ backgroundColor: 'var(--bg-surface, #ffffff)', borderColor: 'var(--border-subtle, #e5e0d8)' }}
        >
        <button
            onClick={() => setViewMode('reorder')}
            className="p-2 rounded-lg transition-all"
            style={{
            backgroundColor: viewMode === 'reorder' ? 'var(--bg-main, #f5f2eb)' : 'transparent',
            color: viewMode === 'reorder' ? 'var(--accent-warm, #c88346)' : 'var(--text-secondary, #666059)',
            }}
        >
            <ListOrdered className="w-4 h-4" />
        </button>
        <button
            onClick={() => setViewMode('table')}
            className="p-2 rounded-lg transition-all"
            style={{
            backgroundColor: viewMode === 'table' ? 'var(--bg-main, #f5f2eb)' : 'transparent',
            color: viewMode === 'table' ? 'var(--accent-warm, #c88346)' : 'var(--text-secondary, #666059)',
            }}
        >
            <TableIcon className="w-4 h-4" />
        </button>
        </div>

        <Button variant="primary" onClick={handleAddProjectClick} className="gap-2">
        <Plus className="w-4 h-4" />
        <span>Add Project</span>
        </Button>
    </div>
    </div>

    {loading ? (
    <div className="text-sm font-medium" style={{ color: 'var(--text-secondary, #666059)' }}>
        Loading projects...
    </div>
    ) : projects.length === 0 ? (
    <div
        className="p-12 text-center rounded-2xl border text-sm font-medium transition-colors"
        style={{ backgroundColor: 'var(--bg-surface, #ffffff)', borderColor: 'var(--border-subtle, #e5e0d8)', color: 'var(--text-secondary, #666059)' }}
    >
        No video projects found. Click &quot;Add Project&quot; to upload your first work!
    </div>
    ) : viewMode === 'reorder' ? (
    <ReorderableList
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleDelete}
        onToggleFeatured={handleToggleFeatured}
        onReorder={handleReorder}
    />
    ) : (
    <ProjectTable projects={projects} onEdit={handleEditProject} onDelete={handleDelete} onToggleFeatured={handleToggleFeatured} />
    )}

    <Modal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} title="What are you adding?">
    <ProjectTypeModal onSelect={handleTypeSelect} />
    </Modal>

    <Modal
    isOpen={isFormModalOpen}
    onClose={() => setIsFormModalOpen(false)}
    title={editingProject ? 'Edit Project' : selectedType === 'picture' ? 'Add New Picture Project' : 'Add New Video Project'}
    >
    <FormComponent
        categories={categories}
        initialData={editingProject}
        onSuccess={() => {
        setIsFormModalOpen(false);
        fetchProjects();
        }}
    />
    </Modal>
</div>
);
}