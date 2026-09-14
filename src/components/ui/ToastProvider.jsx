'use client';

import { Toaster } from 'sonner';

export default function ToastProvider() {
return (
    <Toaster
    position="top-right"
    richColors
    closeButton
    duration={5000}
    toastOptions={{
        classNames: {
        toast: 'font-sans',
        success: 'bg-white! text-green-600! border-green-700!',
        error: 'bg-white! text-red-600! border-red-700!',
        warning: 'bg-white! text-amber-500! border-amber-600!',
        },
    }}
    />
);
}
