/**
 * @returns true if `process.env.NODE_ENV` is `'production'`, false otherwise.
 */
export default function isEnvironmentProduction() {
  return process.env['NODE_ENV'] === 'production';
}
