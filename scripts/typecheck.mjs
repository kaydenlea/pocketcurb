import {
  ensureContains,
  parseJson,
  runCheck,
  assert,
  ensureDependenciesInstalled,
  runPnpm
} from "./common.mjs";
import { requiredRootScripts, workspacePackageManifests } from "./repo-contract.mjs";

const typecheckProjects = [
  "packages/core-domain/tsconfig.json",
  "packages/schemas/tsconfig.json",
  "packages/api-client/tsconfig.json",
  "packages/supabase-types/tsconfig.json",
  "packages/ui-mobile/tsconfig.json",
  "packages/ui-web/tsconfig.json",
  "apps/mobile/tsconfig.json",
  "apps/web/tsconfig.json"
];

runCheck("package-json-shape", () => {
  const pkg = parseJson("package.json");
  assert(pkg.private === true, "package.json must be private");
  assert(pkg.type === "module", "package.json must declare module type");
  assert(typeof pkg.packageManager === "string" && pkg.packageManager.startsWith("pnpm@"), "packageManager must pin pnpm");

  for (const script of requiredRootScripts) {
    assert(pkg.scripts?.[script], `package.json is missing script: ${script}`);
  }
});

runCheck("claude-settings-json-shape", () => {
  const settings = parseJson(".claude/settings.json");
  assert(Array.isArray(settings.canonicalDocs), ".claude/settings.json must declare canonicalDocs");
  assert(settings.defaults?.planFirstForNonTrivialWork === true, ".claude/settings.json must default plan-first behavior");
});

runCheck("workspace-package-manifests", () => {
  for (const manifestPath of workspacePackageManifests) {
    const manifest = parseJson(manifestPath);
    assert(typeof manifest.name === "string" && manifest.name.length > 0, `${manifestPath} must declare a package name`);
    assert(manifest.private === true, `${manifestPath} must remain private at bootstrap stage`);
    assert(typeof manifest.description === "string" && manifest.description.length >= 20, `${manifestPath} must explain its responsibility`);
  }
});

runCheck("npm-and-workspace-policy", () => {
  ensureContains(".npmrc", [
    "engine-strict=true",
    "auto-install-peers=false",
    "prefer-workspace-packages=true",
    "verify-store-integrity=true"
  ]);

  ensureContains("pnpm-workspace.yaml", [
    "packages:",
    "apps/*",
    "packages/*",
    "onlyBuiltDependencies: []"
  ]);
});

runCheck("typescript-project-references", () => {
  ensureDependenciesInstalled();
  for (const project of typecheckProjects) {
    runPnpm(["exec", "tsc", "-p", project, "--noEmit"]);
  }
});
