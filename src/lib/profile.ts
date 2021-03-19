

export function mark(source: string): string {
  if (!source) { return source; }

  const subStr = source.slice(-4);
  return `***********${subStr}`;
}

export interface ServerlessProfile {
  readonly credentials: any;
  readonly accessAlias: string;
  readonly projectName: string;
  readonly region: string;
  readonly timeout?: number;
}
