export interface Vpc {
    region: string;
    vpcId: string;
    vSwitchId: string;
    securityGroupId: string;
}
export interface ReportData {
    name: string;
    access: string;
    content: Vpc;
}
export default class BaseComponent {
    protected __report(reportData: ReportData): Vpc;
}
