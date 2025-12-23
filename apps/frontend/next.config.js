const metricsCollector = require("./metrics/performance-report");

const nextConfig = {
  output: "standalone",
  experimental: {
    captureMetrics: true,
  },
  hooks: {
    metrics: metricsCollector,
  },
};

module.exports = nextConfig;
