const { checkBudgets } = require("./performance-budgets");

const MONITORED_ROUTES = new Set(["/dashboard", "/dashboard/company", "/dashboard/admin"]);

function toSample(record) {
  return {
    route: record.route,
    renderDuration: record.renderDuration?.actual,
    firstLoadJS: record.firstLoadJS?.actual,
    lcpTime: record.lcpTiming?.actual,
  };
}

function metricsCollector(metrics) {
  metrics
    .filter((entry) => MONITORED_ROUTES.has(entry.route))
    .map(toSample)
    .forEach((sample) => {
      const warnings = checkBudgets(sample);
      warnings.forEach((message) => {
        console.warn(`⚠️ Performance budget warning: ${message}`);
      });
    });
}

module.exports = metricsCollector;
