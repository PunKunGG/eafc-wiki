/* eslint-disable @typescript-eslint/no-require-imports -- Node's built-in test runner loads this CommonJS fixture. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function createStore() {
  const values = new Map();
  const handlers = new Set();
  let unavailable = false;
  const localStorage = {
    getItem(key) { if (unavailable) throw new Error("unavailable"); return values.get(key) ?? null; },
    setItem(key, value) { if (unavailable) throw new Error("unavailable"); values.set(key, value); },
  };
  const window = {
    addEventListener(_type, fn) { handlers.add(fn); },
    removeEventListener(_type, fn) { handlers.delete(fn); },
  };
  const source = fs.readFileSync("src/features/preferences/client-store.ts", "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, localStorage, window, Set, JSON, require: () => ({ moveGuides: [{ slug: "ground-pass" }] }) });
  return { store: exports, values, handlers, setUnavailable(value) { unavailable = value; } };
}

test("refreshes preferences after resubscribing and preserves the other tab's favorites", () => {
  const { store, values } = createStore();
  const key = "fc26-playbook:preferences:v1";
  const unsubscribe = store.subscribePreferences(() => {});
  unsubscribe();
  values.set(key, JSON.stringify({ platform: "playstation", favorites: ["ground-pass"] }));
  store.subscribePreferences(() => {});
  assert.equal(store.getPreferences().favorites[0], "ground-pass");
  store.updatePreferences({ platform: "xbox" });
  assert.deepEqual(JSON.parse(values.get(key)), { platform: "xbox", favorites: ["ground-pass"] });
});

test("retains unsaved preferences when storage is unavailable and resubscribes", () => {
  const { store, setUnavailable } = createStore();
  const unsubscribe = store.subscribePreferences(() => {});
  setUnavailable(true);
  store.updatePreferences({ platform: "xbox", favorites: ["ground-pass"] });
  unsubscribe();
  store.subscribePreferences(() => {});
  assert.equal(store.getPreferences().platform, "xbox");
  assert.equal(store.getPreferences().favorites[0], "ground-pass");
});

test("refreshes defaults after another tab clears preferences", () => {
  const { store, values } = createStore();
  const unsubscribe = store.subscribePreferences(() => {});
  store.updatePreferences({ platform: "xbox" });
  unsubscribe();
  values.clear();
  store.subscribePreferences(() => {});
  assert.equal(store.getPreferences().platform, "playstation");
});
