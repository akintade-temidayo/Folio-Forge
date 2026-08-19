import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, onChange, interactive = false }) {
return (
<div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => {
    const isFilled = star <= rating;
    return (
        <button
        key={star}
        type={interactive ? 'button' : undefined}
        onClick={() => interactive && onChange && onChange(star)}
        disabled={!interactive}
        className={`${
            interactive
            ? 'cursor-pointer hover:scale-110 transition-transform'
            : 'cursor-default'
        } focus:outline-none`}
        >
        <Star
            className={`w-5 h-5 ${
            isFilled
                ? 'fill-[#c88346] text-[#c88346]'
                : 'fill-transparent text-[#38322c]'
            }`}
        />
        </button>
    );
    })}
</div>
);
}