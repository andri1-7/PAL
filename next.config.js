/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/account/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
