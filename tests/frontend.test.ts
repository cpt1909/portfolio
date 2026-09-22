import test from "node:test";
import assert from "node:assert/strict";
import { accents } from "../src/lib/accents";
import { toProjectView } from "../src/lib/project-view";
import { fromPortfolioJSON } from "../src/lib/portfolio-view";
import { sampleData } from "../src/lib/sample-data";
function luminance(hex: string) {
  const values = hex
    .slice(1)
    .match(/../g)!
    .map((value) => parseInt(value, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test("every accent has AA text contrast on both theme surfaces and solid buttons", () => {
  for (const accent of accents) {
    for (const dark of ["#101110", "#171a16"])
      assert.ok(contrast(accent.color, dark) >= 4.5, accent.name + " dark");
    for (const light of ["#f1efe6", "#e8e6dc"])
      assert.ok(
        contrast(accent.lightInk, light) >= 4.5,
        accent.name + " light",
      );
    assert.ok(
      contrast("#101110", accent.color) >= 4.5,
      accent.name + " button",
    );
  }
});
test("project adapter maps MongoDB shape and proposed JSON, rejecting executable URLs", () => {
  const old = toProjectView(sampleData.projects[0], 0);
  assert.deepEqual(old.stack, sampleData.projects[0].stack);
  const project = toProjectView(
    {
      title: "Test",
      description: "Example",
      techStack: ["React"],
      imageURL: "https://example.com/image.png",
      liveLink: "javascript:alert(1)",
      githubLink: "https://github.com/example/repo",
    },
    0,
  );
  assert.equal(project.live, "");
  assert.equal(project.imageURL, "https://example.com/image.png");
  assert.deepEqual(project.stack, ["React"]);
});
test("portfolio JSON adapter preserves supplied identity and maps about and images", () => {
  const view = fromPortfolioJSON(
    {
      about: { text: "About me", skills: ["React"] },
      projects: [
        {
          title: "Example",
          description: "Hello",
          techStack: ["React"],
          imageURL: "https://example.com/project.png",
        },
      ],
    },
    sampleData.profile,
  );
  assert.equal(view.profile.name, sampleData.profile.name);
  assert.equal(view.profile.about, "About me");
  assert.deepEqual(view.profile.skills, ["React"]);
  assert.equal(view.projects[0].imageURL, "https://example.com/project.png");
});
