import { mapServerNavigation, type ServerNavigationResponse } from "../nav-menu-contract";

describe("mapServerNavigation", () => {
  it("merges modules shared across roles while preserving children order", () => {
    const payload: ServerNavigationResponse = {
      version: "2025.03",
      generatedAt: new Date().toISOString(),
      roles: [
        {
          role: "SUPER_ADMIN",
          modules: [
            {
              key: "root",
              label: "Executive",
              route: null,
              icon: "layout-dashboard",
              order: 1,
              children: [
                {
                  key: "overview",
                  label: "Overview",
                  route: "/dashboard/admin",
                  icon: "layout-dashboard",
                  order: 1,
                },
                {
                  key: "activity",
                  label: "Activity",
                  route: "/dashboard/admin/activity",
                  icon: "clipboard-list",
                  order: 2,
                },
              ],
            },
          ],
        },
        {
          role: "COMPANY",
          modules: [
            {
              key: "root",
              label: "Executive",
              route: null,
              icon: "layout-dashboard",
              order: 1,
              children: [
                {
                  key: "overview",
                  label: "Overview",
                  route: "/dashboard/company",
                  icon: "layout-dashboard",
                  order: 1,
                },
                {
                  key: "programme",
                  label: "Programmes",
                  route: "/dashboard/company/programmes",
                  icon: "clipboard-list",
                  order: 3,
                },
              ],
            },
          ],
        },
      ],
    };

    const [root] = mapServerNavigation(payload);

    expect(root.label).toBe("Executive");
    expect(root.roles).toEqual(expect.arrayContaining(["SUPER_ADMIN", "COMPANY"]));
    expect(root.children?.map((child) => child.key)).toEqual(["overview", "activity", "programme"]);
  });

  it("falls back to default ordering when order is missing", () => {
    const payload: ServerNavigationResponse = {
      version: "latest",
      generatedAt: new Date().toISOString(),
      roles: [
        {
          role: "NGO",
          modules: [
            {
              key: "ngo-section",
              label: "NGO ops",
              route: null,
              children: [
                { key: "second", label: "Second", route: "/second" },
                { key: "first", label: "First", route: "/first", order: 1 },
              ],
            },
          ],
        },
      ],
    };

    const [section] = mapServerNavigation(payload);
    expect(section.children?.map((child) => child.label)).toEqual(["First", "Second"]);
  });

  it("ignores unknown icons without throwing", () => {
    const payload: ServerNavigationResponse = {
      version: "latest",
      generatedAt: new Date().toISOString(),
      roles: [
        {
          role: "DONOR",
          modules: [
            {
              key: "donor-home",
              label: "Donor",
              route: "/dashboard/donor",
              icon: "unknown-token",
            },
          ],
        },
      ],
    };

    const [item] = mapServerNavigation(payload);
    expect(item.icon).toBeUndefined();
  });

  it("merges role lists without duplicates", () => {
    const payload: ServerNavigationResponse = {
      version: "latest",
      generatedAt: new Date().toISOString(),
      roles: [
        {
          role: "NGO",
          modules: [
            {
              key: "reports",
              label: "Reports",
              route: "/dashboard/reports",
            },
          ],
        },
        {
          role: "NGO",
          modules: [
            {
              key: "reports",
              label: "Reports",
              route: "/dashboard/reports",
            },
          ],
        },
      ],
    };

    const [item] = mapServerNavigation(payload);
    expect(item.roles).toEqual(["NGO"]);
  });
});
