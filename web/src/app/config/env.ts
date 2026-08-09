/**
 * Environment configuration with validation.
 * Centralizes access to environment variables and validates required values.
 */

function getEnvVar(key: string, fallback?: string): string {
  const value = import.meta.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  /** Strapi API base URL (no trailing slash) */
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:1337'),
  /** Site name for fallback metadata */
  siteName: getEnvVar('VITE_SITE_NAME', 'VINA TIN DUC'),
  /** Whether we're in production mode */
  isProd: import.meta.env.PROD,
  /** Whether we're in development mode */
  isDev: import.meta.env.DEV,
} as const;
