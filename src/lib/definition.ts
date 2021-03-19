

export function isAutoConfig(config: any): boolean {
  // return config === 'auto' || config === 'Auto' || (config.type && (config.type === 'auto' || config.type === 'Auto'));
  return config === 'auto' || config === 'Auto';
}
