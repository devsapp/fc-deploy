export declare function createProgressBar(format: any, options: any): any;
export declare function hasHttpPrefix(s: string): boolean;
export declare function capitalizeFirstLetter(s: string): string;
export declare function extract(regex: any, endpoint: any, idx: any): any;
export declare function generateResourceName(serviceName: string, region: string, accountID: string): string;
export declare function formatArgs(args: string): string | null;
/**
 * 检测 build 是否可用
 * @param serviceName 服务名称
 * @param functionName 函数名称
 */
export declare function checkBuildAvailable(serviceName: string, functionName: string, baseDir?: string): Promise<void>;
