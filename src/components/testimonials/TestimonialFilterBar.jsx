"use client";
export default function TestimonialFilterBar({ value, onChange }) { return <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-md border border-stone-300 bg-white px-3 py-2"><option value="">All ratings</option>{[5,4,3,2,1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select>; }
