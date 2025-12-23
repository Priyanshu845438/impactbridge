const routeBudgets = [
  {
    route: "/dashboard",
    firstLoadJS: 110_000,
  },
  {
    route: "/dashboard/company",
    firstLoadJS: 120_000,
    renderDuration: 3_200,
    lcpTime: 2_500,
  },
  {
    route: "/dashboard/admin",
    firstLoadJS: 200_000,
    renderDuration: 3_500,
  },
];

function checkBudgets(sample) {
  const budget = routeBudgets.find((entry) => entry.route === sample.route);
  if (!budget) {
    return [];
  }

  const warnings = [];

  if (budget.firstLoadJS && sample.firstLoadJS && sample.firstLoadJS > budget.firstLoadJS) {
    warnings.push(
      `firstLoadJS for ${sample.route} exceeded budget (${sample.firstLoadJS} B > ${budget.firstLoadJS} B).`
    );
  }

  if (budget.renderDuration && sample.renderDuration && sample.renderDuration > budget.renderDuration) {
    warnings.push(
      `renderDuration for ${sample.route} exceeded budget (${sample.renderDuration} ms > ${budget.renderDuration} ms).`
    );
  }

  if (budget.lcpTime && sample.lcpTime && sample.lcpTime > budget.lcpTime) {
    warnings.push(`LCP for ${sample.route} exceeded budget (${sample.lcpTime} ms > ${budget.lcpTime} ms).`);
  }

  return warnings;
}

module.exports = {
  routeBudgets,
  checkBudgets,
};
