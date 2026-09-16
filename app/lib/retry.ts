import "server-only";

// Serverless cold starts occasionally hiccup on the very first outbound call
// to an external API from a freshly initialized container — observed with
// generateSignInWithEmailLink failing once right after a fresh deploy, then
// succeeding reliably afterward. A short retry with backoff smooths over
// that class of transient failure without masking real, persistent errors.
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** i));
      }
    }
  }
  throw lastError;
}
