'use client';

import Select from '@/components/ui/Select';

const fieldStyle = {
backgroundColor: 'var(--bg-main, #f5f2eb)',
borderColor: 'var(--border-subtle, #e5e0d8)',
color: 'var(--text-primary, #1a1918)',
};
const labelColor = { color: 'var(--text-secondary, #666059)' };

export function TitleCategoryFields({ title, onTitleChange, categoryOptions, categoryId, onCategoryChange }) {
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
    <label className="block text-xs font-semibold mb-1" style={labelColor}>
        Project Title <span className="text-red-400">*</span>
    </label>
    <input
        type="text"
        placeholder="e.g. Nike Commercial 2026"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
        style={fieldStyle}
    />
    </div>
    <div>
    <label className="block text-xs font-semibold mb-1" style={labelColor}>
        Category <span className="text-red-400">*</span>
    </label>
    <Select options={categoryOptions} value={categoryId} onChange={onCategoryChange} placeholder="Select a category" />
    </div>
</div>
);
}

export function CompletionDateField({ value, onChange }) {
return (
<div>
    <label className="block text-xs font-semibold mb-1" style={labelColor}>
    Completion Date
    </label>
    <input
    type="date"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
    style={fieldStyle}
    />
</div>
);
}

export function DescriptionField({ value, onChange }) {
return (
<div>
    <label className="block text-xs font-semibold mb-1" style={labelColor}>
    Project Description / Details
    </label>
    <textarea
    rows={3}
    placeholder="Brief description of your role, gear used, or campaign goals..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors resize-none"
    style={fieldStyle}
    />
</div>
);
}

export function FeaturedCheckbox({ checked, onChange }) {
return (
<div className="flex items-center gap-2 pt-1">
    <input
    type="checkbox"
    id="isFeatured"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="w-4 h-4 rounded border-gray-300 accent-[#c88346] cursor-pointer"
    />
    <label htmlFor="isFeatured" className="text-xs font-medium cursor-pointer" style={{ color: 'var(--text-primary, #1a1918)' }}>
    Feature this project on home showcase grid
    </label>
</div>
);
}