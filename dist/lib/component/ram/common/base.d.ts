export interface Ram {
    role: string;
    arn: string;
}
export interface ReportData {
    name: string;
    access: string;
    content: Ram;
}
export default class BaseComponent {
    protected __report(reportData: ReportData): Ram;
}
