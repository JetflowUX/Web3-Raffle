/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    // Externalize optional peer dependencies on server
    if (isServer) {
      config.externals.push('pino-pretty', '@react-native-async-storage/async-storage');
    }
    
    // Ignore optional peer dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'pino-pretty': false,
      '@react-native-async-storage/async-storage': false,
    };
    
    // Ignore specific warnings from node_modules
    config.ignoreWarnings = [
      { module: /node_modules\/@react-native-async-storage\/async-storage/ },
      { module: /node_modules\/pino-pretty/ },
    ];
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  // Suppress warnings during build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
