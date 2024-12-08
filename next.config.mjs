/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false, 
    images: {
        domains: ['res.cloudinary.com'],
    },
};


export default nextConfig;
