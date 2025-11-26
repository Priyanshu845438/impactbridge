/** @type {import('next').NextConfig} */
const experimental = {};

Object.defineProperty(experimental, 'appDir', {
  value: true,
  enumerable: false,
  configurable: false,
  writable: false,
});

const nextConfig = {
  output: 'standalone',
  experimental,
};

module.exports = nextConfig;
