/** @type {import('next').NextConfig} */
const nextConfig = {
    // swcMinify: true, // 确保 SWC 压缩启用
    experimental: {
        cpus: 4, // 调整并行编译的 CPU 数量
    },
};

export default nextConfig;
