export function readRequiredFunctionEnv(name: string) {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing required function env: ${name}`);
  }
  return value;
}
