import _ from 'lodash';

export function clearInvalidField(data, invalidKeys) {
  const d = _.omit(data, invalidKeys);
  return _.pickBy(d, (value: any) => !_.isNil(value) && value !== '');
}

export function isAutoConfig(config: any): boolean {
  // return config === 'auto' || config === 'Auto' || (config.type && (config.type === 'auto' || config.type === 'Auto'));
  return config === 'auto' || config === 'Auto';
}

export function isAutoPerformanceAsNas(config: any): boolean {
  if (!_.isString(config)) {
    return false;
  }

  return _.toLower(config) === 'autoperformance';
}
