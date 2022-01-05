import { loadComponent } from '@serverless-devs/core';

export default class StdoutFormatter {
  static stdoutFormatter: any;

  static async initStdout() {
    const fcCore = await loadComponent('devsapp/fc-core');
    this.stdoutFormatter = fcCore.formatterOutput;
  }
}
