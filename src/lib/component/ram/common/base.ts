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
  protected __report(reportData: ReportData) {
    if (process && process.send) {
      const { name, content, access } = reportData;
      process.send({
        action: 'resource',
        data: {
          name,
          access,
          content: JSON.stringify(content),
        },
      });
      return content;
    }
  }
}
