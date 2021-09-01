import { green, white } from 'colors';
import ProgressBar from 'progress';
import crypto from 'crypto';

export function createProgressBar(format, options) {
  const opts = Object.assign({
    complete: green('█'),
    incomplete: white('█'),
    width: 20,
    clear: true,
  }, options);
  const bar = new ProgressBar(format, opts);
  const old = bar.tick;
  const loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
  // @ts-ignore
  bar.tick = (len, tokens) => {
    const newTokens = Object.assign({
      loading: loadingChars[Math.random() * 5],
    }, tokens);
    old.call(bar, len, newTokens);
  };
  return bar;
}

export function hasHttpPrefix(s: string): boolean {
  return s.startsWith('http://');
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function extract(regex, endpoint, idx) {
  const matchs = endpoint.match(regex);
  if (matchs) {
    return matchs[idx];
  }
  return null;
}

export function generateResourceName(serviceName: string, region: string, accountID: string) {
  const prefix = serviceName.slice(0, 6);

  const md5Uid = crypto.createHmac('md5', accountID).update(serviceName).digest('hex');
  return `${prefix}-${md5Uid.slice(0, 7)}-${region}`;
}

export function formatArgs(args: string): string | null {
  // 去除 args 的行首以及行尾的空格
  return (args ? args.replace(/(^\s*)|(\s*$)/g, '') : '');
}
