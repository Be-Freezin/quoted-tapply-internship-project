/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['firebasestorage.googleapis.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'quoted-fc4dc.appspot.com',
				port: '',
				pathname: '/profile_photos',
			},
		],
	},
}

module.exports = nextConfig
