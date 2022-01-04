import { formatterOutput } from '@serverless-devs/fc-core';

export default class StdoutFormatter {
  static stdoutFormatter: any;

  static async initStdout() {
    this.stdoutFormatter = formatterOutput;
  }
}
