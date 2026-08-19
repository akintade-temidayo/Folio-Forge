'use client';

import { createContext, useContext } from 'react';

const OnboardingContext = createContext({ openOnboarding: () => {} });

export function OnboardingProvider({ children, openOnboarding }) {
return (
<OnboardingContext.Provider value={{ openOnboarding }}>
    {children}
</OnboardingContext.Provider>
);
}

export function useOnboarding() {
return useContext(OnboardingContext);
}