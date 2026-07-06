import { Credential } from '@/config/credential';

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function loadCredential(): Credential {
  return {
    username: requireEnv('TEST_USERNAME'),
    password: requireEnv('TEST_PASSWORD'),
  };
}
