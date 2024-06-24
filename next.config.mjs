/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                soruce: "/api/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*" // Controls who has access to admin page, * (all) for development only
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                    {
                        key: "Content-Range",
                        value: "bytes : 0-9/*",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
