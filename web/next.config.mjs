/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	reactStrictMode: true,
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
	},
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
					{ key: 'X-XSS-Protection', value: '0' }
				]
			}
		];
	}
};

export default nextConfig;

