/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false, 
    images: {
        domains: ['res.cloudinary*'],
    },
};


export default nextConfig;
