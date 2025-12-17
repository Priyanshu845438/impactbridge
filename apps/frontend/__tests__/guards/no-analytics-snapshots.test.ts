import fs from "node:fs";
import path from "node:path";

describe("analytics snapshot guard", () => {
  const forbiddenDir = path.join(process.cwd(), "snapshots", "analytics");

  it("prevents committed Percy snapshots for analytics components", () => {
    const exists = fs.existsSync(forbiddenDir);
    expect(exists).toBe(false);
  });
});
