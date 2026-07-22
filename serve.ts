// Production server for the built site. Starts the standalone Nitro server
// on port 3000. Take over the port first so we never collide.
import { $ } from "bun";

const PORT = 3000;
const HOST = "0.0.0.0";

// Free PORT regardless of which user owns the current listener. lsof runs under
// sudo so it can see (and the kill can signal) a process owned by another user;
// the loop waits for the socket to actually release before we bind.
const freePort =
  `for _ in $(seq 1 25); do ` +
  `pids=$(lsof -t -iTCP:${String(PORT)} -sTCP:LISTEN 2>/dev/null || true); ` +
  `if [ -z "$pids" ]; then exit 0; fi; ` +
  `kill $pids 2>/dev/null || true; sleep 0.2; ` +
  `done`;

await $`sudo sh -c ${freePort}`.quiet().nothrow();

// Run the standalone Nitro server directly
process.env.PORT = String(PORT);
process.env.HOST = HOST;
await import("./.output/server/index.mjs");
