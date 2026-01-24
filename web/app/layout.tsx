'use client';

import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Portfolio',
	description: 'Personal portfolio',
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png'
	},
	manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}


