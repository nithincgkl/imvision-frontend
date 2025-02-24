import createNextIntlPlugin from 'next-intl/plugin';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    // Enable React's Strict Mode for improved error handling and performance
    reactStrictMode: true,
    images: {
      domains: ['storage.googleapis.com'],
    },
    // Disable the X-Powered-By header for security reasons
    poweredByHeader: false,

    // Set asset prefix based on environment
    // In production, assets will be served from the root
    // In development, it uses the default Next.js asset prefix
    assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',

    // Custom function to generate a build ID
    // This can be used to ensure consistent builds or for cache busting
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return 'my-build-id'
    },

    // Add security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ],
            },
        ]
    },

    // Custom webpack configuration
    webpack: (config, { isServer, dev }) => {
        // Client-side specific configurations
        if (!isServer) {
            // Automatically load jQuery for use in any module
            config.plugins.push(
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                })
            );

            // Add watchOptions for hot reloading in Docker
            config.watchOptions = {
                poll: 1000, // Check for changes every second
                aggregateTimeout: 300, // Delay before rebuilding
                ignored: ['node_modules/**'], // Ignore changes in node_modules
            };
        }
        
        // Add path alias resolution
        // This allows you to use '@' to refer to the 'src' directory
        config.resolve.alias['@'] = path.join(process.cwd(), 'src');
        
        // Production build specific configurations
        if (!isServer && !dev) {
            // Custom plugin to handle large assets
            config.plugins.push({
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('ReplacePlugin', (compilation) => {
                        const assetMap = new Map();
                        // Iterate over all compiled assets
                        Object.keys(compilation.assets).forEach((fileName) => {
                            const asset = compilation.assets[fileName];
                            // Check if asset is larger than 30MB
                            if (asset.size() > 30 * 1024 * 1024) { // 30MB
                                const storagePath = `${fileName}.storage-url`;
                                // If a storage URL file exists, read it and add to assetMap
                                if (fs.existsSync(storagePath)) {
                                    const storageUrl = fs.readFileSync(storagePath, 'utf8').trim();
                                    assetMap.set(fileName, storageUrl);
                                }
                            }
                        });
                        // If large assets were found, write them to a manifest file
                        if (assetMap.size > 0) {
                            const manifestPath = path.join(compiler.outputPath, 'large-assets-manifest.json');
                            fs.writeFileSync(manifestPath, JSON.stringify(Object.fromEntries(assetMap)));
                        }
                    });
                }
            });
        }
        
        // Return the modified webpack config
        return config;
    },
};

export default withNextIntl(nextConfig);