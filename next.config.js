/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:'lh3.googleusercontent.com',
            protocol:'https',
            port: ''
        }]
    }
}

module.exports = nextConfig
