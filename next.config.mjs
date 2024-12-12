/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // ...other config
};

export default nextConfig;






















// Use ES Module syntax for the module.exports part
// export const images = {
//   remotePatterns: [
//     {
//       protocol: 'https',
//       hostname: 'assets.example.com',
//       port: '',
//       pathname: '/account123/**',
//     },
//   ],
// };

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config) {
//     // Grab the existing rule that handles SVG imports
//     const fileLoaderRule = config.module.rules.find((rule) =>
//       rule.test?.test?.(".svg")
//     );

//     config.module.rules.push(
//       // Reapply the existing rule, but only for svg imports ending in ?url
//       {
//         ...fileLoaderRule,
//         test: /\.svg$/i,
//         resourceQuery: /url/, // *.svg?url
//       },
//       // Convert all other *.svg imports to React components
//       {
//         test: /\.svg$/i,
//         issuer: fileLoaderRule.issuer,
//         resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
//         use: ["@svgr/webpack"],
//       }
//     );

//     // Modify the file loader rule to ignore *.svg, since we have it handled now.
//     fileLoaderRule.exclude = /\.svg$/i;

//     return config;
//   },

//   images: {
//     domains: ['images.unsplash.com', 'unsplash.com'], // Add this for next/image compatibility
//   },

//   // Add any other Next.js configurations here...
// };

// export default nextConfig;
