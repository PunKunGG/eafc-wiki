/* eslint-disable @typescript-eslint/no-require-imports -- This fixture uses Node's CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function load(path) {
  const source = fs.readFileSync(path, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports });
  return exports;
}
const { moveGuides } = load("src/features/moves/catalog.ts");
const { controlSteps, buttonLabels } = load("src/features/moves/control-data.ts");

test("every guide with documented controls has structured actions for both controllers", () => {
  assert.equal(new Set(moveGuides.map((guide) => guide.slug)).size, moveGuides.length);
  for (const guide of moveGuides) {
    if (guide.slug === "trivela-shot") { assert.equal(controlSteps[guide.slug], undefined); continue; }
    assert.ok(controlSteps[guide.slug]?.length, guide.slug);
    for (const step of controlSteps[guide.slug]) for (const action of step) {
      assert.ok(buttonLabels.playstation[action.button], `${guide.slug} PlayStation`);
      assert.ok(buttonLabels.xbox[action.button], `${guide.slug} Xbox`);
    }
  }
});

test("control steps retain simultaneous, hold, repeat and stick direction semantics", () => {
  assert.equal(controlSteps["power-shot"][0].length, 3);
  assert.equal(controlSteps["low-driven-shot"][0][0].action, "power");
  assert.equal(controlSteps["low-driven-shot"][1][0].action, "press-again");
  assert.equal(controlSteps["band-master"][0][0].action, "hold");
  assert.equal(controlSteps["band-master"][0][1].direction, "right");
  assert.equal(controlSteps["band-master"][1][0].direction, "up");
  assert.equal(controlSteps["show-respect"][1][0].quick, true);
});
