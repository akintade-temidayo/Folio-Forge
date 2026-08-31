'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import DateSelect from '@/components/ui/DateSelect';
import DegreeSelect from '@/components/ui/DegreeSelect';
import GradeSelect from '@/components/ui/GradeSelect';
import Button from '@/components/ui/Button';

const getInitialFormData = (initialData) => ({
institution: initialData?.institution || '',
degree: initialData?.degree || '',
customDegree: '',
fieldOfStudy: initialData?.fieldOfStudy || '',
startDate: initialData?.startDate || '',
endDate: initialData?.endDate || '',
grade: initialData?.grade || '',
customGrade: '',
description: initialData?.description || '',
});

const getModalResetKey = (isOpen, initialData) => {
const instanceId = initialData?._id || initialData?.id || initialData?.institution || 'new';
return `${isOpen ? 'open' : 'closed'}-${instanceId}`;
};

function EducationForm({ initialData, onClose, onSubmit, isLoading }) {
const [formData, setFormData] = useState(() => getInitialFormData(initialData));
const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
    setErrors((prev) => ({ ...prev, [name]: '' }));
    }
};

const validate = () => {
    const newErrors = {};
    if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';

    if (!formData.degree) {
    newErrors.degree = 'Degree/Qualification is required';
    } else if (formData.degree === 'Other' && !formData.customDegree.trim()) {
    newErrors.customDegree = 'Please specify your qualification';
    }

    if (formData.grade === 'Other' && !formData.customGrade.trim()) {
    newErrors.customGrade = 'Please specify your grade/GPA';
    }

    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
    ...formData,
    degree: formData.degree === 'Other' ? formData.customDegree.trim() : formData.degree,
    grade: formData.grade === 'Other' ? formData.customGrade.trim() : formData.grade,
    };
    delete payload.customDegree;
    delete payload.customGrade;

    onSubmit(payload);
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
    {/* Institution Name */}
    <Input
        label="Institution / School *"
        name="institution"
        value={formData.institution}
        onChange={handleChange}
        placeholder="e.g. University of Lagos"
        error={errors.institution}
    />

    {/* Degree & Field of Study Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DegreeSelect
        label="Degree / Qualification *"
        value={formData.degree}
        onChange={handleChange}
        error={errors.degree}
        />

        <Input
        label="Field of Study / Major"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
        onChange={handleChange}
        placeholder="e.g. Computer Science"
        />
    </div>

    {/* Conditional Custom Degree Input */}
    {formData.degree === 'Other' && (
        <Input
        label="Specify Degree / Qualification *"
        name="customDegree"
        value={formData.customDegree}
        onChange={handleChange}
        placeholder="e.g. Professional Diploma in Software Engineering"
        error={errors.customDegree}
        />
    )}

    {/* Start Date & End Date Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DateSelect
        label="Start Date *"
        value={formData.startDate}
        onChange={(val) => {
            setFormData((prev) => ({ ...prev, startDate: val }));
            if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: '' }));
        }}
        error={errors.startDate}
        />

        <DateSelect
        label="End Date *"
        value={formData.endDate}
        allowPresent={true}
        onChange={(val) => {
            setFormData((prev) => ({ ...prev, endDate: val }));
            if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: '' }));
        }}
        error={errors.endDate}
        />
    </div>

    {/* Grade / Class of Degree */}
    <GradeSelect
        label="Grade / Class of Degree"
        value={formData.grade}
        onChange={handleChange}
        error={errors.grade}
    />

    {/* Conditional Custom Grade Input */}
    {formData.grade === 'Other' && (
        <Input
        label="Specify Custom Grade / GPA *"
        name="customGrade"
        value={formData.customGrade}
        onChange={handleChange}
        placeholder="e.g. 4.82 / 5.00 or First Class Honors"
        error={errors.customGrade}
        />
    )}

    {/* Description / Highlights */}
    <Input
        isTextarea={true}
        label="Description / Key Coursework"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        placeholder="Mention notable projects, leadership roles, or honors..."
    />

    {/* Footer Actions */}
    <div
        className="flex items-center justify-end gap-3 pt-4 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
    >
        <Button variant="secondary" size="sm" type="button" onClick={onClose} disabled={isLoading}>
        Cancel
        </Button>
        <Button variant="primary" size="sm" type="submit" isLoading={isLoading}>
        {initialData ? 'Update Education' : 'Save Education'}
        </Button>
    </div>
    </form>
);
}

export default function EducationModal({
isOpen,
onClose,
onSubmit,
initialData = null,
isLoading = false,
}) {
return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={initialData ? 'Edit Education' : 'Add Education'}
    >
    <EducationForm
        key={getModalResetKey(isOpen, initialData)}
        initialData={initialData}
        onClose={onClose}
        onSubmit={onSubmit}
        isLoading={isLoading}
    />
    </Modal>
);
}