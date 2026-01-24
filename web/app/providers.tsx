'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProvidersProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60_000,
						retry: 1
					}
				}
			})
	);

	// Basic theme setup; can be replaced with Zustand or other theme store later
	React.useEffect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}, []);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}


